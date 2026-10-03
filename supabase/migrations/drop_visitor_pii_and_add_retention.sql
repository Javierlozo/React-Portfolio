-- Remove the identifying columns /api/track stopped writing, and cap how long
-- page_views rows are kept. Run this in Supabase SQL Editor.
--
-- /privacy says no IP, city or ISP is stored and that rows are kept for 12
-- months. Both statements are only true once this has run.
--
-- Irreversible: the column drops delete every stored IP, city, region, ISP and
-- org value. Check what is there first if you want a record of it:
--   select count(*) from page_views
--   where ip_address is not null or city is not null or region is not null
--      or isp is not null or org is not null;

ALTER TABLE page_views
  DROP COLUMN IF EXISTS ip_address,
  DROP COLUMN IF EXISTS isp,
  DROP COLUMN IF EXISTS org,
  DROP COLUMN IF EXISTS city,
  DROP COLUMN IF EXISTS region;

-- Retention: delete rows older than 12 months, nightly at 03:00 UTC.
CREATE EXTENSION IF NOT EXISTS pg_cron;

DELETE FROM page_views WHERE created_at < now() - interval '12 months';

SELECT cron.schedule(
  'page_views_retention',
  '0 3 * * *',
  $$DELETE FROM page_views WHERE created_at < now() - interval '12 months'$$
);
