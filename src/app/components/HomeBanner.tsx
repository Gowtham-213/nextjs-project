"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    title: "Weekend Store Deals",
    subtitle: "Carefully picked products with fair pricing and quick delivery.",
    tag: "Limited Time",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    title: "Fresh New Arrivals",
    subtitle: "New items added every week across home, gadgets, and lifestyle.",
    tag: "New In",
    image:
      "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    title: "Trusted Everyday Picks",
    subtitle: "Top-rated essentials chosen by customers like you.",
    tag: "Top Rated",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function HomeBanner() {
  return (
    <section className="mb-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="rounded-xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="grid min-h-[260px] overflow-hidden rounded-xl border border-gray-200 bg-white md:grid-cols-2">
              <div className="flex items-center p-6 md:p-10">
                <div>
                  <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {slide.tag}
                  </span>
                  <h2 className="mt-3 text-2xl font-semibold text-gray-900 md:text-4xl">{slide.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 md:text-base">
                    {slide.subtitle}
                  </p>
                  <button className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                    Shop Now
                  </button>
                </div>
              </div>

              <div className="relative min-h-[220px]">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
