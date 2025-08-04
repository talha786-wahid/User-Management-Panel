import { Layout as AntLayout, Switch, Space, Typography } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const { Header, Content, Footer } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
  onThemeChange: (isDark: boolean) => void;
  isDarkMode: boolean;
}

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: ${({ theme }) => theme.token.colorBgContainer};
  border-bottom: 1px solid ${({ theme }) => theme.token.colorBorderSecondary};
`;

const StyledContent = styled(Content)`
  min-height: calc(100vh - 128px);
  padding: 24px;
  background: ${({ theme }) => theme.token.colorBgLayout};
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: ${({ theme }) => theme.token.colorBgContainer};
  border-top: 1px solid ${({ theme }) => theme.token.colorBorderSecondary};
`;

export const Layout = ({
  children,
  onThemeChange,
  isDarkMode,
}: LayoutProps) => {
  const theme = useTheme();

  return (
    <AntLayout>
      <StyledHeader theme={theme}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          User Management Panel
        </Typography.Title>
        <Space>
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={isDarkMode}
            onChange={onThemeChange}
          />
        </Space>
      </StyledHeader>
      <StyledContent theme={theme}>{children}</StyledContent>
      <StyledFooter theme={theme}>
        User Management Panel ©{new Date().getFullYear()} Created with Ant
        Design
      </StyledFooter>
    </AntLayout>
  );
};
