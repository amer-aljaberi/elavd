import React from "react";
import Hero from "./_components/hero";
import OurCategories from "./_components/ourCategories";
import OurProducts from "./_components/ourProducts";
import SpecialOffers from "./_components/specialOffers";
import SearchResults from "./_components/searchResults";

export default async function Home({ 
  searchParams 
}: { 
  searchParams: Promise<{ s?: string; product_cat?: string }> 
}) {
  const searchValues = await searchParams;
  const query = searchValues.s;
  const categoryId = searchValues.product_cat;

  if (query) {
    return (
      <main className="min-h-screen">
        <SearchResults query={query} categoryId={categoryId} />
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 lg:px-0">
      <Hero />
      <OurCategories />
      <SpecialOffers position={1} />
      <OurProducts />
      <SpecialOffers position={2} />
    </main>
  );
}
