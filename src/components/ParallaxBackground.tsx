"use client";

import { useEffect, useState } from "react";

const ParallaxBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const y1 = scrollY * 0.04;
  const y2 = scrollY * -0.02;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -left-28 top-[-4rem] h-[460px] w-[460px] rounded-full bg-emerald-700/[0.07] blur-3xl"
        style={{ transform: `translateY(${y1}px)` }}
      />
      <div
        className="absolute -right-36 top-[28%] h-[400px] w-[400px] rounded-full bg-stone-400/[0.1] blur-3xl"
        style={{ transform: `translateY(${y2}px)` }}
      />
      <div
        className="absolute bottom-[-6rem] left-[18%] h-[340px] w-[340px] rounded-full bg-teal-600/[0.06] blur-3xl"
        style={{ transform: `translateY(${y1 * 0.45}px)` }}
      />
      <div
        className="absolute right-[18%] top-[42%] h-[300px] w-[300px] rounded-full bg-amber-400/[0.06] blur-3xl"
        style={{ transform: `translateY(${y2 * 1.15}px)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(214 211 209 / 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgb(214 211 209 / 0.45) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 72% 58% at 50% 0%, black, transparent)",
        }}
      />
    </div>
  );
};

export default ParallaxBackground;
