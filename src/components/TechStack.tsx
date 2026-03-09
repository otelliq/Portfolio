"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const techStack = [
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#000000" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Django", color: "#092e20" },
  { name: "DRF", color: "#a30000" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Docker", color: "#2496ed" },
  { name: "Git", color: "#f14e32" },
  { name: "Nginx", color: "#009639" },
  { name: "JWT/OAuth", color: "#7c3aed" },
];

export default function TechStack() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".tech-item", {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%" },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
      {techStack.map((tech) => (
        <div
          key={tech.name}
          className="tech-item group flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:border-zinc-300 hover:bg-zinc-50"
          data-hover
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold opacity-70 transition-opacity group-hover:opacity-100"
            style={{ color: tech.color }}
          >
            {tech.name.slice(0, 2)}
          </div>
          <span className="text-[0.65rem] font-medium text-zinc-500 transition-colors group-hover:text-zinc-900">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
