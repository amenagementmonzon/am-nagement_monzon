/* ══════════════════════════════════════════════════════════
   SEOContext — Provides site-wide SEO state and LocalBusiness
   config loaded once from DB for use anywhere in the app.
   ══════════════════════════════════════════════════════════ */

import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "@animaapp/playground-react-sdk";
import { useLanguage } from "@/contexts/LanguageContext";
import { LOCAL_BUSINESS_DEFAULTS } from "./seoDefaults";
import { buildLocalBusinessSchema } from "./jsonLdBuilders";

interface SEOContextType {
  localBusiness: object | null;
  getSEOConfig: (key: string) => any | null;
}

const SEOCtx = createContext<SEOContextType>({
  localBusiness: null,
  getSEOConfig: () => null,
});

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const { data: allConfigs } = useQuery("SEOConfig");

  const configMap = useMemo(() => {
    const m: Record<string, any> = {};
    if (allConfigs) allConfigs.forEach((c: any) => { m[c.key] = c; });
    return m;
  }, [allConfigs]);

  const localBusiness = useMemo(() => {
    const lbRow = configMap[`localbusiness-${lang}`];
    if (!lbRow) return buildLocalBusinessSchema({}, lang as any);
    let extra = {};
    if (lbRow.jsonLd) { try { extra = JSON.parse(lbRow.jsonLd); } catch {} }
    return buildLocalBusinessSchema(extra, lang as any);
  }, [configMap, lang]);

  const getSEOConfig = (key: string) => configMap[key] ?? null;

  return (
    <SEOCtx.Provider value={{ localBusiness, getSEOConfig }}>
      {children}
    </SEOCtx.Provider>
  );
}

export function useSEO() {
  return useContext(SEOCtx);
}
