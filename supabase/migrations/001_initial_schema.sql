-- ============================================================
-- CBRG Website - Initial Schema
-- ============================================================

-- Research Areas
CREATE TABLE IF NOT EXISTS research_areas (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url   TEXT,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment & Methods
CREATE TABLE IF NOT EXISTS equipment_methods (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  type             TEXT NOT NULL CHECK (type IN ('Method', 'Equipment')),
  research_area_id UUID REFERENCES research_areas(id) ON DELETE CASCADE
);

-- Members
CREATE TABLE IF NOT EXISTS members (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  designation       TEXT,
  department        TEXT,
  role              TEXT NOT NULL CHECK (role IN (
                      'Principal Investigator',
                      'Co-Investigator',
                      'PhD Student',
                      'Masters Student',
                      'Research Assistant'
                    )),
  photo_url         TEXT,
  research_interest TEXT,
  email             TEXT,
  scholar_link      TEXT,
  is_alumni         BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order        INT DEFAULT 0,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Alumni Details
CREATE TABLE IF NOT EXISTS alumni_details (
  member_id      UUID PRIMARY KEY REFERENCES members(id) ON DELETE CASCADE,
  previous_role  TEXT,
  current_status TEXT,
  contact_info   TEXT
);

-- Publications
CREATE TABLE IF NOT EXISTS publications (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  journal_name   TEXT,
  impact_factor  NUMERIC(4,2),
  year           SMALLINT,
  doi_link       TEXT,
  pdf_url        TEXT,
  topic_category UUID REFERENCES research_areas(id) ON DELETE SET NULL,
  authors        TEXT[],
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Projects & Funding
CREATE TABLE IF NOT EXISTS projects (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title          TEXT NOT NULL,
  description    TEXT,
  funding_source TEXT,
  status         TEXT NOT NULL CHECK (status IN ('Ongoing', 'Completed')),
  start_year     SMALLINT,
  end_year       SMALLINT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- News Feeds
CREATE TABLE IF NOT EXISTS news_feeds (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  content      TEXT,
  source       TEXT NOT NULL CHECK (source IN ('Internal', 'PubMed', 'Nature Cancer')),
  url          TEXT UNIQUE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_publications_year    ON publications(year DESC);
CREATE INDEX IF NOT EXISTS idx_publications_topic   ON publications(topic_category);
CREATE INDEX IF NOT EXISTS idx_members_role         ON members(role);
CREATE INDEX IF NOT EXISTS idx_members_is_alumni    ON members(is_alumni);
CREATE INDEX IF NOT EXISTS idx_news_source          ON news_feeds(source);
CREATE INDEX IF NOT EXISTS idx_news_published       ON news_feeds(published_at DESC);
