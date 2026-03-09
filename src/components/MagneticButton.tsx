"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  as?: "a" | "button";
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  href,
  as = "button",
  strength = 0.35,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.35, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      data-hover
    >
      {children}
    </Tag>
  );
}
