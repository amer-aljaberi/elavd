import Hero from "./_components/hero";
import OurCategories from "./_components/ourCategories";
import OurProducts from "./_components/ourProducts";
import SpecialOffers from "./_components/specialOffers";

export default async function Home() {
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
