"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, HeartOff } from "lucide-react";
import Link from "next/link";

interface RSVPBottomBarProps {
  isVisible: boolean;
}

export function RSVPBottomBar({ isVisible }: RSVPBottomBarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 200, opacity: 0 }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.8,
          }}
          className="fixed bottom-0 left-0 right-0 z-50">
          {/* Gradient fade */}
          <div className="h-8 bg-gradient-to-t from-card/95 to-transparent" />

          {/* Main bar */}
          <div className="bg-card/95 backdrop-blur-lg border-t border-border/50 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]">
            <div className="max-w-lg mx-auto px-4 py-5">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="bg-background rounded-3xl p-6 border border-border shadow-sm">
                {/* Header */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-center mb-5">
                  <h3 className="font-serif text-2xl italic text-foreground mb-1.5">
                    Қатысуды растау
                  </h3>
                  <p className="uppercase tracking-[0.15em] text-muted-foreground text-[11px]">
                    Тойға келуіңізді растауыңызды сұраймыз
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex gap-3">
                  <Link href="/rsvp?status=attending" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="w-full h-full flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-5 py-3.5 rounded-2xl font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                      <Heart className="w-4 h-4" />
                      <span>КЕЛЕМІН</span>
                    </motion.button>
                  </Link>

                  <Link href="/rsvp?status=not-attending" className="flex-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="w-full flex items-center justify-center gap-2.5 bg-background text-foreground border-2 border-border px-5 py-3.5 rounded-2xl font-medium text-sm hover:bg-secondary hover:border-secondary transition-colors">
                      <HeartOff className="w-4 h-4" />
                      <span>КЕЛЕ АЛМАЙМЫН</span>
                    </motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
