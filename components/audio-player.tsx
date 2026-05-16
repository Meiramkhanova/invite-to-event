"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-4 left-4 z-50">
        <motion.button
          onClick={toggleAudio}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-card text-primary">
            {isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} className="ml-0.5" />
            )}
          </span>
          <div className="flex items-center gap-0.5">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-primary-foreground rounded-full"
                animate={
                  isPlaying
                    ? {
                        height: [8, 16, 8],
                        transition: {
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.05,
                        },
                      }
                    : { height: 8 }
                }
              />
            ))}
          </div>
        </motion.button>
      </motion.div>
    </>
  );
}
