import { Layout as AntLayout, Typography } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@emotion/react";
import {
  StyledHeader,
  StyledContent,
  StyledFooter,
  ThemeToggleButton,
  Logo,
} from "./styles";

interface LayoutProps {
  children: React.ReactNode;
  onThemeChange: (isDark: boolean) => void;
  isDarkMode: boolean;
}

export const Layout = ({
  children,
  onThemeChange,
  isDarkMode,
}: LayoutProps) => {
  const theme = useTheme();

  return (
    <AntLayout>
      <StyledHeader theme={theme}>
        <Logo theme={theme}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          <Typography.Title level={4} style={{ margin: 0 }}>
            User Management
          </Typography.Title>
        </Logo>
        <ThemeToggleButton
          theme={theme}
          icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
          onClick={() => onThemeChange(!isDarkMode)}
        />
      </StyledHeader>
      <StyledContent theme={theme}>{children}</StyledContent>
      <StyledFooter theme={theme}>
        User Management Panel ©{new Date().getFullYear()} Created By Talha
      </StyledFooter>
    </AntLayout>
  );
};
