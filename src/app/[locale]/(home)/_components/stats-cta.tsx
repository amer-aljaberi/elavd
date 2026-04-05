"use client";

import React from "react";
import { ShieldCheck, Headphones, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";

export const StatsCTA = () => {
    const locale = useLocale();
    const isAr = locale === "ar";
    return (
        <section className="relative py-16">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-white dark:bg-card border border-border shadow-sm p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="font-cairo text-2xl md:text-3xl font-extrabold text-foreground mb-3">
                            {isAr ? "جاهزون لدعم أعمالك التقنية" : "Ready to power your business"}
                        </h3>
                        <p className="text-muted-foreground max-w-xl">
                            {isAr
                                ? "حلول متكاملة من التوريد والتركيب إلى الصيانة والدعم، بمعايير جودة عالية وأسعار تنافسية."
                                : "End-to-end solutions from supply and installation to maintenance and 24/7 support—quality guaranteed."}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 md:gap-8">
                        <div className="text-center">
                            <div className="text-3xl font-extrabold text-primary">3K+</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {isAr ? "عميل سعيد" : "Happy Clients"}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-extrabold text-primary">7Y</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {isAr ? "خبرة عملية" : "Industry Experience"}
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-extrabold text-primary">24/7</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {isAr ? "دعم فني" : "Tech Support"}
                            </div>
                        </div>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-6 rounded-xl">
                        {isAr ? "تواصل معنا" : "Contact Us"}
                    </Button>
                </div>
            </div>
        </section>
    );
};

