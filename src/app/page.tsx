import { FeaturedProductHero } from "@/components/shop/home/FeaturedProductHero";
import { ProductGrid } from "@/components/shop/product/ProductGrid";
import { featuredHeroProductId } from "@/config/home";
import { SITE_NAME } from "@/config/site";
import { selectFeaturedHero } from "@/lib/featured-product";
import { getProducts } from "@/lib/products";

export default function HomePage() {
  const products = getProducts();
  const hero = selectFeaturedHero(products, featuredHeroProductId);

  return (
    <main>
      {hero ? (
        <FeaturedProductHero product={hero} />
      ) : (
        <section aria-labelledby="home-titulo" className="bg-dea-night bg-grain text-dea-sand">
          <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
            <h1
              id="home-titulo"
              className="max-w-xl font-display text-4xl font-black font-soft text-dea-cream sm:text-5xl"
            >
              {SITE_NAME}
            </h1>
            <p className="mt-3 max-w-md text-base text-dea-sand sm:text-lg">
              Camisetas, terços e lembranças do Grupo Deus é Amor. Pagamento e retirada no encontro
              de quinta-feira.
            </p>
          </div>
        </section>
      )}

      <section aria-label="Produtos" className="mx-auto max-w-5xl px-3 py-8 sm:px-6 sm:py-10">
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
