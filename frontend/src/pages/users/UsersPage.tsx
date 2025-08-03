import React, { useState, useCallback } from "react";
import {
  Button,
  message,
  Space,
  Dropdown,
  Tag,
  Table,
  Input,
  DatePicker,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  PlusOutlined,
  FilterOutlined,
  ExportOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { UserForm } from "../../features/user-form/UserForm";
import { DeleteConfirmation } from "../../features/user-delete/DeleteConfirmation";
import { LoadingOverlay } from "../../shared/ui/LoadingOverlay";
import { useUserStore } from "../../entities/user/model/store";
import {
  User,
  UserFormData,
  UserRole,
  UserStatus,
  UserFilter,
} from "../../entities/user/types";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  UPDATE_USER_ROLE,
} from "../../entities/user/api/graphql";
import { DATE_FORMAT, DATE_FORMAT_FULL } from "../../shared/config/constants";

const PageWrapper = styled.div`
  padding: 24px;
  background: var(--neutral-50);
  border-radius: 16px;
  min-height: calc(100vh - 140px);
  position: relative;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: var(--neutral-50);
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    margin: 0;
    font-family: "Poppins", sans-serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--neutral-800);
  }

  &::before {
    content: "";
    display: block;
    width: 3px;
    height: 20px;
    background: var(--primary-500);
    border-radius: 2px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const TableCard = styled.div`
  background: var(--neutral-50);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--shadow-sm);

  .ant-table-wrapper {
    .ant-table {
      background: transparent;
    }

    .ant-table-thead > tr > th {
      background: var(--neutral-50);
      color: var(--neutral-600);
      font-family: "Poppins", sans-serif;
      font-weight: 600;
      border-bottom: 1px solid var(--neutral-200);
      padding: 16px;
    }

    .ant-table-tbody > tr > td {
      border-bottom: 1px solid var(--neutral-200);
      padding: 16px;
      color: var(--neutral-800);
    }

    .ant-table-tbody > tr:hover > td {
      background: var(--neutral-100);
    }

    .ant-table-row-selected > td {
      background: var(--primary-50);
    }

    .ant-pagination {
      margin-top: 16px;
    }
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const FilterInput = styled(Input)`
  max-width: 300px;
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  color: var(--neutral-800);

  &:hover {
    border-color: var(--primary-500);
  }

  &:focus {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-50);
  }

  .ant-input-prefix {
    color: var(--neutral-500);
  }
`;

const FilterDatePicker = styled(DatePicker.RangePicker)`
  max-width: 280px;
  background: var(--neutral-50);
  border-color: var(--neutral-200);
  color: var(--neutral-800);

  input {
    color: var(--neutral-800);
  }

  .ant-picker-separator {
    color: var(--neutral-500);
  }

  &:hover {
    border-color: var(--primary-500);
  }

  &:focus {
    border-color: var(--primary-500);
    box-shadow: 0 0 0 2px var(--primary-50);
  }
`;

const StatusTag = styled(Tag)<{ $status: string }>`
  border: none;
  border-radius: 6px;
  padding: 4px 12px;
  text-transform: capitalize;
  background: ${({ $status }) => {
    switch ($status.toLowerCase()) {
      case "active":
        return "var(--success-50)";
      case "pending":
        return "var(--warning-50)";
      case "banned":
        return "var(--error-50)";
      default:
        return "var(--neutral-100)";
    }
  }};
  color: ${({ $status }) => {
    switch ($status.toLowerCase()) {
      case "active":
        return "var(--success-500)";
      case "pending":
        return "var(--warning-500)";
      case "banned":
        return "var(--error-500)";
      default:
        return "var(--neutral-500)";
    }
  }};
`;

const RoleIcon = {
  admin: <SafetyCertificateOutlined style={{ color: "var(--primary-500)" }} />,
  moderator: <TeamOutlined style={{ color: "var(--warning-500)" }} />,
  user: <UserOutlined style={{ color: "var(--success-500)" }} />,
};

export const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<[string, string] | null>(null);

  const { users, setUsers, total, setCachedData } = useUserStore();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { loading: loadingUsers, refetch } = useQuery(GET_USERS, {
    variables: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
      filter: {
        email: emailFilter || undefined,
        role: roleFilter.length > 0 ? roleFilter[0] : undefined,
        status: statusFilter.length > 0 ? statusFilter[0] : undefined,
        startDate: dateFilter?.[0] || undefined,
        endDate: dateFilter?.[1] || undefined,
      },
    },
    onCompleted: (data) => {
      setUsers(data.users.items, data.users.total);
      const filter: UserFilter = {
        email: emailFilter || undefined,
        role: roleFilter.length > 0 ? (roleFilter[0] as UserRole) : undefined,
        status:
          statusFilter.length > 0 ? (statusFilter[0] as UserStatus) : undefined,
        startDate: dateFilter?.[0],
        endDate: dateFilter?.[1],
      };

      setCachedData(
        {
          offset: (page - 1) * pageSize,
          limit: pageSize,
          filter,
        },
        {
          users: data.users.items,
          total: data.users.total,
          timestamp: Date.now(),
        }
      );
    },
  });

  const [createUser, { loading: loadingCreate }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      refetch();
      message.success("User created successfully");
      setIsFormOpen(false);
    },
    onError: () => {
      message.error("Failed to create user");
    },
  });

  const [updateUserMutation, { loading: loadingUpdate }] = useMutation(
    UPDATE_USER,
    {
      onCompleted: () => {
        refetch();
        message.success("User updated successfully");
        setIsFormOpen(false);
      },
      onError: () => {
        message.error("Failed to update user");
      },
    }
  );

  const [updateUserRole, { loading: loadingRole }] = useMutation(
    UPDATE_USER_ROLE,
    {
      onCompleted: () => {
        refetch();
        message.success("Role updated successfully");
      },
      onError: () => {
        message.error("Failed to update role");
      },
    }
  );

  const [deleteUserMutation, { loading: loadingDelete }] = useMutation(
    DELETE_USER,
    {
      onCompleted: () => {
        refetch();
        message.success("User deleted successfully");
        setIsDeleteOpen(false);
      },
      onError: () => {
        message.error("Failed to delete user");
      },
    }
  );

  const handleCreateUser = async (data: UserFormData) => {
    await createUser({
      variables: { input: data },
    });
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!selectedUser) return;
    await updateUserMutation({
      variables: {
        id: selectedUser.id,
        input: data,
      },
    });
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    await deleteUserMutation({
      variables: { id: selectedUser.id },
    });
  };

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    await updateUserRole({
      variables: {
        id: userId,
        role: newRole,
      },
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      filteredValue: emailFilter ? [emailFilter] : [],
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record) => (
        <Dropdown
          menu={{
            items: [
              { key: "admin", label: "Admin", icon: RoleIcon.admin },
              {
                key: "moderator",
                label: "Moderator",
                icon: RoleIcon.moderator,
              },
              { key: "user", label: "User", icon: RoleIcon.user },
            ],
            onClick: ({ key }) => handleRoleChange(record.id, key as UserRole),
          }}
          trigger={["click"]}
        >
          <Space style={{ cursor: "pointer" }}>
            {RoleIcon[role as keyof typeof RoleIcon]}
            <span>{role}</span>
          </Space>
        </Dropdown>
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Moderator", value: "moderator" },
        { text: "User", value: "user" },
      ],
      filteredValue: roleFilter,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <StatusTag $status={status}>{status}</StatusTag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Pending", value: "pending" },
        { text: "Banned", value: "banned" },
      ],
      filteredValue: statusFilter,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => {
        const formattedDate = format(new Date(parseInt(date)), DATE_FORMAT);
        const fullDate = format(new Date(parseInt(date)), DATE_FORMAT_FULL);
        return <span title={fullDate}>{formattedDate}</span>;
      },
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setIsFormOpen(true);
            }}
            loading={loadingUpdate && selectedUser?.id === record.id}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setIsDeleteOpen(true);
            }}
            loading={loadingDelete && selectedUser?.id === record.id}
          />
        </Space>
      ),
    },
  ];

  const handleTableChange = useCallback(
    (pagination: any, filters: any, sorter: any) => {
      if (filters.role) setRoleFilter(filters.role);
      if (filters.status) setStatusFilter(filters.status);
      refetch();
    },
    [refetch]
  );

  const isLoading =
    loadingUsers ||
    loadingCreate ||
    loadingUpdate ||
    loadingDelete ||
    loadingRole;

  return (
    <PageWrapper>
      {isLoading && <LoadingOverlay />}

      <PageHeader>
        <Title>
          <h1>Users</h1>
        </Title>
        <HeaderActions>
          <Button
            icon={<FilterOutlined />}
            onClick={() => {
              setEmailFilter("");
              setRoleFilter([]);
              setStatusFilter([]);
              setDateFilter(null);
              refetch();
            }}
          >
            Reset Filters
          </Button>
          <Button icon={<ExportOutlined />}>Export</Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedUser(null);
              setIsFormOpen(true);
            }}
          >
            Add User
          </Button>
        </HeaderActions>
      </PageHeader>

      <FilterSection>
        <FilterInput
          placeholder="Filter by email"
          prefix={<SearchOutlined />}
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          allowClear
          onPressEnter={() => refetch()}
        />
        <FilterDatePicker
          onChange={(dates) => {
            if (dates) {
              setDateFilter([dates[0]!.toISOString(), dates[1]!.toISOString()]);
              refetch();
            } else {
              setDateFilter(null);
              refetch();
            }
          }}
        />
      </FilterSection>

      <TableCard>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            },
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          onChange={handleTableChange}
          loading={isLoading}
        />
      </TableCard>

      <UserForm
        open={isFormOpen}
        onCancel={() => {
          setIsFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        initialValues={selectedUser ?? undefined}
        loading={loadingCreate || loadingUpdate}
      />

      <DeleteConfirmation
        open={isDeleteOpen}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        user={selectedUser ?? undefined}
        loading={loadingDelete}
      />
    </PageWrapper>
  );
};
