import assert from "node:assert/strict";
import { test } from "node:test";
import { selectFeaturedHero } from "../src/lib/featured-product.ts";

function product(id, overrides = {}) {
  return {
    id,
    slug: id,
    name: `Produto ${id}`,
    description: "Produto de teste",
    categoryId: "teste",
    price: 1000,
    images: [{ url: "/teste.svg", alt: `Produto ${id}`, kind: "product" }],
    variants: [],
    featured: false,
    active: true,
    order: 1,
    ...overrides,
  };
}

function variants(availability) {
  return availability.map((available, index) => ({
    id: `variacao-${index}`,
    label: String(index),
    available,
  }));
}

test("o destaque devolve o produto configurado sem alterar o catálogo", () => {
  const catalog = [product("a"), product("b")];
  const original = structuredClone(catalog);
  assert.equal(selectFeaturedHero(catalog, "b"), catalog[1]);
  assert.deepEqual(catalog, original);
});

test("o destaque fica vazio sem id, com id desconhecido ou produto inelegível", () => {
  const unavailable = product("esgotado", { variants: variants([false, false]) });
  const inactive = product("inativo", { active: false });
  const catalog = [unavailable, inactive, product("disponivel")];
  assert.equal(selectFeaturedHero(catalog, undefined), undefined);
  assert.equal(selectFeaturedHero(catalog, ""), undefined);
  assert.equal(selectFeaturedHero(catalog, "inexistente"), undefined);
  assert.equal(selectFeaturedHero(catalog, "esgotado"), undefined);
  assert.equal(selectFeaturedHero(catalog, "inativo"), undefined);
  assert.equal(selectFeaturedHero([], "disponivel"), undefined);
});

test("o destaque aceita produto com alguma variação disponível ou sem variações", () => {
  const partial = product("parcial", { variants: variants([false, true]) });
  const noVariants = product("sem-variacoes");
  assert.equal(selectFeaturedHero([partial, noVariants], "parcial"), partial);
  assert.equal(selectFeaturedHero([partial, noVariants], "sem-variacoes"), noVariants);
});
