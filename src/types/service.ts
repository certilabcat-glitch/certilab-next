export interface Service {
  slug: string;
  title: string;
  description: string;
  price: number;
  badge: string;
  href: string;
  destacado?: boolean;
  features: string[];
  includes?: string[];
  faq?: FAQItem[];
  ctaLabel?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
