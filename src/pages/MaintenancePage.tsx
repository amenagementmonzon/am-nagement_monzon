import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import { useQuery } from "@animaapp/playground-react-sdk";
import { Check, ShoppingCart, Repeat, Buildings, Leaf, Snowflake, Sun, Lightning, House, ArrowUpRight, Star, X } from "@phosphor-icons/react";
import { useLanguage } from "@/contexts/LanguageContext";

const FALLBACK_SERVICES = [
  { id: "s1", name: "Exterior Maintenance Package", description: "Complete exterior upkeep including pressure washing, gutter cleaning, window cleaning, and façade inspection.", category: "exterior", price: "From $199", priceType: "monthly", subscriptionAvailable: "yes", features: '["Pressure washing","Gutter cleaning","Window cleaning","Façade inspection","Monthly report"]', status: "active", popular: "yes" },
  { id: "s2", name: "Interior Maintenance Plan", description: "Scheduled interior checks and maintenance covering HVAC filters, plumbing, electrical testing, and appliance inspection.", category: "interior", price: "From $149", priceType: "monthly", subscriptionAvailable: "yes", features: '["HVAC filter replacement","Plumbing checks","Electrical safety test","Appliance inspection","Priority scheduling"]', status: "active", popular: "no" },
  { id: "s3", name: "Landscaping Care", description: "Weekly or bi-weekly lawn maintenance, hedge trimming, flower bed care, and seasonal planting services.", category: "landscaping", price: "From $89", priceType: "monthly", subscriptionAvailable: "yes", features: '["Lawn mowing","Hedge trimming","Weed control","Seasonal planting","Fertilization"]', status: "active", popular: "yes" },
  { id: "s4", name: "Snow Removal Service", description: "Reliable residential and commercial snow removal, salting, and ice management for Montreal winters.", category: "snow-removal", price: "From $299", priceType: "monthly", subscriptionAvailable: "yes", features: '["24/7 on-call response","Driveway & walkway clearing","Salting & de-icing","Roof snow removal available","Seasonal contract options"]', status: "active", popular: "yes" },
  { id: "s5", name: "Seasonal Transition Package", description: "Spring and fall property walkthroughs with preparation services: spring cleanup, fall winterization, deck sealing, and more.", category: "seasonal", price: "$449", priceType: "fixed", subscriptionAvailable: "no", features: '["Spring property cleanup","Deck sealing & staining","Winter weatherization","Tree & shrub pruning","Drainage inspection"]', status: "active", popular: "no" },
  { id: "s6", name: "Emergency Response Service", description: "24/7 emergency property services for burst pipes, storm damage, flooding, and urgent structural concerns.", category: "emergency", price: "On Estimate", priceType: "custom", subscriptionAvailable: "no", features: '["24/7 availability","Emergency dispatch","Water damage response","Temporary repairs","Insurance documentation"]', status: "active", popular: "no" },
];

const SUBSCRIPTIONS = [
  { id: "sub1", name: "Monthly Plan", desc: "Pay month-to-month, cancel anytime. Full access to all scheduled services.", price: "From $149/mo", badge: "Flexible", color: "border-gray-200" },
  { id: "sub2", name: "Quarterly Plan", desc: "Commit to 3 months and save 10% on all services. Ideal for seasonal needs.", price: "From $405/qtr", badge: "Save 10%", color: "border-gold/40" },
  { id: "sub3", name: "Annual Plan", desc: "Best value. Full year coverage with priority scheduling and 20% savings.", price: "From $1,430/yr", badge: "Best Value", color: "border-gold/60 bg-gold/3" },
  { id: "sub4", name: "Custom Plan", desc: "Tailored service bundles for commercial properties and special requirements.", price: "On Request", badge: "Enterprise", color: "border-charcoal/20" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  exterior:     <Buildings size={18} weight="fill" />,
  interior:     <House size={18} weight="fill" />,
  landscaping:  <Leaf size={18} weight="fill" />,
  "snow-removal": <Snowflake size={18} weight="fill" />,
  seasonal:     <Sun size={18} weight="fill" />,
  emergency:    <Lightning size={18} weight="fill" />,
};

export default function MaintenancePage() {
  const { t } = useLanguage();

  const CATS = [
    { key: "all",          label: t.maintenance.categoryAll       },
    { key: "exterior",     label: t.maintenance.categoryExterior  },
    { key: "interior",     label: t.maintenance.categoryInterior  },
    { key: "landscaping",  label: t.maintenance.categoryLandscaping },
    { key: "snow-removal", label: t.maintenance.categorySnow      },
    { key: "seasonal",     label: t.maintenance.categorySeasonal  },
    { key: "emergency",    label: t.maintenance.categoryEmergency },
  ];

  const [cat, setCat] = useState("all");
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"services"|"subscriptions">("services");
  const [modalSvc, setModalSvc] = useState<typeof FALLBACK_SERVICES[0] | null>(null);
  const [modalSub, setModalSub] = useState<typeof SUBSCRIPTIONS[0] | null>(null);

  const { data: services } = useQuery("ServiceProduct", { where: { status: "active" } });
  const list = (services && services.length > 0) ? services : FALLBACK_SERVICES;
  const filtered = cat === "all" ? list : list.filter(s => s.category === cat);

  const handleAdd = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(prev => { const n = new Set(prev); n.add(id); return n; });
    setTimeout(() => setAdded(prev => { const n = new Set(prev); n.delete(id); return n; }), 2000);
  };

  const closeModal = () => { setModalSvc(null); setModalSub(null); };

  return (
    <>
      <Helmet>
        <title>Maintenance Services – Aménagement Monzon</title>
        <meta name="description" content="Residential and commercial maintenance service packages and subscriptions." />
      </Helmet>
      <PageShell>
        {/* ── Service Detail Modal ── */}
        {(modalSvc || modalSub) && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
            onClick={closeModal}
          >
            <div
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              style={{ animation: "scaleIn 0.22s cubic-bezier(.34,1.56,.64,1) both" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-charcoal transition-all cursor-pointer"
                aria-label="Close"
              >
                <X size={18} weight="bold" />
              </button>

              {modalSvc && (() => {
                const feats = (() => { try { return JSON.parse(modalSvc.features); } catch { return []; } })();
                const isAdded = added.has(modalSvc.id);
                return (
                  <>
                    {modalSvc.popular === "yes" && (
                      <div className="px-6 py-2.5 bg-gold text-charcoal text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <Star size={11} weight="fill" /> {t.maintenance.popular}
                      </div>
                    )}
                    <div className="p-7">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-charcoal/5 flex items-center justify-center flex-shrink-0 text-charcoal">
                          {CATEGORY_ICONS[modalSvc.category] ?? <Buildings size={20} />}
                        </div>
                        <div>
                          <h3 className="font-headline font-bold text-xl text-charcoal leading-tight">{modalSvc.name}</h3>
                          <span className="font-mono text-[11px] text-gray-400 capitalize">{modalSvc.category.replace("-", " ")}</span>
                        </div>
                      </div>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">{modalSvc.description}</p>
                      {feats.length > 0 && (
                        <ul className="flex flex-col gap-2.5 mb-6">
                          {feats.map((f: string) => (
                            <li key={f} className="flex items-center gap-2.5 text-sm font-sans text-gray-700">
                              <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                <Check size={12} weight="bold" className="text-green-500" />
                              </span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="border-t border-gray-100 pt-5 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-headline font-bold text-2xl text-charcoal">{modalSvc.price}</p>
                          <p className="font-mono text-[11px] text-gray-400 uppercase tracking-wide">{modalSvc.priceType}</p>
                        </div>
                        <div className="flex gap-2">
                          {modalSvc.subscriptionAvailable === "yes" && (
                            <button onClick={e => handleAdd(`sub-${modalSvc.id}`, e)} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans font-medium rounded-xl border transition-all cursor-pointer ${added.has(`sub-${modalSvc.id}`) ? "bg-green-500 text-white border-green-500" : "border-gold text-gold hover:bg-gold hover:text-charcoal"}`}>
                              <Repeat size={14} /> {added.has(`sub-${modalSvc.id}`) ? t.maintenance.added : t.maintenance.subscribe}
                            </button>
                          )}
                          <button onClick={e => handleAdd(modalSvc.id, e)} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans font-medium rounded-xl transition-all cursor-pointer ${isAdded ? "bg-green-500 text-white" : "bg-charcoal text-gold hover:bg-gold hover:text-charcoal"}`}>
                            <ShoppingCart size={14} /> {isAdded ? t.maintenance.added : t.maintenance.add}
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}

              {modalSub && (
                <div className="p-7">
                  <span className="inline-block px-3 py-1 text-[10px] font-mono bg-gold/10 text-gold rounded-full mb-4">{modalSub.badge}</span>
                  <h3 className="font-headline font-bold text-2xl text-charcoal mb-3">{modalSub.name}</h3>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed mb-6">{modalSub.desc}</p>
                  <div className="border-t border-gray-100 pt-5 flex items-center justify-between gap-3">
                    <p className="font-headline font-bold text-2xl text-charcoal">{modalSub.price}</p>
                    <button className="px-6 py-2.5 text-sm font-sans font-semibold bg-charcoal text-gold rounded-xl hover:bg-gold hover:text-charcoal transition-all duration-300 cursor-pointer">
                      {t.maintenance.getStarted}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <PageHero eyebrow={t.maintenance.pageEyebrow} title={t.maintenance.pageTitle} subtitle={t.maintenance.pageSubtitle} />

        {/* Toggle */}
        <section className="py-6 bg-white border-b border-gray-100 sticky top-[72px] z-30">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
              <button onClick={() => setView("services")} className={`px-5 py-2 text-sm font-sans font-medium rounded-lg transition-all cursor-pointer ${view === "services" ? "bg-white text-charcoal shadow-sm" : "text-gray-400"}`}>{t.maintenance.tabServices}</button>
              <button onClick={() => setView("subscriptions")} className={`px-5 py-2 text-sm font-sans font-medium rounded-lg transition-all cursor-pointer ${view === "subscriptions" ? "bg-white text-charcoal shadow-sm" : "text-gray-400"}`}>{t.maintenance.tabSubscriptions}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATS.map(c => (
                <button key={c.key} onClick={() => setCat(c.key)} className={["px-3 py-1.5 text-xs font-mono rounded-xl border transition-all duration-200 cursor-pointer", c.key === cat ? "bg-charcoal text-gold border-charcoal" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"].join(" ")}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {view === "services" && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(svc => {
                  const feats = (() => { try { return JSON.parse(svc.features); } catch { return []; } })();
                  const isAdded = added.has(svc.id);
                  return (
                    <div key={svc.id} onClick={() => setModalSvc(svc as any)} className={`group flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 cursor-pointer active:scale-[0.98] ${svc.popular === "yes" ? "border-gold/40" : "border-gray-200"}`}>
                      {svc.popular === "yes" && (
                        <div className="px-5 py-2 bg-gold text-charcoal text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Star size={11} weight="fill" /> Most Popular
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-charcoal/5 flex items-center justify-center flex-shrink-0 text-charcoal">
                            {CATEGORY_ICONS[svc.category] ?? <Buildings size={18} />}
                          </div>
                          <div>
                            <h3 className="font-headline font-bold text-base text-charcoal leading-tight">{svc.name}</h3>
                            <span className="font-mono text-[10px] text-gray-400 capitalize">{svc.category.replace("-", " ")}</span>
                          </div>
                        </div>
                        <p className="font-sans text-sm text-gray-500 leading-relaxed mb-5">{svc.description}</p>
                        {feats.length > 0 && (
                          <ul className="flex flex-col gap-2 mb-5">
                            {feats.map((f: string) => (
                              <li key={f} className="flex items-center gap-2 text-xs font-sans text-gray-600">
                                <Check size={13} weight="bold" className="text-green-500 flex-shrink-0" /> {f}
                              </li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div>
                            <p className="font-headline font-bold text-lg text-charcoal">{svc.price}</p>
                            <p className="font-mono text-[10px] text-gray-400">{svc.priceType}</p>
                          </div>
                          <div className="flex gap-2">
                            {svc.subscriptionAvailable === "yes" && (
                              <button onClick={e => handleAdd(`sub-${svc.id}`, e)} className={`flex items-center gap-1 px-3 py-2 text-[11px] font-sans rounded-xl border transition-all cursor-pointer ${added.has(`sub-${svc.id}`) ? "bg-green-500 text-white border-green-500" : "border-gold text-gold hover:bg-gold hover:text-charcoal"}`}>
                                <Repeat size={12} /> {added.has(`sub-${svc.id}`) ? t.maintenance.added : t.maintenance.subscribe}
                              </button>
                            )}
                            <button onClick={e => handleAdd(svc.id, e)} className={`flex items-center gap-1 px-3 py-2 text-[11px] font-sans rounded-xl transition-all cursor-pointer ${isAdded ? "bg-green-500 text-white" : "bg-charcoal text-gold hover:bg-gold hover:text-charcoal"}`}>
                              <ShoppingCart size={12} /> {isAdded ? t.maintenance.added : t.maintenance.add}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {view === "subscriptions" && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10">
              <div className="text-center mb-12">
                <h2 className="font-headline font-bold text-fluid-xl text-charcoal">{t.maintenance.subscribeTitle}</h2>
                <p className="font-sans text-sm text-gray-500 mt-3 max-w-lg mx-auto">{t.maintenance.subscribeSubtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {SUBSCRIPTIONS.map(sub => (
                  <div key={sub.id} onClick={() => setModalSub(sub)} className={`group flex flex-col p-6 rounded-2xl border-2 relative bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 cursor-pointer active:scale-[0.98] ${sub.color}`}>
                    <span className="inline-block px-2.5 py-0.5 text-[9px] font-mono bg-gold/10 text-gold rounded-full mb-4 w-fit">{sub.badge}</span>
                    <h3 className="font-headline font-bold text-lg text-charcoal mb-2">{sub.name}</h3>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed flex-1 mb-5">{sub.desc}</p>
                      <div className="border-t border-gray-100 pt-4">
                      <p className="font-headline font-bold text-xl text-charcoal mb-4">{sub.price}</p>
                      <button className="w-full px-4 py-2.5 text-sm font-sans font-semibold bg-charcoal text-gold rounded-xl hover:bg-gold hover:text-charcoal transition-all duration-300 cursor-pointer">
                        {t.maintenance.getStarted}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-8 bg-charcoal rounded-3xl text-center">
                <p className="font-headline font-bold text-2xl text-warm-white mb-3">{t.maintenance.customPlanTitle}</p>
                <p className="font-sans text-sm text-gray-400 mb-6">{t.maintenance.customPlanDesc}</p>
                <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-charcoal font-sans font-semibold text-sm rounded-xl hover:bg-gold-dark transition-all">
                  {t.maintenance.customPlanBtn} <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </section>
        )}
      </PageShell>
    </>
  );
}
