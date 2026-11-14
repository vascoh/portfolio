import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-fg shadow-[0_8px_30px_-10px_var(--glow)] hover:brightness-110 hover:shadow-[0_12px_36px_-8px_var(--glow)] active:scale-[0.98]",
        secondary:
          "glass text-fg hover:border-border-strong hover:bg-surface-strong active:scale-[0.98]",
        ghost: "text-fg-muted hover:text-fg hover:bg-surface",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-[0.95rem]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ComponentProps<"button"> & Variants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function ButtonLink({
  className,
  variant,
  size,
  external,
  ...props
}: ComponentProps<typeof Link> & Variants & { external?: boolean }) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
