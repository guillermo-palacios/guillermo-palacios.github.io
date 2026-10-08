// Shape of src/content/es.json and en.json. Both are checked with `satisfies SiteContent` in
// src/i18n/utils.ts, so a missing key or a wrong type makes `astro check` fail.
// Strings starting with "TODO" mark pending content; ui/Todo highlights them (task 10).

export interface NavItem {
  id: string;
  label: string;
}

export interface Link {
  label: string;
  href: string;
}

export interface Highlight {
  title: string;
  text: string;
}

export interface Job {
  role: string;
  company: string;
  period: string;
  location: string;
  context: string;
  description: string;
  highlights: Highlight[];
  chips: string[];
}

export interface StackRow {
  area: string;
  primary: string[];
  secondary: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    ogImage: string;
    favicon: string;
  };
  ui: {
    skipLink: string;
    // Visible logo text; homeLink (its accessible name) must start with it (WCAG 2.5.3).
    brand: string;
    homeLink: string;
    downloadCv: string;
    nav: {
      label: string;
      items: NavItem[];
    };
    menu: {
      // Fixed name of the menu button; the open/closed state comes from the native aria-expanded.
      label: string;
    };
    language: string;
    theme: {
      toLight: string;
      toDark: string;
    };
    // Visible text of the hero pills, which is also their whole accessible name (no aria-label).
    social: {
      github: string;
      linkedin: string;
    };
  };
  profile: {
    name: string;
    role: string;
    location: string;
    email: string;
    github: string;
    linkedin: string;
  };
  hero: {
    // The two lines of the single h1, with no visible separator (spec §6.1).
    name: string;
    role: string;
    subtitle: string;
    portraitAlt: string;
    cta: {
      cv: string;
      contact: string;
    };
  };
  experience: {
    title: string;
    labels: {
      context: string;
      highlights: string;
    };
    items: Job[];
  };
  projects: {
    title: string;
    labels: {
      summary: string;
      engineering: string;
      stack: string;
      decisions: string;
      metrics: string;
      links: string;
    };
    moodnest: {
      name: string;
      context: string;
      summary: string;
      engineering: string;
      stack: string[];
      links: Link[];
    };
    portfolio: {
      name: string;
      summary: string;
      decisions: string[];
      metrics: string;
      links: Link[];
    };
  };
  stack: {
    title: string;
    columns: {
      area: string;
      primary: string;
      secondary: string;
    };
    rows: StackRow[];
  };
  ai: {
    title: string;
    items: string[];
    // Optional sentence on what he always reviews before accepting changes (spec §6.5).
    personalReview?: string;
  };
  education: {
    title: string;
    degree: {
      title: string;
      institution: string;
      note: string;
    };
    languages: {
      label: string;
      items: string[];
    };
    continuousLearning: {
      label: string;
      text: string;
    };
    certificationsLabel: string;
    certifications: Certification[];
  };
  contact: {
    title: string;
    labels: {
      status: string;
      modality: string;
      links: string;
    };
    status: string;
    modality: string[];
    links: {
      email: string;
      linkedin: string;
      github: string;
    };
  };
}
