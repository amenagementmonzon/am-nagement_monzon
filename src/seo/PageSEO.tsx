/* ══════════════════════════════════════════════════════════
   PageSEO — Dynamic SEO head manager
   Drop <PageSEO pageKey="home" /> inside any page component.
   Reads DB overrides, falls back to defaults, injects JSON-LD.
   ══════════════════════════════════════════════════════════ */

import { Helmet } from "react-helmet-async";
import { useQuery } from "@animaapp/playground-react-sdk";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  PAGE_SEO_DEFAULTS,
  SERVICE_SEO_DEFAULTS,
  SITE_URL,
  Lang,
  PageSEOData,
} from "./seoDefaults";
import {
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildProjectSchema,
  buildBreadcrumbSchema,
  buildWebsiteSchema,
  buildHreflangTags,
} from "./jsonLdBuilders";

/* ─── Props ──────────────────────────────────────────────────────── */
interface PageSEOProps {
  /** Key matching PAGE_SEO_DEFAULTS (e.g. "home", "contact", "portfolio") */
  pageKey?: string;
  /** Service key for service-specific SEO (e.g. "hardscape", "renovation") */
  serviceKey?: string;
  /** Project object for project-specific SEO */
  project?: {
    id: string;
    title: string;
    description?: string;
    src?: string;
    address?: string;
    category?: string;
    startDate?: Date | string;
    endDate?: Date | string;
  };
  /** Override title directly */
  title?: string;
  /** Override description directly */
  description?: string;
  /** Override OG image directly */
  ogImage?: string;
  /** Whether to noindex (e.g. portal, admin) */
  noIndex?: boolean;
  /** Breadcrumb list */
  breadcrumbs?: { name: string; url: string }[];
  /** Additional JSON-LD blobs */
  extraJsonLd?: object[];
}

export default function PageSEO({
  pageKey,
  serviceKey,
  project,
  title: titleProp,
  description: descProp,
  ogImage: ogImageProp,
  noIndex = false,
  breadcrumbs,
  extraJsonLd = [],
}: PageSEOProps) {
  const { lang } = useLanguage();

  /* ─── Pull DB override for this page + lang ───────────────────── */
  const seoKey = project
    ? `project-${project.id}-${lang}`
    : serviceKey
    ? `service-${serviceKey}-${lang}`
    : `page-${pageKey ?? "home"}-${lang}`;

  const { data: seoRows } = useQuery("SEOConfig", {
    where: { key: seoKey },
    limit: 1,
  });
  const dbRow = seoRows?.[0];

  /* ─── Pull LocalBusiness DB config ────────────────────────────── */
  const { data: lbRows } = useQuery("SEOConfig", {
    where: { key: `localbusiness-${lang}` },
    limit: 1,
  });
  const lbRow = lbRows?.[0];

  /* ─── Merge defaults → DB overrides → prop overrides ──────────── */
  const defaults: Partial<PageSEOData> = project
    ? {
        metaTitle: `${project.title} | Aménagement Monzon`,
        metaDescription: project.description ?? `${project.category ?? "Construction"} project by Aménagement Monzon in Montreal.`,
        metaKeywords: `${project.category ?? "construction"} Montreal, ${project.title}, Amenagement Monzon project`,
        ogTitle:       `${project.title} | Aménagement Monzon`,
        ogDescription: project.description ?? `${project.category ?? "Construction"} project in ${project.address ?? "Montreal"}.`,
        ogImage:       project.src ?? `${SITE_URL}/og-portfolio.jpg`,
        canonicalUrl:  `${SITE_URL}/portfolio`,
      }
    : serviceKey
    ? (SERVICE_SEO_DEFAULTS[serviceKey]?.[lang as Lang] ?? {})
    : (PAGE_SEO_DEFAULTS[pageKey ?? "home"]?.[lang as Lang] ?? {});

  const merged: Partial<PageSEOData> = {
    ...defaults,
    ...(dbRow ? {
      metaTitle:       dbRow.metaTitle        || undefined,
      metaDescription: dbRow.metaDescription  || undefined,
      metaKeywords:    dbRow.metaKeywords      || undefined,
      ogTitle:         dbRow.ogTitle           || undefined,
      ogDescription:   dbRow.ogDescription     || undefined,
      ogImage:         dbRow.ogImage           || undefined,
      canonicalUrl:    dbRow.canonicalUrl      || undefined,
      noIndex:         dbRow.noIndex ?? undefined,
    } : {}),
  };

  const finalTitle       = titleProp       || merged.metaTitle       || "Aménagement Monzon";
  const finalDescription = descProp        || merged.metaDescription || "Premium construction, renovation, landscaping and maintenance services in Montreal.";
  const finalOgImage     = ogImageProp     || merged.ogImage         || `${SITE_URL}/og-home.jpg`;
  const finalCanonical   = merged.canonicalUrl || `${SITE_URL}${window.location.pathname}`;
  const isNoIndex        = noIndex || merged.noIndex || dbRow?.noIndex || false;

  /* ─── Build hreflang tags ─────────────────────────────────────── */
  const hreflangTags = buildHreflangTags(window.location.pathname);

  /* ─── Build JSON-LD payloads ──────────────────────────────────── */
  const jsonLdPayloads: object[] = [];

  // Always include WebSite schema on home
  if (!pageKey || pageKey === "home") {
    jsonLdPayloads.push(buildWebsiteSchema());
  }

  // LocalBusiness on home and contact
  if (!pageKey || pageKey === "home" || pageKey === "contact" || pageKey === "about") {
    let lbConfig = {};
    if (lbRow?.jsonLd) {
      try { lbConfig = JSON.parse(lbRow.jsonLd); } catch {}
    }
    jsonLdPayloads.push(buildLocalBusinessSchema(lbConfig, lang as Lang));
  }

  // Service schema
  if (serviceKey) {
    const svcDefaults = SERVICE_SEO_DEFAULTS[serviceKey]?.[lang as Lang] ?? {};
    jsonLdPayloads.push(buildServiceSchema({
      name:        svcDefaults.ogTitle ?? serviceKey,
      description: svcDefaults.metaDescription ?? "",
      slug:        "services",
      category:    serviceKey,
    }));
  }

  // Project schema
  if (project) {
    jsonLdPayloads.push(buildProjectSchema({
      id:          project.id,
      title:       project.title,
      description: project.description,
      image:       project.src,
      address:     project.address,
      category:    project.category,
      startDate:   project.startDate,
      endDate:     project.endDate,
    }));
  }

  // Breadcrumbs
  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLdPayloads.push(buildBreadcrumbSchema(breadcrumbs));
  }

  // Custom JSON-LD from DB
  if (dbRow?.jsonLd) {
    try {
      const parsed = JSON.parse(dbRow.jsonLd);
      if (Array.isArray(parsed)) jsonLdPayloads.push(...parsed);
      else jsonLdPayloads.push(parsed);
    } catch {}
  }

  // Extra JSON-LD injected by caller
  jsonLdPayloads.push(...extraJsonLd);

  /* ─── Language → HTML lang attribute mapping ──────────────────── */
  const htmlLangMap: Record<string, string> = { en: "en-CA", fr: "fr-CA", es: "es-CA" };

  return (
    <Helmet>
      {/* ── Core ──────────────────────────────────────────────── */}
      <html lang={htmlLangMap[lang] ?? "en-CA"} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {merged.metaKeywords && <meta name="keywords" content={merged.metaKeywords} />}
      {isNoIndex ? <meta name="robots" content="noindex,nofollow" /> : <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />}

      {/* ── Canonical ─────────────────────────────────────────── */}
      <link rel="canonical" href={finalCanonical} />

      {/* ── Hreflang ──────────────────────────────────────────── */}
      {hreflangTags.map((h) => (
        <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
      ))}

      {/* ── Open Graph ────────────────────────────────────────── */}
      <meta property="og:type"        content="website" />
      <meta property="og:locale"      content={htmlLangMap[lang] ?? "en_CA"} />
      <meta property="og:locale:alternate" content="en_CA" />
      <meta property="og:locale:alternate" content="fr_CA" />
      <meta property="og:locale:alternate" content="es_CA" />
      <meta property="og:title"       content={merged.ogTitle       ?? finalTitle} />
      <meta property="og:description" content={merged.ogDescription ?? finalDescription} />
      <meta property="og:image"       content={finalOgImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={finalTitle} />
      <meta property="og:url"         content={finalCanonical} />
      <meta property="og:site_name"   content="Aménagement Monzon" />

      {/* ── Twitter Card ──────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@amenagementmonzon" />
      <meta name="twitter:title"       content={merged.ogTitle       ?? finalTitle} />
      <meta name="twitter:description" content={merged.ogDescription ?? finalDescription} />
      <meta name="twitter:image"       content={finalOgImage} />

      {/* ── Geographic / Local ────────────────────────────────── */}
      <meta name="geo.region"    content="CA-QC" />
      <meta name="geo.placename" content="Montréal, Québec" />
      <meta name="geo.position"  content="45.5017;-73.5673" />
      <meta name="ICBM"          content="45.5017, -73.5673" />

      {/* ── JSON-LD structured data ────────────────────────────── */}
      {jsonLdPayloads.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema, null, 2)}
        </script>
      ))}
    </Helmet>
  );
}

/* ─── Convenience wrappers ────────────────────────────────────────── */
export function HomeSEO()        { return <PageSEO pageKey="home"      breadcrumbs={[{ name: "Home",     url: SITE_URL }]} />; }
export function AboutSEO()       { return <PageSEO pageKey="about"     breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "About",     url: `${SITE_URL}/about`      }]} />; }
export function ServicesSEO()    { return <PageSEO pageKey="services"  breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Services",  url: `${SITE_URL}/services`   }]} />; }
export function PortfolioSEO()   { return <PageSEO pageKey="portfolio" breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Portfolio", url: `${SITE_URL}/portfolio`  }]} />; }
export function ContactSEO()     { return <PageSEO pageKey="contact"   breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Contact",   url: `${SITE_URL}/contact`    }]} />; }
export function BlogSEO()        { return <PageSEO pageKey="blog"      breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Blog",      url: `${SITE_URL}/blog`       }]} />; }
export function AcademySEO()     { return <PageSEO pageKey="academy"   breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Academy",   url: `${SITE_URL}/academy`    }]} />; }
export function StoreSEO()       { return <PageSEO pageKey="store"     breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Store",     url: `${SITE_URL}/store`      }]} />; }
export function MaintenanceSEO() { return <PageSEO serviceKey="maintenance" breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Maintenance", url: `${SITE_URL}/maintenance` }]} />; }
export function CommunitySEO()   { return <PageSEO pageKey="community" breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Community", url: `${SITE_URL}/community`  }]} />; }

export function HardscapeSEO()   { return <PageSEO serviceKey="hardscape"   breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Services", url: `${SITE_URL}/services` }, { name: "Hardscape",    url: `${SITE_URL}/services` }]} />; }
export function ConstructionSEO(){ return <PageSEO serviceKey="construction" breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Services", url: `${SITE_URL}/services` }, { name: "Construction", url: `${SITE_URL}/services` }]} />; }
export function RenovationSEO()  { return <PageSEO serviceKey="renovation"  breadcrumbs={[{ name: "Home", url: SITE_URL }, { name: "Services", url: `${SITE_URL}/services` }, { name: "Renovation",   url: `${SITE_URL}/services` }]} />; }

export function PortalSEO()      { return <PageSEO pageKey="portal" noIndex title="Client Portal | Aménagement Monzon" />; }
export function AdminSEO()       { return <PageSEO pageKey="admin"  noIndex title="Admin Panel | Aménagement Monzon" />; }
export function LoginSEO()       { return <PageSEO pageKey="login"  noIndex title="Sign In | Aménagement Monzon" />; }
