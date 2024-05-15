import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  href?: string;
  variant?: "primary" | "text";
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, href, variant = "primary", ...props }, ref) => {
    const styles = cn(
      "flex items-center justify-center gap-2",
      {
        "bg-primary-500 hover:bg-primary-400 focus:bg-primary-600 text-white h-10 p-4 rounded-sm":
          variant === "primary",
        "bg-transparent text-primary-500 hover:text-secondary-500":
          variant === "text",
      },
      className
    );

    if (href) {
      return (
        <Link href={href} className={styles}>
          {children}
        </Link>
      );
    }

    return (
      <button {...props} ref={ref} className={styles}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

