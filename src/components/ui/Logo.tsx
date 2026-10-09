import React from "react";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="#home"
      className={`inline-flex items-center group select-none ${className}`}
      aria-label="SOLARIS ENERGY"
    >
      <Image
        src="/logo.svg"
        alt="SOLARIS ENERGY"
        width={184}
        height={40}
        priority
        className="h-[40px] w-auto transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
