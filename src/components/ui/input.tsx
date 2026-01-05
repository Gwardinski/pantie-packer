import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-md border border-zinc-300 bg-zinc-50 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-zinc-900 selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-900 placeholder:text-zinc-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-950 dark:bg-zinc-950 dark:selection:bg-zinc-200 dark:selection:text-zinc-900 dark:file:text-white dark:placeholder:text-zinc-400",
        "focus-visible:border-zinc-400 focus-visible:ring-[3px] focus-visible:ring-zinc-400/50 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-600/50",
        "aria-invalid:border-red-600 aria-invalid:ring-red-600/20 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-900/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
