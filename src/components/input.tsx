import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-10 w-48 border border-gray-200 px-4 outline-none text-center",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";