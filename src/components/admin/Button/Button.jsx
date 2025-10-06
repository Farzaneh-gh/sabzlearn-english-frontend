import React from "react";
import { cn } from "../utils";

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    default:
      "bg-gray-900 text-white hover:bg-gray-700 dark:bg-green-600 dark:hover:bg-green-700",
    destructive:
      "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    outline:
      "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100",
    ghost:
      "bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-100 dark:text-gray-100 dark:bg-gray-600 dark:hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
