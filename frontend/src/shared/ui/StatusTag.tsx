import { Tag } from "antd";
import { UserStatus } from "../../entities/user/types.ts";
import styled from "@emotion/styled";

const statusConfig: Record<
  UserStatus,
  { color: string; backgroundColor: string; text: string }
> = {
  active: {
    color: "#389e0d",
    backgroundColor: "#f6ffed",
    text: "Active",
  },
  banned: {
    color: "#cf1322",
    backgroundColor: "#fff1f0",
    text: "Banned",
  },
  pending: {
    color: "#d48806",
    backgroundColor: "#fffbe6",
    text: "Pending",
  },
};

const StyledTag = styled(Tag)<{ $status: UserStatus }>`
  border-radius: 4px;
  padding: 4px 8px;
  font-weight: 500;
  text-transform: capitalize;
  border: 1px solid ${(props) => statusConfig[props.$status].color};
  color: ${(props) => statusConfig[props.$status].color};
  background: ${(props) => statusConfig[props.$status].backgroundColor};
`;

interface StatusTagProps {
  status: UserStatus;
}

export const StatusTag = ({ status }: StatusTagProps) => (
  <StyledTag $status={status}>{statusConfig[status].text}</StyledTag>
);
