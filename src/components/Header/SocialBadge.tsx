"use client";
import { type IconType } from "react-icons";

type Props = {
  href: string;
  label: string;
  Icon: IconType;
  /** solid bg OR leave undefined and pass gradient */
  bg?: string;
  /** css gradient string (e.g. instagram) */
  gradient?: string;
  /** icon color */
  iconColor?: string;
};

export default function Social3DBadge({
  href,
  label,
  Icon,
  bg = "#000",
  gradient,
  iconColor = "#fff",
}: Props) {
  // conic rim for bevel
  const rim = `conic-gradient(
    from 180deg at 50% 50%,
    rgba(255,255,255,.55) 0deg,
    rgba(255,255,255,.15) 60deg,
    rgba(0,0,0,.2) 180deg,
    rgba(255,255,255,.15) 300deg,
    rgba(255,255,255,.55) 360deg
  )`;

  const innerBg = gradient
    ? { backgroundImage: gradient }
    : { backgroundColor: bg };

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="
        group inline-flex
        h-8 w-8
        items-center justify-center
        rounded-full
        ring-1 ring-white/15
        transition-transform duration-300 ease-out
        [perspective:600px]
        hover:-translate-y-0.5 hover:rotate-[1deg]
      "
      style={{
        // outer glossy rim + soft drop shadow
        boxShadow:
          "inset 0 2px 0 rgba(255,255,255,.25), 0 12px 24px rgba(0,0,0,.25)",
        backgroundImage: rim,
      }}
    >
      {/* inner disc (actual brand color/gradient) */}
      <span
        className="absolute inset-[2px] rounded-full"
        style={innerBg as React.CSSProperties}
      />

      {/* top glossy highlight */}
      <span className="
        pointer-events-none absolute left-1/2 -translate-x-1/2 -top-0.5
        h-[55%] w-[84%] rounded-b-full
        bg-white/18 blur-[2px] opacity-90
        group-hover:opacity-100 transition
      " />

      {/* soft inner shadow for depth */}
      <span
        className="
          pointer-events-none absolute inset-[2px] rounded-full
        "
        style={{
          boxShadow:
            "inset 0 -12px 24px rgba(0,0,0,.18), inset 0 2px 6px rgba(255,255,255,.25)",
        }}
      />

      {/* the icon itself */}
      <Icon size={14} color={iconColor} className="relative z-10" />
    </a>
  );
}
