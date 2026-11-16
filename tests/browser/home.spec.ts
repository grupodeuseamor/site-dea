import { expect, test } from "@playwright/test";
import { featuredHeroProductId } from "../../src/config/home";
import { selectFeaturedHero } from "../../src/lib/featured-product";
import { formatCentsToBRL } from "../../src/lib/formatters";
import { getProducts } from "../../src/lib/products";

const products = getProducts();
const hero = selectFeaturedHero(products, featuredHeroProductId);

test.describe("produto em destaque", () => {
  test("mostra o produto configurado com preço e link para os detalhes", async ({ page }) => {
    test.skip(!hero, "Sem produto em destaque configurado.");
    if (!hero) return;
    await page.goto("/");
    const band = page.getByRole("region", { name: "Produto em destaque", exact: true });
    await expect(band.getByRole("heading", { level: 1, name: hero.name })).toBeVisible();
    await expect(band).toContainText(formatCentsToBRL(hero.price));
    if (hero.badge) {
      await expect(band.getByText(hero.badge, { exact: true })).toBeVisible();
    } else {
      await expect(band.getByText("Novo lote", { exact: true })).toHaveCount(0);
    }
    const cta = band.getByRole("link", { name: "Ver produto", exact: true });
    await expect(cta).toHaveAttribute("href", `/produtos/${hero.slug}`);
    await expect(band.getByRole("link", { name: /WhatsApp/ })).toHaveCount(0);
  });
});

test.describe("grade de produtos", () => {
  test("lista todo o catálogo logo abaixo do destaque", async ({ page }) => {
    await page.goto("/");
    const grid = page.getByRole("region", { name: "Produtos", exact: true });
    await expect(grid.getByRole("listitem")).toHaveCount(products.length);
    if (hero) {
      const heroBox = await page
        .getByRole("region", { name: "Produto em destaque", exact: true })
        .boundingBox();
      const gridBox = await grid.boundingBox();
      expect(heroBox && gridBox && gridBox.y >= heroBox.y + heroBox.height).toBe(true);
    }
    for (const product of products) {
      await expect(grid.getByRole("link", { name: product.name, exact: true })).toHaveAttribute(
        "href",
        `/produtos/${product.slug}`,
      );
    }
    if (hero) {
      await expect(grid.getByRole("link", { name: hero.name, exact: true })).toHaveCount(1);
    }
  });

  test("tem a âncora da grade e não sobrou link para âncora morta", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.locator("#produtos")).toBeVisible();
    await expect(page.locator('a[href*="#destaques"], a[href*="#catalogo"]')).toHaveCount(0);
  });
});

test.describe("links do carrinho", () => {
  test("carrinho vazio aponta para a grade", async ({ page }) => {
    await page.goto("/carrinho");
    await expect(page.getByRole("link", { name: "Ver produtos", exact: true })).toHaveAttribute(
      "href",
      "/#produtos",
    );
  });

  test("resumo do pedido aponta para a grade", async ({ page }) => {
    await page.goto("/produtos/terco-madeira-azul");
    await page.getByRole("button", { name: "Adicionar ao carrinho" }).click();
    await page.goto("/carrinho");
    await expect(
      page.getByRole("link", { name: "Continuar comprando", exact: true }),
    ).toHaveAttribute("href", "/#produtos");
  });
});

test.describe("rodapé", () => {
  for (const path of ["/", "/carrinho"]) {
    test(`traz slogan, contato e valores em ${path}`, async ({ page }) => {
      await page.goto(path);
      const footer = page.getByRole("contentinfo");
      await expect(footer).toBeVisible();
      await expect(footer.getByText("Jovens evangelizando jovens", { exact: true })).toBeVisible();
      await expect(footer.getByText("toda quinta, 19h30!")).toBeVisible();
      await expect(
        footer.getByText("Evangelização · Amizade · Humildade · Serviço", { exact: true }),
      ).toBeVisible();
      await expect(footer.getByRole("link", { name: "@grupodeusamor" })).toHaveAttribute(
        "href",
        "https://www.instagram.com/grupodeusamor/",
      );
    });
  }
});
