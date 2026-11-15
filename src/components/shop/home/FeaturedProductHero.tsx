import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/lib/formatters";
import type { Product } from "@/types/product";

const ECHO = "Jovens evangelizando jovens evangelizando ";

interface FeaturedProductHeroProps {
  product: Product;
}

/**
 * Faixa de abertura da home com um único produto em destaque (modelo `.prod-hero`
 * da galeria). A foto entra num painel areia porque as imagens atuais são
 * ilustrações SVG; com a foto real, troque o painel por imagem full-bleed.
 */
export function FeaturedProductHero({ product }: FeaturedProductHeroProps) {
  const image =
    product.images.find((candidate) => candidate.kind === "product") ?? product.images[0];
  const compareAtPrice = product.compareAtPrice;
  const isOnSale = compareAtPrice !== undefined && compareAtPrice > product.price;

  return (
    <section
      aria-label="Produto em destaque"
      className="relative isolate overflow-hidden bg-dea-night bg-grain text-dea-sand"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex flex-col justify-center gap-1 font-display text-5xl leading-none font-black font-soft whitespace-nowrap uppercase text-dea-cream/5 sm:text-7xl"
      >
        <span>{ECHO.repeat(3)}</span>
        <span className="-ml-8">{ECHO.repeat(3)}</span>
        <span>{ECHO.repeat(3)}</span>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-4">
          <span className="-rotate-2 rounded-sm bg-dea-heart px-2 py-0.5 text-sm font-semibold tracking-wide text-dea-cream uppercase">
            {product.badge ?? "Novo lote"}
          </span>
          <h1 className="max-w-xl font-display text-4xl font-black font-soft text-dea-cream sm:text-5xl">
            {product.name}
          </h1>
          <p className="max-w-md text-base text-dea-sand sm:text-lg">{product.description}</p>
          <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            {isOnSale && (
              <del className="text-base text-dea-sky">
                <span className="sr-only">De </span>
                {formatCentsToBRL(compareAtPrice)}
              </del>
            )}
            <span className="font-display text-4xl font-black font-soft text-dea-cream">
              {isOnSale && <span className="sr-only">Por </span>}
              {formatCentsToBRL(product.price)}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href={`/produtos/${product.slug}`}>Ver produto</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm lg:max-w-none">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-dea-sand shadow-2xl">
            {image && (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                unoptimized
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain p-6"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
