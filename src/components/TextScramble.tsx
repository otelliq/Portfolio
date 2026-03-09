"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface Props {
  phrases: string[];
  className?: string;
  interval?: number;
}

export default function TextScramble({ phrases, className = "", interval = 3200 }: Props) {
  const [text, setText] = useState(phrases[0]);
  const indexRef = useRef(0);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  const scrambleTo = useCallback(
    (next: string) => {
      const old = text;
      const length = Math.max(old.length, next.length);
      let frame = 0;
      const totalFrames = 28;

      const tick = () => {
        let output = "";
        const progress = frame / totalFrames;

        for (let i = 0; i < length; i++) {
          if (i < length * progress) {
            output += next[i] || "";
          } else {
            output += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setText(output);
        frame++;

        if (frame <= totalFrames) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setText(next);
        }
      };

      cancelAnimationFrame(rafRef.current!);
      tick();
    },
    [text],
  );

  useEffect(() => {
    const id = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % phrases.length;
      scrambleTo(phrases[indexRef.current]);
    }, interval);

    return () => {
      clearInterval(id);
      cancelAnimationFrame(rafRef.current!);
    };
  }, [phrases, interval, scrambleTo]);

  return <span className={className}>{text}</span>;
}
