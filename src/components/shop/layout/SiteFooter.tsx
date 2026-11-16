import Image from "next/image";
import { HandDrawing } from "@/components/decor/HandDrawing";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { Logo } from "@/components/icons/Logo";
import { GROUP_NAME } from "@/config/site";

const INSTAGRAM_URL = "https://www.instagram.com/grupodeusamor/";
const VALUES = "Evangelização · Amizade · Humildade · Serviço";

/**
 * Rodapé igual em todas as páginas: foto do grupo no Azul Noite, logo em areia,
 * @grupodeusamor, a linha de valores e os textos do antigo banner da home —
 * sem a etiqueta "Novo lote" e sem o CTA.
 */
export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-dea-night text-dea-sand">
      <Image
        src="/images/grupo/faixa-grupo.jpg"
        alt=""
        fill
        quality={50}
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dea-night/80 bg-grain" />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-lg font-black font-soft text-dea-sand sm:text-xl">
            <Logo className="h-12 text-dea-sand" />
            {GROUP_NAME}
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-1 rounded-lg text-sm text-dea-sky outline-none hover:text-dea-cream focus-visible:ring-3 focus-visible:ring-dea-sky/50"
          >
            <InstagramIcon />
            @grupodeusamor
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-display text-3xl font-black font-soft text-dea-cream sm:text-4xl">
            Jovens evangelizando{" "}
            <span className="relative inline-block">
              jovens
              <HandDrawing
                name="sublinhado"
                className="absolute -bottom-2 left-0 h-3 w-full text-dea-heart"
              />
            </span>
          </p>
          <p className="flex items-center gap-1 font-hand text-lg text-dea-sky">
            <HandDrawing name="brilhinhos" className="size-6" /> toda quinta, 19h30!
          </p>
        </div>

        <p className="border-t border-dea-sky/20 pt-4 text-xs font-medium tracking-widest text-dea-sky uppercase">
          {VALUES}
        </p>
      </div>
    </footer>
  );
}
