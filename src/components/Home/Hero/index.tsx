import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";

const Hero = () => {
  // NOTE: Header is fixed; keep a small top padding so the hero isn't hidden.
  // Adjust pt-16 if your header height differs.
  return (
    <section className="relative w-full bg-black pt-16">
      {/* Full-bleed carousel */}
      <HeroCarousel />

      {/* Features strip (kept, but pulled tight under the banner) */}
      <div className="bg-white">
        <HeroFeature />
      </div>
    </section>
  );
};

export default Hero;
