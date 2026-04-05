"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Heart, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    description,
    price,
    image,
    category,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col overflow-hidden rounded-xl bg-background border border-border shadow-sm transition-all hover:shadow-lg dark:bg-card"
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/10 to-transparent" />
                {/* Always-visible quick actions (top-right) */}
                <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 flex flex-col gap-1.5">
                    <button className="h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow hover:bg-white text-foreground grid place-items-center transition">
                        <Eye className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow hover:bg-white text-foreground grid place-items-center transition">
                        <Heart className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 rounded-full bg-white/90 dark:bg-black/60 backdrop-blur-sm shadow hover:bg-white text-foreground grid place-items-center transition">
                        <Repeat className="h-4 w-4" />
                    </button>
                    <button className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center shadow hover:bg-primary/90 transition">
                        <ShoppingCart className="h-4 w-4" />
                    </button>
                </div>
                {category && (
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-foreground backdrop-blur-sm rtl:left-auto rtl:right-3">
                        {category}
                    </div>
                )}
            </div>
            <div className="flex flex-1 flex-col p-4">
                <div className="mb-1.5 flex items-center justify-between">
                    <h3 className="font-cairo text-base font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                        {name}
                    </h3>
                    <span className="font-inter text-base font-extrabold text-primary">
                        ${price}
                    </span>
                </div>
                <p className="mb-4 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
                    {description}
                </p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                    <Button className="w-full h-9 text-xs font-cairo font-semibold" variant="outline">
                        View
                    </Button>
                    <Button className="w-full h-9 text-xs font-cairo font-semibold bg-primary hover:bg-primary/90">
                        Add
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

