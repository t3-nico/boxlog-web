"use client"
import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContainer({ children, className = "" }: MainContainerProps) {
  return (
    <div className={`flex-1 h-full ${className}`}>
      {children}
    </div>
  );
} 