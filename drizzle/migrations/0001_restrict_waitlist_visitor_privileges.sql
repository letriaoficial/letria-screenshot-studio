-- Remove any inherited/default table grants; retain only narrow subscription inserts.
REVOKE ALL ON TABLE public.waitlist FROM anon, authenticated;
GRANT INSERT (email, consent, consent_text, source) ON TABLE public.waitlist TO anon, authenticated;
GRANT ALL ON TABLE public.waitlist TO service_role;