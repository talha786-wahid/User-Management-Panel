import type { ThemeConfig } from "antd";

export const colors = {
  light: {
    primary: "#0B99C4",
    primaryHover: "#046684",
    background: "#FFFFFF",
    backgroundElevated: "#F5F8FA",
    text: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    borderHover: "#0B99C4",
    inputBg: "#FFFFFF",
    cardBg: "#FFFFFF",
  },
  dark: {
    primary: "#0B99C4",
    primaryHover: "#7FC7DC",
    background: "#1F2937",
    backgroundElevated: "#374151",
    text: "#F9FAFB",
    textSecondary: "#D1D5DB",
    border: "#374151",
    borderHover: "#7FC7DC",
    inputBg: "#111827",
    cardBg: "#111827",
  },
  status: {
    active: {
      text: "#059669",
      bg: "#ECFDF5",
      border: "#A7F3D0",
      darkBg: "#064E3B",
      darkBorder: "#059669",
    },
    pending: {
      text: "#D97706",
      bg: "#FFFBEB",
      border: "#FCD34D",
      darkBg: "#78350F",
      darkBorder: "#D97706",
    },
    banned: {
      text: "#DC2626",
      bg: "#FEF2F2",
      border: "#FECACA",
      darkBg: "#7F1D1D",
      darkBorder: "#DC2626",
    },
  },
};

const baseTheme: ThemeConfig = {
  token: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    borderRadius: 8,
    controlHeight: 40,
    controlPadding: 12,
    fontSize: 14,
  },
  components: {
    Button: {
      controlHeight: 40,
      paddingContentHorizontal: 20,
      borderRadius: 8,
      fontWeight: 500,
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      paddingInline: 16,
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
      paddingInline: 16,
    },
    Modal: {
      borderRadius: 16,
      paddingContentHorizontal: 24,
      paddingContentVerticalLG: 24,
    },
    Card: {
      borderRadius: 16,
    },
  },
};

export const lightTheme: ThemeConfig = {
  ...baseTheme,
  token: {
    ...baseTheme.token,
    colorPrimary: colors.light.primary,
    colorPrimaryHover: colors.light.primaryHover,
    colorBgContainer: colors.light.background,
    colorBgElevated: colors.light.backgroundElevated,
    colorText: colors.light.text,
    colorTextSecondary: colors.light.textSecondary,
    colorBorder: colors.light.border,
    colorBorderSecondary: colors.light.border,
    controlOutline: colors.light.primaryHover,
  },
};

export const darkTheme: ThemeConfig = {
  ...baseTheme,
  token: {
    ...baseTheme.token,
    colorPrimary: colors.dark.primary,
    colorPrimaryHover: colors.dark.primaryHover,
    colorBgContainer: colors.dark.background,
    colorBgElevated: colors.dark.backgroundElevated,
    colorText: colors.dark.text,
    colorTextSecondary: colors.dark.textSecondary,
    colorBorder: colors.dark.border,
    colorBorderSecondary: colors.dark.border,
    controlOutline: colors.dark.primaryHover,
  },
};
