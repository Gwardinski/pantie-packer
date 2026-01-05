import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-zinc-500 focus-visible:border-zinc-400 focus-visible:ring-[3px] focus-visible:ring-zinc-400/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-600 aria-invalid:ring-red-600/20 dark:border-zinc-700 dark:bg-zinc-900/30 dark:placeholder:text-zinc-400 dark:focus-visible:border-zinc-600 dark:focus-visible:ring-zinc-600/50 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-900/40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
