-- ============================================================
-- CBRG Website — Members & Project Data
-- ============================================================

-- 1. Add "Undergraduate Research Trainee" to the members role constraint
ALTER TABLE members
  DROP CONSTRAINT IF EXISTS members_role_check;

ALTER TABLE members
  ADD CONSTRAINT members_role_check CHECK (role IN (
    'Principal Investigator',
    'Co-Investigator',
    'PhD Student',
    'Masters Student',
    'Research Assistant',
    'Undergraduate Research Trainee'
  ));

-- 2. Remove any duplicate PI rows (keep only the oldest), then update with full details
DELETE FROM members
WHERE role = 'Principal Investigator'
  AND name = 'Dr. H M Syfuddin'
  AND ctid NOT IN (
    SELECT MIN(ctid) FROM members
    WHERE role = 'Principal Investigator' AND name = 'Dr. H M Syfuddin'
  );

UPDATE members
SET
  designation  = 'Associate Professor',
  department   = 'Department of Biochemistry and Molecular Biology, Shahjalal University of Science and Technology, Sylhet-3114, Bangladesh',
  research_interest = 'Cancer molecular biology, theranostics, RNA-based biomarkers, and targeted therapy in solid tumors.',
  email        = 'hmsyfuddin@sust.edu',
  sort_order   = 0
WHERE role = 'Principal Investigator' AND name = 'Dr. H M Syfuddin';

-- 3. Masters Students
INSERT INTO members (name, role, is_alumni, sort_order) VALUES
  ('Naimul Haque Shohan', 'Masters Student', FALSE, 10),
  ('Monjurul Haq Shakib', 'Masters Student', FALSE, 11),
  ('Muluk Hossain',       'Masters Student', FALSE, 12),
  ('MD Mominul Islam',    'Masters Student', FALSE, 13)
ON CONFLICT DO NOTHING;

-- 4. Undergraduate Research Trainees
INSERT INTO members (name, role, is_alumni, sort_order) VALUES
  ('Najiha Yousuf',       'Undergraduate Research Trainee', FALSE, 20),
  ('Sumiya Binte Abedin', 'Undergraduate Research Trainee', FALSE, 21),
  ('Ananna Chowdhury',    'Undergraduate Research Trainee', FALSE, 22),
  ('Mahmud Hasan Sifat',  'Undergraduate Research Trainee', FALSE, 23),
  ('Marjan Fabiha',       'Undergraduate Research Trainee', FALSE, 24),
  ('Atik Arafat Alvi',    'Undergraduate Research Trainee', FALSE, 25)
ON CONFLICT DO NOTHING;

-- 5. Project / Funding
INSERT INTO projects (title, description, funding_source, status, start_year)
VALUES (
  'Detection of an Integrated Biomarker Panel for the Theranostics of Cancer, Diabetes, and Cardiovascular Diseases',
  'This project focuses on identifying a multi-disease biomarker panel to improve early diagnosis, prognosis, and personalized treatment strategies across cancer, diabetes, and cardiovascular diseases. Supported under the HEAT (Higher Education Acceleration and Transformation) initiative — a World Bank–supported research programme.',
  'HEAT (Higher Education Acceleration and Transformation) — World Bank–supported',
  'Ongoing',
  2024
)
ON CONFLICT DO NOTHING;
