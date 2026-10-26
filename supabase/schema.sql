-- ==============================================================================
-- COLORIX PAINTING & DECORATING - POP-UP FORM DATABASE TABLE
-- Database: Supabase PostgreSQL
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ==============================================================================

-- Create updated_at automatic function if it doesn't already exist
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Table: quote_requests (Stores all pop-up quote form submissions)
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    service TEXT NOT NULL,
    property_type TEXT,
    timeline TEXT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    postcode TEXT,
    notes TEXT,
    estimate_min NUMERIC,
    estimate_max NUMERIC,
    estimate_details JSONB,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'survey_scheduled', 'in_progress', 'completed', 'cancelled')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger to automatically update updated_at timestamp when a row is edited
DROP TRIGGER IF EXISTS trigger_quote_requests_updated_at ON public.quote_requests;
CREATE TRIGGER trigger_quote_requests_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 2. Optional Table: contact_inquiries (for general contact / consultation inquiries)
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Optional Table: newsletter_subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures visitors can safely submit forms from the pop-up, while data management
-- is secured and private.
-- ==============================================================================

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated visitors to submit quote requests from the pop-up
DROP POLICY IF EXISTS "Allow public inserts for quote_requests" ON public.quote_requests;
CREATE POLICY "Allow public inserts for quote_requests" 
ON public.quote_requests 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users & service role to select/view all submitted quotes
DROP POLICY IF EXISTS "Allow service and authenticated read for quote_requests" ON public.quote_requests;
CREATE POLICY "Allow service and authenticated read for quote_requests" 
ON public.quote_requests 
FOR SELECT 
TO authenticated, service_role
USING (true);

-- Allow authenticated users & service role to update quotes (e.g. status changes, admin notes)
DROP POLICY IF EXISTS "Allow service and authenticated update for quote_requests" ON public.quote_requests;
CREATE POLICY "Allow service and authenticated update for quote_requests" 
ON public.quote_requests 
FOR UPDATE 
TO authenticated, service_role
USING (true);

-- Allow service role to delete records
DROP POLICY IF EXISTS "Allow service role delete for quote_requests" ON public.quote_requests;
CREATE POLICY "Allow service role delete for quote_requests" 
ON public.quote_requests 
FOR DELETE 
TO service_role
USING (true);

-- Policies for general contact inquiries
DROP POLICY IF EXISTS "Allow public inserts for contact_inquiries" ON public.contact_inquiries;
CREATE POLICY "Allow public inserts for contact_inquiries" 
ON public.contact_inquiries 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated read for contact_inquiries" ON public.contact_inquiries;
CREATE POLICY "Allow authenticated read for contact_inquiries" 
ON public.contact_inquiries 
FOR SELECT 
TO authenticated, service_role
USING (true);

-- Policies for newsletter signups
DROP POLICY IF EXISTS "Allow public inserts for newsletter_subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Allow public inserts for newsletter_subscribers" 
ON public.newsletter_subscribers 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Indexes for lightning fast searching and filtering
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_reference_id ON public.quote_requests (reference_id);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON public.quote_requests (status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_phone ON public.quote_requests (phone);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON public.quote_requests (email);
