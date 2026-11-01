CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  consent boolean NOT NULL,
  consent_text text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'web_proximamente',
  CONSTRAINT waitlist_valid_email CHECK (email = lower(btrim(email)) AND char_length(email) <= 254 AND email ~ '^[A-Za-z0-9.!#$%&''*+/=?^_`{|}~-]+@[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)+$'),
  CONSTRAINT waitlist_consent_required CHECK (consent = true),
  CONSTRAINT waitlist_exact_consent CHECK (consent_text = 'He leído y acepto la Política de privacidad y consiento que Alberto Delgado Rodríguez use mi correo para avisarme del lanzamiento de LETRIA y enviarme información sobre el proyecto. Puedo darme de baja cuando quiera.'),
  CONSTRAINT waitlist_web_source CHECK (source = 'web_proximamente')
);
GRANT INSERT (email, consent, consent_text, source) ON public.waitlist TO anon, authenticated;
GRANT ALL ON public.waitlist TO service_role;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can subscribe with consent" ON public.waitlist FOR INSERT TO anon, authenticated WITH CHECK (consent = true AND source = 'web_proximamente');

-- No read, update or delete privileges or policies for visitors.
-- One narrow write-only RPC hides whether an email already exists.
CREATE FUNCTION public.join_waitlist(p_email text, p_consent boolean, p_consent_text text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF p_email IS NULL OR p_consent IS DISTINCT FROM true OR p_consent_text IS DISTINCT FROM 'He leído y acepto la Política de privacidad y consiento que Alberto Delgado Rodríguez use mi correo para avisarme del lanzamiento de LETRIA y enviarme información sobre el proyecto. Puedo darme de baja cuando quiera.' THEN
    RAISE EXCEPTION 'Email and explicit consent are required' USING ERRCODE = '22023';
  END IF;
  INSERT INTO public.waitlist (email, consent, consent_text, source)
  VALUES (lower(btrim(p_email)), p_consent, p_consent_text, 'web_proximamente')
  ON CONFLICT (email) DO NOTHING;
END;
$$;
REVOKE ALL ON FUNCTION public.join_waitlist(text, boolean, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.join_waitlist(text, boolean, text) TO anon, authenticated, service_role;