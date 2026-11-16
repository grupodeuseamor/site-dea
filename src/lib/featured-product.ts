import type { Product } from "@/types/product";

/** Produto ativo e com alguma variação disponível (ou sem variações). */
function isEligible(product: Product): boolean {
  return (
    product.active &&
    (product.variants.length === 0 || product.variants.some((variant) => variant.available))
  );
}

/**
 * Seleciona o produto único da faixa de abertura.
 * Retorna `undefined` quando o id não existe no catálogo ou o produto não é elegível.
 */
export function selectFeaturedHero(
  products: readonly Product[],
  id: string | undefined,
): Product | undefined {
  if (!id) return undefined;
  const product = products.find((candidate) => candidate.id === id);
  return product && isEligible(product) ? product : undefined;
}
