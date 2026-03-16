import { useEffect, useRef } from "react";
import { Buildings, Wrench, Tree, Shield, ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();
  const SERVICES = [
    { icon: Buildings, tag: "01", title: t.services.s1Title, desc: t.services.s1Desc, tags: t.services.s1Tags },
    { icon: Wrench,    tag: "02", title: t.services.s2Title, desc: t.services.s2Desc, tags: t.services.s2Tags },
    { icon: Tree,      tag: "03", title: t.services.s3Title, desc: t.services.s3Desc, tags: t.services.s3Tags },
    { icon: Shield,    tag: "04", title: t.services.s4Title, desc: t.services.s4Desc, tags: t.services.s4Tags },
  ];
  const cardsRef   = useRef<(HTMLElement | null)[]>([]);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el    = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.delay || "0", 10);
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );

    [...(cardsRef.current), headerRef.current].forEach((el) => {
      if (el) {
        el.classList.add("stagger-child");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative bg-white overflow-hidden" style={{ paddingTop: "var(--section-pad-y)", paddingBottom: "var(--section-pad-y)" }} aria-label="Our services">

      {/* Background grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(hsl(210,15%,12%) 1px, transparent 1px), linear-gradient(90deg, hsl(210,15%,12%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-screen-xl mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20" data-delay="0">
          <div>
            <span className="section-eyebrow text-gold/70 block mb-5">
              <span className="inline-block w-8 h-px bg-gold/50 mr-4 align-middle" />
              {t.services.eyebrow}
            </span>
            <h2 className="font-headline font-light text-charcoal" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
              {t.services.title}
            </h2>
          </div>
          <p className="font-sans font-light text-gray-500 max-w-md leading-relaxed" style={{ fontSize: "0.9375rem" }}>
            {t.services.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                data-delay={String(i * 110 + 150)}
                className="group relative flex flex-col gap-6 p-8 border border-gray-200/80 bg-white card-cinematic hover:border-gray-300 cursor-default overflow-hidden"
                style={{ borderRadius: "0.25rem" }}
              >
                {/* Number watermark */}
                <span className="absolute top-6 right-6 font-mono text-[10px] text-gray-200/80 tracking-[0.25em]">
                  {s.tag}
                </span>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Icon */}
                <div className="w-11 h-11 bg-charcoal flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:shadow-gold" style={{ borderRadius: "0.25rem" }}>
                  <Icon size={22} weight="thin" className="text-gold group-hover:text-charcoal transition-colors duration-500" />
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col gap-3">
                  <h3 className="font-headline font-light text-charcoal transition-colors" style={{ fontSize: "1.5rem", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                    {s.title}
                  </h3>
                  <p className="font-sans font-light text-gray-500 leading-relaxed" style={{ fontSize: "0.875rem" }}>
                    {s.desc}
                  </p>
                </div>

                {/* Inline tags */}
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono font-light text-gray-400 bg-gray-50 border border-gray-100 transition-all duration-300 group-hover:bg-charcoal/5 group-hover:border-charcoal/10"
                      style={{ borderRadius: "0.125rem" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 text-[11px] font-sans font-light text-gold hover:text-gold-dark uppercase tracking-[0.1em] transition-colors duration-300 cursor-pointer focus:outline-none self-start group/arrow"
                >
                  {t.services.requestQuote}
                  <ArrowUpRight size={12} weight="regular" className="transition-transform duration-300 group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5" />
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {/* Marquee strip */}
      <div className="mt-20 overflow-hidden border-t border-b border-gray-100 py-4">
        <div className="flex gap-0" style={{ animation: "marquee 28s linear infinite" }}>
          {[...t.services.marquee, ...t.services.marquee].map((item, i) => (
            <span key={i} className="flex items-center shrink-0 px-6 font-sans text-xs text-gray-400 uppercase tracking-widest whitespace-nowrap">
              {item}
              <span className="ml-6 w-1 h-1 rounded-full bg-gold/50 inline-block" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
