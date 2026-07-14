"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import type { GalleryImage } from "@/lib/images";

interface HeroProps {
  heroImage: GalleryImage | null;
}

export default function Hero({ heroImage }: HeroProps) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!frameRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frameRef.current,
        { y: 30, scale: 0.94, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      gsap.to(frameRef.current, {
        y: -16,
        duration: 4.5,
        delay: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blush/70 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-gold-light/50 blur-[90px]"
      />

      <motion.p
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="mb-6 flex items-center gap-2 font-body text-xs uppercase tracking-[0.45em] text-rose/90"
      >
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-rose"
        >
          ❤
        </motion.span>
        З любов&rsquo;ю створено для тебе
        <motion.span
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="text-rose"
        >
          ❤
        </motion.span>
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: "easeOut" }}
        className="max-w-4xl font-display text-4xl font-semibold leading-tight text-gradient-gold sm:text-5xl md:text-6xl"
      >
        З днем народження, моя маленька дівчинка ❤️
      </motion.h1>

      <motion.div
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mt-16 w-full max-w-sm sm:max-w-md"
      >
        <div
          ref={frameRef}
          className="glow-gold glass relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]"
        >
          {heroImage ? (
            <Image
              src={heroImage.src}
              alt="Головне фото"
              fill
              priority
              sizes="(max-width: 640px) 90vw, 420px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-dashed border-rose/40 p-8 text-rose-deep/80">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <HeartFrameIcon className="h-10 w-10" />
              </motion.div>
              <p className="font-display text-lg italic">
                Тут зʼявиться твоя фотографія
              </p>
              <p className="max-w-[220px] text-xs text-ink/50">
                Додай файл hero.jpg у папку public/images
              </p>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/50" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 max-w-xl font-display text-lg italic leading-relaxed text-ink/80 sm:text-xl"
      >
        Сьогодні день, коли світ отримав найдорожчу людину для мене.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-rose-deep/60"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">
          Гортай далі
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-8 w-px bg-gradient-to-b from-rose to-transparent"
        />
      </motion.div>
    </section>
  );
}

function HeartFrameIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7.5-4.7-9.5-9.2C1.2 7.8 3 5 6 5c2 0 3.3 1.2 4 2.3C10.7 6.2 12 5 14 5c3 0 4.8 2.8 3.5 5.8C15.5 15.3 12 20 12 20Z"
      />
    </svg>
  );
}
