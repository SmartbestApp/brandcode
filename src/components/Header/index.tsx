"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import GlossyIcon from "./GlossyIcon";
import { SiYoutube, SiFacebook, SiInstagram, SiTiktok, SiSnapchat } from "react-icons/si";

/* ========= Flowing gradient text ========= */
const FlowText: React.FC<{
  children: React.ReactNode;
  variant?: "gold" | "vibgyor";
  speedMs?: number;
  className?: string;
}> = ({ children, variant = "gold", speedMs = 1800, className = "" }) => {
  const gradient =
    variant === "gold"
      ? "linear-gradient(90deg,#8a6a2b 0%,#d6a84b 20%,#ffd36a 40%,#fff1b0 50%,#ffd36a 60%,#d6a84b 80%,#8a6a2b 100%)"
      : "linear-gradient(90deg,#ff0000 0%,#ff7f00 16%,#ffff00 33%,#00ff00 50%,#0000ff 66%,#4b0082 83%,#8b00ff 100%)";

  return (
    <span
      className={`relative inline-block font-medium ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 50%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        animation: `flow-x ${speedMs}ms linear infinite`,
        textShadow:
          variant === "gold" ? "0 0 6px rgba(255, 211, 106, .25)" : "0 0 6px rgba(139, 0, 255, .25)",
      }}
    >
      {children}
      <style jsx>{`
        @keyframes flow-x {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </span>
  );
};
/* ======================================== */

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [scrollPct, setScrollPct] = useState(0); // —— premium scroll progress
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);

  // Sticky + scroll progress
  useEffect(() => {
    const onScroll = () => {
      setStickyMenu(window.scrollY >= 80);
      const doc = document.documentElement;
      const h = doc.scrollHeight - doc.clientHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // categories dropdown
  const [catOpen, setCatOpen] = useState(false);
  const options = [
    { label: "All Categories", value: "0" },
    { label: "Desktop", value: "1" },
    { label: "Laptop", value: "2" },
    { label: "Monitor", value: "3" },
    { label: "Phone", value: "4" },
    { label: "Watch", value: "5" },
    { label: "Mouse", value: "6" },
    { label: "Tablet", value: "7" },
  ];
  const [selectedCat, setSelectedCat] = useState(options[0]);
  const catRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Simple, fast local search suggestions (keyboard-friendly)
  const searchWrapRef = useRef<HTMLDivElement | null>(null);
  const [showSuggest, setShowSuggest] = useState(false);
  const suggestionsData = useMemo(
    () => [
      "MacBook Pro M-series",
      "Gaming Laptop RTX",
      "4K IPS Monitor",
      "iPhone 15 Cases",
      "Noise Cancelling Headphones",
      "Mechanical Keyboard",
      "Smart Watch",
      "USB-C Hub",
      "Wireless Mouse",
      "Android Tablets",
    ],
    []
  );
  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return suggestionsData.filter((s) => s.toLowerCase().includes(q)).slice(0, 6);
  }, [searchQuery, suggestionsData]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setShowSuggest(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setShowSuggest(false);
  };

  const BG = {
    youtube: "linear-gradient(180deg,#ff3b3b 0%,#c40000 100%)",
    facebook: "linear-gradient(180deg,#1b86ff 0%,#0a52cc 100%)",
    snapchat: "linear-gradient(180deg,#fff86e 0%,#ffd400 100%)",
    tiktok: "linear-gradient(180deg,#2a2a2a 0%,#000000 100%)",
    instagram:
      "conic-gradient(from 200deg at 50% 50%, #feda75 0deg, #fa7e1e 90deg, #d62976 180deg, #962fbf 270deg, #4f5bd5 360deg)",
  };
  const GLOW = {
    youtube: "radial-gradient(40% 40% at 50% 50%, #ff3b3b55, transparent 70%)",
    facebook: "radial-gradient(40% 40% at 50% 50%, #1b86ff55, transparent 70%)",
    snapchat: "radial-gradient(40% 40% at 50% 50%, #ffd40066, transparent 70%)",
    tiktok:
      "radial-gradient(40% 40% at 50% 50%, #25f4ee55, transparent 55%), radial-gradient(40% 40% at 60% 60%, #fe2c5550, transparent 70%)",
    instagram:
      "radial-gradient(45% 45% at 50% 50%, #ff9f7a55, transparent 70%), radial-gradient(45% 45% at 60% 40%, #7a5cff55, transparent 70%)",
  };

  return (
    <header
      className={`fixed left-0 top-0 w-full z-[1000] transition-all duration-300 ${
        stickyMenu ? "bg-black/60 backdrop-blur-md border-b border-white/10" : "bg-black"
      }`}
    >
      <div className="max-w-[1270px] mx-auto px-3 sm:px-7.5 xl:px-0">
        {/* ===== TOP ROW ===== */}
        <div
          className={`flex flex-col lg:flex-row gap-5 items-end lg:items-center xl:justify-between ease-out duration-200 ${
            stickyMenu ? "py-3.5" : "py-3"
          } relative`}
        >
          {/* left (logo + search) */}
          <div className="xl:w-auto flex-col sm:flex-row w-full flex sm:justify-between sm:items-center gap-5 sm:gap-10">
            <Link className="flex-shrink-0" href="/">
              <Image src="/images/logo/logo.svg" alt="Logo" width={219} height={36} />
            </Link>

            {/* Two-pill search + suggestions */}
            <div className="w-full" ref={searchWrapRef}>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center gap-1">
                  {/* Categories pill */}
                  <div ref={catRef} className="relative shrink-0">
                    <button
                      type="button"
                      onClick={() => setCatOpen((v) => !v)}
                      className="h-8 rounded-full bg-gray-1 border border-gray-3 px-4 pl-5 pr-4 flex items-center gap-3 text-dark"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span className="font-medium">{selectedCat.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" className="ml-1 opacity-70">
                        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>

                    {/* Category dropdown */}
                    <ul
                      className={`absolute left-0 mt-2 min-w-[220px] rounded-md border border-gray-3 bg-white shadow-md z-[9999] ${
                        catOpen ? "block" : "hidden"
                      }`}
                      role="listbox"
                      aria-label="Categories"
                    >
                      {options.map((opt) => (
                        <li key={opt.value}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCat(opt);
                              setCatOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-2.5 text-sm hover:bg-gray-1 ${
                              selectedCat.value === opt.value ? "text-blue font-medium" : "text-dark"
                            }`}
                            role="option"
                            aria-selected={selectedCat.value === opt.value}
                          >
                            {opt.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Search pill + popover */}
                  <div className="relative flex-1 min-w-[250px] sm:min-w-[350px]">
                    <input
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggest(true);
                      }}
                      onFocus={() => setShowSuggest(true)}
                      onKeyDown={onSearchKey}
                      value={searchQuery}
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Find the Product…"
                      autoComplete="off"
                      className="h-8 w-full rounded-full bg-gray-1 border border-gray-3 pl-4 pr-10 text-dark outline-none placeholder:text-dark-4"
                    />
                    <button
                      aria-label="Search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/80 hover:text-blue transition"
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" className="fill-current">
                        <path d="M17.2687 15.6656L12.6281 11.8969C14.5406 9.28123 14.3437 5.5406 11.9531 3.1781C10.6875 1.91248 8.99995 1.20935 7.19995 1.20935C5.39995 1.20935 3.71245 1.91248 2.44683 3.1781C-0.168799 5.79373 -0.168799 10.0687 2.44683 12.6844C3.71245 13.95 5.39995 14.6531 7.19995 14.6531C8.91558 14.6531 10.5187 14.0062 11.7843 12.8531L16.4812 16.65C16.5937 16.7344 16.7343 16.7906 16.875 16.7906C17.0718 16.7906 17.2406 16.7062 17.3531 16.5656C17.5781 16.2844 17.55 15.8906 17.2687 15.6656ZM7.19995 13.3875C5.73745 13.3875 4.38745 12.825 3.34683 11.7844C1.20933 9.64685 1.20933 6.18748 3.34683 4.0781C4.38745 3.03748 5.73745 2.47498 7.19995 2.47498C8.66245 2.47498 10.0125 3.03748 11.0531 4.0781C13.1906 6.2156 13.1906 9.67498 11.0531 11.7844C10.0406 12.825 8.66245 13.3875 7.19995 13.3875Z" />
                      </svg>
                    </button>

                    {/* Suggestions */}
                    {showSuggest && filtered.length > 0 && (
                      <div className="absolute left-0 right-0 mt-2 rounded-lg border border-gray-3 bg-white shadow-lg z-[10000] overflow-hidden">
                        <ul className="py-1">
                          {filtered.map((item) => (
                            <li key={item}>
                              <Link
                                href={`/search?query=${encodeURIComponent(item)}`}
                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-1 text-[14px] text-dark"
                                onClick={() => setShowSuggest(false)}
                              >
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue/70" />
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* right (phone + socials) */}
          <div className="flex w-full lg:w-auto items-center gap-7.5">
            {/* phone (desktop) — exact SVG kept */}
            <div className="hidden xl:flex items-center gap-3.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.7177 3.09215C5.94388 1.80121 7.9721 2.04307 8.98569 3.47665L10.2467 5.26014C11.0574 6.4068 10.9889 8.00097 10.0214 9.01965L9.7765 9.27743C9.77582 9.27921 9.7751 9.28115 9.77436 9.28323C9.76142 9.31959 9.7287 9.43538 9.7609 9.65513C9.82765 10.1107 10.1793 11.0364 11.607 12.5394C13.0391 14.0472 13.9078 14.4025 14.3103 14.4679C14.484 14.4961 14.5748 14.4716 14.6038 14.4614L15.0124 14.0312C15.8862 13.1113 17.2485 12.9301 18.347 13.5623L20.2575 14.662C21.8904 15.6019 22.2705 17.9011 20.9655 19.275L19.545 20.7705C19.1016 21.2373 18.497 21.6358 17.75 21.7095C15.9261 21.8895 11.701 21.655 7.27161 16.9917C3.13844 12.6403 2.35326 8.85538 2.25401 7.00615L2.92011 6.9704L2.25401 7.00615C2.20497 6.09248 2.61224 5.30879 3.1481 4.74464L4.7177 3.09215ZM7.7609 4.34262C7.24855 3.61797 6.32812 3.57473 5.80528 4.12518L4.23568 5.77767C3.90429 6.12656 3.73042 6.52646 3.75185 6.92576C3.83289 8.43558 4.48307 11.8779 8.35919 15.9587C12.4234 20.2375 16.1676 20.3584 17.6026 20.2167C17.8864 20.1887 18.1783 20.0313 18.4574 19.7375L19.8779 18.2419C20.4907 17.5968 20.3301 16.4345 19.5092 15.962L17.5987 14.8624C17.086 14.5673 16.4854 14.6584 16.1 15.0642L15.6445 15.5437L15.1174 15.043C15.6445 15.5438 15.6438 15.5445 15.6432 15.5452L15.6417 15.5467L15.6388 15.5498L15.6324 15.5562L15.6181 15.5704C15.6078 15.5803 15.5959 15.5913 15.5825 15.6031C15.5556 15.6266 15.5223 15.6535 15.4824 15.6819C15.4022 15.7387 15.2955 15.8012 15.1606 15.8544C14.8846 15.9633 14.5201 16.0216 14.0699 15.9485C13.1923 15.806 12.0422 15.1757 10.5194 13.5724C8.99202 11.9644 8.40746 10.7647 8.27675 9.87259C8.21022 9.41852 8.26346 9.05492 8.36116 8.78035C8.40921 8.64533 8.46594 8.53766 8.51826 8.4559C8.54435 8.41514 8.56922 8.381 8.5912 8.35322C8.60219 8.33933 8.61246 8.32703 8.62182 8.31627L8.63514 8.30129L8.64125 8.29465L8.64415 8.29154L8.64556 8.29004C8.64625 8.28931 8.64694 8.28859 9.17861 8.79357L8.64695 8.28858L8.93376 7.98662C9.3793 7.51755 9.44403 6.72317 9.02189 6.1261L7.7609 4.34262Z"
                  fill="#ffffffff"
                />
                <path
                  d="M13.2595 1.88008C13.3257 1.47119 13.7122 1.19381 14.1211 1.26001C16.8286 2.2948 20.906 5.84541 22.1617 8.1675C22.8034 10.2716 22.5286 10.6741 22.1197 10.7403C21.712 10.8063 21.3279 10.5303 21.2601 10.1233C20.9934 9.2183 20.4084 7.94232 18.4695 5.53027C16.0575 3.20158 14.4362 2.88889 14.2038 2.82122C13.4793 2.67372 13.1935 2.2878 13.2595 1.88008Z"
                  fill="#ffffffff"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.4861 5.32955C13.5999 4.93128 14.015 4.70066 14.4133 4.81445L14.2072 5.53559C14.8262 4.97607 16.4275 5.98806 17.2124 6.77303C18.913 8.96016 19.0094 9.15923 19.1416 9.48199C19.2848 9.97047 19.0542 10.3856 18.6559 10.4994C18.261 10.6122 17.8496 10.3864 17.7317 9.99438C17.2544 9.10289 16.8517 8.53364 16.1518 7.83369C15.4518 7.13374 14.8826 6.73103 14.5058 6.50806C14.3172 6.39645 14.176 6.32935 14.0897 6.29235C14.0465 6.27383 14.0169 6.2628 14.0019 6.25747L13.9911 6.25377C13.599 6.13589 13.3733 5.72445 13.4861 5.32955Z"
                  fill="#ffffffff"
                />
              </svg>
              <div>
                <FlowText variant="gold" speedMs={1400} className="block text-2xs uppercase">
                  24/7 SUPPORT
                </FlowText>
                <p className="font-medium text-custom-sm text-white">(+971) 526991213</p>
              </div>
            </div>

            {/* social icons */}
            <nav
              aria-label="Social media"
              className={`absolute right-4 top-8 z-[100] xl:static items-center gap-3 sm:gap-4 ${
                navigationOpen ? "hidden" : "flex"
              }`}
            >
              <Link href="https://youtube.com/yourchannel" target="_blank" aria-label="YouTube" className="transition hover:-translate-y-0.5">
                <GlossyIcon bg={BG.youtube} glow={GLOW.youtube}>
                  <SiYoutube size={16} color="#fff" />
                </GlossyIcon>
              </Link>
              <Link href="https://www.facebook.com/share/19tEGdWGWy/?mibextid=wwXIfr" target="_blank" aria-label="Facebook" className="transition hover:-translate-y-0.5">
                <GlossyIcon bg={BG.facebook} glow={GLOW.facebook}>
                  <SiFacebook size={16} color="#fff" />
                </GlossyIcon>
              </Link>
              <Link href="https://www.instagram.com/brandcode_germany?igsh=amtqYm9pc295MnNm&utm_source=qr" target="_blank" aria-label="Instagram" className="transition hover:-translate-y-0.5">
                <GlossyIcon bg={BG.instagram} glow={GLOW.instagram}>
                  <SiInstagram size={15} color="#fff" />
                </GlossyIcon>
              </Link>
              <Link href="https://www.tiktok.com/@yourhandle" target="_blank" aria-label="TikTok" className="transition hover:-translate-y-0.5">
                <GlossyIcon bg={BG.tiktok} glow={GLOW.tiktok}>
                  <SiTiktok size={15} color="#fff" />
                </GlossyIcon>
              </Link>
              <Link href="https://www.tiktok.com/@brandcodegermany?_t=ZS-90AIFsTPV2K&_r=1" target="_blank" aria-label="Snapchat" className="transition hover:-translate-y-0.5">
                <GlossyIcon bg={BG.snapchat} glow={GLOW.snapchat}>
                  <SiSnapchat size={16} color="#000" />
                </GlossyIcon>
              </Link>
            </nav>

            {/* mobile hamburger */}
            <div className="flex w-full lg:w-auto justify-end items-center">
              <button
                aria-label="Toggler"
                aria-expanded={navigationOpen}
                className="xl:hidden block"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="block relative cursor-pointer w-6 h-6">
                  <span className="block bg-white h-0.5 w-6 my-1 rounded"></span>
                  <span className="block bg-white h-0.5 w-6 my-1 rounded"></span>
                  <span className="block bg-white h-0.5 w-6 my-1 rounded"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR (slim) ===== */}
      <div className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(246,248,255,0.96)_100%)] backdrop-blur-md">
        <div className="max-w-[710px] mx-auto px-4 sm:px-7.5 xl:px-7">
          <div className="relative flex items-center justify-between h-[44px]">
            {/* desktop nav */}
            <div className="hidden xl:flex items-center">
              <nav>
                <ul className="flex  items-center gap-5 leading-none">
                  {menuData.map((menuItem, i) =>
                    menuItem.submenu ? (
                      <Dropdown key={i} menuItem={menuItem} stickyMenu={stickyMenu} />
                    ) : (
                      <li key={i} className="group relative">
                        <Link
                          href={menuItem.path}
                          className="px-1 text-[15px] font-medium text-dark/90 hover:text-blue py-0 leading-none"
                        >
                          {menuItem.title}
                        </Link>
                        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-[6px] h-[2px] w-0 bg-blue/90 transition-all duration-300 group-hover:w-3/4 rounded-full" />
                      </li>
                    )
                  )}
                </ul>
              </nav>
            </div>

            {/* mobile drawer */}
            <div className={`xl:hidden fixed inset-0 z-[99998] ${navigationOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
              {/* backdrop */}
              <div
                className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${navigationOpen ? "opacity-100" : "opacity-0"}`}
                onClick={() => setNavigationOpen(false)}
                aria-hidden="true"
              />
              {/* panel */}
              <aside
                className={`absolute right-0 top-0 h-full w-[60%] max-w-[320px] bg-white shadow-2 transition-transform duration-300 ${
                  navigationOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="dialog"
                aria-modal="true"
              >
                {/* header (logo + close) */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-3">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setNavigationOpen(false)}>
                    <Image src="/images/logo/logo.svg" alt="Logo" width={219} height={26} />
                  </Link>
                  <button aria-label="Close" onClick={() => setNavigationOpen(false)} className="p-2 text-dark hover:text-blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>

                {/* phone row (mobile) */}
                <div className="px-5 py-4 border-b border-gray-3 flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.7177 3.09215C5.94388 1.80121 7.9721 2.04307 8.98569 3.47665L10.2467 5.26014C11.0574 6.4068 10.9889 8.00097 10.0214 9.01965L9.7765 9.27743C9.77582 9.27921 9.7751 9.28115 9.77436 9.28323C9.76142 9.31959 9.7287 9.43538 9.7609 9.65513C9.82765 10.1107 10.1793 11.0364 11.607 12.5394C13.0391 14.0472 13.9078 14.4025 14.3103 14.4679C14.484 14.4961 14.5748 14.4716 14.6038 14.4614L15.0124 14.0312C15.8862 13.1113 17.2485 12.9301 18.347 13.5623L20.2575 14.662C21.8904 15.6019 22.2705 17.9011 20.9655 19.275L19.545 20.7705C19.1016 21.2373 18.497 21.6358 17.75 21.7095C15.9261 21.8895 11.701 21.655 7.27161 16.9917C3.13844 12.6403 2.35326 8.85538 2.25401 7.00615L2.92011 6.9704L2.25401 7.00615C2.20497 6.09248 2.61224 5.30879 3.1481 4.74464L4.7177 3.09215Z"
                      fill="#111827"
                    />
                    <path
                      d="M13.2595 1.88008C13.3257 1.47119 13.7122 1.19381 14.1211 1.26001C16.8286 2.2948 20.906 5.84541 22.1617 8.1675C22.8034 10.2716 22.5286 10.6741 22.1197 10.7403C21.712 10.8063 21.3279 10.5303 21.2601 10.1233C20.9934 9.2183 20.4084 7.94232 18.4695 5.53027C16.0575 3.20158 14.4362 2.88889 14.2038 2.82122C13.4793 2.67372 13.1935 2.2878 13.2595 1.88008Z"
                      fill="#111827"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.4861 5.32955C13.5999 4.93128 14.015 4.70066 14.4133 4.81445L14.2072 5.53559C14.8262 4.97607 16.4275 5.98806 17.2124 6.77303C18.913 8.96016 19.0094 9.15923 19.1416 9.48199C19.2848 9.97047 19.0542 10.3856 18.6559 10.4994C18.261 10.6122 17.8496 10.3864 17.7317 9.99438C17.2544 9.10289 16.8517 8.53364 16.1518 7.83369C15.4518 7.13374 14.8826 6.73103 14.5058 6.50806C14.3172 6.39645 14.176 6.32935 14.0897 6.29235C14.0465 6.27383 14.0169 6.2628 14.0019 6.25747L13.9911 6.25377C13.599 6.13589 13.3733 5.72445 13.4861 5.32955Z"
                      fill="#111827"
                    />
                  </svg>

                  <div>
                    <span className="block text-2xs uppercase text-dark/70">24/7 SUPPORT</span>
                    <p className="font-medium text-custom-sm text-dark">(+971) 526991213</p>
                  </div>
                </div>

                {/* menu items */}
                <nav
                  className="px-5 py-4"
                  onClickCapture={(e) => {
                    const a = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
                    if (!a) return;
                    const href = a.getAttribute("href") || "";
                    const keep = a.getAttribute("data-keep-drawer") === "true";
                    const isHash = href === "#" || href.startsWith("#");
                    const isButtonish = a.getAttribute("role") === "button" || a.hasAttribute("aria-expanded");
                    if (keep || isHash || isButtonish) return;
                    setNavigationOpen(false);
                  }}
                >
                  <ul className="flex flex-col gap-6">
                    {menuData.map((menuItem, i) =>
                      menuItem.submenu ? (
                        <Dropdown key={i} menuItem={menuItem} stickyMenu={false} />
                      ) : (
                        <li key={i}>
                          <Link
                            href={menuItem.path}
                            className="block py-1 text-custom-sm font-medium text-dark hover:text-blue"
                            onClick={() => setNavigationOpen(false)}
                          >
                            {menuItem.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </aside>
            </div>

            {/* right side (desktop “Recently Viewed / Wishlist”) */}
            <div className="hidden xl:block">
              <ul className="flex items-center gap-5.5 leading-none">
                <li className="py-0">
                  <a href="#" className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue">
                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M2.45313 7.55556H1.70313V7.55556L2.45313 7.55556ZM2.45313 8.66667L1.92488 9.19908C2.21729 9.4892 2.68896 9.4892 2.98137 9.19908L2.45313 8.66667Z" />
                    </svg>
                    Recently Viewed
                  </a>
                </li>
                <li className="py-0">
                  <Link href="/wishlist" className="flex items-center gap-1.5 font-medium text-custom-sm text-dark hover:text-blue">
                    <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16">
                      <path d="M5.97441 12.6073L6.43872 12.0183L5.97441 12.6073Z" />
                    </svg>
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* —— premium: thin scroll progress indicator under the nav —— */}
        <div className="h-[2px] w-full bg-transparent">
          <div
            className="h-[2px] bg-gradient-to-r from-blue-500 via-sky-400 to-purple-500 transition-[width] duration-150"
            style={{ width: `${scrollPct}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
