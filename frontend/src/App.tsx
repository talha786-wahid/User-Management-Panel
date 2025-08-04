import { useState } from "react";
import { ApolloProvider } from "./app/providers/apollo";
import { AppThemeProvider } from "./app/providers/theme";
import { Layout } from "./shared/ui/Layout";
import { UsersPage } from "./pages/users/UsersPage";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <AppThemeProvider isDarkMode={isDarkMode}>
      <ApolloProvider>
        <Layout onThemeChange={setIsDarkMode} isDarkMode={isDarkMode}>
          <UsersPage />
        </Layout>
      </ApolloProvider>
    </AppThemeProvider>
  );
}

export default App;
