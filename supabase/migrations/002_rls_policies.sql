-- ============================================================
-- CBRG Website - Row Level Security Policies
-- ============================================================

ALTER TABLE research_areas    ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE members           ENABLE ROW LEVEL SECURITY;
ALTER TABLE alumni_details    ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects          ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_feeds        ENABLE ROW LEVEL SECURITY;

-- Public read access (website is public)
CREATE POLICY "Public read research_areas"    ON research_areas    FOR SELECT USING (true);
CREATE POLICY "Public read equipment_methods" ON equipment_methods FOR SELECT USING (true);
CREATE POLICY "Public read members"           ON members           FOR SELECT USING (true);
CREATE POLICY "Public read alumni_details"    ON alumni_details    FOR SELECT USING (true);
CREATE POLICY "Public read publications"      ON publications      FOR SELECT USING (true);
CREATE POLICY "Public read projects"          ON projects          FOR SELECT USING (true);
CREATE POLICY "Public read news_feeds"        ON news_feeds        FOR SELECT USING (true);

-- All writes restricted to service_role only (RSS ingestion, admin)
-- service_role bypasses RLS by default in Supabase
