import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const title = "Política de privacidad · LETRIA";
const description = "Política de privacidad en elaboración. Para cualquier duda, escribe a alberto@letria.es.";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://letria-screenshot-studio.lovable.app/privacidad" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://letria-screenshot-studio.lovable.app/privacidad" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="min-h-dvh bg-background px-6 py-8 text-foreground">
      <div className="mx-auto max-w-2xl">
        <Button asChild variant="link" className="min-h-11 px-0"><Link to="/">Volver</Link></Button>
        <h1 className="mt-12 font-display text-4xl leading-tight sm:text-5xl">Política de privacidad</h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Política de privacidad en elaboración. Para cualquier duda, escribe a <a href="mailto:alberto@letria.es" className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">alberto@letria.es</a>.
        </p>
      </div>
    </main>
  );
}