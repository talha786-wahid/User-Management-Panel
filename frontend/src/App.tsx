import { ConfigProvider, Layout, theme } from "antd";
import { ApolloProviderWrapper } from "./app/providers/apollo";
import { UsersPage } from "./pages/users/UsersPage";
import { ThemeToggle } from "./shared/ui/ThemeToggle";
import { useThemeStore } from "./shared/lib/theme";
import styled from "@emotion/styled";
import "./styles/global.css";

const { Header, Content } = Layout;

interface ThemeProps {
  isDark: boolean;
}

const StyledHeader = styled(Header)<{ theme: ThemeProps }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  background: ${(props) => (props.theme.isDark ? "#1e293b" : "#ffffff")};
  box-shadow: var(--shadow-sm);
  position: fixed;
  width: 100%;
  z-index: 1;
  height: 70px;
`;

const StyledContent = styled(Content)<{ theme: ThemeProps }>`
  margin-top: 70px;
  padding: 32px;
  min-height: calc(100vh - 70px);
  background: ${(props) => (props.theme.isDark ? "#0f172a" : "#f8fafc")};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: var(--primary-500);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 20px;
  box-shadow: var(--shadow-md);
`;

const LogoText = styled.h1<{ theme: ThemeProps }>`
  margin: 0;
  color: ${(props) => (props.theme.isDark ? "#f8fafc" : "#1e293b")};
  font-size: 20px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
`;

const App = () => {
  const { isDarkMode } = useThemeStore();

  const themeConfig = {
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#0ea5e9",
      borderRadius: 8,
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      colorSuccess: "#22c55e",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorTextBase: isDarkMode ? "#f8fafc" : "#1e293b",
      colorBgContainer: isDarkMode ? "#1e293b" : "#ffffff",
      colorBgLayout: isDarkMode ? "#0f172a" : "#f8fafc",
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      boxShadowSecondary: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <ApolloProviderWrapper>
        <Layout style={{ minHeight: "100vh" }}>
          <StyledHeader theme={{ isDark: isDarkMode }}>
            <Logo>
              <LogoIcon>U</LogoIcon>
              <LogoText theme={{ isDark: isDarkMode }}>
                User Management
              </LogoText>
            </Logo>
            <ThemeToggle />
          </StyledHeader>
          <StyledContent theme={{ isDark: isDarkMode }}>
            <UsersPage />
          </StyledContent>
        </Layout>
      </ApolloProviderWrapper>
    </ConfigProvider>
  );
};

export default App;
