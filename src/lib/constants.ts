export const SITE_NAME = "Cancer Biology Research Group";
export const SITE_SHORT_NAME = "CBRG";
export const SITE_DESCRIPTION =
  "Advancing cancer research through molecular oncology, genomics, and theranostics at SUST.";

export const PRIMARY_NAV = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Members", href: "/members" },
  { label: "Alumni", href: "/alumni" },
];

export const SECONDARY_NAV = [
  { label: "Funding", href: "/funding" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const RESEARCH_SLUGS = [
  "molecular-oncology",
  "cancer-genomics",
  "transcriptomics",
  "personalized-medicine",
  "biomarker-discovery",
  "bioinformatics",
] as const;

export const MEMBER_ROLES = [
  "Principal Investigator",
  "Co-Investigator",
  "PhD Student",
  "Masters Student",
  "Research Assistant",
  "Undergraduate Research Trainee",
] as const;

export const NEWS_SOURCES = ["Internal", "PubMed", "Nature Cancer"] as const;
