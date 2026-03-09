"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dot.current || !ring.current) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.45, ease: "power3.out" });
    };

    const grow = () => {
      gsap.to(ring.current, { scale: 1.8, borderColor: "rgba(167,139,250,0.6)", duration: 0.3 });
      gsap.to(dot.current, { scale: 0.4, duration: 0.3 });
    };

    const shrink = () => {
      gsap.to(ring.current, { scale: 1, borderColor: "rgba(0,0,0,0.2)", duration: 0.3 });
      gsap.to(dot.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [data-hover]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 mix-blend-difference md:block"
      />
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-zinc-900/20 mix-blend-difference md:block"
      />
    </>
  );
}
