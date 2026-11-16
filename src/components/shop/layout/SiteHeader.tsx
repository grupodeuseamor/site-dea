import Link from "next/link";
import { HandDrawing } from "@/components/decor/HandDrawing";
import { Logo } from "@/components/icons/Logo";
import { CartButton } from "@/components/shop/layout/CartButton";
import { SITE_NAME } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-dea-paper bg-grain-dark">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2 sm:px-6">
        <Link
          href="/"
          aria-label={`${SITE_NAME}, página inicial`}
          className="group flex min-h-11 min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50"
        >
          <Logo className="h-12 text-dea-blue" />
          <span className="flex min-w-0 flex-col pb-1 leading-none">
            <span className="relative truncate font-display text-lg font-black font-soft text-dea-blue sm:text-xl">
              {SITE_NAME}
              <HandDrawing
                name="sublinhado"
                className="absolute -bottom-1 left-0 h-2 w-full text-dea-heart"
              />
            </span>
          </span>
        </Link>

        <CartButton />
      </div>
      <HandDrawing name="onda" strokeWidth={1.6} className="block h-2 w-full text-dea-sky" />
    </header>
  );
}
