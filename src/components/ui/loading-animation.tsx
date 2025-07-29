"use client";

import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import { motion } from "framer-motion";

interface LoadingDotsProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-1.5 w-1.5",
  md: "h-2.5 w-2.5",
  lg: "h-3.5 w-3.5",
};

export default function LoadingDots({
  size = "md",
  className,
  ...rest
}: LoadingDotsProps) {
  const dotSize = sizeClasses[size];

  return (
    <div
      className={clsx("flex items-center justify-center space-x-1", className)}
      {...rest}
    >
      {[0, 0.2, 0.4].map((delay, index) => (
        <motion.span
          key={index}
          className={clsx(dotSize, "rounded-full bg-primary")}
          animate={{ y: ["0%", "-60%", "0%"] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
            delay, // place delay here
          }}
        />
      ))}
    </div>
  );
}
