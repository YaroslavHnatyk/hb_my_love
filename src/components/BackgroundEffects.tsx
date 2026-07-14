"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const PARTICLE_COUNT = 16;
const HEART_COUNT = 14;
const SPARKLE_COUNT = 20;

function seeded(count: number, factor: number) {
  return Array.from({ length: count }, (_, i) => {
    const seed = i * factor + 13;
    return {
      id: i,
      left: (seed * 9.7) % 100,
      size: 2 + ((seed * 3.3) % 5),
      duration: 15 + ((seed * 1.7) % 13),
      delay: (seed % 10) * -1.3,
    };
  });
}

function seededHearts() {
  return Array.from({ length: HEART_COUNT }, (_, i) => {
    const seed = i * 53.17 + 7;
    return {
      id: i,
      left: (seed * 7.1) % 100,
      size: 10 + ((seed * 2.1) % 18),
      duration: 17 + ((seed * 2.3) % 15),
      delay: (seed % 12) * -1.5,
      drift: ((seed % 7) - 3) * 9,
      opacity: 0.3 + ((seed % 5) * 0.09),
      tone: i % 3 === 0 ? "text-gold-warm" : "text-rose",
    };
  });
}

function seededSparkles() {
  return Array.from({ length: SPARKLE_COUNT }, (_, i) => {
    const seed = i * 21.7 + 5;
    return {
      id: i,
      left: (seed * 7.1) % 100,
      top: (seed * 13.3) % 100,
      size: 2.5 + ((seed * 1.9) % 3),
      delay: (seed % 10) * 0.35,
      tone: i % 2 === 0 ? "bg-gold" : "bg-rose-deep",
    };
  });
}

export default function BackgroundEffects() {
  const particles = useMemo(() => seeded(PARTICLE_COUNT, 37.61), []);
  const hearts = useMemo(seededHearts, []);
  const sparkles = useMemo(seededSparkles, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(229,139,166,0.12),transparent_70%)]" />

      {sparkles.map((s) => (
        <span
          key={`sparkle-${s.id}`}
          className={`animate-twinkle absolute rounded-full ${s.tone}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 8px 2px rgba(212,175,55,0.5)",
          }}
        />
      ))}

      {particles.map((p) => (
        <motion.span
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-rose shadow-[0_0_10px_3px_rgba(229,139,166,0.45)]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 0.85, 0.85, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {hearts.map((h) => (
        <motion.span
          key={`heart-${h.id}`}
          className={`absolute ${h.tone}`}
          style={{ left: `${h.left}%`, opacity: h.opacity }}
          initial={{ y: "115vh", x: 0, opacity: 0, rotate: -8 }}
          animate={{
            y: "-15vh",
            x: [0, h.drift, 0],
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width={h.size}
            height={h.size}
            className="drop-shadow-[0_0_6px_rgba(229,139,166,0.5)]"
          >
            <path d="M12 20.5s-7.5-4.7-9.5-9.2C1.2 8 3 5.2 6 5.2c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3 0 4.8 2.8 3.5 5.1-2 4.5-9.5 10.2-9.5 10.2Z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
