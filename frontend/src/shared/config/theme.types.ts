import type { ThemeConfig } from "antd";

declare module "@emotion/react" {
  export interface Theme extends ThemeConfig {
    token: {
      colorPrimary: string;
      colorSuccess: string;
      colorWarning: string;
      colorError: string;
      colorTextBase: string;
      colorBgContainer: string;
      colorBgLayout: string;
      colorBorderSecondary: string;
      fontFamily: string;
      borderRadius: number;
    };
  }
}
