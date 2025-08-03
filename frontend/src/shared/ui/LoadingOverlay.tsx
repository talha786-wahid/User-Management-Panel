import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--neutral-50-rgb), 0.8);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const SpinnerWrapper = styled.div`
  padding: 24px;
  border-radius: 12px;
  background: var(--neutral-50);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const LoadingText = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  color: var(--neutral-600);
  margin-top: 8px;
`;

interface LoadingOverlayProps {
  text?: string;
}

export const LoadingOverlay = ({ text }: LoadingOverlayProps) => (
  <LoadingWrapper>
    <SpinnerWrapper>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerWrapper>
  </LoadingWrapper>
);
