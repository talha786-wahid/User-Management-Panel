import { useState, useMemo } from "react";
import { useTheme } from "@emotion/react";
import { Card, Button, Space, Typography, Spin, Modal } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  StyledInput,
  Select,
  ActionButton,
  TableContainer,
} from "../../shared/ui/styles";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import { useQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useUserStore } from "../../entities/user/model/store";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../../entities/user/api/graphql";
import type { User, UserInput } from "../../entities/user/types";
import { UserForm } from "../../features/user-form/UserForm";
import { DeleteConfirmation } from "../../features/user-delete/DeleteConfirmation";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const { Title } = Typography;

export const UsersPage = () => {
  const theme = useTheme();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const { users, setUsers } = useUserStore();

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) => setUsers(data.users),
    onError: (error) => console.error("Failed to fetch users:", error),
  });

  const [createUser, { loading: createLoading }] = useMutation(CREATE_USER, {
    update(_cache, { data }) {
      if (data?.createUser) {
        setUsers([...users, data.createUser]);
      }
    },
  });

  const [updateUser, { loading: updateLoading }] = useMutation(UPDATE_USER, {
    update(_cache, { data }) {
      if (data?.updateUser) {
        setUsers(
          users.map((user) =>
            user.id === data.updateUser.id ? data.updateUser : user
          )
        );
      }
    },
  });

  const [deleteUser, { loading: deleteLoading }] = useMutation(DELETE_USER, {
    update(_cache, _data) {
      if (selectedUser) {
        setUsers(users.filter((user) => user.id !== selectedUser.id));
      }
    },
  });

  const handleCreateUser = async (input: UserInput) => {
    try {
      await createUser({ variables: { input } });
      setIsFormOpen(false);
      return true;
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        Modal.error({
          title: "Email Already Exists",
          content:
            "A user with this email address already exists. Please use a different email.",
        });
      } else {
        Modal.error({
          title: "Error",
          content: "Failed to create user. Please try again.",
        });
      }
      throw error;
    }
  };

  const handleUpdateUser = async (input: UserInput) => {
    if (!selectedUser) return;
    try {
      await updateUser({
        variables: { id: selectedUser.id, input },
      });
      setIsFormOpen(false);
      setSelectedUser(null);
      return true;
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        Modal.error({
          title: "Email Already Exists",
          content:
            "A user with this email address already exists. Please use a different email.",
        });
      } else {
        Modal.error({
          title: "Error",
          content: "Failed to update user. Please try again.",
        });
      }
      throw error;
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser({ variables: { id: selectedUser.id } });
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        filter: true,
        minWidth: 150,
        flex: 1,
        suppressSizeToFit: true,
      },
      {
        field: "email",
        headerName: "Email",
        sortable: true,
        filter: true,
        minWidth: 200,
        flex: 1.5,
        suppressSizeToFit: true,
        cellRenderer: (params: any) => (
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {params.value}
          </div>
        ),
      },
      {
        field: "role",
        headerName: "Role",
        sortable: true,
        filter: true,
        minWidth: 120,
        flex: 1,
        suppressSizeToFit: true,
        cellRenderer: (params: any) => (
          <span style={{ textTransform: "capitalize" }}>{params.value}</span>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        sortable: true,
        filter: true,
        minWidth: 120,
        flex: 1,
        suppressSizeToFit: true,
        cellRenderer: (params: any) => (
          <span className={`status-tag ${params.value}`}>
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        ),
      },
      {
        field: "createdAt",
        headerName: "Registration Date",
        sortable: true,
        filter: true,
        minWidth: 160,
        flex: 1.2,
        suppressSizeToFit: true,
        cellRenderer: (params: any) => {
          const date = new Date(params.value);
          return format(date, "dd.MM.yyyy, HH:mm");
        },
      },
      {
        headerName: "Actions",
        minWidth: 100,
        flex: 0.8,
        suppressSizeToFit: true,
        cellRenderer: (params: any) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedUser(params.data);
                setIsFormOpen(true);
              }}
            />
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setSelectedUser(params.data);
                setIsDeleteModalOpen(true);
              }}
            />
          </Space>
        ),
      },
    ],
    []
  );

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesEmail = user.email
        .toLowerCase()
        .includes(emailFilter.toLowerCase());
      const matchesRole = !roleFilter || user.role === roleFilter;
      return matchesEmail && matchesRole;
    });
  }, [users, emailFilter, roleFilter]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "48px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card>
      <Title level={4} style={{ marginBottom: 24 }}>
        User Management
      </Title>

      <Space style={{ marginBottom: 24 }} size={16} wrap>
        <StyledInput
          prefix={<SearchOutlined />}
          placeholder="Filter by email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
          style={{ width: 240 }}
          allowClear
          theme={theme}
        />
        <Select
          placeholder="Filter by role"
          value={roleFilter}
          onChange={(value) => setRoleFilter(value as string)}
          style={{ width: 160 }}
          allowClear
        >
          <Select.Option value="">Select Role</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="moderator">Moderator</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
        <ActionButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedUser(null);
            setIsFormOpen(true);
          }}
          theme={theme}
        >
          Add User
        </ActionButton>
      </Space>

      <TableContainer
        className="ag-theme-alpine"
        style={{
          height: "calc(100vh - 300px)",
          width: "100%",
          overflow: "auto",
        }}
        theme={theme}
      >
        <AgGridReact
          rowData={filteredUsers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          rowSelection="single"
          suppressCellFocus={true}
          animateRows={true}
          paginationAutoPageSize={true}
          defaultColDef={{
            resizable: true,
            sortable: true,
            filter: true,
          }}
          onGridSizeChanged={(params) => {
            params.api.sizeColumnsToFit();
          }}
          onFirstDataRendered={(params) => {
            params.api.sizeColumnsToFit();
          }}
        />
      </TableContainer>

      <UserForm
        open={isFormOpen}
        onCancel={() => {
          setIsFormOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
        initialValues={selectedUser || undefined}
        title={selectedUser ? "Edit User" : "Add User"}
        loading={createLoading || updateLoading}
      />

      <DeleteConfirmation
        open={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteUser}
        userName={selectedUser?.name || ""}
        loading={deleteLoading}
      />
    </Card>
  );
};
