import { ThemeProvider } from "@emotion/react";
import { ConfigProvider, App as AntApp } from "antd";
import { ReactNode } from "react";
import { lightTheme, darkTheme } from "../../shared/config/theme";

interface ThemeProviderProps {
  children: ReactNode;
  isDarkMode: boolean;
}

export const AppThemeProvider = ({
  children,
  isDarkMode,
}: ThemeProviderProps) => {
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ConfigProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AntApp>{children}</AntApp>
      </ThemeProvider>
    </ConfigProvider>
  );
};
