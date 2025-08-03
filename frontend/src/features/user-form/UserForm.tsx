import React from "react";
import { Form, Input, Modal, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styled from "@emotion/styled";
import { User, UserFormData } from "../../entities/user/types";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: var(--neutral-50);
  }

  .ant-modal-header {
    background: var(--neutral-50);
    border-bottom: 1px solid var(--neutral-200);
    margin-bottom: 24px;
  }

  .ant-modal-title {
    color: var(--neutral-800);
  }

  .ant-modal-close {
    color: var(--neutral-500);
    &:hover {
      color: var(--neutral-700);
    }
  }

  .ant-form-item-label > label {
    color: var(--neutral-700);
  }

  .ant-input,
  .ant-select-selector {
    background: var(--neutral-50) !important;
    border-color: var(--neutral-200) !important;
    color: var(--neutral-800) !important;

    &:hover {
      border-color: var(--primary-500) !important;
    }

    &:focus {
      border-color: var(--primary-500) !important;
      box-shadow: 0 0 0 2px var(--primary-50) !important;
    }
  }

  .ant-select-arrow {
    color: var(--neutral-500);
  }

  .ant-modal-footer {
    border-top: 1px solid var(--neutral-200);
    margin-top: 24px;
  }

  .ant-select-dropdown {
    background: var(--neutral-50);
    .ant-select-item {
      color: var(--neutral-700);
      &:hover {
        background: var(--neutral-100);
      }
      &.ant-select-item-option-selected {
        background: var(--primary-50);
        color: var(--primary-500);
      }
    }
  }
`;

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (data: UserFormData) => Promise<void>;
  initialValues?: User;
  loading?: boolean;
}

export const UserForm = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  loading,
}: UserFormProps) => {
  const [form] = Form.useForm<UserFormData>();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await onSubmit(values);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  React.useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          name: initialValues.name,
          email: initialValues.email,
          role: initialValues.role,
          status: initialValues.status,
        });
      } else {
        form.setFieldsValue({
          role: "user",
          status: "active",
        });
      }
    }
  }, [open, initialValues, form]);

  return (
    <StyledModal
      title={initialValues ? "Edit User" : "Add User"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      onOk={handleSubmit}
      okText={initialValues ? "Update" : "Create"}
      confirmLoading={loading}
      maskClosable={false}
      destroyOnHidden
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        {!initialValues && (
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password
              placeholder="Enter password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        )}

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select>
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="moderator">Moderator</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="banned">Banned</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};
