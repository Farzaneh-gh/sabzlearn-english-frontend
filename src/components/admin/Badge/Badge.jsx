import React from "react";
import { cn } from "../utils";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-primary text-white dark:bg-green-600 dark:text-white",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-input text-muted-foreground",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
