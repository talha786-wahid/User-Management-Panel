import { Switch } from "antd";
import { BulbOutlined, BulbFilled } from "@ant-design/icons";
import { useThemeStore } from "../lib/theme";
import styled from "@emotion/styled";

const StyledSwitch = styled(Switch)`
  &.ant-switch {
    background: var(--neutral-400);
  }

  &.ant-switch-checked {
    background: var(--primary-600);
  }
`;

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <StyledSwitch
      checked={isDarkMode}
      onChange={toggleTheme}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
    />
  );
};
