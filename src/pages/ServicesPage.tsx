import { Helmet } from "react-helmet-async";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import ServicesSection from "@/components/ServicesSection";
import ThreeDContainer from "@/components/ThreeDContainer";
import ContactSection from "@/components/ContactSection";
import PlaceholderPanel from "@/components/PlaceholderPanel";
import ReviewsSection from "@/components/ReviewsSection";
import { ChartBar } from "@phosphor-icons/react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.servicesPage.title} – Aménagement Monzon</title>
        <meta name="description" content={t.servicesPage.subtitle} />
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t.servicesPage.eyebrow}
          title={t.servicesPage.title}
          subtitle={t.servicesPage.subtitle}
        />
        <ServicesSection />

        <ThreeDContainer />

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">
            <h2 className="font-headline font-bold text-fluid-xl text-charcoal mb-8">{t.servicesPage.processTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {t.servicesPage.steps.map((step, i) => (
                <PlaceholderPanel key={step} title={`${t.servicesPage.step} ${i + 1}: ${step}`} description={t.servicesPage.processDesc} height="h-48" icon={<ChartBar size={22} weight="regular" className="text-gray-400" />} />
              ))}
            </div>
          </div>
        </section>

        <ReviewsSection limit={3} />
        <ContactSection />
      </PageShell>
    </>
  );
}
