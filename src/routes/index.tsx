import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SOCIAL_LINKS, PARENT_PROJECT_URL } from "@/config/social";

const TITLE = "LETRIA · Próximamente";
const DESC =
  "LETRIA llega pronto: consultoría e implantación de IA para pymes, profesionales y despachos.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const p = { fill: "currentColor", "aria-hidden": true, viewBox: "0 0 24 24", width: 20, height: 20 } as const;
const icons: Record<keyof typeof SOCIAL_LINKS, ReactNode> = {
  linkedin: (
    <svg {...p}><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.35h-4v-4.74c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.82 1.23-1.82 2.5v4.83h-4z" /></svg>
  ),
  instagram: (
    <svg {...p} fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
  ),
  youtube: (
    <svg {...p}><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.02V8.98L15.5 12z" /></svg>
  ),
  x: (
    <svg {...p} width={18} height={18}><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" /></svg>
  ),
  facebook: (
    <svg {...p}><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.6V4.46A21 21 0 0 0 14.27 4.3c-2.3 0-3.87 1.4-3.87 3.98v2.22H7.8v3h2.6V21z" /></svg>
  ),
};
const labels: Record<keyof typeof SOCIAL_LINKS, string> = {
  linkedin: "LinkedIn", instagram: "Instagram", youtube: "YouTube", x: "X", facebook: "Facebook",
};

function FlowMotif() {
  return (
    <svg viewBox="0 0 320 80" className="mx-auto h-16 w-full max-w-xs text-muted-foreground sm:h-20" aria-hidden="true" fill="none">
      {[18, 32, 46, 60].map((y, i) => (
        <line key={y} x1="10" x2={70 - i * 8} y1={y} y2={y} stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity={0.6} />
      ))}
      {[18, 32, 46, 60].map((y) => (
        <path key={`c${y}`} d={`M80 ${y} C 150 ${y}, 170 40, 240 40`} stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" className="animate-flow" />
      ))}
      <circle cx="262" cy="40" r="14" stroke="var(--accent)" strokeWidth="1.5" className="animate-pulse-soft" />
      <path d="M255 40l5 5 9-10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Index() {
  return (
    <div className="flex min-h-dvh flex-col bg-background px-6 py-8 text-foreground">
      <header className="flex flex-col items-center gap-3 text-center">
        <span className="font-display text-2xl font-medium tracking-[0.3em]">LETRIA</span>
        <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Próximamente
        </span>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-7 py-10 text-center">
        <FlowMotif />
        <h1 className="font-display text-4xl leading-tight font-normal text-balance sm:text-5xl md:text-6xl">
          La inteligencia artificial aplicada al trabajo real
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Estamos preparando letria.es. Consultoría e implantación de IA para pymes, profesionales y despachos. Sin jerga y paso a paso.
        </p>
        <p className="font-display text-xl italic text-accent sm:text-2xl">Entiende la IA. Aplícala.</p>
        <ul className="flex flex-wrap justify-center gap-3" aria-label="Redes sociales">
          {(Object.keys(SOCIAL_LINKS) as (keyof typeof SOCIAL_LINKS)[]).map((k) => (
            <li key={k}>
              <a
                href={SOCIAL_LINKS[k]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${labels[k]} de LETRIA`}
                className="flex size-12 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {icons[k]}
              </a>
            </li>
          ))}
        </ul>
      </main>

      <footer className="flex flex-col items-center gap-1 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-3">
        <span>© 2026 LETRIA · letria.es</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <a href={PARENT_PROJECT_URL} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-ring">
          Un proyecto de Dígito Cero Formación
        </a>
      </footer>
    </div>
  );
}
