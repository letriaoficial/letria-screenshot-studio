import { z } from "zod";

export const CONSENT_TEXT = "He leído y acepto la Política de privacidad y consiento que Alberto Delgado Rodríguez use mi correo para avisarme del lanzamiento de LETRIA y enviarme información sobre el proyecto. Puedo darme de baja cuando quiera.";
export const WAITLIST_SOURCE = "web_proximamente";

export const waitlistSchema = z.object({
  email: z.string().trim().min(1, "Introduce tu correo electrónico.").max(254, "El correo es demasiado largo.").email("Introduce un correo electrónico válido.").transform((email) => email.toLowerCase()),
  consent: z.boolean().refine((value) => value, "Debes aceptar la Política de privacidad y dar tu consentimiento."),
});

export function waitlistArguments(input: unknown) {
  const values = waitlistSchema.parse(input);
  return { p_email: values.email, p_consent: values.consent, p_consent_text: CONSENT_TEXT };
}