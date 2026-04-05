"use client";

import React from "react";
import { Truck, ShieldCheck, Headphones, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    ar: { title: "سريعة وآمنة", description: "شحن سريع وآمن لجميع مناطق المملكة مع تتبّع لحظي." },
    en: { title: "Fast & Secure", description: "Speedy, secure shipping across KSA with live tracking." },
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    ar: { title: "ضمان موثّق", description: "ضمان رسمي على المنتجات وخيارات حماية ممتدة." },
    en: { title: "Certified Warranty", description: "Official warranty with extended protection options." },
  },
  {
    icon: <Clock className="h-8 w-8" />,
    ar: { title: "استجابة فورية", description: "معالجة الطلبات بسرعة وكفاءة خلال 24 ساعة." },
    en: { title: "Swift Handling", description: "Orders processed with efficiency within 24 hours." },
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    ar: { title: "دعم متواصل", description: "فريق خدمة عملاء متواجد لخدمتك على مدار الساعة." },
    en: { title: "24/7 Support", description: "Dedicated customer support available around the clock." },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const WhyChooseUs = () => {
  const locale = useLocale();
  const isAr = locale === "ar";
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-cairo text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {isAr ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-muted-foreground font-sans">
            {isAr
              ? "نجمع بين الجودة العالية والخبرة التقنية وخدمة ما بعد البيع لنقدّم تجربة موثوقة."
              : "We combine quality, technical expertise, and after-sales service to deliver a trusted experience."}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((f, idx) => {
            const copy = isAr ? f.ar : f.en;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-white dark:bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-3">
                  {f.icon}
                </div>
                <h3 className="font-cairo text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {copy.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-sans text-sm">
                  {copy.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  );
};
