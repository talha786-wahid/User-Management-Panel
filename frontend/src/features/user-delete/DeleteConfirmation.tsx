import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface DeleteConfirmationProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
  loading?: boolean;
}

export const DeleteConfirmation = ({
  open,
  onCancel,
  onConfirm,
  userName,
  loading = false,
}: DeleteConfirmationProps) => {
  return (
    <Modal
      open={open}
      title="Delete User"
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{ danger: true, loading }}
      destroyOnHidden
      width={480}
      centered
      maskClosable={false}
    >
      <Space>
        <ExclamationCircleOutlined style={{ color: "#ff4d4f", fontSize: 22 }} />
        <span>
          Are you sure you want to delete <strong>{userName}</strong>? This
          action cannot be undone.
        </span>
      </Space>
    </Modal>
  );
};
