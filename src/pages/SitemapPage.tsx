/* ══════════════════════════════════════════════════════════
   SitemapPage — /sitemap — Visual HTML sitemap for users
   Also renders an inline JSON preview for crawlers.
   ══════════════════════════════════════════════════════════ */

import { useQuery } from "@animaapp/playground-react-sdk";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SITEMAP_PAGES, SITE_URL } from "@/seo/seoDefaults";

const LANG_LABELS: Record<string, string> = { en: "English (en-CA)", fr: "Français (fr-CA)", es: "Español (es-CA)" };

export default function SitemapPage() {
  const { data: projects } = useQuery("Project", { where: { status: "completed" }, limit: 50 });
  const { data: posts }    = useQuery("BlogPost", { limit: 50, orderBy: { publishedDate: "desc" } });

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <Helmet>
        <title>Sitemap | Aménagement Monzon</title>
        <meta name="description" content="Complete sitemap for Aménagement Monzon — all pages, services, projects and blog posts." />
        <link rel="canonical" href={`${SITE_URL}/sitemap`} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-[10px] tracking-widest text-gray-400 uppercase mb-2">SEO / Sitemap</p>
          <h1 className="font-headline font-bold text-3xl text-charcoal mb-2">Site Map</h1>
          <p className="font-sans text-sm text-gray-500">Complete index of all pages — multilingual (EN / FR / ES)</p>
        </div>

        {/* Hreflang legend */}
        <div className="mb-8 flex flex-wrap gap-3">
          {Object.entries(LANG_LABELS).map(([code, label]) => (
            <span key={code} className="px-3 py-1.5 text-xs font-mono bg-white border border-gray-200 rounded-xl text-gray-500">
              🌐 {label}
            </span>
          ))}
          <span className="px-3 py-1.5 text-xs font-mono bg-white border border-gray-200 rounded-xl text-gray-400">
            x-default → {SITE_URL}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Static Pages */}
          <div>
            <h2 className="font-headline font-semibold text-sm text-charcoal mb-3 border-b border-gray-200 pb-2">Static Pages</h2>
            <ul className="flex flex-col gap-1.5">
              {SITEMAP_PAGES.map((p) => (
                <li key={p.path}>
                  <Link
                    to={p.path}
                    className="flex items-center justify-between group text-sm font-sans text-gray-600 hover:text-charcoal py-1.5 px-3 rounded-lg hover:bg-white transition-colors"
                  >
                    <span className="truncate">{p.path === "/" ? "Home" : p.path.replace("/", "").replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                    <span className="font-mono text-[9px] text-gray-400 ml-2 flex-shrink-0">P{p.priority}</span>
                  </Link>
                  <div className="pl-3 flex flex-wrap gap-1 mt-0.5">
                    {["en-CA","fr-CA","es-CA"].map((l) => (
                      <span key={l} className="text-[9px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{l}</span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h2 className="font-headline font-semibold text-sm text-charcoal mb-3 border-b border-gray-200 pb-2">
              Projects <span className="font-mono text-[10px] text-gray-400 ml-1">({projects?.length ?? 0} completed)</span>
            </h2>
            {!projects || projects.length === 0 ? (
              <p className="font-sans text-xs text-gray-400 px-3">No completed projects yet.</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {projects.slice(0, 20).map((p) => (
                  <li key={p.id} className="px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                    <p className="font-sans text-xs text-gray-600 truncate">{p.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[9px] text-gray-400">/portfolio → {p.id.slice(0, 8)}…</span>
                      <span className="font-mono text-[9px] text-gray-400">{today}</span>
                    </div>
                  </li>
                ))}
                {(projects?.length ?? 0) > 20 && (
                  <li className="px-3 py-1 font-mono text-[10px] text-gray-400">
                    +{(projects?.length ?? 0) - 20} more projects
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Blog Posts */}
          <div>
            <h2 className="font-headline font-semibold text-sm text-charcoal mb-3 border-b border-gray-200 pb-2">
              Blog Posts <span className="font-mono text-[10px] text-gray-400 ml-1">({posts?.length ?? 0})</span>
            </h2>
            {!posts || posts.length === 0 ? (
              <p className="font-sans text-xs text-gray-400 px-3">No blog posts published yet.</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {posts.slice(0, 20).map((post) => (
                  <li key={post.id} className="px-3 py-1.5 rounded-lg hover:bg-white transition-colors">
                    <p className="font-sans text-xs text-gray-600 truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[9px] text-gray-400">/blog</span>
                      <span className="font-mono text-[9px] text-gray-400">{new Date(post.publishedDate).toISOString().split("T")[0]}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* JSON-LD inline for bots */}
        <div className="mt-10 p-4 bg-gray-900 rounded-2xl overflow-auto">
          <p className="font-mono text-[10px] text-gray-500 mb-2">// Sitemap JSON-LD preview (en-CA · fr-CA · es-CA · x-default)</p>
          <pre className="font-mono text-[10px] text-green-400 whitespace-pre-wrap">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Aménagement Monzon — Site Map",
  "url": `${SITE_URL}/sitemap`,
  "hasPart": SITEMAP_PAGES.map((p) => ({
    "@type": "WebPage",
    "url": `${SITE_URL}${p.path}`,
    "inLanguage": ["en-CA", "fr-CA", "es-CA"],
    "dateModified": today,
  })),
}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
