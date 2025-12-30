"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type EncryptedTextProps = {
  text: string;
  className?: string;
  revealDelayMs?: number;
  charset?: string;
  flipDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "IAYBDERREWOPROTCETEDDUARFIAYBDERREWOPROTCETEDDUARF";

const rand = (s: string) => s[Math.floor(Math.random() * s.length)];

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  const [mounted, setMounted] = useState(false);
  const [reveal, setReveal] = useState(0);
  const scramble = useRef<string[]>([]);
  const raf = useRef<number | null>(null);
  const start = useRef(0);
  const lastFlip = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    scramble.current = text.split("").map(c => c === " " ? " " : rand(charset));
    start.current = performance.now();
    lastFlip.current = start.current;
    setReveal(0);

    const animate = (t: number) => {
      const elapsed = t - start.current;
      const count = Math.min(text.length, Math.floor(elapsed / revealDelayMs));
      setReveal(count);

      if (t - lastFlip.current > flipDelayMs) {
        for (let i = count; i < text.length; i++) {
          scramble.current[i] = text[i] === " " ? " " : rand(charset);
        }
        lastFlip.current = t;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [mounted, text, revealDelayMs, flipDelayMs, charset]);

  if (!mounted) return null;

  return (
    <motion.span ref={ref} className={cn(className)} aria-label={text} role="text">
      {text.split("").map((c, i) => (
        <span key={i} className={cn(i < reveal ? revealedClassName : encryptedClassName)}>
          {i < reveal ? c : scramble.current[i] ?? c}
        </span>
      ))}
    </motion.span>
  );
};
