"use client";

import React from "react";
import { ProductCard, ProductCardProps } from "./product-card";

interface ProductGridProps {
  products: ProductCardProps[];
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="font-cairo text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title ?? "منتجاتنا"}
        </h2>
        <div className="mt-4 flex justify-center">
          <span className="h-1.5 w-24 rounded-full bg-primary" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
        {products.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
};

