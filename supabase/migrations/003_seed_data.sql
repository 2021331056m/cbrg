-- ============================================================
-- CBRG Website - Seed Data
-- ============================================================

-- Research Areas
INSERT INTO research_areas (title, slug, description, sort_order) VALUES
  ('Molecular Oncology',          'molecular-oncology',      'Investigating the molecular mechanisms driving cancer initiation, progression, and metastasis using advanced genomic and proteomic approaches.', 1),
  ('Cancer Genomics',             'cancer-genomics',         'Comprehensive analysis of genomic alterations in cancer, including somatic mutations, copy number variations, and structural rearrangements.', 2),
  ('Transcriptomics & Microarray','transcriptomics',         'High-throughput RNA expression profiling using microarray and RNA-seq technologies to identify cancer-specific gene expression signatures.', 3),
  ('Personalized Medicine',       'personalized-medicine',   'Developing patient-specific therapeutic strategies based on individual tumor molecular profiles and genetic backgrounds.', 4),
  ('Biomarker Discovery',         'biomarker-discovery',     'Identifying and validating novel molecular biomarkers for early cancer detection, prognosis, and therapeutic response prediction.', 5),
  ('Bioinformatics & Simulation', 'bioinformatics',          'Computational analysis of large-scale biological datasets, network modeling, and in-silico simulation of cancer signaling pathways.', 6)
ON CONFLICT (slug) DO NOTHING;

-- Equipment & Methods (seed a few examples)
INSERT INTO equipment_methods (name, type, research_area_id)
SELECT 'RT-PCR', 'Method', id FROM research_areas WHERE slug = 'molecular-oncology'
ON CONFLICT DO NOTHING;

INSERT INTO equipment_methods (name, type, research_area_id)
SELECT 'Western Blotting', 'Method', id FROM research_areas WHERE slug = 'molecular-oncology'
ON CONFLICT DO NOTHING;

INSERT INTO equipment_methods (name, type, research_area_id)
SELECT 'Next-Generation Sequencing', 'Equipment', id FROM research_areas WHERE slug = 'cancer-genomics'
ON CONFLICT DO NOTHING;

INSERT INTO equipment_methods (name, type, research_area_id)
SELECT 'RNA-seq', 'Method', id FROM research_areas WHERE slug = 'transcriptomics'
ON CONFLICT DO NOTHING;

INSERT INTO equipment_methods (name, type, research_area_id)
SELECT 'Microarray Scanner', 'Equipment', id FROM research_areas WHERE slug = 'transcriptomics'
ON CONFLICT DO NOTHING;

-- Principal Investigator
INSERT INTO members (name, designation, department, role, research_interest, email, is_alumni, sort_order) VALUES
  (
    'Dr. H M Syfuddin',
    'Associate Professor',
    'Department of Biochemistry and Molecular Biology, SUST',
    'Principal Investigator',
    'Cancer molecular biology, theranostics, RNA-based biomarkers, and targeted therapy in solid tumors.',
    'hmsyfuddin@sust.edu',
    FALSE,
    0
  )
ON CONFLICT DO NOTHING;
