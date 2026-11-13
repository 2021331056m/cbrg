export interface ResearchArea {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface EquipmentMethod {
  id: string;
  name: string;
  type: "Method" | "Equipment";
  research_area_id: string | null;
}

export type MemberRole =
  | "Principal Investigator"
  | "Co-Investigator"
  | "PhD Student"
  | "Masters Student"
  | "Research Assistant"
  | "Undergraduate Research Trainee"
  | "MS Researcher";


export interface Member {
  id: string;
  name: string;
  designation: string | null;
  department: string | null;
  role: MemberRole;
  photo_url: string | null;
  research_interest: string | null;
  undergraduate_research: string | null; 
  email: string | null;
  scholar_link: string | null;
  is_alumni: boolean;
  sort_order: number;
  created_at: string;
}

export interface AlumniDetail {
  member_id: string;
  previous_role: string | null;
  current_status: string | null;
  contact_info: string | null;
}

export type AlumniMember = Member & { alumni_details: AlumniDetail | null };

export interface Publication {
  id: string;
  title: string;
  journal_name: string | null;
  impact_factor: number | null;
  year: number | null;
  doi_link: string | null;
  pdf_url: string | null;
  topic_category: string | null;
  authors: string[] | null;
  created_at: string;
  research_areas?: { title: string; slug: string } | null;
}

export type ProjectStatus = "Ongoing" | "Completed";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  funding_source: string | null;
  status: ProjectStatus;
  start_year: number | null;
  end_year: number | null;
  created_at: string;
}

export type NewsSource = "Internal" | "PubMed" | "Nature Cancer";

export interface NewsFeed {
  id: string;
  title: string;
  content: string | null;
  source: NewsSource;
  url: string | null;
  published_at: string;
  created_at: string;
}
