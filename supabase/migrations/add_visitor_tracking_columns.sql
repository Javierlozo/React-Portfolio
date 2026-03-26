-- Add enhanced visitor tracking columns to page_views
-- Run this in Supabase SQL Editor

ALTER TABLE page_views
  ADD COLUMN IF NOT EXISTS visitor_id text,
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS isp text,
  ADD COLUMN IF NOT EXISTS org text,
  ADD COLUMN IF NOT EXISTS language text,
  ADD COLUMN IF NOT EXISTS timezone text,
  ADD COLUMN IF NOT EXISTS session_duration integer,
  ADD COLUMN IF NOT EXISTS event_type text DEFAULT 'page_view';

-- Index for faster unique visitor queries
CREATE INDEX IF NOT EXISTS idx_page_views_visitor_id ON page_views (visitor_id);

-- Index for event type filtering
CREATE INDEX IF NOT EXISTS idx_page_views_event_type ON page_views (event_type);

-- Index for recent visitors query (created_at DESC already exists implicitly, but explicit helps)
CREATE INDEX IF NOT EXISTS idx_page_views_created_at_desc ON page_views (created_at DESC);
