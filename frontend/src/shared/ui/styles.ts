import styled from "@emotion/styled";
import {
  Layout as AntLayout,
  Button as AntButton,
  Input as AntInput,
  Select as AntSelect,
} from "antd";
import type { ThemeConfig } from "antd";

interface ThemedProps {
  theme: {
    token: ThemeConfig["token"];
  };
}

const { Header, Content, Footer } = AntLayout;

export const StyledHeader = styled(Header)<ThemedProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: ${({ theme }) => theme.token.colorBgContainer};
  border-bottom: 1px solid ${({ theme }) => theme.token.colorBorderSecondary};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
`;

export const StyledContent = styled(Content)<ThemedProps>`
  min-height: calc(100vh - 128px);
  padding: 24px;
  background: ${({ theme }) => theme.token.colorBgLayout};
`;

export const StyledFooter = styled(Footer)<ThemedProps>`
  text-align: center;
  background: ${({ theme }) => theme.token.colorBgContainer};
  border-top: 1px solid ${({ theme }) => theme.token.colorBorderSecondary};
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
`;

export const ThemeToggleButton = styled(AntButton)<ThemedProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  box-shadow: none;

  &:hover {
    background: ${({ theme }) => theme.token.colorBgElevated};
  }

  svg {
    font-size: 20px;
    color: ${({ theme }) => theme.token.colorText};
  }
`;

export const Logo = styled.div<ThemedProps>`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 32px;
    height: 32px;
    color: ${({ theme }) => theme.token.colorPrimary};
  }
`;

export const StyledInput = styled(AntInput)<ThemedProps>`
  &.ant-input-affix-wrapper {
    background: ${({ theme }) => theme.token.colorBgContainer};

    input {
      background: transparent;
      &::placeholder {
        color: ${({ theme }) => theme.token.colorTextSecondary};
      }
    }
  }

  &.ant-input {
    border: 1px solid #d9d9d9;
    box-shadow: none;
    background: ${({ theme }) => theme.token.colorBgContainer};

    &:hover,
    &:focus {
      border-color: ${({ theme }) => theme.token.colorPrimary};
    }
  }
`;

export const Select = AntSelect;

export const ActionButton = styled(AntButton)<ThemedProps>`
  &.ant-btn-primary {
    box-shadow: none;
  }
`;

export const TableContainer = styled.div<ThemedProps>`
  &.ag-theme-alpine {
    --ag-background-color: ${({ theme }) => theme.token.colorBgContainer};
    --ag-header-background-color: ${({ theme }) => theme.token.colorBgElevated};
    --ag-odd-row-background-color: ${({ theme }) =>
      theme.token.colorBgContainer};
    --ag-row-hover-color: ${({ theme }) => theme.token.colorBgElevated};
    --ag-header-foreground-color: ${({ theme }) => theme.token.colorText};
    --ag-foreground-color: ${({ theme }) => theme.token.colorText};
    --ag-row-border-color: ${({ theme }) => theme.token.colorBorderSecondary};
    --ag-border-color: ${({ theme }) => theme.token.colorBorderSecondary};

    .ag-header {
      border-bottom: 1px solid
        ${({ theme }) => theme.token.colorBorderSecondary};
    }

    .ag-row {
      border-bottom: 1px solid
        ${({ theme }) => theme.token.colorBorderSecondary};
    }
  }
`;
