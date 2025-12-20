
export interface Service {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  theme: string;
}

export interface LocationData {
  label: string;
  address: string;
  phone: string;
  email: string;
  mapUrl?: string;
}

export interface Locations {
  athens: LocationData;
  filiatra: LocationData;
}

export interface HeroData {
  h1: string;
  sub: string;
  cta_primary: string;
  cta_secondary: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
}

export interface StatItem {
  value: string;
  label: string;
  desc: string;
}

export interface LegacyData {
  title: string;
  subtitle: string;
  about: string;
  events: TimelineEvent[];
}

export interface PortfolioItem {
  title: string;
  category: string;
  url: string;
  image: string;
}

export interface PhilosophyItem {
  title: string;
  desc: string;
}

export interface DigitalData {
  title: string;
  subtitle: string;
  description: string;
  narrative: string;
  philosophy: PhilosophyItem[];
  projects: PortfolioItem[];
}

export interface AppData {
  company: string;
  tagline: string;
  hero: HeroData;
  legacy: LegacyData;
  stats: StatItem[];
  services: Service[];
  locations: Locations;
  digital: DigitalData;
}
