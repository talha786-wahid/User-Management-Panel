import { Form, Modal, Input, Select } from "antd";
import type { User, UserInput } from "../../entities/user/types";

interface UserFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: UserInput) => void;
  initialValues?: User;
  title: string;
  loading?: boolean;
}

export const UserForm = ({
  open,
  onCancel,
  onSubmit,
  initialValues,
  title,
  loading = false,
}: UserFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={handleSubmit}
      okText="Save"
      okButtonProps={{ loading }}
      destroyOnHidden
      width={480}
      centered
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        preserve={false}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter name" }]}
        >
          <Input placeholder="Enter user name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter valid email" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: "Please select role" }]}
        >
          <Select placeholder="Select user role">
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
          <Select placeholder="Select user status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="banned">Banned</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
