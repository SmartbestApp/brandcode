"use client";
import { ReactNode } from "react";

/**
 * 3D glossy round icon:
 * - gradient background (gives depth)
 * - soft outer drop-shadow + subtle inner shadow
 * - glassy highlight on top half
 * - optional ambient glow behind (for neon vibes)
 */
export default function GlossyIcon({
  bg,          // background gradient or solid color
  glow,        // optional outer glow gradient/color
  size = 31,   // diameter in px
  children,    // the icon (react-icons)
  ring = true, // thin white ring
}: {
  bg: string;
  glow?: string;
  size?: number;
  ring?: boolean;
  children: ReactNode;
}) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      {/* Ambient glow behind */}
      {glow && (
        <span
          className="absolute -inset-[8px] rounded-full blur-[10px] opacity-60"
          style={{ background: glow }}
        />
      )}

      {/* Main badge with gradient + soft drop shadow */}
      <span
        className="absolute inset-0 rounded-full shadow-[0_10px_18px_rgba(0,0,0,0.25)]"
        style={{ background: bg }}
      />

      {/* Optional subtle ring to separate from dark headers */}
      {ring && (
        <span className="absolute inset-0 rounded-full border border-white/25" />
      )}

      {/* Inner tint for depth */}
      <span className="absolute inset-[1px] rounded-full bg-black/5" />

      {/* Glossy highlight (top glass) */}
      <span className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/70 to-white/0 opacity-70" />

      {/* Bottom bounce light */}
      <span className="absolute bottom-0 left-0 right-0 h-1/3 rounded-b-full bg-white/10 opacity-20" />

      {/* Icon */}
      <span className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </span>
    </span>
  );
}
