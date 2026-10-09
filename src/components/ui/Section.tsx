import React from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({ id, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full max-w-[1288px] mx-auto px-4 sm:px-6 md:px-9 py-12 md:py-16 lg:py-20 ${className}`}
    >
      {children}
    </section>
  );
}
