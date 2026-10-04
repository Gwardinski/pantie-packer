import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "./theme-provider";
import { IconButton } from "./gmac.ui";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <IconButton
      variant="glass"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <IconSun className="size-6" /> : <IconMoon className="size-6" />}
    </IconButton>
  );
};
