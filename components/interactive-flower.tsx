"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface InteractiveFlowerProps {
  className?: string;
  variant?: "large" | "medium" | "small";
}

export function InteractiveFlower({
  className = "",
  variant = "large",
}: InteractiveFlowerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizes = {
    large: { petals: 8, petalRx: 20, petalRy: 10, centerR: 12 },
    medium: { petals: 6, petalRx: 15, petalRy: 8, centerR: 10 },
    small: { petals: 6, petalRx: 12, petalRy: 6, centerR: 8 },
  };

  const { petals, petalRx, petalRy, centerR } = sizes[variant];
  const petalAngles = Array.from(
    { length: petals },
    (_, i) => (360 / petals) * i,
  );

  return (
    <motion.div
      className={`pointer-events-auto cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsHovered(true)}
      onTap={() => setTimeout(() => setIsHovered(false), 500)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <svg viewBox="0 0 200 200" className="w-full h-auto">
        <motion.g
          animate={isHovered ? { rotate: 8 } : { rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "100px 150px" }}>
          {/* Stem */}
          <motion.path
            d="M100 200 Q95 170 100 140 Q105 110 95 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/40"
            animate={isHovered ? { strokeWidth: 2.5 } : { strokeWidth: 2 }}
          />

          {/* Left leaf */}
          <motion.path
            d="M100 160 Q120 150 130 160 Q120 165 100 160"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground/40"
            animate={
              isHovered
                ? {
                    d: "M100 160 Q125 142 140 158 Q122 172 100 160",
                    strokeWidth: 2,
                  }
                : {}
            }
            transition={{ duration: 0.4 }}
          />

          {/* Right leaf */}
          <motion.path
            d="M100 140 Q80 130 70 140 Q80 145 100 140"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground/40"
            animate={
              isHovered
                ? {
                    d: "M100 140 Q72 122 60 138 Q78 152 100 140",
                    strokeWidth: 2,
                  }
                : {}
            }
            transition={{ duration: 0.4 }}
          />

          {/* Flower petals */}
          {petalAngles.map((angle, i) => (
            <motion.ellipse
              key={angle}
              cx="95"
              cy="60"
              rx={petalRx}
              ry={petalRy}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground/50"
              style={{
                transformOrigin: "95px 80px",
                transform: `rotate(${angle}deg)`,
              }}
              animate={
                isHovered
                  ? {
                      rx: petalRx + 8,
                      ry: petalRy + 4,
                      strokeWidth: 2,
                    }
                  : {
                      rx: petalRx,
                      ry: petalRy,
                      strokeWidth: 1.5,
                    }
              }
              transition={{ duration: 0.4, delay: i * 0.03 }}
            />
          ))}

          {/* Flower center */}
          <motion.circle
            cx="95"
            cy="80"
            r={centerR}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-foreground/60"
            animate={
              isHovered
                ? { r: centerR + 3, strokeWidth: 2.5 }
                : { r: centerR, strokeWidth: 2 }
            }
            transition={{ duration: 0.3 }}
          />

          {/* Inner center detail */}
          <motion.circle
            cx="95"
            cy="80"
            r={centerR / 2}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-foreground/40"
            animate={isHovered ? { r: centerR / 2 + 1.5 } : { r: centerR / 2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.g>

        {/* Second smaller flower */}
        {variant === "large" && (
          <motion.g
            animate={isHovered ? { rotate: -6 } : { rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "150px 120px" }}>
            <motion.path
              d="M140 200 Q145 170 140 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground/30"
            />

            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.ellipse
                key={`small-${angle}`}
                cx="140"
                cy="130"
                rx="12"
                ry="6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground/40"
                style={{
                  transformOrigin: "140px 140px",
                  transform: `rotate(${angle}deg)`,
                }}
                animate={
                  isHovered
                    ? {
                        rx: 16,
                        ry: 8,
                      }
                    : {
                        rx: 12,
                        ry: 6,
                      }
                }
                transition={{ duration: 0.4, delay: i * 0.02 }}
              />
            ))}

            <motion.circle
              cx="140"
              cy="140"
              r="8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground/50"
              animate={isHovered ? { r: 10 } : { r: 8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}

// Static floral decoration for backgrounds
export function FloralDecoration({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 -scale-x-100",
    "bottom-left": "bottom-0 left-0 -scale-y-100",
    "bottom-right": "bottom-0 right-0 -scale-x-100 -scale-y-100",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} w-32 h-32 opacity-20 pointer-events-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M0 0 Q30 20 20 50 Q25 30 50 25 Q30 30 25 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground"
        />
        <path
          d="M10 10 Q25 25 20 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground"
        />
        <circle
          cx="20"
          cy="45"
          r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-foreground"
        />
      </svg>
    </div>
  );
}

// Static floral SVG for backgrounds
export function FloralSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`text-foreground ${className}`}>
      <g>
        <path
          d="M100 200 Q95 170 100 140 Q105 110 95 80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M100 160 Q120 150 130 160 Q120 165 100 160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M100 140 Q80 130 70 140 Q80 145 100 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="95"
            cy="60"
            rx="20"
            ry="10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{
              transformOrigin: "95px 80px",
              transform: `rotate(${angle}deg)`,
            }}
          />
        ))}
        <circle
          cx="95"
          cy="80"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="95"
          cy="80"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
