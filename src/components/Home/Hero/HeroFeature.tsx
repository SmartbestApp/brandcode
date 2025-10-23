import React from "react";
import Image from "next/image";

const featureData = [
  { img: "/images/icons/icon-01.svg", title: "Free Shipping", description: "For orders over $200" },
  { img: "/images/icons/icon-02.svg", title: "Easy Returns", description: "Cancel within 24 hours" },
  { img: "/images/icons/icon-03.svg", title: "100% Secure", description: "Protected checkout" },
  { img: "/images/icons/icon-04.svg", title: "24/7 Support", description: "We’re here anytime" },
];

const HeroFeature = () => {
  return (
    <div className="w-full mx-auto max-w-[1200px] px-4 sm:px-8 py-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-6">
        {featureData.map((item, key) => (
          <div className="flex items-center gap-4 min-w-[240px] flex-1" key={key}>
            <Image src={item.img} alt={item.title} width={40} height={40} />
            <div>
              <h3 className="font-medium text-base sm:text-lg text-dark">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroFeature;
