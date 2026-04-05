"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface OverlaySliderProps {
  images: { src: string; alt: string }[];
  fullscreen?: boolean;
}

export const OverlaySlider: React.FC<OverlaySliderProps> = ({ images, fullscreen }) => {
  return (
    <section className={`${fullscreen ? "w-screen" : "container mx-auto"} ${fullscreen ? "" : "px-4 sm:px-6 lg:px-8"} py-10`}>
      <div className={`${fullscreen ? "" : "rounded-2xl border border-slate-100 shadow-sm overflow-hidden"}`}>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 4500 }}
          pagination={{ clickable: true }}
          loop
          className={`${fullscreen ? "w-screen h-[50vh] md:h-[60vh] lg:h-[70vh]" : "w-full h-[40vh] md:h-[50vh]"}`}
        >
          {images.map((img, i) => (
            <SwiperSlide key={i} className="relative">
              <Image src={img.src} alt={img.alt} fill className="object-cover" priority={i === 0} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-black/0" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

