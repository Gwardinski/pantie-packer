import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-zinc-700 focus-visible:ring-zinc-700/50 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50 focus-visible:ring-[3px] aria-invalid:ring-red-600/20 dark:aria-invalid:ring-red-900/40 aria-invalid:border-red-600 dark:aria-invalid:border-red-900",
  {
    variants: {
      variant: {
        default:
          "dark:bg-zinc-900 dark:text-white shadow-xs dark:hover:bg-zinc-900/90 border border-transparent bg-zinc-200 text-zinc-900 hover:bg-zinc-200/90",
        invert:
          "bg-zinc-900 text-white shadow-xs hover:bg-zinc-900/90 border border-transparent dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-200/90",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-200",
        glass:
          "glass-border dark:dark-glass-border bg-zinc-50/30 dark:bg-zinc-800/30 hover:bg-zinc-50/70 hover:dark:bg-zinc-800/70",
      },
      size: {
        default: "h-10 rounded-md px-4 has-[>svg]:px-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
