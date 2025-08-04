import styled from "@emotion/styled";
import type { UserStatus } from "../../entities/user/types";
import { colors } from "../config/theme";

const Tag = styled.span<{ status: UserStatus; isDark?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  transition: all 0.2s;

  ${({ status, isDark = false }) => {
    const statusColors = colors.status[status];
    return isDark
      ? `
        color: ${statusColors.text};
        background: ${statusColors.darkBg};
        border: 1px solid ${statusColors.darkBorder};
      `
      : `
        color: ${statusColors.text};
        background: ${statusColors.bg};
        border: 1px solid ${statusColors.border};
      `;
  }}
`;

interface StatusTagProps {
  status: UserStatus;
  isDark?: boolean;
}

export const StatusTag = ({ status, isDark }: StatusTagProps) => {
  return (
    <Tag status={status} isDark={isDark}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Tag>
  );
};
