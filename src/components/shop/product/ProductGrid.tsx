"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/product/ProductCard";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

const categories = [
  { id: "tudo", label: "Tudo" },
  { id: "maria", label: "Maria" },
  { id: "jesus", label: "Jesus" },
  { id: "espirito-santo", label: "Espírito Santo" },
  { id: "terco", label: "Terço" },
  { id: "camisetas", label: "Camisetas" },
  { id: "acessorios", label: "Acessórios" },
  { id: "devocao", label: "Devoção" },
];

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("tudo");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "tudo" || product.categoryIds.includes(selectedCategory);

    const normalizedSearch = normalizeText(searchTerm.trim());

    const matchesSearch =
      normalizeText(product.name).includes(normalizedSearch) ||
      normalizeText(product.description).includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:flex-nowrap lg:items-center">
        <div className="flex flex-wrap items-center gap-1.5 lg:flex-1 lg:flex-nowrap">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={isSelected}
                className={`cursor-pointer whitespace-nowrap rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-dea-blue bg-dea-blue text-white"
                    : "border-dea-blue/20 bg-dea-paper text-dea-blue hover:border-dea-blue"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="w-full lg:w-60 lg:shrink-0">
          <label htmlFor="product-search" className="sr-only">
            Pesquisar produtos
          </label>

          <input
            id="product-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Pesquisar produtos..."
            className="w-full rounded-full border border-dea-blue/20 bg-dea-paper px-4 py-2 text-sm text-dea-blue placeholder:text-dea-muted focus:border-dea-blue focus:outline-none focus:ring-2 focus:ring-dea-blue/20"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="font-hand text-lg text-dea-muted">
          Nenhum produto encontrado. Tente outra categoria ou pesquisa.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id} className="min-w-0">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
