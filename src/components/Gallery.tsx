"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { GalleryImage } from "@/lib/images";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-gallery-card]");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.94, rotate: -1.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [images.length]);

  return (
    <section
      id="gallery"
      className="relative w-full px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-rose-deep/80">
            Наші миті
          </p>
          <h2 className="font-display text-3xl text-gradient-gold sm:text-4xl">
            Кожен кадр — маленьке диво
          </h2>
          <div className="divider-gold mx-auto mt-8 w-24" />
        </motion.div>

        {images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-[2rem] border border-dashed border-rose/30 p-12 text-center text-ink/60"
          >
            <p className="font-display text-xl italic text-rose-deep">
              Галерея ще порожня
            </p>
            <p className="text-sm">
              Додай фотографії у папку public/images — вони зʼявляться тут
              автоматично.
            </p>
          </motion.div>
        ) : (
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3"
          >
            {images.map((image, i) => (
              <motion.button
                key={image.src}
                type="button"
                data-gallery-card
                onClick={() => setActive(image)}
                whileHover={{ scale: 1.035, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`glass group relative overflow-hidden rounded-[1.75rem] shadow-[0_18px_45px_-20px_rgba(122,31,61,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose ${
                  i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  loading={i < 3 ? "eager" : "lazy"}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 320px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="pointer-events-none absolute bottom-3 right-3 text-lg text-cream opacity-0 drop-shadow-[0_0_6px_rgba(0,0,0,0.35)] transition-opacity duration-500 group-hover:opacity-100"
                >
                  ❤
                </motion.span>
                <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/50" />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-deep/35 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="glow-rose glass relative max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-[2rem]"
            >
              <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
                <Image
                  src={active.src}
                  alt={active.name}
                  fill
                  sizes="90vw"
                  className="object-contain sm:object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Закрити"
                className="glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-rose-deep transition-transform hover:scale-110"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
