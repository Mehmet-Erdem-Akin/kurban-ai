"use client";

import type { ReactNode } from "react";
import ParallaxBackground from "@/components/ParallaxBackground";

type AppPageShellProps = {
  children: ReactNode;
};

const AppPageShell = ({ children }: AppPageShellProps) => {
  return (
    <div className="relative min-h-screen hero-gradient text-stone-900">
      <ParallaxBackground />
      {children}
    </div>
  );
};

export default AppPageShell;
