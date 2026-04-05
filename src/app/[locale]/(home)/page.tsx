import React from "react";

import { WhyChooseUs } from "./_components/why-choose-us";
import Hero from "./_components/hero";
import { ProductGrid } from "./_components/product-grid";
import { TabsSection } from "./_components/tabs-section";
import { BannerSliderWrapper } from "@/components/BannerSlider/BannerSliderWrapper";
import { StatsCTA } from "./_components/stats-cta";
import type { ProductCardProps } from "./_components/product-card";



export default function Home() {
  const sampleProducts: ProductCardProps[] = [
    { id: "1", name: "طابعة بطاقات", description: "جودة عالية وسرعة ممتازة.", price: 1299, image: "/images/hero/printer.png", category: "New" },
    { id: "2", name: "خزنة فندقية", description: "أمان موثوق مع فتح رقمي.", price: 399, image: "/images/hero/hotel-safe.png", category: "Hot" },
    { id: "3", name: "خزنة إيداع", description: "مثالية للمتاجر والمطاعم.", price: 549, image: "/images/hero/deposit-safe.png" },
    { id: "4", name: "قارئ بطاقات", description: "متوافق مع أنظمة متعددة.", price: 189, image: "/images/hero/safe-open.png" },
  ];

  const tabs = [
    { label: "مختارة", value: "featured", products: sampleProducts },
    { label: "الأكثر مبيعًا", value: "bestsellers", products: sampleProducts.slice().reverse() },
  ];

  return (
    <main className="min-h-screen">
      <Hero />

      <ProductGrid products={sampleProducts} title="منتجاتنا" />

      <TabsSection tabs={tabs} title="مختاراتنا" />

      <BannerSliderWrapper position="home" page="home" className="w-full" />

      <StatsCTA />

      <WhyChooseUs />

    </main>
  );
}
