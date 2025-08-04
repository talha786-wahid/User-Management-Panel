import styled from "@emotion/styled";
import { Button, Input, Select, Card, Typography } from "antd";

export const StyledButton = styled(Button)`
  height: 40px;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &.ant-btn-primary {
    background: var(--ant-color-primary);
    border-color: var(--ant-color-primary);

    &:hover {
      background: var(--ant-color-primary-hover);
      border-color: var(--ant-color-primary-hover);
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  &.ant-btn-text {
    &:hover {
      background: var(--ant-color-bg-elevated);
    }
  }

  .anticon {
    font-size: 16px;
  }
`;

export const StyledInput = styled(Input)`
  height: 40px;
  border-radius: 8px;
  padding: 8px 16px;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    border-color: var(--ant-color-primary);
    box-shadow: none;
  }

  &.ant-input-affix-wrapper {
    padding: 0 12px;
    .ant-input {
      padding: 8px 4px;
    }
  }
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 40px !important;
    border-radius: 8px !important;
    padding: 4px 16px !important;

    .ant-select-selection-item {
      line-height: 32px !important;
    }
  }

  &:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: var(--ant-color-primary) !important;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--ant-color-border);
  background: var(--ant-color-bg-container);

  .ant-card-body {
    padding: 24px;
  }
`;

export const PageTitle = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 24px;
    color: var(--ant-color-text);
  }
`;

export const ToolbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const TableWrapper = styled.div`
  .ag-theme-alpine {
    --ag-header-height: 48px;
    --ag-row-height: 48px;
    --ag-header-foreground-color: var(--ant-color-text-secondary);
    --ag-font-size: 14px;
    --ag-font-family: var(--ant-font-family);

    .ag-header-cell {
      font-weight: 600;
    }

    .ag-cell {
      display: flex;
      align-items: center;
    }

    .ag-row-hover {
      background-color: var(--ant-color-bg-elevated) !important;
    }
  }
`;
