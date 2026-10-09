import React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <div
      className={`inline-flex items-center text-[14px] font-medium tracking-tight text-[#555555] select-none ${className}`}
    >
      <span className="mr-1.5 text-[#888888]">/</span>
      <span>{children}</span>
    </div>
  );
}
