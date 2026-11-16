import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
}

/**
 * Logo oficial minimalista do grupo.
 *
 * Utiliza o arquivo estático /images/logo-dea.svg como máscara CSS (mask-image)
 * com `bg-current` para preservar currentColor (text-dea-blue, text-dea-sand, etc.)
 * com cache de navegador e sem inchar o HTML/RSC das páginas.
 *
 * Decorativa: o nome do grupo aparece escrito ao lado.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block h-9 shrink-0 bg-current mask-logo-dea", className)}
    />
  );
}
