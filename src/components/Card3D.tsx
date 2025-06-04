"use client";

import { ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

const Card3D = ({ children, className = "" }: Card3DProps) => {
  return <div className={className}>{children}</div>;
};

export default Card3D;
