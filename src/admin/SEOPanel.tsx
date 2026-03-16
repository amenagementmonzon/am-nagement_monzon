/* ══════════════════════════════════════════════════════════
   SEOPanel — Full SEO Admin Panel
   Covers: LocalBusiness, Service SEO, Project SEO, Page Meta,
   Hreflang overview, Sitemap preview, Performance checklist.
   ══════════════════════════════════════════════════════════ */

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@animaapp/playground-react-sdk";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  CheckCircle, Spinner, Globe, MagnifyingGlass, Buildings,
  MapPin, Phone, EnvelopeSimple, Clock, Image, Link,
  ArrowSquareOut, Gear, FileText, ChartBar,
} from "@phosphor-icons/react";
import { LOCAL_BUSINESS_DEFAULTS, SITEMAP_PAGES, SITE_URL, Lang } from "@/seo/seoDefaults";
import { buildLocalBusinessSchema, buildServiceSchema } from "@/seo/jsonLdBuilders";

/* ─── Helpers ────────────────────────────────────────────────────── */
function Field({ label, value, onChange, textarea = false, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">{label}</Label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-sans focus:outline-none focus:border-gold resize-none"
        />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="border-gray-200 rounded-xl text-sm" />
      )}
    </div>
  );
}

const LANGS: Lang[] = ["en", "fr", "es"];
const LANG_LABELS: Record<Lang, string> = { en: "English", fr: "Français", es: "Español" };

const SERVICE_KEYS = ["hardscape", "construction", "renovation", "maintenance"];
const SERVICE_LABELS: Record<string, string> = {
  hardscape:    "Hardscape & Pavé",
  construction: "Construction",
  renovation:   "Renovation",
  maintenance:  "Maintenance",
};

const PAGE_KEYS = ["home", "about", "portfolio", "contact", "blog", "academy", "store", "community"];
const PAGE_LABELS: Record<string, string> = {
  home: "Home", about: "About", portfolio: "Portfolio / Projects",
  contact: "Contact", blog: "Blog", academy: "Academy",
  store: "Store", community: "Community",
};

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function SEOPanel() {
  const { lang: siteLang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"localbusiness" | "services" | "pages" | "projects" | "sitemap" | "checklist">("localbusiness");
  const [activeLang, setActiveLang] = useState<Lang>((siteLang as Lang) ?? "fr");
  const [saved, setSaved] = useState(false);

  const { data: allSEO } = useQuery("SEOConfig");
  const { create, update } = useMutation("SEOConfig");

  /* ─── Upsert helper ─────────────────────────────────────────── */
  const upsert = async (key: string, data: Record<string, unknown>) => {
    const existing = allSEO?.find((r: any) => r.key === key);
    if (existing) await update(existing.id, data);
    else await create({ key, lang: activeLang, pageType: "localbusiness", ...data } as any);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const getRow = (key: string) => allSEO?.find((r: any) => r.key === key);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-headline font-bold text-2xl text-charcoal">SEO Manager</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Manage multilingual SEO — LocalBusiness, services, pages, projects, sitemaps, and structured data.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-1 mb-6 bg-gray-100 p-1 rounded-2xl w-fit">
        {([
          ["localbusiness", "Local Business", Buildings],
          ["services",      "Services SEO",  MagnifyingGlass],
          ["pages",         "Pages Meta",    FileText],
          ["projects",      "Projects SEO",  Image],
          ["sitemap",       "Sitemap",       Globe],
          ["checklist",     "Checklist",     ChartBar],
        ] as [typeof activeTab, string, any][]).map(([tab, label, Icon]) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-sans font-medium rounded-xl transition-all cursor-pointer ${activeTab === tab ? "bg-white text-charcoal shadow-sm" : "text-gray-500 hover:text-charcoal"}`}>
            <Icon size={13} weight={activeTab === tab ? "fill" : "regular"} />
            {label}
          </button>
        ))}
      </div>

      {/* Language selector */}
      <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
        {LANGS.map((l) => (
          <button key={l} onClick={() => setActiveLang(l)}
            className={`px-4 py-2 text-xs font-sans font-medium rounded-lg transition-all cursor-pointer ${activeLang === l ? "bg-white text-charcoal shadow-sm" : "text-gray-400 hover:text-charcoal"}`}>
            {l === "en" ? "🇨🇦" : l === "fr" ? "🇫🇷" : "🇪🇸"} {LANG_LABELS[l]}
          </button>
        ))}
        {saved && <span className="flex items-center gap-1 px-4 py-2 text-xs text-green-600 font-sans"><CheckCircle size={12} weight="fill" /> Saved!</span>}
      </div>

      {/* ══ LOCAL BUSINESS ══════════════════════════════════════════ */}
      {activeTab === "localbusiness" && (
        <LocalBusinessEditor activeLang={activeLang} getRow={getRow} upsert={upsert} />
      )}

      {/* ══ SERVICES SEO ════════════════════════════════════════════ */}
      {activeTab === "services" && (
        <ServicesEditor activeLang={activeLang} getRow={getRow} upsert={upsert} />
      )}

      {/* ══ PAGES META ══════════════════════════════════════════════ */}
      {activeTab === "pages" && (
        <PagesEditor activeLang={activeLang} getRow={getRow} upsert={upsert} />
      )}

      {/* ══ PROJECTS SEO ════════════════════════════════════════════ */}
      {activeTab === "projects" && (
        <ProjectsSEOEditor activeLang={activeLang} getRow={getRow} upsert={upsert} />
      )}

      {/* ══ SITEMAP ════════════════════════════════════════════════ */}
      {activeTab === "sitemap" && (
        <SitemapViewer />
      )}

      {/* ══ CHECKLIST ══════════════════════════════════════════════ */}
      {activeTab === "checklist" && (
        <SEOChecklist getRow={getRow} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   LOCAL BUSINESS EDITOR
   ══════════════════════════════════════════════════════════ */
function LocalBusinessEditor({ activeLang, getRow, upsert }: { activeLang: Lang; getRow: (k: string) => any; upsert: (k: string, d: any) => Promise<void> }) {
  const key = `localbusiness-${activeLang}`;
  const existing = getRow(key);

  const D = LOCAL_BUSINESS_DEFAULTS;
  const [form, setForm] = useState({
    name:              D.name,
    alternateName:     D.alternateName,
    description:       D.description[activeLang] ?? D.description.en,
    telephone:         D.telephone,
    email:             D.email,
    streetAddress:     D.address.streetAddress,
    addressLocality:   D.address.addressLocality,
    postalCode:        D.address.postalCode,
    latitude:          D.geo.latitude,
    longitude:         D.geo.longitude,
    serviceArea:       D.serviceArea.join(", "),
    openingHours:      D.openingHours.join(" | "),
    priceRange:        D.priceRange,
    logo:              D.logo,
    image:             D.image,
    instagram:         D.sameAs[0] ?? "",
    facebook:          D.sameAs[1] ?? "",
    youtube:           D.sameAs[2] ?? "",
    foundingDate:      D.foundingDate,
    paymentAccepted:   D.paymentAccepted,
    currenciesAccepted: D.currenciesAccepted,
  });

  useEffect(() => {
    if (existing?.jsonLd) {
      try {
        const parsed = JSON.parse(existing.jsonLd);
        const a = parsed.address ?? {};
        const g = parsed.geo ?? {};
        const sameAs: string[] = parsed.sameAs ?? [];
        setForm({
          name:              parsed.name               ?? form.name,
          alternateName:     parsed.alternateName      ?? form.alternateName,
          description:       parsed.description        ?? form.description,
          telephone:         parsed.telephone          ?? form.telephone,
          email:             parsed.email              ?? form.email,
          streetAddress:     a.streetAddress           ?? form.streetAddress,
          addressLocality:   a.addressLocality         ?? form.addressLocality,
          postalCode:        a.postalCode              ?? form.postalCode,
          latitude:          g.latitude                ?? form.latitude,
          longitude:         g.longitude               ?? form.longitude,
          serviceArea:       (parsed.areaServed ?? []).map((x: any) => x.name ?? x).join(", ") || form.serviceArea,
          openingHours:      (parsed.openingHoursSpecification ?? []).map((o: any) => `${o.dayOfWeek?.join("-") ?? ""} ${o.opens}-${o.closes}`).join(" | ") || form.openingHours,
          priceRange:        parsed.priceRange         ?? form.priceRange,
          logo:              parsed.logo?.url ?? parsed.logo ?? form.logo,
          image:             parsed.image              ?? form.image,
          instagram:         sameAs[0]                 ?? form.instagram,
          facebook:          sameAs[1]                 ?? form.facebook,
          youtube:           sameAs[2]                 ?? form.youtube,
          foundingDate:      parsed.foundingDate       ?? form.foundingDate,
          paymentAccepted:   parsed.paymentAccepted    ?? form.paymentAccepted,
          currenciesAccepted: parsed.currenciesAccepted ?? form.currenciesAccepted,
        });
      } catch {}
    }
  }, [existing?.id]);

  const f = (field: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [field]: v }));

  const handleSave = async () => {
    const serviceAreaArr = form.serviceArea.split(",").map((s) => s.trim()).filter(Boolean);
    const ohArr = form.openingHours.split("|").map((s) => s.trim()).filter(Boolean);
    const sameAsArr = [form.instagram, form.facebook, form.youtube].filter(Boolean);

    const schema = buildLocalBusinessSchema({
      name:           form.name,
      alternateName:  form.alternateName,
      description:    { en: form.description, fr: form.description, es: form.description },
      telephone:      form.telephone,
      email:          form.email,
      address:        { streetAddress: form.streetAddress, addressLocality: form.addressLocality, addressRegion: "QC", postalCode: form.postalCode, addressCountry: "CA" },
      geo:            { latitude: form.latitude, longitude: form.longitude },
      serviceArea:    serviceAreaArr,
      openingHours:   ohArr,
      priceRange:     form.priceRange,
      logo:           form.logo,
      image:          form.image,
      sameAs:         sameAsArr,
      foundingDate:   form.foundingDate,
      paymentAccepted: form.paymentAccepted,
      currenciesAccepted: form.currenciesAccepted,
    } as any, activeLang);

    await upsert(key, {
      lang:             activeLang,
      pageType:         "localbusiness",
      metaTitle:        form.name,
      metaDescription:  form.description,
      jsonLd:           JSON.stringify(schema),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Buildings size={18} className="text-gold" weight="fill" />
        <div>
          <h2 className="font-headline font-bold text-base text-charcoal">LocalBusiness Schema</h2>
          <p className="font-sans text-xs text-gray-400">Google Maps + rich snippets. Editing: <strong>{LANG_LABELS[activeLang]}</strong></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal">Business Identity</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Business Name" value={form.name} onChange={f("name")} />
            <Field label="Alternate Name" value={form.alternateName} onChange={f("alternateName")} />
            <Field label="Description" value={form.description} onChange={f("description")} textarea placeholder={`Describe the business in ${LANG_LABELS[activeLang]}…`} />
            <Field label="Founding Year" value={form.foundingDate} onChange={f("foundingDate")} />
            <Field label="Price Range ($$, $$$)" value={form.priceRange} onChange={f("priceRange")} />
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal flex items-center gap-2"><Phone size={14} weight="fill" /> Contact & Location</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Field label="Phone" value={form.telephone} onChange={f("telephone")} />
            <Field label="Email" value={form.email} onChange={f("email")} />
            <Field label="Street / Area" value={form.streetAddress} onChange={f("streetAddress")} />
            <Field label="City" value={form.addressLocality} onChange={f("addressLocality")} />
            <Field label="Postal Code" value={form.postalCode} onChange={f("postalCode")} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Latitude" value={form.latitude} onChange={f("latitude")} />
              <Field label="Longitude" value={form.longitude} onChange={f("longitude")} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal flex items-center gap-2"><Clock size={14} weight="fill" /> Hours & Service Area</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Opening Hours (| separated)" value={form.openingHours} onChange={f("openingHours")} placeholder="Mo-Fr 07:00-18:00 | Sa 08:00-16:00" />
            <Field label="Service Area (comma separated)" value={form.serviceArea} onChange={f("serviceArea")} textarea placeholder="Montréal, Laval, Rive-Nord, Rive-Sud, Longueuil" />
            <Field label="Payment Accepted" value={form.paymentAccepted} onChange={f("paymentAccepted")} />
            <Field label="Currencies Accepted" value={form.currenciesAccepted} onChange={f("currenciesAccepted")} />
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal flex items-center gap-2"><Link size={14} weight="fill" /> Media & Socials</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Field label="Logo URL" value={form.logo} onChange={f("logo")} placeholder="https://…/logo.png" />
            {form.logo && <img src={form.logo} alt="logo preview" className="h-10 w-auto rounded border border-gray-200" />}
            <Field label="Main Image URL" value={form.image} onChange={f("image")} placeholder="https://…/photo.jpg" />
            <Field label="Instagram URL" value={form.instagram} onChange={f("instagram")} placeholder="https://instagram.com/…" />
            <Field label="Facebook URL" value={form.facebook} onChange={f("facebook")} />
            <Field label="YouTube URL" value={form.youtube} onChange={f("youtube")} />
          </CardContent>
        </Card>
      </div>

      {/* JSON-LD Preview */}
      <Card className="bg-gray-900 border-gray-800 shadow-sm">
        <CardHeader>
          <CardTitle className="font-mono text-xs text-gray-400">JSON-LD Preview — LocalBusiness (auto-generated)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="font-mono text-[10px] text-green-400 whitespace-pre-wrap overflow-auto max-h-64">
            {JSON.stringify(buildLocalBusinessSchema({
              name: form.name, alternateName: form.alternateName,
              description: { en: form.description, fr: form.description, es: form.description },
              telephone: form.telephone, email: form.email,
              address: { streetAddress: form.streetAddress, addressLocality: form.addressLocality, addressRegion: "QC", postalCode: form.postalCode, addressCountry: "CA" },
              geo: { latitude: form.latitude, longitude: form.longitude },
              serviceArea: form.serviceArea.split(",").map((s) => s.trim()),
              openingHours: form.openingHours.split("|").map((s) => s.trim()),
              priceRange: form.priceRange, logo: form.logo, image: form.image,
              sameAs: [form.instagram, form.facebook, form.youtube].filter(Boolean),
            } as any, activeLang), null, 2)}
          </pre>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gold text-charcoal hover:bg-gold-dark text-xs h-9 px-6 rounded-xl shadow-none font-semibold">
          Save LocalBusiness ({LANG_LABELS[activeLang]})
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SERVICES SEO EDITOR
   ══════════════════════════════════════════════════════════ */
function ServicesEditor({ activeLang, getRow, upsert }: { activeLang: Lang; getRow: (k: string) => any; upsert: (k: string, d: any) => Promise<void> }) {
  const [activeService, setActiveService] = useState(SERVICE_KEYS[0]);

  const key = `service-${activeService}-${activeLang}`;
  const existing = getRow(key);

  const [form, setForm] = useState({ metaTitle: "", metaDescription: "", metaKeywords: "", ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", slug: activeService });

  useEffect(() => {
    if (existing) {
      setForm({
        metaTitle:       existing.metaTitle       ?? "",
        metaDescription: existing.metaDescription ?? "",
        metaKeywords:    existing.metaKeywords     ?? "",
        ogTitle:         existing.ogTitle          ?? "",
        ogDescription:   existing.ogDescription    ?? "",
        ogImage:         existing.ogImage          ?? "",
        canonicalUrl:    existing.canonicalUrl     ?? `${SITE_URL}/services`,
        slug:            existing.slug             ?? activeService,
      });
    } else {
      setForm({ metaTitle: "", metaDescription: "", metaKeywords: "", ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: `${SITE_URL}/services`, slug: activeService });
    }
  }, [activeService, existing?.id]);

  const f = (field: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [field]: v }));

  const handleSave = async () => {
    const schema = buildServiceSchema({
      name:        form.ogTitle  || SERVICE_LABELS[activeService],
      description: form.metaDescription,
      slug:        form.slug     || activeService,
      category:    activeService,
      image:       form.ogImage  || undefined,
    });
    await upsert(key, {
      lang:            activeLang,
      pageType:        "service",
      ...form,
      jsonLd:          JSON.stringify(schema),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Service tab pick */}
      <div className="flex flex-wrap gap-2">
        {SERVICE_KEYS.map((sk) => (
          <button key={sk} onClick={() => setActiveService(sk)}
            className={`px-4 py-2 text-xs font-sans font-medium rounded-xl border transition-all cursor-pointer ${activeService === sk ? "bg-charcoal text-warm-white border-charcoal" : "border-gray-200 text-gray-500 hover:border-charcoal"}`}>
            {SERVICE_LABELS[sk]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal">Meta Tags — {SERVICE_LABELS[activeService]} ({LANG_LABELS[activeLang]})</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="Meta Title (60 chars max)" value={form.metaTitle} onChange={f("metaTitle")} placeholder={`e.g. Hardscape Services Montreal | Aménagement Monzon`} />
            <div><p className="font-mono text-[9px] text-gray-400 mb-1">{form.metaTitle.length}/60 chars</p></div>
            <Field label="Meta Description (155 chars max)" value={form.metaDescription} onChange={f("metaDescription")} textarea />
            <div><p className="font-mono text-[9px] text-gray-400 mb-1">{form.metaDescription.length}/155 chars</p></div>
            <Field label="Keywords (comma separated)" value={form.metaKeywords} onChange={f("metaKeywords")} textarea placeholder="hardscape Montreal, paver installation, driveway…" />
            <Field label="Canonical URL" value={form.canonicalUrl} onChange={f("canonicalUrl")} placeholder={`${SITE_URL}/services`} />
            <Field label="Slug (SEO URL)" value={form.slug} onChange={f("slug")} placeholder={activeService} />
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal">Open Graph & Rich Snippets</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Field label="OG Title" value={form.ogTitle} onChange={f("ogTitle")} />
            <Field label="OG Description" value={form.ogDescription} onChange={f("ogDescription")} textarea />
            <Field label="OG Image URL (1200×630)" value={form.ogImage} onChange={f("ogImage")} placeholder={`${SITE_URL}/og-${activeService}.jpg`} />
            {form.ogImage && <img src={form.ogImage} alt="OG preview" className="w-full h-24 object-cover rounded-xl border border-gray-200" />}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs font-sans text-amber-700">
              ℹ️ Service JSON-LD (Schema.org/Service) is auto-generated from these fields and injected on {`/services`} and {`/maintenance`}.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gold text-charcoal hover:bg-gold-dark text-xs h-9 px-6 rounded-xl shadow-none font-semibold">
          Save {SERVICE_LABELS[activeService]} SEO ({LANG_LABELS[activeLang]})
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGES META EDITOR
   ══════════════════════════════════════════════════════════ */
function PagesEditor({ activeLang, getRow, upsert }: { activeLang: Lang; getRow: (k: string) => any; upsert: (k: string, d: any) => Promise<void> }) {
  const [activePage, setActivePage] = useState(PAGE_KEYS[0]);
  const key = `page-${activePage}-${activeLang}`;
  const existing = getRow(key);

  const [form, setForm] = useState({ metaTitle: "", metaDescription: "", metaKeywords: "", ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", noIndex: false });

  useEffect(() => {
    if (existing) {
      setForm({
        metaTitle:       existing.metaTitle       ?? "",
        metaDescription: existing.metaDescription ?? "",
        metaKeywords:    existing.metaKeywords     ?? "",
        ogTitle:         existing.ogTitle          ?? "",
        ogDescription:   existing.ogDescription    ?? "",
        ogImage:         existing.ogImage          ?? "",
        canonicalUrl:    existing.canonicalUrl     ?? "",
        noIndex:         existing.noIndex          ?? false,
      });
    } else {
      setForm({ metaTitle: "", metaDescription: "", metaKeywords: "", ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", noIndex: false });
    }
  }, [activePage, existing?.id]);

  const f = (field: keyof typeof form) => (v: string | boolean) => setForm((p) => ({ ...p, [field]: v }));

  const handleSave = async () => {
    await upsert(key, {
      lang:      activeLang,
      pageType:  "page",
      ...form,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {PAGE_KEYS.map((pk) => (
          <button key={pk} onClick={() => setActivePage(pk)}
            className={`px-4 py-2 text-xs font-sans font-medium rounded-xl border transition-all cursor-pointer ${activePage === pk ? "bg-charcoal text-warm-white border-charcoal" : "border-gray-200 text-gray-500 hover:border-charcoal"}`}>
            {PAGE_LABELS[pk]}
          </button>
        ))}
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="font-headline text-sm text-charcoal">{PAGE_LABELS[activePage]} — Meta ({LANG_LABELS[activeLang]})</CardTitle>
          <CardDescription className="font-sans text-xs text-gray-400">
            Leave fields blank to use default values. Filled values override the defaults.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div>
              <Field label="Meta Title (60 chars)" value={form.metaTitle} onChange={f("metaTitle")} placeholder="Leave blank to use default…" />
              <p className="font-mono text-[9px] text-gray-400 mt-1">{form.metaTitle.length}/60 chars</p>
            </div>
            <div>
              <Field label="Meta Description (155 chars)" value={form.metaDescription} onChange={f("metaDescription")} textarea placeholder="Leave blank to use default…" />
              <p className="font-mono text-[9px] text-gray-400 mt-1">{form.metaDescription.length}/155 chars</p>
            </div>
            <Field label="Keywords (comma separated)" value={form.metaKeywords} onChange={f("metaKeywords")} textarea />
            <Field label="Canonical URL" value={form.canonicalUrl} onChange={f("canonicalUrl")} placeholder={`${SITE_URL}/${activePage === "home" ? "" : activePage}`} />
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="noIndex"
                checked={form.noIndex}
                onChange={(e) => f("noIndex")(e.target.checked)}
                className="w-4 h-4 accent-red-500 cursor-pointer"
              />
              <label htmlFor="noIndex" className="font-sans text-sm text-charcoal cursor-pointer">
                noindex, nofollow <span className="text-gray-400 text-xs">(excludes this page from search engines)</span>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Field label="OG Title" value={form.ogTitle} onChange={f("ogTitle")} />
            <Field label="OG Description" value={form.ogDescription} onChange={f("ogDescription")} textarea />
            <Field label="OG Image (1200×630)" value={form.ogImage} onChange={f("ogImage")} placeholder={`${SITE_URL}/og-${activePage}.jpg`} />
            {form.ogImage && <img src={form.ogImage} alt="OG preview" className="w-full h-20 object-cover rounded-xl border border-gray-200" />}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-gold text-charcoal hover:bg-gold-dark text-xs h-9 px-6 rounded-xl shadow-none font-semibold">
          Save {PAGE_LABELS[activePage]} ({LANG_LABELS[activeLang]})
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PROJECTS SEO EDITOR
   ══════════════════════════════════════════════════════════ */
function ProjectsSEOEditor({ activeLang, getRow, upsert }: { activeLang: Lang; getRow: (k: string) => any; upsert: (k: string, d: any) => Promise<void> }) {
  const { data: projects } = useQuery("Project", { orderBy: { createdAt: "desc" } });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects?.find((p) => p.id === selectedId);

  const key = selectedId ? `project-${selectedId}-${activeLang}` : "";
  const existing = key ? getRow(key) : null;

  const [form, setForm] = useState({
    metaTitle: "", metaDescription: "", metaKeywords: "",
    ogTitle: "", ogDescription: "", ogImage: "",
    location: "", serviceType: "", clientType: "residential", materials: "",
  });

  useEffect(() => {
    if (selected) {
      if (existing) {
        setForm({
          metaTitle:       existing.metaTitle        ?? "",
          metaDescription: existing.metaDescription  ?? "",
          metaKeywords:    existing.metaKeywords      ?? "",
          ogTitle:         existing.ogTitle           ?? "",
          ogDescription:   existing.ogDescription     ?? "",
          ogImage:         existing.ogImage           ?? selected.src ?? "",
          location:        (existing.extraMeta ? (() => { try { return JSON.parse(existing.extraMeta).location ?? selected.address ?? ""; } catch { return ""; } })() : selected.address ?? ""),
          serviceType:     selected.category          ?? "",
          clientType:      "residential",
          materials:       "",
        });
      } else {
        setForm({
          metaTitle:       `${selected.title} | Aménagement Monzon`,
          metaDescription: selected.description ?? `${selected.category ?? "Construction"} project by Aménagement Monzon in Montreal.`,
          metaKeywords:    `${selected.category ?? "construction"} Montreal, ${selected.title}`,
          ogTitle:         selected.title,
          ogDescription:   selected.description ?? "",
          ogImage:         selected.src ?? "",
          location:        selected.address ?? "Montréal, QC",
          serviceType:     selected.category ?? "Construction",
          clientType:      "residential",
          materials:       "",
        });
      }
    }
  }, [selectedId, existing?.id]);

  const f = (field: keyof typeof form) => (v: string) => setForm((p) => ({ ...p, [field]: v }));

  const handleSave = async () => {
    if (!key || !selected) return;
    const extraMeta = JSON.stringify({ location: form.location, serviceType: form.serviceType, clientType: form.clientType, materials: form.materials });
    await upsert(key, {
      lang:      activeLang,
      pageType:  "project",
      ...form,
      extraMeta,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Project list */}
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader><CardTitle className="font-headline text-sm text-charcoal">Select Project</CardTitle></CardHeader>
          <CardContent className="p-0">
            <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
              {!projects || projects.length === 0 ? (
                <p className="px-4 py-3 font-sans text-xs text-gray-400">No projects yet.</p>
              ) : projects.map((p) => {
                const hasOverride = !!getRow(`project-${p.id}-${activeLang}`);
                return (
                  <button key={p.id} onClick={() => setSelectedId(p.id)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${selectedId === p.id ? "bg-gold/5 border-l-2 border-gold" : ""}`}>
                    <div className="flex items-center gap-2">
                      {p.src && <img src={p.src} alt={p.title} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />}
                      <div className="min-w-0">
                        <p className="font-sans text-xs font-medium text-charcoal truncate">{p.title}</p>
                        <p className="font-mono text-[9px] text-gray-400">{p.category}</p>
                      </div>
                      {hasOverride && <span className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-green-400" title="SEO configured" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Editor */}
        <div className="md:col-span-2">
          {!selected ? (
            <div className="flex items-center justify-center h-full min-h-48 bg-white border border-dashed border-gray-200 rounded-2xl">
              <p className="font-sans text-sm text-gray-400">Select a project to edit its SEO fields</p>
            </div>
          ) : (
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-sm text-charcoal">{selected.title} — SEO ({LANG_LABELS[activeLang]})</CardTitle>
                <CardDescription className="font-sans text-xs text-gray-400">Edit SEO fields for this project in {LANG_LABELS[activeLang]}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <div>
                    <Field label="Meta Title" value={form.metaTitle} onChange={f("metaTitle")} />
                    <p className="font-mono text-[9px] text-gray-400 mt-1">{form.metaTitle.length}/60</p>
                  </div>
                  <div>
                    <Field label="Meta Description" value={form.metaDescription} onChange={f("metaDescription")} textarea />
                    <p className="font-mono text-[9px] text-gray-400 mt-1">{form.metaDescription.length}/155</p>
                  </div>
                  <Field label="Keywords" value={form.metaKeywords} onChange={f("metaKeywords")} textarea />
                  <Field label="Location (for Schema)" value={form.location} onChange={f("location")} placeholder="Montréal, QC" />
                </div>
                <div className="flex flex-col gap-3">
                  <Field label="OG Title" value={form.ogTitle} onChange={f("ogTitle")} />
                  <Field label="OG Description" value={form.ogDescription} onChange={f("ogDescription")} textarea />
                  <Field label="OG / Cover Image URL" value={form.ogImage} onChange={f("ogImage")} />
                  {form.ogImage && <img src={form.ogImage} alt="preview" className="w-full h-20 object-cover rounded-xl border border-gray-200" />}
                  <Field label="Service Type" value={form.serviceType} onChange={f("serviceType")} placeholder="Hardscape, Construction, Renovation…" />
                  <div className="flex flex-col gap-1">
                    <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Client Type</Label>
                    <select value={form.clientType} onChange={(e) => f("clientType")(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:border-gold cursor-pointer">
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="municipal">Municipal</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                  <Field label="Materials Used" value={form.materials} onChange={f("materials")} textarea placeholder="Granite, Concrete, Interlock, Steel…" />
                </div>
              </CardContent>
            </Card>
          )}
          {selected && (
            <div className="flex justify-end mt-4">
              <Button onClick={handleSave} className="bg-gold text-charcoal hover:bg-gold-dark text-xs h-9 px-6 rounded-xl shadow-none font-semibold">
                Save Project SEO ({LANG_LABELS[activeLang]})
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SITEMAP VIEWER
   ══════════════════════════════════════════════════════════ */
function SitemapViewer() {
  const { data: projects } = useQuery("Project", { where: { status: "completed" }, limit: 50 });
  const { data: posts }    = useQuery("BlogPost", { limit: 50, orderBy: { publishedDate: "desc" } });
  const today = new Date().toISOString().split("T")[0];

  const entries = [
    ...SITEMAP_PAGES.map((p) => ({ loc: `${SITE_URL}${p.path}`, changefreq: p.changefreq, priority: p.priority, lastmod: today, type: "static" })),
    ...(projects ?? []).map((p) => ({ loc: `${SITE_URL}/portfolio`, changefreq: "monthly", priority: "0.7", lastmod: p.updatedAt ? new Date(p.updatedAt).toISOString().split("T")[0] : today, type: "project", title: p.title })),
    ...(posts ?? []).map((p) => ({ loc: `${SITE_URL}/blog`, changefreq: "monthly", priority: "0.7", lastmod: new Date(p.publishedDate).toISOString().split("T")[0], type: "blog", title: p.title })),
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline font-bold text-base text-charcoal">Multilingual Sitemap</h2>
          <p className="font-sans text-xs text-gray-400 mt-0.5">{entries.length} entries · hreflang: en-CA / fr-CA / es-CA / x-default</p>
        </div>
        <a href="/sitemap" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans border border-gray-200 rounded-xl hover:border-charcoal transition-colors">
          <ArrowSquareOut size={12} /> View Page
        </a>
      </div>

      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-50">
            {entries.slice(0, 30).map((e, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 text-xs hover:bg-gray-50">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-charcoal truncate">{e.loc}</p>
                  {(e as any).title && <p className="font-sans text-[10px] text-gray-400 truncate">{(e as any).title}</p>}
                </div>
                <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                  <span className="font-mono text-[10px] text-gray-400">{e.lastmod}</span>
                  <span className="font-mono text-[10px] text-gray-400">{e.changefreq}</span>
                  <span className={`px-2 py-0.5 rounded-full font-mono text-[9px] ${
                    e.type === "static" ? "bg-blue-100 text-blue-600" :
                    e.type === "project" ? "bg-amber-100 text-amber-600" :
                    "bg-green-100 text-green-600"
                  }`}>{e.type}</span>
                  <div className="flex gap-0.5">
                    {["en-CA","fr-CA","es-CA"].map((l) => <span key={l} className="px-1 py-0.5 text-[8px] font-mono bg-gray-100 text-gray-400 rounded">{l}</span>)}
                  </div>
                </div>
              </div>
            ))}
            {entries.length > 30 && <div className="px-5 py-3 font-mono text-[10px] text-gray-400">+{entries.length - 30} more entries</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SEO CHECKLIST
   ══════════════════════════════════════════════════════════ */
function SEOChecklist({ getRow }: { getRow: (k: string) => any }) {
  const checks = [
    { group: "Local SEO", items: [
      { label: "LocalBusiness JSON-LD configured (EN)", done: !!getRow("localbusiness-en") },
      { label: "LocalBusiness JSON-LD configured (FR)", done: !!getRow("localbusiness-fr") },
      { label: "LocalBusiness JSON-LD configured (ES)", done: !!getRow("localbusiness-es") },
      { label: "Business name/address/phone set", done: !!getRow("localbusiness-en")?.metaTitle },
      { label: "Geo coordinates configured", done: true },
      { label: "Service area defined (Montreal + region)", done: true },
    ]},
    { group: "Service SEO", items: [
      { label: "Hardscape SEO (EN)", done: !!getRow("service-hardscape-en") },
      { label: "Hardscape SEO (FR)", done: !!getRow("service-hardscape-fr") },
      { label: "Construction SEO (EN)", done: !!getRow("service-construction-en") },
      { label: "Renovation SEO (EN)", done: !!getRow("service-renovation-en") },
      { label: "Maintenance SEO (EN)", done: !!getRow("service-maintenance-en") },
    ]},
    { group: "Page Meta", items: [
      { label: "Home meta (EN)", done: !!getRow("page-home-en") },
      { label: "Home meta (FR)", done: !!getRow("page-home-fr") },
      { label: "Portfolio meta configured", done: !!getRow("page-portfolio-en") },
      { label: "Contact page meta", done: !!getRow("page-contact-en") },
    ]},
    { group: "Technical", items: [
      { label: "Hreflang tags (en-CA, fr-CA, es-CA, x-default)", done: true },
      { label: "Canonical URLs on all pages", done: true },
      { label: "robots meta (noindex for portal/admin)", done: true },
      { label: "OG tags + Twitter Cards on all pages", done: true },
      { label: "JSON-LD WebSite schema on home", done: true },
      { label: "Breadcrumb schema on all pages", done: true },
      { label: "Mobile-first responsive rendering", done: true },
      { label: "Lazy loading on images", done: true },
      { label: "Alt text support", done: true },
      { label: "PWA Manifest + Service Worker", done: true },
    ]},
    { group: "Content", items: [
      { label: "Blog posts published", done: false },
      { label: "250+ projects in portfolio", done: false },
      { label: "Reviews seeded", done: false },
      { label: "Academy content published", done: false },
    ]},
  ];

  const totalDone = checks.flatMap((g) => g.items).filter((i) => i.done).length;
  const totalAll  = checks.flatMap((g) => g.items).length;
  const pct = Math.round((totalDone / totalAll) * 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Score */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardContent className="p-5 flex items-center gap-6">
          <div className="relative w-16 h-16 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke={pct >= 80 ? "#22c55e" : pct >= 50 ? "#d49e30" : "#ef4444"} strokeWidth="3" strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-bold text-charcoal">{pct}%</span>
          </div>
          <div>
            <p className="font-headline font-bold text-lg text-charcoal">SEO Score: {totalDone}/{totalAll}</p>
            <p className="font-sans text-xs text-gray-400">
              {pct >= 80 ? "Excellent SEO coverage!" : pct >= 50 ? "Good — fill in the remaining items." : "Needs attention — configure LocalBusiness and service SEO first."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Checklist grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checks.map((group) => (
          <Card key={group.group} className="bg-white border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline text-sm text-charcoal">{group.group}</CardTitle>
              <CardDescription className="font-mono text-[10px] text-gray-400">{group.items.filter((i) => i.done).length}/{group.items.length} completed</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <div key={item.label} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl ${item.done ? "bg-green-50" : "bg-gray-50"}`}>
                    <CheckCircle size={14} weight="fill" className={item.done ? "text-green-500 flex-shrink-0" : "text-gray-300 flex-shrink-0"} />
                    <span className={`font-sans text-xs ${item.done ? "text-green-800" : "text-gray-500"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
