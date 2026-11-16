import { ProductCard } from "@/components/shop/product/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

/** Grade responsiva com todo o catálogo ativo. */
export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="font-hand text-lg text-dea-muted">Nenhum produto disponível por enquanto.</p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
