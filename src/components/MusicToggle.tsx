"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/music.mp3" loop preload="none" />
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={
          isPlaying ? "Вимкнути фонову музику" : "Увімкнути фонову музику"
        }
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="glass glow-rose fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-rose-deep shadow-lg shadow-rose-deep/20"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          {isPlaying ? (
            <NoteIcon className="h-5 w-5" />
          ) : (
            <MutedNoteIcon className="h-5 w-5" />
          )}
          {isPlaying && (
            <motion.span
              className="absolute inset-0 -z-10 rounded-full bg-rose/30"
              animate={{ scale: [1, 1.9], opacity: [0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </span>
      </motion.button>
    </>
  );
}

function NoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <path
        d="M9 18V5.6a1 1 0 0 1 .78-.98l8-1.78A1 1 0 0 1 19 3.8V16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  );
}

function MutedNoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className={className}
    >
      <path
        d="M9 18V5.6a1 1 0 0 1 .78-.98l8-1.78A1 1 0 0 1 19 3.8V16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
      <path d="M3 3 21 21" strokeLinecap="round" />
    </svg>
  );
}
