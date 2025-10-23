"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { useEffect, useState } from "react";

// You can mix image + video slides:
const slides: Array<
  | {
      type?: "image";
      img: string;            // desktop master (e.g., 2560x1280 or 2560x1440)
      mobileImg?: string;     // optional mobile-optimized crop (e.g., 1080x1440)
      heading: string;
      sub: string;
      cta?: { label: string; href: string };
    }
  | {
      type: "video";
      video: string;          // MP4 source
      webm?: string;          // optional WebM source
      poster: string;         // poster image (1920x1080 recommended)
      heading: string;
      sub: string;
      cta?: { label: string; href: string };
    }
> = [
  {
    img: "/images/hero/hero-01@2x.jpg",
    mobileImg: "/images/hero/hero-01-mobile@2x.webp",
    heading: "Master the Sound",
    sub: "True Wireless Noise Cancelling",
    cta: { label: "Shop Now", href: "#" },
  },
   {
    img: "/images/hero/ero-02@2x.jpg",
    mobileImg: "/images/hero/hero-01-mobile@2x.webp",
    heading: "Master the Sound",
    sub: "True Wireless Noise Cancelling",
    cta: { label: "Shop Now", href: "#" },
  },
  {
    type: "video",
    video: "/videos/iphone-14-hero.mp4",
    webm: "/videos/iphone-14-hero.webm",
    poster: "/videos/iphone-14-hero-poster.jpg",
    heading: "iPhone 14 Plus & 14 Pro Max",
    sub: "Limited Time Offer",
    cta: { label: "Explore", href: "#" },
  },
];

const HeroCarousel = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640); // sm breakpoint
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="hero-carousel"
      >
        {slides.map((s, idx) => {
          const isVideo = s.type === "video";
          return (
            <SwiperSlide key={idx}>
              <div className="relative w-full min-h-[60vh] sm:min-h-[72vh] lg:min-h-[82vh]">
                {/* Background media */}
                <div className="absolute inset-0">
                  {isVideo ? (
                    <video
                      className="h-full w-full object-cover object-left-center"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={(s as any).poster}
                    >
                      {(s as any).webm && <source src={(s as any).webm} type="video/webm" />}
                      <source src={(s as any).video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={
                        !isVideo && (s as any).mobileImg && isMobile
                          ? (s as any).mobileImg
                          : (s as any).img
                      }
                      alt={(s as any).heading}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      className="object-cover object-left-center"
                    />
                  )}
                  {/* vignette overlay to help contrast */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/35" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full max-w-[1200px] mx-auto px-4 sm:px-8">
                  <div className="flex flex-col items-start justify-center min-h-[60vh] sm:min-h-[72vh] lg:min-h-[82vh] py-10 sm:py-14 lg:py-20 pb-24">
                    <p className="text-white/80 tracking-widest uppercase text-xs sm:text-sm mb-2">
                      {(s as any).sub}
                    </p>

                    <h1 className="text-white  font-semibold leading-tight text-3xl sm:text-5xl lg:text-6xl max-w-[14ch]">
                      {(s as any).heading}
                    </h1>

                    {(s as any).cta && (
                      <a
                        href={(s as any).cta.href}
                        className="inline-flex items-center gap-2 mt-6 sm:mt-8 px-6 py-3 rounded-full bg-white/95 hover:bg-white transition text-black font-medium"
                      >
                        {(s as any).cta.label}
                        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
                          <path
                            d="M5 12h14M13 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Pagination styling */}
      <style jsx global>{`
        .hero-carousel .swiper-pagination {
          bottom: 16px !important;
        }
        .hero-carousel .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          margin: 0 5px !important;
        }
        .hero-carousel .swiper-pagination-bullet-active {
          background: #ffffff;
          transform: scale(1.15);
        }
        /* keep focal to the left where your H1/CTA sit */
        .object-left-center {
          object-position: left center;
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
