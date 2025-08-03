import { Modal } from "antd";
import styled from "@emotion/styled";
import { User } from "../../entities/user/types";

const StyledModal = styled(Modal)`
  .ant-modal-content {
    background: var(--neutral-50);
  }

  .ant-modal-header {
    background: var(--neutral-50);
    border-bottom: 1px solid var(--neutral-200);
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

  .ant-modal-body {
    color: var(--neutral-700);
  }

  .ant-modal-footer {
    border-top: 1px solid var(--neutral-200);
  }
`;

interface DeleteConfirmationProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
  user?: User;
  loading?: boolean;
}

export const DeleteConfirmation = ({
  open,
  onCancel,
  onConfirm,
  user,
  loading,
}: DeleteConfirmationProps) => {
  return (
    <StyledModal
      title="Delete User"
      open={open}
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{
        danger: true,
        loading,
      }}
      cancelButtonProps={{
        disabled: loading,
      }}
      maskClosable={false}
    >
      <p>
        Are you sure you want to delete user{" "}
        <strong>{user?.name || "Unknown"}</strong>? This action cannot be
        undone.
      </p>
    </StyledModal>
  );
};
