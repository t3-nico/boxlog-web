"use client"
import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContainer({ children, className = "" }: MainContainerProps) {
  return (
    <div className={`bg-zinc-800 shadow-lg min-h-[80vh] rounded-xl p-8 h-full ${className}`}>
      {children}
    </div>
  );
} 