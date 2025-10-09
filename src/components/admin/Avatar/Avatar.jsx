import React, { useState } from "react";
import { cn } from "../utils";

export function Avatar({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, src, alt, ...props }) {
  const [imageError, setImageError] = useState(false);

  // If there's an error or no src, don't render the image
  if (!src || imageError) {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      onError={() => setImageError(true)}
      {...props}
    />
  );
}

export function AvatarFallback({ className, ...props }) {
  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
