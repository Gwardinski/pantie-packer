import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui";
import { IconBrandGithub, IconCoffee } from "@tabler/icons-react";

export const ContactInfo = () => {
  return (
    <div className="flex w-full justify-center gap-4">
      <ThemeToggle />
      <Button size="icon" asChild>
        <a
          href="https://github.com/Gwardinski/pantie-packer"
          target="_blank"
          rel="noreferrer"
        >
          <IconBrandGithub className="size-6" />
        </a>
      </Button>
      <Button size="icon" asChild>
        <a
          href="https://buymeacoffee.com/gwardinski"
          target="_blank"
          rel="noreferrer"
        >
          <IconCoffee className="size-6" />
        </a>
      </Button>
    </div>
  );
};
