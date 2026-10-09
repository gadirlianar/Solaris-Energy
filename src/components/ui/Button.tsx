"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "glass" | "dark-gray";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  href = "#contact",
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const isPrimary = variant === "primary";
  const isDarkGray = variant === "dark-gray";

  const baseClasses =
    "group relative overflow-hidden inline-flex items-center gap-3 h-[44px] rounded-[12px] pl-5 pr-1.5 text-[15px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4F86E] focus-visible:ring-offset-2 active:scale-[0.98]";

  const variantClasses = isDarkGray
    ? "bg-[#3A3A3A] text-white hover:bg-[#2A2A2A] shadow-sm"
    : isPrimary
    ? "bg-[#111111] text-white hover:bg-[#1a1a1a] shadow-sm"
    : "bg-white/40 hover:bg-white/60 text-[#111111] backdrop-blur-md border border-white/30 shadow-sm";

  const arrowSquareClasses = (isPrimary || isDarkGray)
    ? "w-[32px] h-[32px] rounded-[8px] bg-[#E4F86E] text-[#111111] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:scale-[1.06]"
    : "w-[32px] h-[32px] rounded-[8px] bg-[#111111] text-white flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:translate-x-[3px] group-hover:scale-[1.06]";

  const content = (
    <>
      {/* Shine sweep effect on hover */}
      <span
        className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <span className="whitespace-nowrap relative z-10">{children}</span>
      <div className={`${arrowSquareClasses} relative z-10`}>
        <ArrowRight className="w-4 h-4 stroke-[2]" />
      </div>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses} ${className}`}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
