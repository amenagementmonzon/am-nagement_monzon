import { Helmet } from "react-helmet-async";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CommunitySection from "@/components/CommunitySection";
import PlaceholderPanel from "@/components/PlaceholderPanel";
import { Chat, Users } from "@phosphor-icons/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CommunityPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.community.pageTitle} – Aménagement Monzon</title>
        <meta name="description" content={t.community.pageSubtitle} />
      </Helmet>
      <PageShell>
        <PageHero dark eyebrow={t.community.pageEyebrow} title={t.community.pageTitle} subtitle={t.community.pageSubtitle} />
        <CommunitySection />

        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <h2 className="font-headline font-bold text-fluid-xl text-charcoal mb-8">{t.community.hubTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlaceholderPanel title={t.community.forumTitle} description={t.community.forumDesc} icon={<Chat size={22} weight="regular" className="text-gray-400" />} height="h-56" />
              <PlaceholderPanel title={t.community.directoryTitle} description={t.community.directoryDesc} icon={<Users size={22} weight="regular" className="text-gray-400" />} height="h-56" />
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
