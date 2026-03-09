"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const blobs = ref.current.querySelectorAll<HTMLElement>(".aurora-blob");

    const ctx = gsap.context(() => {
      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: `random(-120, 120)`,
          y: `random(-80, 80)`,
          scale: `random(0.8, 1.3)`,
          duration: 10 + i * 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="aurora-blob absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full bg-purple-300/[0.15] blur-[120px]" />
      <div className="aurora-blob absolute right-[-10%] top-[20%] h-[500px] w-[500px] rounded-full bg-sky-300/[0.12] blur-[100px]" />
      <div className="aurora-blob absolute bottom-[10%] left-[30%] h-[400px] w-[400px] rounded-full bg-emerald-300/[0.12] blur-[100px]" />
      <div className="aurora-blob absolute right-[20%] top-[60%] h-[350px] w-[350px] rounded-full bg-violet-300/[0.12] blur-[80px]" />
    </div>
  );
}
