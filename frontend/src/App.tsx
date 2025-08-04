import { ConfigProvider, App as AntApp } from "antd";
import { useState } from "react";
import { ApolloProvider } from "./app/providers/apollo";
import { UsersPage } from "./pages/users/UsersPage";
import { lightTheme, darkTheme } from "./shared/config/theme";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ConfigProvider theme={theme}>
      <AntApp>
        <ApolloProvider>
          <div className={isDarkMode ? "dark" : "light"}>
            <div className="app-container">
              <header className="app-header">
                <h1>User Management Panel</h1>
                <button
                  className="theme-toggle"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? "🌞" : "🌙"}
                </button>
              </header>
              <main className="app-content">
                <UsersPage />
              </main>
              <footer className="app-footer">
                User Management Panel ©2025 Created with Ant Design
              </footer>
            </div>
          </div>
        </ApolloProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
