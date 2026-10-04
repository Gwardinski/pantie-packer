import { ThemeToggle } from "./ThemeToggle";
import { IconAnchor } from "./gmac.ui";
import { IconBrandGithub, IconCoffee } from "@tabler/icons-react";

export const ContactInfo = () => {
  return (
    <div className="flex w-full justify-center gap-4">
      <ThemeToggle />
      <IconAnchor
        variant="glass"
        href="https://github.com/Gwardinski/pantie-packer"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
      >
        <IconBrandGithub className="size-6" />
      </IconAnchor>
      <IconAnchor
        variant="glass"
        href="https://buymeacoffee.com/gwardinski"
        target="_blank"
        rel="noreferrer"
        aria-label="Buy me a coffee"
      >
        <IconCoffee className="size-6" />
      </IconAnchor>
    </div>
  );
};
