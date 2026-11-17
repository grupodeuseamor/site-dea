export type ProductImageKind = "product" | "detail";

export interface ProductImage {
  /** Caminho local (`/images/...`) ou URL completa (`https://...`). */
  url: string;
  alt: string;
  kind: ProductImageKind;
}

export interface ProductVariant {
  id: string;
  label: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryIds: string[];
  /** Preço em centavos (ex.: 6500 = R$ 65,00). */
  price: number;
  /** Preço "de" em centavos, para itens em promoção. */
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Marcador geral legado; não seleciona o produto em destaque. */
  featured: boolean;
  active: boolean;
  /** Ordem no catálogo. */
  order: number;
  badge?: string;
}
