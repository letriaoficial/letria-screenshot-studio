import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { waitlistArguments, waitlistSchema } from "@/lib/waitlist";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ email?: string | undefined; consent?: string | undefined; submit?: string | undefined }>({});
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const parsed = waitlistSchema.safeParse({ email, consent });
    if (!parsed.success) {
      const fields = parsed.error.flatten().fieldErrors;
      setErrors({ email: fields.email?.[0], consent: fields.consent?.[0] });
      if (fields.email) emailRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const { error } = await supabase.rpc("join_waitlist", waitlistArguments(parsed.data));
      if (error) throw error;
      setSuccess(true);
    } catch {
      setErrors({ submit: "No se ha podido guardar tu correo. Comprueba tu conexión e inténtalo de nuevo." });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-xl">
      {success ? <p role="status" className="py-4 text-base text-accent">Gracias. Te avisaré en cuanto esté listo.</p> : (
        <form onSubmit={submit} noValidate className="space-y-3 text-left" aria-label="Lista de espera de LETRIA" aria-busy={pending}>
          <label htmlFor="waitlist-email" className="block text-sm text-foreground">Correo electrónico</label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input ref={emailRef} id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="tu@correo.com" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} disabled={pending} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} className="h-11 min-w-0 flex-1 focus-visible:ring-2" />
            <Button type="submit" disabled={pending} className="h-11 bg-accent px-4 text-accent-foreground shadow-none hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-offset-2">{pending ? "Guardando…" : "Avisadme del lanzamiento"}</Button>
          </div>
          {errors.email && <p id="email-error" role="alert" className="text-sm text-destructive">{errors.email}</p>}
          <div className="flex items-start gap-3">
            <div className="flex min-h-11 items-start pt-1">
              <Checkbox ref={consentRef} id="waitlist-consent" name="consent" required checked={consent} onCheckedChange={(checked) => setConsent(checked === true)} disabled={pending} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "consent-error" : undefined} className="size-5 focus-visible:ring-2 focus-visible:ring-offset-2" />
            </div>
            <label htmlFor="waitlist-consent" className="min-h-11 cursor-pointer text-xs leading-relaxed text-muted-foreground">
              He leído y acepto la <Link to="/privacidad" className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring">Política de privacidad</Link> y consiento que Alberto Delgado Rodríguez use mi correo para avisarme del lanzamiento de LETRIA y enviarme información sobre el proyecto. Puedo darme de baja cuando quiera.
            </label>
          </div>
          {errors.consent && <p id="consent-error" role="alert" className="text-sm text-destructive">{errors.consent}</p>}
          {errors.submit && <p role="alert" className="text-sm text-destructive">{errors.submit}</p>}
        </form>
      )}
      <p className="mt-3 text-left text-xs leading-relaxed text-muted-foreground">
        Responsable: Alberto Delgado Rodríguez. Finalidad: avisarte del lanzamiento y enviarte novedades. Derechos: acceso, rectificación, supresión y otros en alberto@letria.es. Más información en la <Link to="/privacidad" className="underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring">Política de privacidad</Link>.
      </p>
    </div>
  );
}