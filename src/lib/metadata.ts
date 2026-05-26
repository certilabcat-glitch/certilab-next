import { Metadata } from "next";
import { SITE_URL } from "./constants";

interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  publishedTime?: string;
  authors?: string[];
  type?: "website" | "article";
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/og-image.jpg",
  publishedTime,
  authors,
  type = "website",
}: PageMetadata): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(publishedTime && { publishedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
