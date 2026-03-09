"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {
  items: string[];
  speed?: number;
  separator?: string;
  className?: string;
  reverse?: boolean;
}

export default function Marquee({
  items,
  speed = 60,
  separator = " — ",
  className = "",
  reverse = false,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!trackRef.current) return;

    const track = trackRef.current;
    const singleWidth = track.children[0]?.scrollWidth ?? 0;
    if (!singleWidth) return;

    const duration = singleWidth / speed;
    const direction = reverse ? singleWidth : -singleWidth;

    const tween = gsap.to(track.children, {
      x: direction,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return parseFloat(String(x)) % singleWidth;
        }),
      },
    });

    // Skew on scroll velocity
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const skew = self.getVelocity() / -300;
        gsap.to(track, { skewX: gsap.utils.clamp(-4, 4, skew), duration: 0.3, ease: "power2.out" });
      },
    });

    return () => {
      tween.kill();
      st.kill();
    };
  }, [speed, reverse, items]);

  const content = items.join(separator) + separator;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex">
        <span className="inline-block pr-0">{content}</span>
        <span className="inline-block pr-0">{content}</span>
      </div>
    </div>
  );
}
