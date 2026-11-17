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

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("tudo");

  const filteredProducts =
    selectedCategory === "tudo"
      ? products
      : products.filter((product) =>
          product.categoryIds.includes(selectedCategory)
        );

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              aria-pressed={isSelected}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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

      {filteredProducts.length === 0 ? (
        <p className="font-hand text-lg text-dea-muted">
          Nenhum produto disponível nesta categoria.
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
