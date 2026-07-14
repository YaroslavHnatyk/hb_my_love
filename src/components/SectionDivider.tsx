"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative flex w-full items-center justify-center py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center gap-4"
      >
        <span className="divider-gold h-px w-16 sm:w-28" />
        <motion.svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4 text-rose drop-shadow-[0_0_8px_rgba(232,169,189,0.7)]"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 20.5s-7.5-4.7-9.5-9.2C1.2 8 3 5.2 6 5.2c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3 0 4.8 2.8 3.5 5.1-2 4.5-9.5 10.2-9.5 10.2Z" />
        </motion.svg>
        <span className="divider-gold h-px w-16 sm:w-28" />
      </motion.div>
    </div>
  );
}
