import React from "react";
import { cn } from "../utils";

// Wrapper for chart containers
export function ChartContainer({ className, ...props }) {
  return <div className={cn("h-[350px] w-full", className)} {...props} />;
}

// Tooltip wrapper
export function ChartTooltip({ content, ...props }) {
  return <div {...props}>{content}</div>;
}

// Tooltip content
export function ChartTooltipContent({ label, payload }) {
  if (!payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border bg-popover p-2 shadow-md">
      <p className="text-sm font-medium">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-xs text-muted-foreground">
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}
