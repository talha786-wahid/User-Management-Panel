import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () =>
        set((state) => {
          const newIsDarkMode = !state.isDarkMode;
          document.body.setAttribute(
            "data-theme",
            newIsDarkMode ? "dark" : "light"
          );
          return { isDarkMode: newIsDarkMode };
        }),
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.body.setAttribute(
            "data-theme",
            state.isDarkMode ? "dark" : "light"
          );
        }
      },
    }
  )
);
