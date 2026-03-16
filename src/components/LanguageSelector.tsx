import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "@phosphor-icons/react";

export default function LanguageSelector({ light = false }: { light?: boolean }) {
  const { lang, setLang, languages } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = languages.find(l => l.code === lang) ?? languages[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        title="Switch language"
        className={[
          "flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[11px] font-mono uppercase tracking-widest transition-all duration-200 focus:outline-none cursor-pointer",
          light
            ? "text-gray-600 hover:bg-gray-100"
            : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]",
        ].join(" ")}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe size={14} weight="regular" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{lang.toUpperCase()}</span>
      </button>

      {open && (
        <div className={[
          "absolute right-0 top-[calc(100%+8px)] z-[999] rounded-xl overflow-hidden shadow-2xl border min-w-[140px]",
          light
            ? "bg-white border-gray-200"
            : "bg-[rgba(20,22,28,0.97)] border-white/10 backdrop-blur-xl",
        ].join(" ")}>
          {languages.map((l, i) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={[
                "w-full flex items-center gap-3 px-4 py-3 text-[0.72rem] font-sans transition-all duration-150 cursor-pointer focus:outline-none",
                i < languages.length - 1 ? (light ? "border-b border-gray-100" : "border-b border-white/5") : "",
                lang === l.code
                  ? light ? "bg-gray-50 text-gray-900 font-semibold" : "bg-white/[0.06] text-white font-semibold"
                  : light ? "text-gray-600 hover:bg-gray-50" : "text-white/60 hover:bg-white/[0.04] hover:text-white/90",
              ].join(" ")}
            >
              <span className="text-base">{l.flag}</span>
              <span>{l.label}</span>
              {lang === l.code && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
