/* ══════════════════════════════════════════════════════════
   SEO DEFAULTS — Aménagement Monzon
   All default metadata per page/lang. Admin overrides via DB.
   ══════════════════════════════════════════════════════════ */

export const SITE_URL = "https://www.amenagementmonzon.com";

export type Lang = "en" | "fr" | "es";

export interface PageSEOData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  noIndex?: boolean;
  jsonLd?: object | object[];
  hreflang?: { lang: string; href: string }[];
}

/* ─── LocalBusiness defaults (editable from Admin → SEO panel) ────── */
export const LOCAL_BUSINESS_DEFAULTS = {
  name: "Aménagement Monzon",
  alternateName: "Monzon Construction",
  description: {
    en: "Premium construction, renovation, hardscape, landscaping and maintenance services in Montreal, QC. Serving the Greater Montreal area including Laval, Rive-Nord, and Rive-Sud.",
    fr: "Services premium de construction, rénovation, aménagement paysager et entretien à Montréal, QC. Desservant le Grand Montréal, Laval, Rive-Nord et Rive-Sud.",
    es: "Servicios premium de construcción, renovación, paisajismo y mantenimiento en Montreal, QC. Sirviendo el Gran Montreal, Laval, Rive-Nord y Rive-Sud.",
  },
  url: SITE_URL,
  telephone: "+1-514-123-4567",
  email: "silviolmonzon@amenagementmonzon.com",
  address: {
    streetAddress: "Montréal",
    addressLocality: "Montréal",
    addressRegion: "QC",
    postalCode: "H1A 0A1",
    addressCountry: "CA",
  },
  geo: { latitude: "45.5017", longitude: "-73.5673" },
  serviceArea: ["Montréal", "Laval", "Rive-Nord", "Rive-Sud", "Longueuil", "Laval-des-Rapides"],
  openingHours: ["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"],
  priceRange: "$$",
  logo: `${SITE_URL}/icon-512.png`,
  image: `${SITE_URL}/og-default.jpg`,
  foundingDate: "2015",
  numberOfEmployees: { minValue: 10, maxValue: 50 },
  sameAs: [
    "https://www.instagram.com/amenagementmonzon",
    "https://www.facebook.com/amenagementmonzon",
    "https://www.youtube.com/@amenagementmonzon",
  ],
  hasMap: "https://maps.google.com/?q=Amenagement+Monzon+Montreal",
  currenciesAccepted: "CAD",
  paymentAccepted: "Cash, Credit Card, Interac e-Transfer",
  areaServed: "Greater Montreal Area",
};

/* ─── Service categories ─────────────────────────────────────────── */
export const SERVICE_SEO_DEFAULTS: Record<string, Record<Lang, Partial<PageSEOData>>> = {
  hardscape: {
    en: {
      metaTitle: "Hardscape & Pavé Services Montreal | Aménagement Monzon",
      metaDescription: "Premium hardscape installation in Montreal — interlocking pavers, driveways, patios, retaining walls. Quality craftsmanship since 2015. Free estimates.",
      metaKeywords: "hardscape Montreal, paver installation Montreal, interlocking pavers, driveway paving Montreal, patio installation, retaining walls Montreal",
      ogTitle: "Expert Hardscape Services in Montreal | Aménagement Monzon",
      ogDescription: "Transform your outdoor spaces with premium hardscape. Driveways, patios, retaining walls — crafted with precision across Greater Montreal.",
      ogImage: `${SITE_URL}/og-hardscape.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
    fr: {
      metaTitle: "Services de Pavé et Aménagement Extérieur Montréal | Aménagement Monzon",
      metaDescription: "Installation de pavé interlock premium à Montréal — allées, terrasses, murs de soutènement. Savoir-faire depuis 2015. Estimations gratuites.",
      metaKeywords: "aménagement paysager Montréal, pavé interlock Montréal, installation pavé, terrasse Montréal, allée pavée, murs de soutènement",
      ogTitle: "Services de Pavé Expert à Montréal | Aménagement Monzon",
      ogDescription: "Transformez vos espaces extérieurs avec du pavé premium. Allées, terrasses, murs — créés avec précision dans le Grand Montréal.",
      ogImage: `${SITE_URL}/og-hardscape.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
    es: {
      metaTitle: "Servicios de Pavimento y Paisajismo Montreal | Aménagement Monzon",
      metaDescription: "Instalación premium de pavimento en Montreal — entradas, terrazas, muros de contención. Artesanía desde 2015. Estimaciones gratuitas.",
      metaKeywords: "paisajismo Montreal, instalación pavimento Montreal, entradas pavimento, terraza Montreal, muros de contención",
      ogTitle: "Servicios Expertos de Pavimento en Montreal | Aménagement Monzon",
      ogDescription: "Transforme sus espacios exteriores con pavimento premium. Entradas, terrazas, muros — creados con precisión en el Gran Montreal.",
      ogImage: `${SITE_URL}/og-hardscape.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
  },
  construction: {
    en: {
      metaTitle: "Construction & New Builds Montreal | Aménagement Monzon",
      metaDescription: "Ground-up construction, structural additions and commercial builds in Montreal. Precision-engineered projects delivered on time and on budget.",
      metaKeywords: "construction Montreal, new home construction Montreal, commercial construction, building contractor Montreal, structural work Quebec",
      ogTitle: "Expert Construction Services Montreal | Aménagement Monzon",
      ogDescription: "From foundation to finish — certified construction services across Greater Montreal. Residential, commercial, structural.",
      ogImage: `${SITE_URL}/og-construction.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
    fr: {
      metaTitle: "Construction et Nouvelles Constructions Montréal | Aménagement Monzon",
      metaDescription: "Construction à ground level, agrandissements structurels et immeubles commerciaux à Montréal. Projets livrés dans les délais et le budget.",
      metaKeywords: "construction Montréal, nouvelle construction Montréal, construction commerciale, entrepreneur construction, travaux structurels Québec",
      ogTitle: "Services de Construction Expert à Montréal | Aménagement Monzon",
      ogDescription: "De la fondation à la finition — services de construction certifiés dans le Grand Montréal. Résidentiel, commercial, structurel.",
      ogImage: `${SITE_URL}/og-construction.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
    es: {
      metaTitle: "Construcción y Nuevas Obras Montreal | Aménagement Monzon",
      metaDescription: "Construcción desde cero, ampliaciones estructurales y obras comerciales en Montreal. Proyectos entregados a tiempo y dentro del presupuesto.",
      metaKeywords: "construcción Montreal, nueva construcción Montreal, construcción comercial, contratista construcción, obras estructurales Quebec",
      ogTitle: "Servicios Expertos de Construcción en Montreal | Aménagement Monzon",
      ogDescription: "De los cimientos al acabado — servicios de construcción certificados en el Gran Montreal. Residencial, comercial, estructural.",
      ogImage: `${SITE_URL}/og-construction.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
  },
  renovation: {
    en: {
      metaTitle: "Home Renovation Services Montreal | Aménagement Monzon",
      metaDescription: "Full-scope renovations in Montreal — kitchens, bathrooms, interiors, complete gut renovations. Transform your home with award-winning craftsmanship.",
      metaKeywords: "home renovation Montreal, kitchen renovation Montreal, bathroom renovation, interior renovation, full gut reno Montreal",
      ogTitle: "Premium Home Renovation Montreal | Aménagement Monzon",
      ogDescription: "Transform your living spaces with Montreal's premier renovation team. Kitchens, bathrooms, full interior redesigns.",
      ogImage: `${SITE_URL}/og-renovation.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
    fr: {
      metaTitle: "Rénovation Résidentielle Montréal | Aménagement Monzon",
      metaDescription: "Rénovations complètes à Montréal — cuisines, salles de bain, intérieurs, remises à neuf. Transformez votre maison avec un savoir-faire reconnu.",
      metaKeywords: "rénovation maison Montréal, rénovation cuisine Montréal, rénovation salle de bain, rénovation intérieure, remise à neuf Montréal",
      ogTitle: "Rénovation Résidentielle Premium Montréal | Aménagement Monzon",
      ogDescription: "Transformez vos espaces de vie avec la première équipe de rénovation de Montréal. Cuisines, salles de bain, redesign intérieur complet.",
      ogImage: `${SITE_URL}/og-renovation.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
    es: {
      metaTitle: "Renovación de Viviendas Montreal | Aménagement Monzon",
      metaDescription: "Renovaciones completas en Montreal — cocinas, baños, interiores, remodelaciones totales. Transforme su hogar con artesanía premiada.",
      metaKeywords: "renovación hogar Montreal, renovación cocina Montreal, renovación baño, renovación interior, remodelación total Montreal",
      ogTitle: "Renovación Premium de Viviendas Montreal | Aménagement Monzon",
      ogDescription: "Transforme sus espacios de vida con el equipo de renovación líder de Montreal. Cocinas, baños, rediseños interiores completos.",
      ogImage: `${SITE_URL}/og-renovation.jpg`,
      canonicalUrl: `${SITE_URL}/services`,
    },
  },
  maintenance: {
    en: {
      metaTitle: "Property Maintenance Services Montreal | Aménagement Monzon",
      metaDescription: "Year-round residential and commercial maintenance plans in Montreal. Snow removal, seasonal, preventive, emergency services. Subscribe and relax.",
      metaKeywords: "property maintenance Montreal, snow removal Montreal, seasonal maintenance, commercial maintenance, residential maintenance Quebec",
      ogTitle: "Reliable Property Maintenance Montreal | Aménagement Monzon",
      ogDescription: "Comprehensive maintenance plans for homes and businesses in Montreal. Year-round coverage, emergency response, seasonal care.",
      ogImage: `${SITE_URL}/og-maintenance.jpg`,
      canonicalUrl: `${SITE_URL}/maintenance`,
    },
    fr: {
      metaTitle: "Services d'Entretien Immobilier Montréal | Aménagement Monzon",
      metaDescription: "Plans d'entretien résidentiel et commercial toute l'année à Montréal. Déneigement, saisonnier, préventif, services d'urgence. Abonnez-vous.",
      metaKeywords: "entretien immobilier Montréal, déneigement Montréal, entretien saisonnier, entretien commercial, entretien résidentiel Québec",
      ogTitle: "Entretien Immobilier Fiable Montréal | Aménagement Monzon",
      ogDescription: "Plans d'entretien complets pour maisons et commerces à Montréal. Couverture annuelle, intervention d'urgence, soins saisonniers.",
      ogImage: `${SITE_URL}/og-maintenance.jpg`,
      canonicalUrl: `${SITE_URL}/maintenance`,
    },
    es: {
      metaTitle: "Servicios de Mantenimiento de Propiedades Montreal | Aménagement Monzon",
      metaDescription: "Planes de mantenimiento residencial y comercial durante todo el año en Montreal. Remoción de nieve, estacional, preventivo, servicios de emergencia.",
      metaKeywords: "mantenimiento propiedades Montreal, remoción nieve Montreal, mantenimiento estacional, mantenimiento comercial, mantenimiento residencial Quebec",
      ogTitle: "Mantenimiento Confiable de Propiedades Montreal | Aménagement Monzon",
      ogDescription: "Planes de mantenimiento integrales para hogares y negocios en Montreal. Cobertura anual, respuesta de emergencia, cuidado estacional.",
      ogImage: `${SITE_URL}/og-maintenance.jpg`,
      canonicalUrl: `${SITE_URL}/maintenance`,
    },
  },
};

/* ─── Page-level defaults ────────────────────────────────────────── */
export const PAGE_SEO_DEFAULTS: Record<string, Record<Lang, Partial<PageSEOData>>> = {
  home: {
    en: {
      metaTitle: "Aménagement Monzon — Premium Construction, Renovation & Landscaping Montreal",
      metaDescription: "Aménagement Monzon delivers premium construction, renovation, hardscape, landscaping and maintenance services across Greater Montreal. Free estimates. Over 250 projects delivered.",
      metaKeywords: "construction Montreal, renovation Montreal, landscaping Montreal, hardscape Montreal, paving Montreal, maintenance Montreal",
      ogTitle: "Aménagement Monzon — Crafting Spaces with a Cinematic Touch",
      ogDescription: "Where architectural precision meets cinematic storytelling. 250+ projects across Greater Montreal. Construction, Renovation, Hardscape & Maintenance.",
      ogImage: `${SITE_URL}/og-home.jpg`,
      canonicalUrl: SITE_URL,
    },
    fr: {
      metaTitle: "Aménagement Monzon — Construction, Rénovation & Aménagement Premium Montréal",
      metaDescription: "Aménagement Monzon offre des services premium de construction, rénovation, pavé, aménagement paysager et entretien dans le Grand Montréal. Estimations gratuites. Plus de 250 projets livrés.",
      metaKeywords: "construction Montréal, rénovation Montréal, aménagement paysager Montréal, pavé Montréal, entretien Montréal",
      ogTitle: "Aménagement Monzon — Créer des Espaces avec une Touche Cinématique",
      ogDescription: "Où la précision architecturale rencontre la narration cinématique. 250+ projets dans le Grand Montréal. Construction, Rénovation, Pavé & Entretien.",
      ogImage: `${SITE_URL}/og-home.jpg`,
      canonicalUrl: SITE_URL,
    },
    es: {
      metaTitle: "Aménagement Monzon — Construcción, Renovación y Paisajismo Premium Montreal",
      metaDescription: "Aménagement Monzon ofrece servicios premium de construcción, renovación, pavimento, paisajismo y mantenimiento en el Gran Montreal. Estimaciones gratuitas. Más de 250 proyectos entregados.",
      metaKeywords: "construcción Montreal, renovación Montreal, paisajismo Montreal, pavimento Montreal, mantenimiento Montreal",
      ogTitle: "Aménagement Monzon — Creando Espacios con un Toque Cinematográfico",
      ogDescription: "Donde la precisión arquitectónica se une a la narrativa cinematográfica. 250+ proyectos en el Gran Montreal. Construcción, Renovación, Pavimento y Mantenimiento.",
      ogImage: `${SITE_URL}/og-home.jpg`,
      canonicalUrl: SITE_URL,
    },
  },
  about: {
    en: {
      metaTitle: "About Us | Aménagement Monzon — Montreal Construction Experts",
      metaDescription: "Learn about Aménagement Monzon — Montreal's premier construction and renovation company since 2015. Meet our team, our story, values, and 250+ project portfolio.",
      metaKeywords: "about Amenagement Monzon, Montreal construction company, renovation experts Montreal, construction team Montreal",
      ogTitle: "About Aménagement Monzon | Montreal Construction Experts",
      ogDescription: "Where architectural precision meets cinematic storytelling. Learn our story, mission, and meet the team behind 250+ premium projects.",
      ogImage: `${SITE_URL}/og-about.jpg`,
      canonicalUrl: `${SITE_URL}/about`,
    },
    fr: {
      metaTitle: "À Propos | Aménagement Monzon — Experts Construction Montréal",
      metaDescription: "Découvrez Aménagement Monzon — la principale entreprise de construction et rénovation de Montréal depuis 2015. Notre équipe, notre histoire et plus de 250 projets.",
      metaKeywords: "à propos Aménagement Monzon, entreprise construction Montréal, experts rénovation Montréal, équipe construction",
      ogTitle: "À Propos d'Aménagement Monzon | Experts Construction Montréal",
      ogDescription: "Où la précision architecturale rencontre la narration cinématique. Découvrez notre histoire, mission et l'équipe derrière 250+ projets premium.",
      ogImage: `${SITE_URL}/og-about.jpg`,
      canonicalUrl: `${SITE_URL}/about`,
    },
    es: {
      metaTitle: "Sobre Nosotros | Aménagement Monzon — Expertos en Construcción Montreal",
      metaDescription: "Conozca Aménagement Monzon — la empresa líder de construcción y renovación de Montreal desde 2015. Nuestro equipo, historia y más de 250 proyectos.",
      metaKeywords: "sobre Amenagement Monzon, empresa construcción Montreal, expertos renovación Montreal, equipo construcción",
      ogTitle: "Sobre Aménagement Monzon | Expertos en Construcción Montreal",
      ogDescription: "Donde la precisión arquitectónica se une a la narrativa cinematográfica. Conozca nuestra historia, misión y el equipo detrás de 250+ proyectos premium.",
      ogImage: `${SITE_URL}/og-about.jpg`,
      canonicalUrl: `${SITE_URL}/about`,
    },
  },
  portfolio: {
    en: {
      metaTitle: "Project Portfolio | Aménagement Monzon — 250+ Completed Projects",
      metaDescription: "Browse Aménagement Monzon's portfolio of 250+ completed construction, renovation, hardscape and landscaping projects across Greater Montreal.",
      metaKeywords: "construction portfolio Montreal, renovation projects Montreal, hardscape projects, landscaping portfolio Montreal",
      ogTitle: "Portfolio — 250+ Premium Projects | Aménagement Monzon",
      ogDescription: "See the craftsmanship. Browse our complete portfolio of construction, renovation, hardscape and landscaping projects in Montreal.",
      ogImage: `${SITE_URL}/og-portfolio.jpg`,
      canonicalUrl: `${SITE_URL}/portfolio`,
    },
    fr: {
      metaTitle: "Portfolio Projets | Aménagement Monzon — 250+ Projets Réalisés",
      metaDescription: "Parcourez le portfolio d'Aménagement Monzon avec plus de 250 projets de construction, rénovation, pavé et aménagement paysager dans le Grand Montréal.",
      metaKeywords: "portfolio construction Montréal, projets rénovation Montréal, projets pavé, portfolio aménagement paysager Montréal",
      ogTitle: "Portfolio — 250+ Projets Premium | Aménagement Monzon",
      ogDescription: "Admirez le savoir-faire. Parcourez notre portfolio complet de projets de construction, rénovation, pavé et aménagement paysager à Montréal.",
      ogImage: `${SITE_URL}/og-portfolio.jpg`,
      canonicalUrl: `${SITE_URL}/portfolio`,
    },
    es: {
      metaTitle: "Portafolio de Proyectos | Aménagement Monzon — 250+ Proyectos",
      metaDescription: "Explore el portafolio de Aménagement Monzon con más de 250 proyectos de construcción, renovación, pavimento y paisajismo en el Gran Montreal.",
      metaKeywords: "portafolio construcción Montreal, proyectos renovación Montreal, proyectos pavimento, portafolio paisajismo Montreal",
      ogTitle: "Portafolio — 250+ Proyectos Premium | Aménagement Monzon",
      ogDescription: "Vea la artesanía. Explore nuestro portafolio completo de proyectos de construcción, renovación, pavimento y paisajismo en Montreal.",
      ogImage: `${SITE_URL}/og-portfolio.jpg`,
      canonicalUrl: `${SITE_URL}/portfolio`,
    },
  },
  contact: {
    en: {
      metaTitle: "Contact Us — Free Estimates | Aménagement Monzon Montreal",
      metaDescription: "Get a free estimate for your construction, renovation, hardscape or maintenance project in Montreal. Contact Aménagement Monzon — we respond within 24 hours.",
      metaKeywords: "contact Amenagement Monzon, free estimate Montreal, construction quote Montreal, renovation estimate",
      ogTitle: "Contact Aménagement Monzon — Free Project Estimates",
      ogDescription: "Ready to start your project? Get a free estimate. We serve Montreal, Laval, Rive-Nord and Rive-Sud.",
      ogImage: `${SITE_URL}/og-contact.jpg`,
      canonicalUrl: `${SITE_URL}/contact`,
    },
    fr: {
      metaTitle: "Contactez-Nous — Estimations Gratuites | Aménagement Monzon Montréal",
      metaDescription: "Obtenez une estimation gratuite pour votre projet de construction, rénovation, pavé ou entretien à Montréal. Nous répondons dans les 24 heures.",
      metaKeywords: "contact Aménagement Monzon, estimation gratuite Montréal, devis construction Montréal, estimation rénovation",
      ogTitle: "Contactez Aménagement Monzon — Estimations Gratuites",
      ogDescription: "Prêt à démarrer votre projet ? Obtenez une estimation gratuite. Nous desservons Montréal, Laval, Rive-Nord et Rive-Sud.",
      ogImage: `${SITE_URL}/og-contact.jpg`,
      canonicalUrl: `${SITE_URL}/contact`,
    },
    es: {
      metaTitle: "Contáctenos — Estimaciones Gratuitas | Aménagement Monzon Montreal",
      metaDescription: "Obtenga una estimación gratuita para su proyecto de construcción, renovación, pavimento o mantenimiento en Montreal. Respondemos en 24 horas.",
      metaKeywords: "contacto Amenagement Monzon, estimación gratuita Montreal, cotización construcción Montreal, estimación renovación",
      ogTitle: "Contacte Aménagement Monzon — Estimaciones Gratuitas",
      ogDescription: "¿Listo para empezar su proyecto? Obtenga una estimación gratuita. Servimos Montreal, Laval, Rive-Nord y Rive-Sud.",
      ogImage: `${SITE_URL}/og-contact.jpg`,
      canonicalUrl: `${SITE_URL}/contact`,
    },
  },
  blog: {
    en: {
      metaTitle: "Blog — Construction & Renovation Insights | Aménagement Monzon",
      metaDescription: "Industry knowledge, project reveals, design inspiration and construction tips from the Aménagement Monzon team in Montreal.",
      metaKeywords: "construction blog Montreal, renovation tips Montreal, landscaping tips, hardscape ideas, home improvement Montreal",
      ogTitle: "Blog — Construction & Design Insights | Aménagement Monzon",
      ogDescription: "Expert knowledge, project reveals and design inspiration from Montreal's premier construction team.",
      ogImage: `${SITE_URL}/og-blog.jpg`,
      canonicalUrl: `${SITE_URL}/blog`,
    },
    fr: {
      metaTitle: "Blogue — Infos Construction & Rénovation | Aménagement Monzon",
      metaDescription: "Connaissances du secteur, révélations de projets, inspiration design et conseils de construction de l'équipe Aménagement Monzon à Montréal.",
      metaKeywords: "blogue construction Montréal, conseils rénovation Montréal, conseils aménagement, idées pavé, amélioration maison Montréal",
      ogTitle: "Blogue — Insights Construction & Design | Aménagement Monzon",
      ogDescription: "Savoir-faire expert, révélations de projets et inspiration design de la première équipe de construction de Montréal.",
      ogImage: `${SITE_URL}/og-blog.jpg`,
      canonicalUrl: `${SITE_URL}/blog`,
    },
    es: {
      metaTitle: "Blog — Perspectivas de Construcción y Renovación | Aménagement Monzon",
      metaDescription: "Conocimiento del sector, revelaciones de proyectos, inspiración de diseño y consejos de construcción del equipo de Aménagement Monzon en Montreal.",
      metaKeywords: "blog construcción Montreal, consejos renovación Montreal, consejos paisajismo, ideas pavimento, mejora hogar Montreal",
      ogTitle: "Blog — Perspectivas de Construcción y Diseño | Aménagement Monzon",
      ogDescription: "Conocimiento experto, revelaciones de proyectos e inspiración de diseño del equipo de construcción líder de Montreal.",
      ogImage: `${SITE_URL}/og-blog.jpg`,
      canonicalUrl: `${SITE_URL}/blog`,
    },
  },
  academy: {
    en: {
      metaTitle: "Monzon Academy — Construction & Trades Education Montreal",
      metaDescription: "Learn construction, renovation and landscaping skills at Monzon Academy. Courses, coaching, workshops. 97% success rate. Montreal & online.",
      metaKeywords: "construction courses Montreal, trades education Montreal, renovation training, landscaping courses Quebec, Monzon Academy",
      ogTitle: "Monzon Academy — Construction & Trades Education",
      ogDescription: "Gain skills, get coaching, and grow in the trades industry. Courses, workshops and coaching from Montreal's construction experts.",
      ogImage: `${SITE_URL}/og-academy.jpg`,
      canonicalUrl: `${SITE_URL}/academy`,
    },
    fr: {
      metaTitle: "Académie Monzon — Formation Construction & Métiers Montréal",
      metaDescription: "Apprenez la construction, la rénovation et l'aménagement paysager à l'Académie Monzon. Cours, coaching, ateliers. Taux de réussite 97%.",
      metaKeywords: "cours construction Montréal, formation métiers Montréal, formation rénovation, cours aménagement Québec, Académie Monzon",
      ogTitle: "Académie Monzon — Formation Construction & Métiers",
      ogDescription: "Développez vos compétences, obtenez du coaching et évoluez dans l'industrie. Cours, ateliers et coaching des experts en construction de Montréal.",
      ogImage: `${SITE_URL}/og-academy.jpg`,
      canonicalUrl: `${SITE_URL}/academy`,
    },
    es: {
      metaTitle: "Academia Monzon — Educación en Construcción y Oficios Montreal",
      metaDescription: "Aprenda construcción, renovación y paisajismo en la Academia Monzon. Cursos, coaching, talleres. Tasa de éxito 97%. Montreal y en línea.",
      metaKeywords: "cursos construcción Montreal, educación oficios Montreal, formación renovación, cursos paisajismo Quebec, Academia Monzon",
      ogTitle: "Academia Monzon — Educación en Construcción y Oficios",
      ogDescription: "Desarrolle habilidades, obtenga coaching y crezca en la industria. Cursos, talleres y coaching de los expertos en construcción de Montreal.",
      ogImage: `${SITE_URL}/og-academy.jpg`,
      canonicalUrl: `${SITE_URL}/academy`,
    },
  },
  store: {
    en: {
      metaTitle: "SM Store & SM Collection | Aménagement Monzon",
      metaDescription: "Shop the SM Store for professional tools and exclusive brand merchandise. Quality products from Montreal's premier construction brand.",
      metaKeywords: "SM Store Montreal, Monzon merchandise, construction tools, SM Collection, brand store Montreal",
      ogTitle: "SM Store & SM Collection | Aménagement Monzon",
      ogDescription: "Wear the brand. Carry the craft. Exclusive merchandise and professional tools from Aménagement Monzon.",
      ogImage: `${SITE_URL}/og-store.jpg`,
      canonicalUrl: `${SITE_URL}/store`,
    },
    fr: {
      metaTitle: "Boutique SM & Collection SM | Aménagement Monzon",
      metaDescription: "Visitez la Boutique SM pour des outils professionnels et des marchandises de marque exclusives. Produits de qualité de la principale marque de construction de Montréal.",
      metaKeywords: "Boutique SM Montréal, marchandise Monzon, outils construction, Collection SM, boutique marque Montréal",
      ogTitle: "Boutique SM & Collection SM | Aménagement Monzon",
      ogDescription: "Portez la marque. Portez le métier. Marchandise exclusive et outils professionnels d'Aménagement Monzon.",
      ogImage: `${SITE_URL}/og-store.jpg`,
      canonicalUrl: `${SITE_URL}/store`,
    },
    es: {
      metaTitle: "Tienda SM y Colección SM | Aménagement Monzon",
      metaDescription: "Visite la Tienda SM para herramientas profesionales y mercancía de marca exclusiva. Productos de calidad de la marca de construcción líder de Montreal.",
      metaKeywords: "Tienda SM Montreal, mercancía Monzon, herramientas construcción, Colección SM, tienda marca Montreal",
      ogTitle: "Tienda SM y Colección SM | Aménagement Monzon",
      ogDescription: "Vista la marca. Lleve el oficio. Mercancía exclusiva y herramientas profesionales de Aménagement Monzon.",
      ogImage: `${SITE_URL}/og-store.jpg`,
      canonicalUrl: `${SITE_URL}/store`,
    },
  },
  community: {
    en: {
      metaTitle: "Community — Follow Our Work | Aménagement Monzon",
      metaDescription: "Join the Aménagement Monzon community. Follow our projects on Instagram, YouTube, and TikTok. 48K+ followers.",
      metaKeywords: "Monzon community, construction Instagram, renovation YouTube, Montreal construction social media",
      ogTitle: "Aménagement Monzon Community | Follow Our Projects",
      ogDescription: "Join our community. Real projects, real craftsmanship. Follow our cinematic journey."  ,
      ogImage: `${SITE_URL}/og-community.jpg`,
      canonicalUrl: `${SITE_URL}/community`,
    },
    fr: {
      metaTitle: "Communauté — Suivez Notre Travail | Aménagement Monzon",
      metaDescription: "Rejoignez la communauté Aménagement Monzon. Suivez nos projets sur Instagram, YouTube et TikTok. 48K+ abonnés.",
      metaKeywords: "communauté Monzon, construction Instagram, rénovation YouTube, réseaux sociaux construction Montréal",
      ogTitle: "Communauté Aménagement Monzon | Suivez Nos Projets",
      ogDescription: "Rejoignez notre communauté. De vrais projets, du vrai savoir-faire. Suivez notre parcours cinématique.",
      ogImage: `${SITE_URL}/og-community.jpg`,
      canonicalUrl: `${SITE_URL}/community`,
    },
    es: {
      metaTitle: "Comunidad — Siga Nuestro Trabajo | Aménagement Monzon",
      metaDescription: "Únase a la comunidad Aménagement Monzon. Siga nuestros proyectos en Instagram, YouTube y TikTok. 48K+ seguidores.",
      metaKeywords: "comunidad Monzon, construcción Instagram, renovación YouTube, redes sociales construcción Montreal",
      ogTitle: "Comunidad Aménagement Monzon | Siga Nuestros Proyectos",
      ogDescription: "Únase a nuestra comunidad. Proyectos reales, artesanía real. Siga nuestro viaje cinematográfico.",
      ogImage: `${SITE_URL}/og-community.jpg`,
      canonicalUrl: `${SITE_URL}/community`,
    },
  },
};

/* ─── Static pages for sitemap ───────────────────────────────────── */
export const SITEMAP_PAGES = [
  { path: "/",             changefreq: "weekly",  priority: "1.0"  },
  { path: "/services",     changefreq: "weekly",  priority: "0.9"  },
  { path: "/portfolio",    changefreq: "weekly",  priority: "0.9"  },
  { path: "/maintenance",  changefreq: "weekly",  priority: "0.8"  },
  { path: "/contact",      changefreq: "monthly", priority: "0.9"  },
  { path: "/about",        changefreq: "monthly", priority: "0.7"  },
  { path: "/about/company",changefreq: "monthly", priority: "0.6"  },
  { path: "/blog",         changefreq: "daily",   priority: "0.8"  },
  { path: "/academy",      changefreq: "weekly",  priority: "0.7"  },
  { path: "/store",        changefreq: "weekly",  priority: "0.6"  },
  { path: "/community",    changefreq: "weekly",  priority: "0.6"  },
];
