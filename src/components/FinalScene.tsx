"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const ORBIT_HEARTS = [
  { top: "6%", left: "10%", size: 16, delay: 0 },
  { top: "14%", left: "84%", size: 12, delay: 0.6 },
  { top: "66%", left: "6%", size: 14, delay: 1.1 },
  { top: "72%", left: "90%", size: 18, delay: 0.3 },
  { top: "38%", left: "3%", size: 10, delay: 1.6 },
  { top: "32%", left: "96%", size: 10, delay: 0.9 },
  { top: "88%", left: "22%", size: 12, delay: 1.9 },
  { top: "84%", left: "72%", size: 14, delay: 0.5 },
  { top: "4%", left: "45%", size: 11, delay: 1.3 },
];

const PETAL_COUNT = 11;

function seededPetals() {
  return Array.from({ length: PETAL_COUNT }, (_, i) => {
    const seed = i * 41.3 + 9;
    return {
      id: i,
      left: (seed * 8.7) % 100,
      size: 12 + ((seed * 2.1) % 12),
      duration: 10 + ((seed * 1.6) % 9),
      delay: (seed % 8) * -1.1,
      drift: ((seed % 6) - 3) * 12,
      rotate: (seed % 5) * 60,
    };
  });
}

export default function FinalScene() {
  const heartRef = useRef<SVGSVGElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const petals = useMemo(seededPetals, []);

  useEffect(() => {
    if (!heartRef.current || !glowRef.current) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ repeat: -1, repeatDelay: 0.6 })
        .to(heartRef.current, {
          scale: 1.12,
          duration: 0.35,
          ease: "power1.out",
        })
        .to(heartRef.current, {
          scale: 1,
          duration: 0.35,
          ease: "power1.in",
        })
        .to(heartRef.current, {
          scale: 1.08,
          duration: 0.3,
          ease: "power1.out",
        })
        .to(heartRef.current, {
          scale: 1,
          duration: 0.4,
          ease: "power1.in",
        });

      gsap.to(glowRef.current, {
        opacity: 0.95,
        scale: 1.3,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="final"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_35%,rgba(251,220,230,0.9),transparent_65%)]"
      />

      {petals.map((p) => (
        <motion.span
          key={`petal-${p.id}`}
          aria-hidden
          className="pointer-events-none absolute bg-gradient-to-br from-rose-soft to-rose"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            borderRadius: "0% 100% 0% 100%",
          }}
          initial={{ y: "-10vh", opacity: 0, rotate: p.rotate }}
          animate={{
            y: "110vh",
            x: [0, p.drift, 0, -p.drift, 0],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [p.rotate, p.rotate + 180, p.rotate + 360],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {ORBIT_HEARTS.map((h, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-rose"
          style={{ top: h.top, left: h.left }}
          animate={{ y: [0, -18, 0], opacity: [0.35, 0.85, 0.35] }}
          transition={{
            duration: 5 + i,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width={h.size}
            height={h.size}
            className="drop-shadow-[0_0_10px_rgba(229,139,166,0.6)]"
          >
            <path d="M12 20.5s-7.5-4.7-9.5-9.2C1.2 8 3 5.2 6 5.2c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3 0 4.8 2.8 3.5 5.1-2 4.5-9.5 10.2-9.5 10.2Z" />
          </svg>
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative mb-14 flex items-center justify-center"
      >
        <div
          ref={glowRef}
          className="absolute h-64 w-64 rounded-full bg-rose/50 opacity-70 blur-3xl sm:h-80 sm:w-80"
        />
        <div className="absolute h-44 w-44 rounded-full bg-gold/40 opacity-80 blur-2xl sm:h-56 sm:w-56" />
        <svg
          ref={heartRef}
          viewBox="0 0 24 24"
          className="relative h-28 w-28 drop-shadow-[0_10px_35px_rgba(177,74,110,0.45)] sm:h-36 sm:w-36"
          style={{ transformOrigin: "center" }}
        >
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-rose-soft)" />
              <stop offset="45%" stopColor="var(--color-gold-light)" />
              <stop offset="75%" stopColor="var(--color-rose)" />
              <stop offset="100%" stopColor="var(--color-gold)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#heartGradient)"
            d="M12 20.5s-7.5-4.7-9.5-9.2C1.2 8 3 5.2 6 5.2c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3 0 4.8 2.8 3.5 5.1-2 4.5-9.5 10.2-9.5 10.2Z"
          />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl font-display text-3xl leading-snug text-gradient-gold sm:text-4xl md:text-5xl"
      >
        Я кохаю тебе дуже сильно, Сонечко ❤️
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-7 max-w-xl font-display text-xl italic text-ink/80 sm:text-2xl"
      >
        З днем народження, моя маленька дівчинка.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.45 }}
        whileHover={{ y: -3 }}
        className="glass glow-gold mt-20 rounded-[2.25rem] px-10 py-9 sm:px-14"
      >
        <p className="font-display text-lg italic leading-relaxed text-ink/80 sm:text-xl">
          Дякую, що ти є.
        </p>
        <p className="mt-3 font-display text-lg text-gradient-gold sm:text-xl">
          Твій Хлопчик ❤️
        </p>
      </motion.div>
    </section>
  );
}
