/* ══════════════════════════════════════════════════════════
   JSON-LD SCHEMA BUILDERS — Aménagement Monzon
   Generates valid Schema.org structured data for each entity type.
   ══════════════════════════════════════════════════════════ */

import { LOCAL_BUSINESS_DEFAULTS, SITE_URL, Lang } from "./seoDefaults";

type LocalBusinessConfig = typeof LOCAL_BUSINESS_DEFAULTS & {
  description: string;
};

/* ─── LocalBusiness + Contractor (Google Maps + Rich Snippets) ─── */
export function buildLocalBusinessSchema(cfg: Partial<typeof LOCAL_BUSINESS_DEFAULTS> & { description?: string } = {}, lang: Lang = "en"): object {
  const c = { ...LOCAL_BUSINESS_DEFAULTS, ...cfg };
  const description = typeof c.description === "string" ? c.description : (c.description as Record<Lang, string>)[lang];
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Contractor", "HomeAndConstructionBusiness"],
    "@id": `${c.url}/#localbusiness`,
    "name": c.name,
    "alternateName": c.alternateName,
    "description": description,
    "url": c.url,
    "telephone": c.telephone,
    "email": c.email,
    "priceRange": c.priceRange,
    "foundingDate": c.foundingDate,
    "currenciesAccepted": c.currenciesAccepted,
    "paymentAccepted": c.paymentAccepted,
    "areaServed": c.serviceArea.map((area: string) => ({
      "@type": "City",
      "name": area,
    })),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": c.address.streetAddress,
      "addressLocality": c.address.addressLocality,
      "addressRegion": c.address.addressRegion,
      "postalCode": c.address.postalCode,
      "addressCountry": c.address.addressCountry,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": c.geo.latitude,
      "longitude": c.geo.longitude,
    },
    "openingHoursSpecification": c.openingHours.map((spec: string) => {
      const parts = spec.split(" ");
      const days = parts[0].split("-");
      const times = parts[1]?.split("-") ?? ["00:00", "23:59"];
      return {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": days,
        "opens": times[0],
        "closes": times[1],
      };
    }),
    "logo": {
      "@type": "ImageObject",
      "url": c.logo,
      "width": 512,
      "height": 512,
    },
    "image": c.image,
    "sameAs": c.sameAs,
    "hasMap": c.hasMap,
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": c.numberOfEmployees.minValue,
      "maxValue": c.numberOfEmployees.maxValue,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "250",
      "bestRating": "5",
      "worstRating": "1",
    },
  };
}

/* ─── Service Schema ─────────────────────────────────────────────── */
export function buildServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
  image?: string;
  areaServed?: string[];
  provider?: string;
  category?: string;
  offers?: { price?: string; priceCurrency?: string };
}): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `${SITE_URL}/${service.slug}`,
    "image": service.image ?? `${SITE_URL}/og-${service.slug}.jpg`,
    "provider": {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      "name": service.provider ?? "Aménagement Monzon",
    },
    "areaServed": (service.areaServed ?? LOCAL_BUSINESS_DEFAULTS.serviceArea).map((area: string) => ({
      "@type": "City",
      "name": area,
    })),
    "serviceType": service.category ?? service.name,
    "category": service.category ?? "HomeAndConstructionBusiness",
    ...(service.offers ? {
      "offers": {
        "@type": "Offer",
        "priceCurrency": service.offers.priceCurrency ?? "CAD",
        "price": service.offers.price ?? "Contact for pricing",
        "availability": "https://schema.org/InStock",
      },
    } : {}),
  };
}

/* ─── Project / Portfolio Schema ─────────────────────────────────── */
export function buildProjectSchema(project: {
  id: string;
  title: string;
  description?: string;
  image?: string;
  address?: string;
  category?: string;
  clientType?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  materials?: string[];
  services?: string[];
  contractorName?: string;
}): object {
  const contractingWork: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/portfolio/${project.id}`,
    "name": project.title,
    "description": project.description ?? `${project.category ?? "Construction"} project by Aménagement Monzon`,
    "url": `${SITE_URL}/portfolio/${project.id}`,
    "image": project.image ?? `${SITE_URL}/og-portfolio.jpg`,
    "creator": {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      "name": project.contractorName ?? "Aménagement Monzon",
    },
    "about": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": project.address ?? "Montréal",
        "addressCountry": "CA",
      },
    },
    "additionalType": project.category ?? "ConstructionProject",
  };
  if (project.startDate) contractingWork["datePublished"] = new Date(project.startDate).toISOString().split("T")[0];
  if (project.endDate)   contractingWork["dateModified"]  = new Date(project.endDate).toISOString().split("T")[0];
  return contractingWork;
}

/* ─── BreadcrumbList ─────────────────────────────────────────────── */
export function buildBreadcrumbSchema(crumbs: { name: string; url: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": c.name,
      "item": c.url,
    })),
  };
}

/* ─── WebSite + Sitelinks Search Box ────────────────────────────── */
export function buildWebsiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "url": SITE_URL,
    "name": "Aménagement Monzon",
    "description": "Premium construction, renovation, hardscape, landscaping and maintenance services in Montreal.",
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#localbusiness`,
    },
    "inLanguage": ["en", "fr", "es"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/portfolio?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─── FAQ Schema ─────────────────────────────────────────────────── */
export function buildFAQSchema(faqs: { question: string; answer: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

/* ─── Review / AggregateRating ──────────────────────────────────── */
export function buildReviewSchema(reviews: { author: string; rating: number; text: string; date?: string }[]): object[] {
  return reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": { "@type": "Person", "name": r.author },
    "reviewRating": { "@type": "Rating", "ratingValue": String(r.rating), "bestRating": "5" },
    "reviewBody": r.text,
    "itemReviewed": {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
    },
    ...(r.date ? { "datePublished": r.date } : {}),
  }));
}

/* ─── Hreflang tag builder ───────────────────────────────────────── */
export function buildHreflangTags(path: string): { lang: string; href: string }[] {
  const LANGS = ["en", "fr", "es"];
  const HREFLANG_MAP: Record<string, string> = {
    en: "en-CA",
    fr: "fr-CA",
    es: "es-CA",
  };
  return [
    ...LANGS.map((lang) => ({
      lang: HREFLANG_MAP[lang],
      href: `${SITE_URL}${path}`,
    })),
    { lang: "x-default", href: `${SITE_URL}${path}` },
  ];
}

/* ─── Sitemap entry builder ─────────────────────────────────────── */
export function buildSitemapEntry(path: string, changefreq = "weekly", priority = "0.8", lastmod?: string): object {
  const hreflangEntries = ["en-CA", "fr-CA", "es-CA", "x-default"].map((lang) => ({
    "@rel": "alternate",
    "@hreflang": lang,
    "@href": `${SITE_URL}${path}`,
  }));
  return {
    loc: `${SITE_URL}${path}`,
    changefreq,
    priority,
    lastmod: lastmod ?? new Date().toISOString().split("T")[0],
    "xhtml:link": hreflangEntries,
  };
}
