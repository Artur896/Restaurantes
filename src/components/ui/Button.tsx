"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "wine";
type Size = "sm" | "md" | "lg";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-gold text-carbon hover:bg-gold-soft shadow-glow",
  secondary: "bg-cream text-carbon hover:bg-white",
  wine: "bg-wine text-cream hover:bg-wine-light",
  outline: "border border-cream/25 text-cream hover:border-gold/60 hover:text-gold",
  ghost: "text-cream/80 hover:text-gold hover:bg-cream/5",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-3.5 py-2 rounded-full",
  md: "text-sm px-5 py-3 rounded-full",
  lg: "text-base px-7 py-4 rounded-full",
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-colors duration-200",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
