"use client";

import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ProductGrid } from "./product-grid";
import { ProductCardProps } from "./product-card";
import { motion } from "framer-motion";

interface TabsSectionProps {
    tabs: {
        label: string;
        value: string;
        products: ProductCardProps[];
    }[];
    title?: string;
}

export const TabsSection: React.FC<TabsSectionProps> = ({ tabs, title }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.value ?? "tab1");

    return (
        <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h2 className="font-cairo text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                    {title ?? "منتجاتنا المميزة"}
                </h2>
                <div className="mt-4 flex justify-center">
                    <span className="h-1.5 w-24 rounded-full bg-primary" />
                </div>
            </div>

            <Tabs.Root defaultValue={tabs[0]?.value} onValueChange={setActiveTab} className="flex flex-col items-center">
                <Tabs.List className="inline-flex items-center justify-center gap-2 rounded-2xl bg-muted p-1.5 backdrop-blur-sm border border-border shadow-inner mb-10 overflow-x-auto max-w-full">
                    {tabs.map((tab) => (
                        <Tabs.Trigger key={tab.value} value={tab.value} className="relative px-6 md:px-8 py-3.5 text-sm font-bold tracking-wide transition-all data-[state=active]:text-white focus:outline-none whitespace-nowrap z-10">
                            <span className="relative z-10 font-cairo uppercase">{tab.label}</span>
                            {activeTab === tab.value && (
                                <motion.div layoutId="active-pill" className="absolute inset-0 z-0 rounded-xl bg-primary shadow-lg shadow-primary/25" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
                            )}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {tabs.map((tab) => (
                    <Tabs.Content key={tab.value} value={tab.value} className="w-full">
                        {activeTab === tab.value && <ProductGrid products={tab.products} />}
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </section>
    );
};

