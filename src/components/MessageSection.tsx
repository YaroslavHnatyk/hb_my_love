"use client";

import { motion, type Variants } from "framer-motion";

interface MessageSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  greeting?: string;
  paragraphs: string[];
}

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function MessageSection({
  id,
  eyebrow,
  title,
  greeting,
  paragraphs,
}: MessageSectionProps) {
  return (
    <section
      id={id}
      className="relative w-full px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7 }}
          className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-rose-deep/80"
        >
          {eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-3xl text-gradient-gold sm:text-4xl"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="divider-gold mx-auto mt-6 w-20"
        />

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.4 }}
          className="glass glow-rose mt-12 rounded-[2.25rem] px-7 py-12 sm:px-14 sm:py-14"
        >
          {greeting && (
            <motion.p
              variants={itemVariants}
              className="mb-7 font-display text-2xl italic text-gradient-gold sm:text-3xl"
            >
              {greeting}
            </motion.p>
          )}
          <div className="space-y-5">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
                className="font-body text-base leading-loose text-ink/80 sm:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
