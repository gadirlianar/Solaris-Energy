"use client";

import React from "react";
import Link from "next/link";

export interface QuickActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "lime" | "glass" | "dark" | "outline";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
}

export function QuickActionButton({
  children,
  onClick,
  href,
  variant = "glass",
  size = "sm",
  icon,
  iconPosition = "left",
  className = "",
  type = "button",
  ariaLabel,
  disabled = false,
}: QuickActionButtonProps) {
  const isSm = size === "sm";

  const sizeClasses = isSm
    ? "h-[36px] px-3.5 text-[13px] rounded-[10px] gap-2"
    : "h-[42px] px-4 text-[14px] rounded-[12px] gap-2.5";

  const variantClasses = {
    lime: "bg-[#E4F86E] text-[#111111] hover:bg-[#dbf35c] shadow-[0_2px_10px_rgba(228,248,110,0.35)] border border-[#d4ed58]/60 font-semibold",
    glass:
      "bg-white/60 hover:bg-white/90 text-[#111111] backdrop-blur-md border border-black/8 shadow-[0_1px_4px_rgba(0,0,0,0.03)] font-medium",
    dark: "bg-[#111111] text-white hover:bg-[#222222] shadow-sm font-medium",
    outline:
      "bg-transparent text-[#111111] hover:bg-black/5 border border-black/15 font-medium",
  }[variant];

  const baseClasses =
    "group relative inline-flex items-center justify-center select-none overflow-hidden transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4F86E] focus-visible:ring-offset-2";

  const content = (
    <>
      {/* Subtle shine sweep on hover */}
      <span
        className="absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      {icon && iconPosition === "left" && (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap tracking-tight">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      {content}
    </button>
  );
}
