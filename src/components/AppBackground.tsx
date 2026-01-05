import { useTheme } from "./theme-provider";
import bg1 from "@/assets/bg1.JPG";
import bg2 from "@/assets/bg2.JPG";

export const AppBackground: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="fixed top-0 left-0 -z-20 h-screen min-h-screen w-screen animate-fade-in bg-cover bg-fixed bg-center blur-sm"
      style={{
        backgroundImage: theme === "dark" ? `url(${bg1})` : `url(${bg2})`,
      }}
    />
  );
};
