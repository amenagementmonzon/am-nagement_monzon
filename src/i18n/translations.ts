/* ═══════════════════════════════════════════════════════
   TRANSLATIONS — English · French · Spanish
   Full platform coverage: public site + admin + portal
   ═══════════════════════════════════════════════════════ */

export type Lang = "en" | "fr" | "es";

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇨🇦" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export type Translations = {
  nav: {
    services: string; home: string; contact: string;
    signIn: string; register: string; admin: string;
    portal: string; startProject: string; whichNeeds: string;
    servicesDropdown: string;
  };
  hero: {
    eyebrow: string; headline1: string; headline2: string; headline3: string;
    sub: string; exploreCta: string; contactCta: string; scroll: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Value: string; stat3Label: string;
    play: string; pause: string;
  };
  services: {
    eyebrow: string; title: string; subtitle: string;
    requestQuote: string;
    s1Title: string; s1Desc: string; s1Tags: string[];
    s2Title: string; s2Desc: string; s2Tags: string[];
    s3Title: string; s3Desc: string; s3Tags: string[];
    s4Title: string; s4Desc: string; s4Tags: string[];
    marquee: string[];
  };
  portfolio: {
    eyebrow: string; title: string; subtitle: string;
    viewAll: string; filterLabel: string;
    filterAll: string; filterConstruction: string; filterRenovation: string;
    filterLandscaping: string; filterMaintenance: string;
    viewCaseStudy: string; moreNote: string; fullGallery: string;
    pageSubtitle: string; pageTitle: string; galleryEyebrow: string;
  };
  store: {
    eyebrow: string; title: string; subtitle: string;
    visitStore: string; freeShipping: string; freeShippingDesc: string; shopNow: string;
    quickView: string; addedToCart: string;
    pageTitle: string; pageSubtitle: string;
    tabStore: string; tabCollection: string;
    cart: string; yourCart: string; cartEmpty: string;
    subtotal: string; checkout: string;
    selectOptions: string; quickAdd: string; addToCart: string;
    added: string; color: string; size: string;
    collectionTitle: string; collectionSubtitle: string;
    accepts: string; limitedBadge: string;
    payment: {
      secureCheckout: string; chooseMethod: string; interacLabel: string;
      creditLabel: string; debitLabel: string; cashLabel: string;
      interacSub: string; creditSub: string; debitSub: string; cashSub: string;
      popular: string; continue: string; back: string;
      cardNumber: string; cardName: string; expiry: string; cvc: string;
      sendTransferTo: string; securityQuestion: string; securityAnswer: string;
      amountToSend: string; wireDetails: string; cashInPerson: string;
      cashInPersonDesc: string; wireNote: string; interacNote: string;
      orderSummary: string; total: string;
      payComplete: string; orderConfirmed: string;
      thankYou: string; paymentSuccess: string; interacSuccess: string; cashSuccess: string;
      orderTotal: string; backToStore: string; processing: string;
      iveSentTransfer: string; placeOrder: string; pay: string;
      errCardNumber: string; errCardName: string; errExpiry: string; errCVC: string;
    };
  };
  community: {
    eyebrow: string; title: string; subtitle: string;
    joinCta: string;
    stat1: string; stat1Label: string;
    stat2: string; stat2Label: string;
    stat3: string; stat3Label: string;
    pageEyebrow: string; pageTitle: string; pageSubtitle: string;
    hubTitle: string; forumTitle: string; forumDesc: string;
    directoryTitle: string; directoryDesc: string;
  };
  contact: {
    eyebrow: string; title: string; subtitle: string;
    location: string; phone: string; email: string;
    mapPlaceholder: string;
    fullName: string; emailLabel: string; phoneLabel: string;
    projectType: string; budget: string; details: string;
    detailsPlaceholder: string; namePlaceholder: string;
    selectType: string; selectBudget: string;
    types: string[]; budgets: string[];
    send: string; sending: string; privacy: string;
    successTitle: string; successDesc: string; sendAnother: string;
    nameRequired: string; emailRequired: string; messageRequired: string;
    pageEyebrow: string; pageTitle: string; pageSubtitle: string;
  };
  footer: {
    tagline: string; stayUpdated: string; stayUpdatedDesc: string;
    subscribe: string; subscribed: string;
    emailPlaceholder: string;
    copyright: string; ourStory: string; academy: string; craftedIn: string;
    companyGroup: string; exploreGroup: string; legalGroup: string;
    links: {
      aboutUs: string; services: string; portfolio: string; blog: string; contact: string;
      smStore: string; smCollection: string; community: string; maintenance: string; academy: string;
      privacy: string; terms: string; cookies: string; sitemap: string;
    };
  };
  portalBanner: {
    clientAccess: string; title: string; subtitle: string;
    accessPortal: string; requestAccess: string;
    f1: string; f2: string; f3: string; f4: string;
  };
  reviews: {
    eyebrow: string; title: string; allReviews: string; companyResponse: string;
  };
  about: {
    eyebrow: string; title: string; subtitle: string;
    statsSection: string;
    stat1Value: string; stat1Label: string;
    stat2Value: string; stat2Label: string;
    stat3Value: string; stat3Label: string;
    stat4Value: string; stat4Label: string;
    missionTitle: string; teamTitle: string;
    teamMember: string;
    missionValues: string[];
    fullStory: string; fullStoryDesc: string; ourCompany: string;
    founderRole: string; architectRole: string; constructionRole: string;
    landscapingRole: string; pmRole: string; creativeRole: string;
  };
  blog: {
    eyebrow: string; title: string; subtitle: string;
    searchPlaceholder: string; readMore: string; loadingMore: string;
    searchFiltersTitle: string; paginationTitle: string;
    searchFiltersDesc: string; paginationDesc: string;
  };
  servicesPage: {
    eyebrow: string; title: string; subtitle: string;
    processTitle: string; steps: string[];
    step: string; processDesc: string;
  };
  academy: {
    pageEyebrow: string; pageTitle: string; pageSubtitle: string;
    stat1: string; stat1Label: string;
    stat2: string; stat2Label: string;
    stat3: string; stat3Label: string;
    stat4: string; stat4Label: string;
    filterAll: string; filterCourse: string; filterCoaching: string;
    filterWorkshop: string; filterEvent: string;
    enroll: string; duration: string; instructor: string; noItems: string;
    ctaTitle: string; ctaSubtitle: string; ctaBtn: string;
  };
  maintenance: {
    pageEyebrow: string; pageTitle: string; pageSubtitle: string;
    tabServices: string; tabSubscriptions: string;
    filterAll: string;
    subscribe: string; add: string; added: string;
    popular: string;
    subscribeTitle: string; subscribeSubtitle: string;
    customPlanTitle: string; customPlanDesc: string; customPlanBtn: string;
    getStarted: string;
    categoryAll: string; categoryExterior: string; categoryInterior: string;
    categoryLandscaping: string; categorySnow: string; categorySeasonal: string;
    categoryEmergency: string;
    priceTypeMonthly: string; priceTypeFixed: string; priceTypeCustom: string;
  };
  chat: {
    greeting: string; placeholder: string; askAnything: string;
    typing: string; poweredBy: string; online: string;
    chatWith: string; open: string; close: string;
    suggestions: string[];
    responses: { [key: string]: string };
  };
  portal: {
    secureAccess: string; title: string; subtitle: string;
    signInBtn: string; notClient: string; requestAccess: string;
    overview: string; myProjects: string; documents: string;
    payments: string; schedule: string; activity: string;
    messages: string; myProfile: string; signOut: string;
    welcomeBack: string; overviewSubtitle: string;
    invoices: string; estimates: string; paid: string; pending: string;
    recentDocuments: string; viewAll: string; quickActions: string;
    viewProjects: string; viewAllInvoices: string; approveEstimates: string;
    paymentHistory: string; sendMessage: string;
    myProjectsTitle: string; noProjects: string;
    documentsTitle: string; allDocuments: string; noDocuments: string; approve: string;
    paymentsTitle: string; allPayments: string; noPayments: string;
    activityTitle: string; docStatusActivity: string; noActivity: string;
    messagesTitle: string; supportName: string; supportAvailability: string;
    noMessages: string; typeMessage: string; send: string;
    scheduleTitle: string; scheduleSubtitle: string; noSchedule: string;
    profileTitle: string; accountInfo: string; edit: string; cancel: string;
    fullName: string; email: string; emailNote: string; accountType: string;
    saveChanges: string; notifications: string;
    notifInvoices: string; notifEstimates: string; notifPayments: string; notifSMS: string;
    billedTo: string; approveEstimate: string;
    docEstimate: string; docInvoice: string; docReceipt: string;
    docWorkOrder: string; docCreditNote: string;
  };
  admin: {
    title: string; signIn: string; signInDesc: string; signInBtn: string;
    adminEmail: string; accessRestricted: string; accessRestrictedDesc: string;
    goToPortal: string; signOut: string; viewSite: string;
    toggleSidebar: string;
    groups: {
      core: string; finance: string; content: string; ai: string;
      appearance: string; settings: string;
    };
    panels: {
      dashboard: string; projects: string; clients: string; employees: string;
      media: string; store: string; community: string; billing: string;
      economics: string; expenses: string; leads: string; hours: string;
      profitability: string; aiAnalyst: string; theme: string;
      appearanceBase: string; splash: string; video: string;
      reviews: string; metrics: string; logo: string; company: string;
      academy: string; serviceShop: string; analytics: string;
      calendar: string; messaging: string; roles: string; users: string;
      integrations: string; notifications: string; notifSettings: string;
      pwa: string; settings: string; i18n: string;
    };
    dashboard: {
      title: string; subtitle: string;
      activeProjects: string; clients: string; employees: string; mediaFiles: string;
      quickActions: string; recentContacts: string; noSubmissions: string;
      addProject: string; addClient: string; uploadMedia: string; viewAnalytics: string;
    };
    projects: {
      title: string; subtitle: string; addProject: string; editProject: string;
      titleField: string; titlePlaceholder: string; linkClient: string;
      noClientLinked: string; category: string; status: string; year: string;
      budget: string; startDate: string; endDate: string; address: string;
      addressPlaceholder: string; description: string; coverImage: string;
      coverImagePlaceholder: string; uploadBtn: string; internalNotes: string;
      notesPlaceholder: string; cancel: string; saveChanges: string; createProject: string;
      back: string; edit: string; tabs: { overview: string; notes: string; photos: string; team: string; billing: string };
      overview: string; descriptionLabel: string; internalNotesLabel: string;
      addNote: string; notePlaceholder: string; noNotes: string;
      uploadPhotos: string; uploading: string; noPhotos: string;
      assignedEmployees: string; assignEmployee: string; noEmployeesAssigned: string;
      totalLaborCost: string; hours: string; laborCost: string;
      projectFinancials: string; addExpense: string; addToBill: string;
      totalIncome: string; totalExpenses: string; netMargin: string;
      billingDocuments: string; noDocsLinked: string; expenses: string;
      noExpenses: string; income: string; noIncome: string;
      saveExpense: string; assignLogHours: string;
      status_planning: string; status_active: string; status_onHold: string;
      status_completed: string; status_cancelled: string;
      noProjects: string;
    };
    clients: {
      title: string; subtitle: string; addClient: string; editClient: string;
      contactPerson: string; companyName: string; email: string; phone: string;
      address: string; city: string; serviceInterest: string; status: string;
      portalAccess: string; portalYes: string; portalNo: string;
      internalNotes: string; cancel: string; saveChanges: string; addClientBtn: string;
      back: string; edit: string; totalBilled: string;
      tabs: { info: string; projects: string; billing: string; store: string; activity: string; notes: string };
      contactDetails: string; noProjects: string; noBilling: string;
      storeOrders: string; totalSpent: string; activeSubscriptions: string;
      noOrders: string; noSubscriptions: string;
      leadsTitle: string; noLeads: string; chatTitle: string; noMessages: string;
      addNote: string; notePlaceholder: string; noNotes: string;
      noClients: string;
    };
    employees: {
      title: string; subtitle: string; addEmployee: string; editEmployee: string;
      firstName: string; lastName: string; role: string; email: string; phone: string;
      address: string; roleLevel: string; hourlyRate: string; startDate: string;
      bio: string; portalAccess: string; cancel: string; saveChanges: string;
      totalHours: string; laborCost: string; loggedEntries: string;
      projectAssignments: string; noHoursLogged: string; editProfile: string;
      noEmployees: string; back: string;
    };
    media: {
      title: string; subtitle: string; addViaUrl: string; uploadFile: string;
      dropzone: string; dropzoneTypes: string; uploading: string; failedUpload: string;
      fileUrl: string; fileUrlPlaceholder: string; displayName: string;
      displayNamePlaceholder: string; saveUrl: string; cancel: string;
      filterAll: string; noAssets: string;
    };
    settings: {
      title: string; subtitle: string; siteIdentity: string; siteIdentityDesc: string;
      siteTitle: string; metaDesc: string; adminEmail: string; phone: string;
      address: string; instagram: string; facebook: string; saveChanges: string;
      systemModules: string;
    };
    notifications: {
      title: string; subtitle: string; unread: string;
      testNotif: string; markAllRead: string; clearAll: string;
      filterAll: string; filterUnread: string; noNotifications: string;
      viewAll: string; markAllReadBtn: string; justNow: string;
    };
    i18n: {
      title: string; subtitle: string; selectLang: string; section: string;
      key: string; value: string; saveSection: string; saved: string;
      resetSection: string; searchPlaceholder: string; noResults: string;
      sections: { [k: string]: string };
    };
  };
  billing: {
    estimate: string; invoice: string; receipt: string; workOrder: string; creditNote: string;
    documentNumber: string; clientName: string; status: string; total: string;
    type: string; lineItems: string; companyInfo: string; source: string;
    statusDraft: string; statusSent: string; statusApproved: string;
    statusPaid: string; statusOverdue: string; statusCancelled: string;
    subtotal: string; tax: string; discount: string; grandTotal: string;
    description: string; qty: string; unit: string; unitPrice: string;
    newDocument: string; editDocument: string; deleteDocument: string;
    preview: string; sendEmail: string; download: string;
    billedTo: string; dueDate: string; issueDate: string;
    paymentTerms: string; notes: string; thankyou: string;
  };
  common: {
    loading: string; error: string; client: string; active: string; completed: string;
    all: string; viewDetail: string; required: string; optional: string;
    status: string; date: string; amount: string; name: string;
    save: string; delete: string; close: string; add: string; edit: string;
    cancel: string; confirm: string; search: string; filter: string;
    noData: string; tryAgain: string; back: string; next: string; done: string;
    yes: string; no: string; or: string; and: string;
    createdAt: string; updatedAt: string; actions: string;
    upload: string; download: string; preview: string; share: string;
    enabled: string; disabled: string; on: string; off: string;
  };
};

/* ═══════════════════════════════════════════════════════ ENGLISH ════ */
const en: Translations = {
  nav: {
    services: "Services", home: "Home", contact: "Contact",
    signIn: "Sign In", register: "Register", admin: "Admin",
    portal: "Portal", startProject: "Start a Project", whichNeeds: "Which are your needs?",
    servicesDropdown: "Services",
  },
  hero: {
    eyebrow: "Construction · Renovation · Landscaping",
    headline1: "Crafting Spaces", headline2: "with a Cinematic", headline3: "Touch.",
    sub: "Aménagement Monzon — where architectural precision meets cinematic storytelling. Every project, a masterpiece.",
    exploreCta: "Explore Our Work", contactCta: "Get in Touch", scroll: "Scroll",
    stat1Value: "250+", stat1Label: "Projects Completed",
    stat2Value: "8+", stat2Label: "Years of Excellence",
    stat3Value: "100%", stat3Label: "Client Satisfaction",
    play: "Play video", pause: "Pause video",
  },
  services: {
    eyebrow: "Expertise", title: "What We Build",
    subtitle: "A full spectrum of premium property services, delivered with the precision and artistry that defines Aménagement Monzon.",
    requestQuote: "Request Quote",
    s1Title: "Construction", s1Desc: "Ground-up builds to structural expansions — precision-engineered with cinematic attention to detail and lasting quality.", s1Tags: ["New Builds", "Extensions", "Commercial", "Residential"],
    s2Title: "Renovation", s2Desc: "Transform existing spaces into architectural masterpieces. We blend modern aesthetics with structural integrity.", s2Tags: ["Interior", "Exterior", "Full Gut", "Kitchens", "Bathrooms"],
    s3Title: "Landscaping", s3Desc: "Curated outdoor environments that complement your property — beautifully designed and sustainably maintained.", s3Tags: ["Pavé", "Terrace", "Driveways", "Gardens", "Pools"],
    s4Title: "Maintenance", s4Desc: "Comprehensive maintenance programs that protect your investment and keep your property in peak condition year-round.", s4Tags: ["Seasonal", "Preventive", "Emergency", "Inspections"],
    marquee: ["Construction", "Renovation", "Landscaping", "Pavé Installation", "Driveway Design", "Garden Architecture", "Maintenance Plans", "Commercial Builds", "Residential Projects", "Pool Surrounds", "Retaining Walls", "Outdoor Living"],
  },
  portfolio: {
    eyebrow: "Showcase", title: "Featured Projects",
    subtitle: "Browse our complete collection of projects — each one a testament to precision and craftsmanship.",
    viewAll: "View All Projects", filterLabel: "Filter portfolio by category",
    filterAll: "All", filterConstruction: "Construction", filterRenovation: "Renovation",
    filterLandscaping: "Landscaping", filterMaintenance: "Maintenance",
    viewCaseStudy: "View Case Study",
    moreNote: "Want to see more? We have <strong>250+ completed projects</strong>.",
    fullGallery: "Full Gallery",
    pageSubtitle: "Browse our complete collection of projects — each one a testament to precision and craftsmanship.",
    pageTitle: "Portfolio & Gallery", galleryEyebrow: "Showcase",
  },
  store: {
    eyebrow: "Merchandise", title: "SM Store", subtitle: "Wear the brand. Carry the craft. Exclusive merchandise designed for those who appreciate quality in every detail.",
    visitStore: "Visit Full Store",
    freeShipping: "Free Shipping on Orders Over $100",
    freeShippingDesc: "All orders ship within 3-5 business days across Canada.",
    shopNow: "Shop Now",
    quickView: "Quick View", addedToCart: "Added to cart",
    pageTitle: "SM Store & Collection",
    pageSubtitle: "Professional tools for the job. Exclusive brand merchandise for the lifestyle. Two worlds, one standard of excellence.",
    tabStore: "SM Store", tabCollection: "SM Collection",
    cart: "Cart", yourCart: "Your Cart", cartEmpty: "Your cart is empty",
    subtotal: "Subtotal", checkout: "Proceed to Checkout",
    selectOptions: "Select Options", quickAdd: "Quick Add", addToCart: "Add to Cart",
    added: "Added!", color: "Color", size: "Size",
    collectionTitle: "SM Collection", collectionSubtitle: "Wear the craft. Limited runs. Exclusive drops.",
    accepts: "Accepts:", limitedBadge: "Limited",
    payment: {
      secureCheckout: "Secure Checkout", chooseMethod: "Choose Payment Method",
      interacLabel: "Interac e-Transfer", creditLabel: "Credit Card",
      debitLabel: "Debit Card", cashLabel: "Cash / Wire Transfer",
      interacSub: "Instant · No fees · Secure", creditSub: "Visa · Mastercard · Amex",
      debitSub: "Interac Debit · Direct payment", cashSub: "In-person or Bank wire",
      popular: "Popular", continue: "Continue", back: "Back",
      cardNumber: "Card Number", cardName: "Cardholder Name", expiry: "Expiry", cvc: "CVC",
      sendTransferTo: "Send your Interac e-Transfer to:",
      securityQuestion: "Security Question", securityAnswer: "Answer: Your order number will be provided by email after confirmation.",
      amountToSend: "Amount to Send",
      wireDetails: "Wire Transfer Details", cashInPerson: "Cash In-Person",
      cashInPersonDesc: "Available for local pick-up orders. Contact us to arrange a pickup time and location.",
      wireNote: "Use your name and order items as the wire reference. Orders ship after funds are confirmed (1–3 business days).",
      interacNote: "Include your name or order items in the message field of your transfer. Orders are processed after payment is received.",
      orderSummary: "Order Summary", total: "Total",
      payComplete: "Payment Complete", orderConfirmed: "Order Confirmed!",
      thankYou: "Thank You!",
      paymentSuccess: "Your payment was processed. A confirmation email is on its way.",
      interacSuccess: "Please complete your Interac e-Transfer to finalize the order. We'll confirm once received.",
      cashSuccess: "Your order has been placed. Complete your wire transfer or cash payment to confirm shipment.",
      orderTotal: "Order Total", backToStore: "Back to Store", processing: "Processing…",
      iveSentTransfer: "I've Sent the Transfer", placeOrder: "Place Order", pay: "Pay",
      errCardNumber: "Enter a valid 16-digit card number", errCardName: "Cardholder name is required",
      errExpiry: "Enter a valid expiry (MM/YY)", errCVC: "Enter a valid CVC",
    },
  },
  community: {
    eyebrow: "Social Media", title: "Our Community",
    subtitle: "Real projects. Real craftsmanship. Follow our cinematic journey across platforms.",
    joinCta: "Join Our Community",
    stat1: "48K+", stat1Label: "Instagram Followers",
    stat2: "210K+", stat2Label: "YouTube Views",
    stat3: "95K+", stat3Label: "TikTok Plays / Month",
    pageEyebrow: "Social Media", pageTitle: "Our Community", pageSubtitle: "Real projects. Real craftsmanship. Follow our cinematic journey across platforms.",
    hubTitle: "Community Hub", forumTitle: "Discussion Forum", forumDesc: "Community forum and Q&A module placeholder.",
    directoryTitle: "Member Directory", directoryDesc: "Verified members and community profiles placeholder.",
  },
  contact: {
    eyebrow: "Get In Touch", title: "Let's Build Something Remarkable", subtitle: "Tell us about your vision. Whether it's a ground-up build, a renovation, a driveway, or a full landscape — we'll craft a tailored plan that brings it to life.",
    location: "Location", phone: "Phone", email: "Email",
    mapPlaceholder: "Map Placeholder",
    fullName: "Full Name", emailLabel: "Email", phoneLabel: "Phone",
    projectType: "Project Type", budget: "Budget Range", details: "Project Details",
    detailsPlaceholder: "Describe your project, location, timeline…", namePlaceholder: "Jean Dupont",
    selectType: "Select type…", selectBudget: "Select budget…",
    types: ["Construction", "Renovation", "Landscaping", "Maintenance", "Other"],
    budgets: ["Under $10K", "$10K – $50K", "$50K – $150K", "$150K+"],
    send: "Send Message", sending: "Sending…", privacy: "We respond within 24 hours. Your information stays private.",
    successTitle: "Message Received!", successDesc: "Our team will reach out within 24 hours to discuss your project.",
    sendAnother: "Send Another Message",
    nameRequired: "Name is required.", emailRequired: "Email is required.", messageRequired: "Message is required.",
    pageEyebrow: "Get In Touch", pageTitle: "Contact Us", pageSubtitle: "Tell us about your vision and we'll craft a tailored plan that brings it to life.",
  },
  footer: {
    tagline: "Premium construction, renovation, landscaping, and maintenance services. Crafting spaces with a cinematic touch since 2015.",
    stayUpdated: "Stay Updated", stayUpdatedDesc: "Subscribe for project reveals, industry insights, and exclusive offers.",
    subscribe: "Subscribe", subscribed: "You're subscribed!",
    emailPlaceholder: "your@email.com",
    copyright: "All rights reserved.", ourStory: "Our Story", academy: "Academy", craftedIn: "Crafted in Montreal, QC",
    companyGroup: "Company", exploreGroup: "Explore", legalGroup: "Legal",
    links: {
      aboutUs: "About Us", services: "Services", portfolio: "Portfolio", blog: "Blog", contact: "Contact",
      smStore: "SM Store", smCollection: "SM Collection", community: "Community", maintenance: "Maintenance", academy: "Academy",
      privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Policy", sitemap: "Sitemap",
    },
  },
  portalBanner: {
    clientAccess: "Client Access", title: "Track Your Project in Real Time",
    subtitle: "Already a client? Log in to your private portal for live updates, documents, and direct communication with your project manager.",
    accessPortal: "Access Portal", requestAccess: "Request Access",
    f1: "Live project tracking", f2: "Document access", f3: "Direct PM messaging", f4: "Photo progress updates",
  },
  reviews: {
    eyebrow: "What Clients Say", title: "Client Reviews", allReviews: "All Reviews", companyResponse: "Company Response",
  },
  about: {
    eyebrow: "Our Story", title: "About Aménagement Monzon",
    subtitle: "Where architectural precision meets cinematic storytelling. Every project, a masterpiece.",
    statsSection: "",
    stat1Value: "250+", stat1Label: "Projects Delivered",
    stat2Value: "8+", stat2Label: "Years in Business",
    stat3Value: "100%", stat3Label: "Client Satisfaction",
    stat4Value: "50+", stat4Label: "Team Members",
    missionTitle: "Mission & Values", teamTitle: "Meet the Team", teamMember: "Team Member",
    missionValues: ["Excellence", "Teamwork", "Craftsmanship", "Sustainability"],
    fullStory: "Discover our full story", fullStoryDesc: "Founder, heroes, timeline, values, and awards.",
    ourCompany: "Our Company",
    founderRole: "Founder & CEO", architectRole: "Lead Architect",
    constructionRole: "Head of Construction", landscapingRole: "Landscaping Director",
    pmRole: "Project Manager", creativeRole: "Creative Director",
  },
  blog: {
    eyebrow: "Insights", title: "Our Blog",
    subtitle: "Industry knowledge, project reveals, and design inspiration from the Aménagement Monzon team.",
    searchPlaceholder: "Search articles…", readMore: "Read More", loadingMore: "Loading…",
    searchFiltersTitle: "Blog Search & Filters", paginationTitle: "Pagination",
    searchFiltersDesc: "Full-text search, category filters, and tags — ready for implementation.",
    paginationDesc: "Page navigation placeholder.",
  },
  servicesPage: {
    eyebrow: "What We Do", title: "Our Services",
    subtitle: "A full spectrum of premium property services, delivered with the precision and artistry that defines Aménagement Monzon.",
    processTitle: "Our Process",
    steps: ["Discovery & Estimate", "Design & Planning", "Execution", "Handover & Support"],
    step: "Step", processDesc: "Process step placeholder — ready for content.",
  },
  academy: {
    pageEyebrow: "Learn & Grow", pageTitle: "Monzon Academy",
    pageSubtitle: "We're not just builders — we're educators. Gain skills, get coaching, and grow in the trades industry.",
    stat1: "12+", stat1Label: "Active Programs",
    stat2: "340+", stat2Label: "Students Enrolled",
    stat3: "8", stat3Label: "Expert Instructors",
    stat4: "97%", stat4Label: "Success Rate",
    filterAll: "All", filterCourse: "Courses", filterCoaching: "Coaching",
    filterWorkshop: "Workshops", filterEvent: "Events",
    enroll: "Enroll", duration: "Duration", instructor: "Instructor",
    noItems: "No items in this category yet.",
    ctaTitle: "Ready to level up?", ctaSubtitle: "Join hundreds of students who have advanced their skills and grown their businesses with Monzon Academy.", ctaBtn: "Get in Touch",
  },
  maintenance: {
    pageEyebrow: "Service Marketplace", pageTitle: "Maintenance Services",
    pageSubtitle: "Recurring and one-time maintenance plans for residential and commercial properties. Subscribe and forget — we handle the rest.",
    tabServices: "Services", tabSubscriptions: "Subscription Plans",
    filterAll: "All Services",
    subscribe: "Subscribe", add: "Add", added: "Added!",
    popular: "Most Popular",
    subscribeTitle: "Choose Your Subscription", subscribeSubtitle: "All plans include access to our full service catalog. Upgrade or cancel anytime.",
    customPlanTitle: "Need a custom plan?", customPlanDesc: "Commercial properties, multi-unit buildings, and specialized needs — we'll build a plan around you.", customPlanBtn: "Request Custom Quote",
    getStarted: "Get Started",
    categoryAll: "All Services", categoryExterior: "Exterior", categoryInterior: "Interior",
    categoryLandscaping: "Landscaping", categorySnow: "Snow Removal", categorySeasonal: "Seasonal",
    categoryEmergency: "Emergency",
    priceTypeMonthly: "monthly", priceTypeFixed: "fixed", priceTypeCustom: "custom",
  },
  chat: {
    greeting: "Hello! 👋 I'm **Monzon AI**. I can answer questions about our services, process, and materials. How can I help you today?",
    placeholder: "Ask anything…", askAnything: "Ask anything…",
    typing: "Typing…", poweredBy: "Powered by Monzon AI · Never shares pricing",
    online: "Online · 24/7", chatWith: "Chat with Monzon AI", open: "Open AI chat", close: "Close AI chat",
    suggestions: ["What services do you offer?", "How long does a renovation take?", "What materials do you use?", "How do I start a project?"],
    responses: {},
  },
  portal: {
    secureAccess: "Secure Access", title: "Client Portal",
    subtitle: "Sign in to access your invoices, estimates, projects, work orders, payment history, and direct messaging.",
    signInBtn: "Sign In to Portal", notClient: "Not a client yet?", requestAccess: "Request access →",
    overview: "Overview", myProjects: "My Projects", documents: "Documents",
    payments: "Payments", schedule: "My Schedule", activity: "Activity",
    messages: "Messages", myProfile: "My Profile", signOut: "Sign Out",
    welcomeBack: "Welcome back", overviewSubtitle: "Here's your project and billing overview.",
    invoices: "Invoices", estimates: "Estimates", paid: "Paid", pending: "Pending",
    recentDocuments: "Recent Documents", viewAll: "View all", quickActions: "Quick Actions",
    viewProjects: "View Projects", viewAllInvoices: "View All Invoices",
    approveEstimates: "Approve Estimates", paymentHistory: "Payment History", sendMessage: "Send a Message",
    myProjectsTitle: "My Projects", noProjects: "No projects found for your account.",
    documentsTitle: "Documents & Invoices", allDocuments: "All Documents", noDocuments: "No documents available yet.", approve: "Approve",
    paymentsTitle: "Payment History", allPayments: "All Payments", noPayments: "No payments recorded yet.",
    activityTitle: "Activity Log", docStatusActivity: "Document Status Activity", noActivity: "No activity yet.",
    messagesTitle: "Messages", supportName: "Aménagement Monzon Support", supportAvailability: "Team available Mon–Fri",
    noMessages: "No messages yet. Send us a message and our team will respond within 24 hours.",
    typeMessage: "Type a message…", send: "Send",
    scheduleTitle: "My Schedule", scheduleSubtitle: "Upcoming project milestones, service visits, and appointments scheduled by your team.",
    noSchedule: "No scheduled events yet. Your team will add project milestones and service visits here.",
    profileTitle: "My Profile", accountInfo: "Account Information", edit: "Edit", cancel: "Cancel",
    fullName: "Full Name", email: "Email", emailNote: "Email cannot be changed here. Contact support.",
    accountType: "Account Type", saveChanges: "Save Changes", notifications: "Notifications",
    notifInvoices: "Email: New Invoices", notifEstimates: "Email: Estimate Ready",
    notifPayments: "Email: Payment Confirmation", notifSMS: "SMS: Project Updates",
    billedTo: "Billed To", approveEstimate: "Approve Estimate",
    docEstimate: "estimate", docInvoice: "invoice", docReceipt: "receipt", docWorkOrder: "work order", docCreditNote: "credit note",
  },
  admin: {
    title: "Admin Panel", signIn: "Admin Panel", signInDesc: "Sign in to access the Aménagement Monzon admin dashboard.", signInBtn: "Sign In to Admin",
    adminEmail: "Admin email:", accessRestricted: "Access Restricted", accessRestrictedDesc: "Your account doesn't have admin or staff access. Contact your administrator.",
    goToPortal: "Go to Client Portal", signOut: "Sign Out", viewSite: "View Site", toggleSidebar: "Toggle sidebar",
    groups: { core: "Core", finance: "Finance & Ops", content: "Content & Brand", ai: "AI", appearance: "Appearance", settings: "System" },
    panels: {
      dashboard: "Dashboard", projects: "Projects", clients: "Clients", employees: "Employees",
      media: "Media Manager", store: "Store", community: "Community", billing: "Billing",
      economics: "Economic Dashboard", expenses: "Expenses & Income", leads: "Lead Management",
      hours: "Employee Hours", profitability: "Profitability", aiAnalyst: "AI Economic Analyst",
      theme: "Theme Manager", appearanceBase: "Appearance Base", splash: "Splash Screen",
      video: "Video Manager", reviews: "Reviews", metrics: "Metrics Editor", logo: "Logo Manager",
      company: "Company Identity", academy: "Academy Manager", serviceShop: "Service Shop",
      analytics: "Analytics", calendar: "Calendar", messaging: "Messaging Hub",
      roles: "Role Manager", users: "User Manager", integrations: "Integrations",
      notifications: "Notifications", notifSettings: "Notif. Settings", pwa: "PWA Settings",
      settings: "Settings", i18n: "Translations",
    },
    dashboard: {
      title: "Dashboard", subtitle: "Welcome back. Here's your site overview.",
      activeProjects: "Active Projects", clients: "Clients", employees: "Employees", mediaFiles: "Media Files",
      quickActions: "Quick Actions", recentContacts: "Recent Contacts", noSubmissions: "No submissions yet.",
      addProject: "Add Project", addClient: "Add Client", uploadMedia: "Upload Media", viewAnalytics: "View Analytics",
    },
    projects: {
      title: "Projects", subtitle: "Manage portfolio and active construction projects.", addProject: "Add Project", editProject: "Edit Project",
      titleField: "Project Title *", titlePlaceholder: "e.g. Driveway Renovation – Client Name", linkClient: "Link to Client",
      noClientLinked: "— No client linked —", category: "Category", status: "Status", year: "Year",
      budget: "Budget", startDate: "Start Date", endDate: "End Date", address: "Site Address",
      addressPlaceholder: "123 Rue Example, Montréal", description: "Description", coverImage: "Cover Image",
      coverImagePlaceholder: "https://… or upload →", uploadBtn: "Upload", internalNotes: "Internal Notes",
      notesPlaceholder: "Private notes visible only to admin/staff.", cancel: "Cancel", saveChanges: "Save Changes", createProject: "Create Project",
      back: "← Back to projects", edit: "Edit",
      tabs: { overview: "overview", notes: "notes", photos: "photos", team: "team", billing: "billing" },
      overview: "Overview", descriptionLabel: "Description", internalNotesLabel: "Internal Notes",
      addNote: "Add", notePlaceholder: "Add an internal note…", noNotes: "No notes yet.",
      uploadPhotos: "Upload Photos", uploading: "Uploading…", noPhotos: "No photos uploaded yet.",
      assignedEmployees: "Assigned Employees", assignEmployee: "+ Assign Employee", noEmployeesAssigned: "No employees assigned yet.",
      totalLaborCost: "Total Labor Cost for this Project", hours: "hours", laborCost: "labor cost",
      projectFinancials: "Project Financials", addExpense: "+ Add Expense", addToBill: "+ Add to Bill",
      totalIncome: "Total Income", totalExpenses: "Total Expenses", netMargin: "Net Margin",
      billingDocuments: "Billing Documents", noDocsLinked: "No billing documents linked yet.", expenses: "Expenses",
      noExpenses: "No expenses logged.", income: "Income", noIncome: "No income logged.",
      saveExpense: "Save Expense", assignLogHours: "Assign & Log Hours",
      status_planning: "Planning", status_active: "Active", status_onHold: "On Hold",
      status_completed: "Completed", status_cancelled: "Cancelled",
      noProjects: "No projects yet. Click 'Add Project' to get started.",
    },
    clients: {
      title: "Clients", subtitle: "Manage client records, projects, and portal access.", addClient: "+ Add Client", editClient: "Edit Client",
      contactPerson: "Contact Person *", companyName: "Company / Household Name", email: "Email", phone: "Phone",
      address: "Street Address", city: "City", serviceInterest: "Service Interest", status: "Status",
      portalAccess: "Portal Access", portalYes: "Yes – Grant access", portalNo: "No – No access",
      internalNotes: "Internal Notes", cancel: "Cancel", saveChanges: "Save Changes", addClientBtn: "Add Client",
      back: "← Back to clients", edit: "Edit", totalBilled: "billed",
      tabs: { info: "info", projects: "projects", billing: "billing", store: "store", activity: "activity", notes: "notes" },
      contactDetails: "Contact Details", noProjects: "No projects linked to this client yet.",
      noBilling: "No billing documents for this client yet.",
      storeOrders: "Store Orders", totalSpent: "Total Spent (Store)", activeSubscriptions: "Active Subscriptions",
      noOrders: "No store orders found for this client.", noSubscriptions: "No subscription billing documents for this client.",
      leadsTitle: "Leads / CRM", noLeads: "No leads linked to this client yet.",
      chatTitle: "AI Chat / Portal Messages", noMessages: "No chat messages from this client yet.",
      addNote: "Add", notePlaceholder: "Add a note about this client…", noNotes: "No notes yet.",
      noClients: "No clients yet. Click 'Add Client' to get started.",
    },
    employees: {
      title: "Employees", subtitle: "Staff directory, salaries & project assignments.", addEmployee: "+ Add Employee", editEmployee: "Edit Employee",
      firstName: "First Name", lastName: "Last Name", role: "Title / Role", email: "Email", phone: "Phone",
      address: "Address", roleLevel: "Role Level", hourlyRate: "Hourly Rate ($)", startDate: "Start Date",
      bio: "Bio / Notes", portalAccess: "Grant Portal Access", cancel: "Cancel", saveChanges: "Save Changes",
      totalHours: "Total Hours", laborCost: "Labor Cost", loggedEntries: "Logged Entries",
      projectAssignments: "Project Assignments", noHoursLogged: "No hours logged yet.",
      editProfile: "Edit Profile", noEmployees: "No employees yet. Click 'Add Employee' to get started.",
      back: "← Back to list",
    },
    media: {
      title: "Media Manager", subtitle: "Upload and manage images, videos, 3D assets, and documents.",
      addViaUrl: "Add via URL", uploadFile: "← Upload File",
      dropzone: "Drag & drop files here, or click to browse",
      dropzoneTypes: "MP4, WebM, PNG, JPG, GLB, PDF · any size",
      uploading: "Uploading…", failedUpload: "Upload failed — try a smaller file.",
      fileUrl: "File URL", fileUrlPlaceholder: "https://...", displayName: "Display Name (optional)",
      displayNamePlaceholder: "hero-video.mp4", saveUrl: "Save URL", cancel: "Cancel",
      filterAll: "All", noAssets: "No media assets yet. Upload your first file.",
    },
    settings: {
      title: "Settings", subtitle: "Configure global site settings, metadata, and system modules.",
      siteIdentity: "Site Identity", siteIdentityDesc: "SEO and branding settings.",
      siteTitle: "Site Title", metaDesc: "Meta Description", adminEmail: "Admin Email", phone: "Phone",
      address: "Address", instagram: "Instagram Handle", facebook: "Facebook Page",
      saveChanges: "Save Changes", systemModules: "System Modules",
    },
    notifications: {
      title: "Notification Center", subtitle: "All in-app notifications for admin and staff.",
      unread: "unread", testNotif: "Test Notification", markAllRead: "Mark All Read", clearAll: "Clear All",
      filterAll: "All", filterUnread: "Unread", noNotifications: "No notifications",
      viewAll: "View all notifications →", markAllReadBtn: "Mark all read", justNow: "just now",
    },
    i18n: {
      title: "Translation Manager", subtitle: "Edit all site translations for EN / FR / ES directly from the admin panel.",
      selectLang: "Language", section: "Section", key: "Key", value: "Translation",
      saveSection: "Save Section", saved: "Saved!", resetSection: "Reset to Defaults",
      searchPlaceholder: "Search keys…", noResults: "No matching keys found.",
      sections: { nav: "Navigation", hero: "Hero Section", services: "Services", portfolio: "Portfolio", store: "Store", community: "Community", contact: "Contact", footer: "Footer", about: "About", blog: "Blog", academy: "Academy", maintenance: "Maintenance", portal: "Client Portal", admin: "Admin Panel", billing: "Billing", common: "Common Labels" },
    },
  },
  billing: {
    estimate: "Estimate", invoice: "Invoice", receipt: "Receipt", workOrder: "Work Order", creditNote: "Credit Note",
    documentNumber: "Document #", clientName: "Client Name", status: "Status", total: "Total",
    type: "Type", lineItems: "Line Items", companyInfo: "Company Info", source: "Source",
    statusDraft: "Draft", statusSent: "Sent", statusApproved: "Approved",
    statusPaid: "Paid", statusOverdue: "Overdue", statusCancelled: "Cancelled",
    subtotal: "Subtotal", tax: "Tax", discount: "Discount", grandTotal: "Grand Total",
    description: "Description", qty: "Qty", unit: "Unit", unitPrice: "Unit Price",
    newDocument: "New Document", editDocument: "Edit Document", deleteDocument: "Delete Document",
    preview: "Preview", sendEmail: "Send Email", download: "Download",
    billedTo: "Billed To", dueDate: "Due Date", issueDate: "Issue Date",
    paymentTerms: "Payment Terms", notes: "Notes", thankyou: "Thank you for your business.",
  },
  common: {
    loading: "Loading…", error: "Error", client: "Client", active: "Active", completed: "Completed",
    all: "All", viewDetail: "View Detail", required: "required", optional: "optional",
    status: "Status", date: "Date", amount: "Amount", name: "Name",
    save: "Save", delete: "Delete", close: "Close", add: "Add", edit: "Edit",
    cancel: "Cancel", confirm: "Confirm", search: "Search", filter: "Filter",
    noData: "No data available.", tryAgain: "Try again", back: "Back", next: "Next", done: "Done",
    yes: "Yes", no: "No", or: "or", and: "and",
    createdAt: "Created", updatedAt: "Updated", actions: "Actions",
    upload: "Upload", download: "Download", preview: "Preview", share: "Share",
    enabled: "Enabled", disabled: "Disabled", on: "On", off: "Off",
  },
};

/* ═══════════════════════════════════════════════════════ FRENCH ═════ */
const fr: Translations = {
  nav: {
    services: "Services", home: "Accueil", contact: "Contact",
    signIn: "Connexion", register: "S'inscrire", admin: "Admin",
    portal: "Portail", startProject: "Démarrer un Projet", whichNeeds: "Quels sont vos besoins ?",
    servicesDropdown: "Services",
  },
  hero: {
    eyebrow: "Construction · Rénovation · Aménagement",
    headline1: "Créer des Espaces", headline2: "avec une Touche", headline3: "Cinématique.",
    sub: "Aménagement Monzon — où la précision architecturale rencontre la narration cinématique. Chaque projet, un chef-d'œuvre.",
    exploreCta: "Explorer Nos Travaux", contactCta: "Nous Contacter", scroll: "Défiler",
    stat1Value: "250+", stat1Label: "Projets Réalisés",
    stat2Value: "8+", stat2Label: "Années d'Excellence",
    stat3Value: "100%", stat3Label: "Satisfaction Client",
    play: "Lire la vidéo", pause: "Mettre en pause",
  },
  services: {
    eyebrow: "Expertise", title: "Ce Que Nous Construisons",
    subtitle: "Un spectre complet de services immobiliers haut de gamme, livrés avec la précision et l'art qui définissent Aménagement Monzon.",
    requestQuote: "Demander un Devis",
    s1Title: "Construction", s1Desc: "Des constructions à neuf aux agrandissements structurels — conçus avec précision et une qualité durable.", s1Tags: ["Nouvelles Constructions", "Extensions", "Commercial", "Résidentiel"],
    s2Title: "Rénovation", s2Desc: "Transformez les espaces existants en chefs-d'œuvre architecturaux. Nous allions esthétique moderne et intégrité structurelle.", s2Tags: ["Intérieur", "Extérieur", "Remise à Neuf", "Cuisines", "Salles de Bain"],
    s3Title: "Aménagement Paysager", s3Desc: "Des environnements extérieurs soignés qui complètent votre propriété — magnifiquement conçus et entretenus durablement.", s3Tags: ["Pavé", "Terrasse", "Allées", "Jardins", "Piscines"],
    s4Title: "Entretien", s4Desc: "Des programmes d'entretien complets qui protègent votre investissement et maintiennent votre propriété en parfait état toute l'année.", s4Tags: ["Saisonnier", "Préventif", "Urgences", "Inspections"],
    marquee: ["Construction", "Rénovation", "Aménagement", "Installation de Pavé", "Design d'Allée", "Architecture de Jardin", "Plans d'Entretien", "Constructions Commerciales", "Projets Résidentiels", "Abords de Piscine", "Murs de Soutènement", "Vie Extérieure"],
  },
  portfolio: {
    eyebrow: "Vitrine", title: "Projets en Vedette",
    subtitle: "Parcourez notre collection complète de projets — chacun est un témoignage de précision et de savoir-faire.",
    viewAll: "Voir Tous les Projets", filterLabel: "Filtrer le portfolio par catégorie",
    filterAll: "Tout", filterConstruction: "Construction", filterRenovation: "Rénovation",
    filterLandscaping: "Aménagement", filterMaintenance: "Entretien",
    viewCaseStudy: "Voir l'Étude de Cas",
    moreNote: "Vous voulez en voir plus ? Nous avons <strong>plus de 250 projets réalisés</strong>.",
    fullGallery: "Galerie Complète",
    pageSubtitle: "Parcourez notre collection complète de projets — chacun est un témoignage de précision et de savoir-faire.",
    pageTitle: "Portfolio & Galerie", galleryEyebrow: "Vitrine",
  },
  store: {
    eyebrow: "Marchandise", title: "Boutique SM", subtitle: "Portez la marque. Portez le métier. Marchandise exclusive pour ceux qui apprécient la qualité dans chaque détail.",
    visitStore: "Visiter la Boutique",
    freeShipping: "Livraison Gratuite pour les Commandes Dépassant 100 $",
    freeShippingDesc: "Toutes les commandes sont expédiées en 3 à 5 jours ouvrables partout au Canada.",
    shopNow: "Magasiner",
    quickView: "Aperçu Rapide", addedToCart: "Ajouté au panier",
    pageTitle: "Boutique SM & Collection SM",
    pageSubtitle: "Outils professionnels pour le travail. Marchandise de marque exclusive pour le style de vie. Deux mondes, un seul standard d'excellence.",
    tabStore: "Boutique SM", tabCollection: "Collection SM",
    cart: "Panier", yourCart: "Votre Panier", cartEmpty: "Votre panier est vide",
    subtotal: "Sous-total", checkout: "Procéder au Paiement",
    selectOptions: "Sélectionner les Options", quickAdd: "Ajout Rapide", addToCart: "Ajouter au Panier",
    added: "Ajouté !", color: "Couleur", size: "Taille",
    collectionTitle: "Collection SM", collectionSubtitle: "Portez le métier. Éditions limitées. Lancements exclusifs.",
    accepts: "Accepte :", limitedBadge: "Limité",
    payment: {
      secureCheckout: "Paiement Sécurisé", chooseMethod: "Choisir le Mode de Paiement",
      interacLabel: "Virement Interac", creditLabel: "Carte de Crédit",
      debitLabel: "Carte de Débit", cashLabel: "Comptant / Virement Bancaire",
      interacSub: "Instantané · Sans frais · Sécurisé", creditSub: "Visa · Mastercard · Amex",
      debitSub: "Débit Interac · Paiement Direct", cashSub: "En personne ou virement bancaire",
      popular: "Populaire", continue: "Continuer", back: "Retour",
      cardNumber: "Numéro de Carte", cardName: "Titulaire de la Carte", expiry: "Expiration", cvc: "CVV",
      sendTransferTo: "Envoyez votre virement Interac à :",
      securityQuestion: "Question de Sécurité",
      securityAnswer: "Réponse : Votre numéro de commande vous sera fourni par courriel après confirmation.",
      amountToSend: "Montant à Envoyer",
      wireDetails: "Détails du Virement Bancaire", cashInPerson: "Comptant en Personne",
      cashInPersonDesc: "Disponible pour les commandes de ramassage local. Contactez-nous pour organiser un moment de ramassage.",
      wireNote: "Utilisez votre nom et les articles commandés comme référence. Les commandes sont expédiées après réception des fonds (1 à 3 jours ouvrables).",
      interacNote: "Incluez votre nom ou les articles commandés dans le champ message de votre virement. Les commandes sont traitées après réception du paiement.",
      orderSummary: "Récapitulatif de la Commande", total: "Total",
      payComplete: "Paiement Complété", orderConfirmed: "Commande Confirmée !",
      thankYou: "Merci !",
      paymentSuccess: "Votre paiement a été traité. Un courriel de confirmation est en route.",
      interacSuccess: "Veuillez compléter votre virement Interac pour finaliser la commande. Nous confirmerons dès réception.",
      cashSuccess: "Votre commande a été passée. Effectuez votre virement ou paiement comptant pour confirmer l'expédition.",
      orderTotal: "Total de la Commande", backToStore: "Retour à la Boutique", processing: "Traitement…",
      iveSentTransfer: "J'ai Envoyé le Virement", placeOrder: "Passer la Commande", pay: "Payer",
      errCardNumber: "Entrez un numéro de carte valide à 16 chiffres", errCardName: "Le nom du titulaire est requis",
      errExpiry: "Entrez une date d'expiration valide (MM/AA)", errCVC: "Entrez un CVV valide",
    },
  },
  community: {
    eyebrow: "Réseaux Sociaux", title: "Notre Communauté",
    subtitle: "De vrais projets. Du vrai savoir-faire. Suivez notre parcours cinématique sur toutes les plateformes.",
    joinCta: "Rejoindre Notre Communauté",
    stat1: "48K+", stat1Label: "Abonnés Instagram",
    stat2: "210K+", stat2Label: "Vues YouTube",
    stat3: "95K+", stat3Label: "Lectures TikTok / Mois",
    pageEyebrow: "Réseaux Sociaux", pageTitle: "Notre Communauté", pageSubtitle: "De vrais projets. Du vrai savoir-faire. Suivez notre parcours cinématique sur toutes les plateformes.",
    hubTitle: "Centre Communautaire", forumTitle: "Forum de Discussion", forumDesc: "Module de forum communautaire et Q&R — prêt à l'implémentation.",
    directoryTitle: "Annuaire des Membres", directoryDesc: "Membres vérifiés et profils communautaires — prêt à l'implémentation.",
  },
  contact: {
    eyebrow: "Contactez-Nous", title: "Construisons Quelque Chose de Remarquable", subtitle: "Parlez-nous de votre vision. Qu'il s'agisse d'une construction, d'une rénovation, d'une allée ou d'un aménagement paysager — nous créerons un plan sur mesure.",
    location: "Emplacement", phone: "Téléphone", email: "Courriel",
    mapPlaceholder: "Carte",
    fullName: "Nom Complet", emailLabel: "Courriel", phoneLabel: "Téléphone",
    projectType: "Type de Projet", budget: "Budget", details: "Détails du Projet",
    detailsPlaceholder: "Décrivez votre projet, l'emplacement, le calendrier…", namePlaceholder: "Jean Dupont",
    selectType: "Sélectionner le type…", selectBudget: "Sélectionner le budget…",
    types: ["Construction", "Rénovation", "Aménagement Paysager", "Entretien", "Autre"],
    budgets: ["Moins de 10 000 $", "10 000 $ – 50 000 $", "50 000 $ – 150 000 $", "150 000 $+"],
    send: "Envoyer le Message", sending: "Envoi…", privacy: "Nous répondons dans les 24 heures. Vos informations restent privées.",
    successTitle: "Message Reçu !", successDesc: "Notre équipe vous contactera dans les 24 heures.",
    sendAnother: "Envoyer un Autre Message",
    nameRequired: "Le nom est requis.", emailRequired: "Le courriel est requis.", messageRequired: "Le message est requis.",
    pageEyebrow: "Contactez-Nous", pageTitle: "Nous Contacter", pageSubtitle: "Parlez-nous de votre vision et nous créerons un plan sur mesure.",
  },
  footer: {
    tagline: "Services premium de construction, rénovation, aménagement paysager et entretien. Créer des espaces avec une touche cinématique depuis 2015.",
    stayUpdated: "Restez Informé", stayUpdatedDesc: "Abonnez-vous pour des révélations de projets, des insights et des offres exclusives.",
    subscribe: "S'abonner", subscribed: "Vous êtes abonné !",
    emailPlaceholder: "votre@courriel.com",
    copyright: "Tous droits réservés.", ourStory: "Notre Histoire", academy: "Académie", craftedIn: "Conçu à Montréal, QC",
    companyGroup: "Entreprise", exploreGroup: "Explorer", legalGroup: "Légal",
    links: {
      aboutUs: "À Propos", services: "Services", portfolio: "Portfolio", blog: "Blogue", contact: "Contact",
      smStore: "Boutique SM", smCollection: "Collection SM", community: "Communauté", maintenance: "Entretien", academy: "Académie",
      privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation", cookies: "Politique de Cookies", sitemap: "Plan du Site",
    },
  },
  portalBanner: {
    clientAccess: "Accès Client", title: "Suivez Votre Projet en Temps Réel",
    subtitle: "Déjà client ? Connectez-vous à votre portail privé pour des mises à jour en direct, des documents et une communication directe avec votre chargé de projet.",
    accessPortal: "Accéder au Portail", requestAccess: "Demander l'Accès",
    f1: "Suivi de projet en direct", f2: "Accès aux documents", f3: "Messagerie directe", f4: "Mises à jour photos",
  },
  reviews: {
    eyebrow: "Ce Que Disent les Clients", title: "Avis Clients", allReviews: "Tous les Avis", companyResponse: "Réponse de l'Entreprise",
  },
  about: {
    eyebrow: "Notre Histoire", title: "À Propos d'Aménagement Monzon",
    subtitle: "Où la précision architecturale rencontre la narration cinématique. Chaque projet, un chef-d'œuvre.",
    statsSection: "",
    stat1Value: "250+", stat1Label: "Projets Livrés",
    stat2Value: "8+", stat2Label: "Années d'Activité",
    stat3Value: "100%", stat3Label: "Satisfaction Client",
    stat4Value: "50+", stat4Label: "Membres de l'Équipe",
    missionTitle: "Mission & Valeurs", teamTitle: "Rencontrez l'Équipe", teamMember: "Membre de l'Équipe",
    missionValues: ["Excellence", "Travail d'Équipe", "Savoir-Faire", "Durabilité"],
    fullStory: "Découvrez notre histoire complète", fullStoryDesc: "Fondateur, héros, chronologie, valeurs et récompenses.",
    ourCompany: "Notre Entreprise",
    founderRole: "Fondateur & PDG", architectRole: "Architecte Principal",
    constructionRole: "Responsable Construction", landscapingRole: "Directeur Aménagement",
    pmRole: "Chef de Projet", creativeRole: "Directeur Créatif",
  },
  blog: {
    eyebrow: "Perspectives", title: "Notre Blogue",
    subtitle: "Connaissances du secteur, révélations de projets et inspiration design de l'équipe Aménagement Monzon.",
    searchPlaceholder: "Rechercher des articles…", readMore: "Lire la Suite", loadingMore: "Chargement…",
    searchFiltersTitle: "Recherche & Filtres du Blogue", paginationTitle: "Pagination",
    searchFiltersDesc: "Recherche plein texte, filtres de catégories et tags — prêt à l'implémentation.",
    paginationDesc: "Navigation de pages.",
  },
  servicesPage: {
    eyebrow: "Ce Que Nous Faisons", title: "Nos Services",
    subtitle: "Un spectre complet de services immobiliers haut de gamme, livrés avec la précision et l'art qui définissent Aménagement Monzon.",
    processTitle: "Notre Processus",
    steps: ["Découverte & Estimation", "Conception & Planification", "Exécution", "Remise & Support"],
    step: "Étape", processDesc: "Étape du processus — prête pour le contenu.",
  },
  academy: {
    pageEyebrow: "Apprendre & Évoluer", pageTitle: "Académie Monzon",
    pageSubtitle: "Nous ne sommes pas seulement des bâtisseurs — nous sommes des éducateurs. Développez vos compétences, obtenez du coaching et évoluez dans l'industrie.",
    stat1: "12+", stat1Label: "Programmes Actifs",
    stat2: "340+", stat2Label: "Étudiants Inscrits",
    stat3: "8", stat3Label: "Instructeurs Experts",
    stat4: "97%", stat4Label: "Taux de Réussite",
    filterAll: "Tout", filterCourse: "Cours", filterCoaching: "Coaching",
    filterWorkshop: "Ateliers", filterEvent: "Événements",
    enroll: "S'inscrire", duration: "Durée", instructor: "Instructeur",
    noItems: "Aucun élément dans cette catégorie pour l'instant.",
    ctaTitle: "Prêt à vous améliorer ?", ctaSubtitle: "Rejoignez des centaines d'étudiants qui ont développé leurs compétences avec l'Académie Monzon.", ctaBtn: "Nous Contacter",
  },
  maintenance: {
    pageEyebrow: "Marché des Services", pageTitle: "Services d'Entretien",
    pageSubtitle: "Plans de maintenance récurrents et ponctuels pour les propriétés résidentielles et commerciales. Abonnez-vous et oubliez — nous nous occupons du reste.",
    tabServices: "Services", tabSubscriptions: "Plans d'Abonnement",
    filterAll: "Tous les Services",
    subscribe: "S'abonner", add: "Ajouter", added: "Ajouté !",
    popular: "Le Plus Populaire",
    subscribeTitle: "Choisissez Votre Abonnement", subscribeSubtitle: "Tous les plans incluent l'accès à notre catalogue complet. Améliorez ou annulez à tout moment.",
    customPlanTitle: "Besoin d'un plan personnalisé ?", customPlanDesc: "Propriétés commerciales, immeubles à logements multiples et besoins spécialisés — nous créerons un plan adapté.", customPlanBtn: "Demander un Devis Personnalisé",
    getStarted: "Commencer",
    categoryAll: "Tous les Services", categoryExterior: "Extérieur", categoryInterior: "Intérieur",
    categoryLandscaping: "Aménagement", categorySnow: "Déneigement", categorySeasonal: "Saisonnier",
    categoryEmergency: "Urgence",
    priceTypeMonthly: "mensuel", priceTypeFixed: "fixe", priceTypeCustom: "sur devis",
  },
  chat: {
    greeting: "Bonjour ! 👋 Je suis **Monzon AI**. Je peux répondre à vos questions sur nos services, notre processus et nos matériaux. Comment puis-je vous aider aujourd'hui ?",
    placeholder: "Posez une question…", askAnything: "Posez une question…",
    typing: "En train d'écrire…", poweredBy: "Propulsé par Monzon AI · Ne partage jamais les prix",
    online: "En ligne · 24/7", chatWith: "Discuter avec Monzon AI", open: "Ouvrir le chat IA", close: "Fermer le chat IA",
    suggestions: ["Quels services offrez-vous ?", "Combien de temps prend une rénovation ?", "Quels matériaux utilisez-vous ?", "Comment démarrer un projet ?"],
    responses: {},
  },
  portal: {
    secureAccess: "Accès Sécurisé", title: "Portail Client",
    subtitle: "Connectez-vous pour accéder à vos factures, devis, projets, ordres de travail, historique de paiements et messagerie directe.",
    signInBtn: "Se connecter au Portail", notClient: "Pas encore client ?", requestAccess: "Demander l'accès →",
    overview: "Aperçu", myProjects: "Mes Projets", documents: "Documents",
    payments: "Paiements", schedule: "Mon Calendrier", activity: "Activité",
    messages: "Messages", myProfile: "Mon Profil", signOut: "Déconnexion",
    welcomeBack: "Bon retour", overviewSubtitle: "Voici l'aperçu de vos projets et de votre facturation.",
    invoices: "Factures", estimates: "Devis", paid: "Payé", pending: "En attente",
    recentDocuments: "Documents Récents", viewAll: "Voir tout", quickActions: "Actions Rapides",
    viewProjects: "Voir les Projets", viewAllInvoices: "Toutes les Factures",
    approveEstimates: "Approuver les Devis", paymentHistory: "Historique des Paiements", sendMessage: "Envoyer un Message",
    myProjectsTitle: "Mes Projets", noProjects: "Aucun projet trouvé pour votre compte.",
    documentsTitle: "Documents & Factures", allDocuments: "Tous les Documents", noDocuments: "Aucun document disponible.", approve: "Approuver",
    paymentsTitle: "Historique des Paiements", allPayments: "Tous les Paiements", noPayments: "Aucun paiement enregistré.",
    activityTitle: "Journal d'Activité", docStatusActivity: "Activité des Statuts de Documents", noActivity: "Aucune activité.",
    messagesTitle: "Messages", supportName: "Support Aménagement Monzon", supportAvailability: "Équipe disponible Lun–Ven",
    noMessages: "Aucun message. Écrivez-nous et notre équipe répondra sous 24 heures.",
    typeMessage: "Écrire un message…", send: "Envoyer",
    scheduleTitle: "Mon Calendrier", scheduleSubtitle: "Jalons de projets, visites et rendez-vous planifiés par votre équipe.",
    noSchedule: "Aucun événement prévu. Votre équipe ajoutera des jalons et des visites ici.",
    profileTitle: "Mon Profil", accountInfo: "Informations du Compte", edit: "Modifier", cancel: "Annuler",
    fullName: "Nom Complet", email: "Courriel", emailNote: "Le courriel ne peut pas être modifié ici. Contactez le support.",
    accountType: "Type de Compte", saveChanges: "Enregistrer", notifications: "Notifications",
    notifInvoices: "Courriel : Nouvelles Factures", notifEstimates: "Courriel : Devis Prêt",
    notifPayments: "Courriel : Confirmation de Paiement", notifSMS: "SMS : Mises à jour de Projet",
    billedTo: "Facturé à", approveEstimate: "Approuver le Devis",
    docEstimate: "devis", docInvoice: "facture", docReceipt: "reçu", docWorkOrder: "ordre de travail", docCreditNote: "note de crédit",
  },
  admin: {
    title: "Panneau Admin", signIn: "Panneau Admin", signInDesc: "Connectez-vous pour accéder au tableau de bord Aménagement Monzon.", signInBtn: "Se Connecter à l'Admin",
    adminEmail: "Courriel admin :", accessRestricted: "Accès Restreint", accessRestrictedDesc: "Votre compte n'a pas l'accès admin ou staff. Contactez votre administrateur.",
    goToPortal: "Aller au Portail Client", signOut: "Déconnexion", viewSite: "Voir le Site", toggleSidebar: "Basculer la barre latérale",
    groups: { core: "Principal", finance: "Finance & Opérations", content: "Contenu & Marque", ai: "IA", appearance: "Apparence", settings: "Système" },
    panels: {
      dashboard: "Tableau de Bord", projects: "Projets", clients: "Clients", employees: "Employés",
      media: "Gestionnaire de Médias", store: "Boutique", community: "Communauté", billing: "Facturation",
      economics: "Tableau Économique", expenses: "Dépenses & Revenus", leads: "Gestion des Leads",
      hours: "Heures Employés", profitability: "Rentabilité", aiAnalyst: "Analyste IA Économique",
      theme: "Gestionnaire de Thème", appearanceBase: "Apparence de Base", splash: "Écran d'Accueil",
      video: "Gestionnaire Vidéo", reviews: "Avis", metrics: "Éditeur de Métriques", logo: "Gestionnaire de Logo",
      company: "Identité d'Entreprise", academy: "Gestionnaire Académie", serviceShop: "Boutique de Services",
      analytics: "Analytique", calendar: "Calendrier", messaging: "Centre de Messagerie",
      roles: "Gestionnaire de Rôles", users: "Gestionnaire d'Utilisateurs", integrations: "Intégrations",
      notifications: "Notifications", notifSettings: "Paramètres Notif.", pwa: "Paramètres PWA",
      settings: "Paramètres", i18n: "Traductions",
    },
    dashboard: {
      title: "Tableau de Bord", subtitle: "Bon retour. Voici l'aperçu de votre site.",
      activeProjects: "Projets Actifs", clients: "Clients", employees: "Employés", mediaFiles: "Fichiers Médias",
      quickActions: "Actions Rapides", recentContacts: "Contacts Récents", noSubmissions: "Aucune soumission encore.",
      addProject: "Ajouter un Projet", addClient: "Ajouter un Client", uploadMedia: "Téléverser des Médias", viewAnalytics: "Voir les Analytiques",
    },
    projects: {
      title: "Projets", subtitle: "Gérer le portfolio et les projets de construction actifs.", addProject: "Ajouter un Projet", editProject: "Modifier le Projet",
      titleField: "Titre du Projet *", titlePlaceholder: "ex. Rénovation d'Allée – Nom du Client", linkClient: "Lier à un Client",
      noClientLinked: "— Aucun client lié —", category: "Catégorie", status: "Statut", year: "Année",
      budget: "Budget", startDate: "Date de Début", endDate: "Date de Fin", address: "Adresse du Chantier",
      addressPlaceholder: "123 Rue Exemple, Montréal", description: "Description", coverImage: "Image de Couverture",
      coverImagePlaceholder: "https://… ou téléverser →", uploadBtn: "Téléverser", internalNotes: "Notes Internes",
      notesPlaceholder: "Notes privées visibles uniquement par l'admin/staff.", cancel: "Annuler", saveChanges: "Enregistrer", createProject: "Créer le Projet",
      back: "← Retour aux projets", edit: "Modifier",
      tabs: { overview: "aperçu", notes: "notes", photos: "photos", team: "équipe", billing: "facturation" },
      overview: "Aperçu", descriptionLabel: "Description", internalNotesLabel: "Notes Internes",
      addNote: "Ajouter", notePlaceholder: "Ajouter une note interne…", noNotes: "Aucune note encore.",
      uploadPhotos: "Téléverser des Photos", uploading: "Téléversement…", noPhotos: "Aucune photo téléversée encore.",
      assignedEmployees: "Employés Assignés", assignEmployee: "+ Assigner un Employé", noEmployeesAssigned: "Aucun employé assigné encore.",
      totalLaborCost: "Coût Total de Main-d'œuvre", hours: "heures", laborCost: "coût main-d'œuvre",
      projectFinancials: "Finances du Projet", addExpense: "+ Ajouter une Dépense", addToBill: "+ Ajouter à la Facture",
      totalIncome: "Revenus Totaux", totalExpenses: "Dépenses Totales", netMargin: "Marge Nette",
      billingDocuments: "Documents de Facturation", noDocsLinked: "Aucun document de facturation lié encore.", expenses: "Dépenses",
      noExpenses: "Aucune dépense enregistrée.", income: "Revenus", noIncome: "Aucun revenu enregistré.",
      saveExpense: "Enregistrer la Dépense", assignLogHours: "Assigner & Enregistrer Heures",
      status_planning: "Planification", status_active: "Actif", status_onHold: "En Pause",
      status_completed: "Terminé", status_cancelled: "Annulé",
      noProjects: "Aucun projet encore. Cliquez sur 'Ajouter un Projet' pour commencer.",
    },
    clients: {
      title: "Clients", subtitle: "Gérer les dossiers clients, les projets et l'accès au portail.", addClient: "+ Ajouter un Client", editClient: "Modifier le Client",
      contactPerson: "Personne à Contacter *", companyName: "Nom de l'Entreprise / Ménage", email: "Courriel", phone: "Téléphone",
      address: "Adresse", city: "Ville", serviceInterest: "Service d'Intérêt", status: "Statut",
      portalAccess: "Accès au Portail", portalYes: "Oui – Accorder l'accès", portalNo: "Non – Pas d'accès",
      internalNotes: "Notes Internes", cancel: "Annuler", saveChanges: "Enregistrer", addClientBtn: "Ajouter le Client",
      back: "← Retour aux clients", edit: "Modifier", totalBilled: "facturé",
      tabs: { info: "info", projects: "projets", billing: "facturation", store: "boutique", activity: "activité", notes: "notes" },
      contactDetails: "Coordonnées", noProjects: "Aucun projet lié à ce client encore.",
      noBilling: "Aucun document de facturation pour ce client encore.",
      storeOrders: "Commandes Boutique", totalSpent: "Total Dépensé (Boutique)", activeSubscriptions: "Abonnements Actifs",
      noOrders: "Aucune commande boutique trouvée.", noSubscriptions: "Aucun abonnement pour ce client.",
      leadsTitle: "Leads / CRM", noLeads: "Aucun lead lié à ce client encore.",
      chatTitle: "Chat IA / Messages Portail", noMessages: "Aucun message de chat de ce client encore.",
      addNote: "Ajouter", notePlaceholder: "Ajouter une note sur ce client…", noNotes: "Aucune note encore.",
      noClients: "Aucun client encore. Cliquez sur 'Ajouter un Client' pour commencer.",
    },
    employees: {
      title: "Employés", subtitle: "Annuaire du personnel, salaires et assignments de projets.", addEmployee: "+ Ajouter un Employé", editEmployee: "Modifier l'Employé",
      firstName: "Prénom", lastName: "Nom de Famille", role: "Titre / Rôle", email: "Courriel", phone: "Téléphone",
      address: "Adresse", roleLevel: "Niveau de Rôle", hourlyRate: "Taux Horaire ($)", startDate: "Date de Début",
      bio: "Bio / Notes", portalAccess: "Accorder l'Accès au Portail", cancel: "Annuler", saveChanges: "Enregistrer",
      totalHours: "Heures Totales", laborCost: "Coût Main-d'œuvre", loggedEntries: "Entrées Enregistrées",
      projectAssignments: "Assignments de Projets", noHoursLogged: "Aucune heure enregistrée encore.",
      editProfile: "Modifier le Profil", noEmployees: "Aucun employé encore. Cliquez sur 'Ajouter un Employé' pour commencer.",
      back: "← Retour à la liste",
    },
    media: {
      title: "Gestionnaire de Médias", subtitle: "Téléverser et gérer images, vidéos, fichiers 3D et documents.",
      addViaUrl: "Ajouter via URL", uploadFile: "← Téléverser un Fichier",
      dropzone: "Glissez-déposez des fichiers ici, ou cliquez pour parcourir",
      dropzoneTypes: "MP4, WebM, PNG, JPG, GLB, PDF · toute taille",
      uploading: "Téléversement…", failedUpload: "Téléversement échoué — essayez un fichier plus petit.",
      fileUrl: "URL du Fichier", fileUrlPlaceholder: "https://...", displayName: "Nom d'Affichage (optionnel)",
      displayNamePlaceholder: "video-hero.mp4", saveUrl: "Enregistrer l'URL", cancel: "Annuler",
      filterAll: "Tout", noAssets: "Aucun média encore. Téléversez votre premier fichier.",
    },
    settings: {
      title: "Paramètres", subtitle: "Configurer les paramètres globaux du site, les métadonnées et les modules système.",
      siteIdentity: "Identité du Site", siteIdentityDesc: "Paramètres SEO et de marque.",
      siteTitle: "Titre du Site", metaDesc: "Méta Description", adminEmail: "Courriel Admin", phone: "Téléphone",
      address: "Adresse", instagram: "Identifiant Instagram", facebook: "Page Facebook",
      saveChanges: "Enregistrer", systemModules: "Modules Système",
    },
    notifications: {
      title: "Centre de Notifications", subtitle: "Toutes les notifications in-app pour l'admin et le staff.",
      unread: "non lu(s)", testNotif: "Tester une Notification", markAllRead: "Tout Marquer Comme Lu", clearAll: "Tout Effacer",
      filterAll: "Tout", filterUnread: "Non lus", noNotifications: "Aucune notification",
      viewAll: "Voir toutes les notifications →", markAllReadBtn: "Tout marquer lu", justNow: "à l'instant",
    },
    i18n: {
      title: "Gestionnaire de Traductions", subtitle: "Modifiez toutes les traductions du site (FR / EN / ES) directement depuis le panneau admin.",
      selectLang: "Langue", section: "Section", key: "Clé", value: "Traduction",
      saveSection: "Enregistrer la Section", saved: "Enregistré !", resetSection: "Réinitialiser",
      searchPlaceholder: "Rechercher des clés…", noResults: "Aucune clé correspondante trouvée.",
      sections: { nav: "Navigation", hero: "Section Hero", services: "Services", portfolio: "Portfolio", store: "Boutique", community: "Communauté", contact: "Contact", footer: "Pied de page", about: "À Propos", blog: "Blogue", academy: "Académie", maintenance: "Entretien", portal: "Portail Client", admin: "Panneau Admin", billing: "Facturation", common: "Étiquettes Communes" },
    },
  },
  billing: {
    estimate: "Devis", invoice: "Facture", receipt: "Reçu", workOrder: "Ordre de Travail", creditNote: "Note de Crédit",
    documentNumber: "Document N°", clientName: "Nom du Client", status: "Statut", total: "Total",
    type: "Type", lineItems: "Postes", companyInfo: "Info Entreprise", source: "Source",
    statusDraft: "Brouillon", statusSent: "Envoyé", statusApproved: "Approuvé",
    statusPaid: "Payé", statusOverdue: "En Souffrance", statusCancelled: "Annulé",
    subtotal: "Sous-total", tax: "Taxe", discount: "Remise", grandTotal: "Total Général",
    description: "Description", qty: "Qté", unit: "Unité", unitPrice: "Prix Unitaire",
    newDocument: "Nouveau Document", editDocument: "Modifier le Document", deleteDocument: "Supprimer le Document",
    preview: "Aperçu", sendEmail: "Envoyer par Courriel", download: "Télécharger",
    billedTo: "Facturé à", dueDate: "Date d'Échéance", issueDate: "Date d'Émission",
    paymentTerms: "Conditions de Paiement", notes: "Notes", thankyou: "Merci pour votre confiance.",
  },
  common: {
    loading: "Chargement…", error: "Erreur", client: "Client", active: "Actif", completed: "Terminé",
    all: "Tout", viewDetail: "Voir le Détail", required: "requis", optional: "optionnel",
    status: "Statut", date: "Date", amount: "Montant", name: "Nom",
    save: "Enregistrer", delete: "Supprimer", close: "Fermer", add: "Ajouter", edit: "Modifier",
    cancel: "Annuler", confirm: "Confirmer", search: "Rechercher", filter: "Filtrer",
    noData: "Aucune donnée disponible.", tryAgain: "Réessayer", back: "Retour", next: "Suivant", done: "Terminé",
    yes: "Oui", no: "Non", or: "ou", and: "et",
    createdAt: "Créé", updatedAt: "Modifié", actions: "Actions",
    upload: "Téléverser", download: "Télécharger", preview: "Aperçu", share: "Partager",
    enabled: "Activé", disabled: "Désactivé", on: "Activé", off: "Désactivé",
  },
};

/* ═══════════════════════════════════════════════════════ SPANISH ════ */
const es: Translations = {
  nav: {
    services: "Servicios", home: "Inicio", contact: "Contacto",
    signIn: "Iniciar Sesión", register: "Registrarse", admin: "Admin",
    portal: "Portal", startProject: "Iniciar un Proyecto", whichNeeds: "¿Cuáles son sus necesidades?",
    servicesDropdown: "Servicios",
  },
  hero: {
    eyebrow: "Construcción · Renovación · Paisajismo",
    headline1: "Creando Espacios", headline2: "con un Toque", headline3: "Cinematográfico.",
    sub: "Aménagement Monzon — donde la precisión arquitectónica se une a la narrativa cinematográfica. Cada proyecto, una obra maestra.",
    exploreCta: "Explorar Nuestro Trabajo", contactCta: "Contáctenos", scroll: "Desplazar",
    stat1Value: "250+", stat1Label: "Proyectos Completados",
    stat2Value: "8+", stat2Label: "Años de Excelencia",
    stat3Value: "100%", stat3Label: "Satisfacción del Cliente",
    play: "Reproducir video", pause: "Pausar video",
  },
  services: {
    eyebrow: "Experiencia", title: "Lo Que Construimos",
    subtitle: "Un espectro completo de servicios inmobiliarios premium, entregados con la precisión y el arte que define a Aménagement Monzon.",
    requestQuote: "Solicitar Cotización",
    s1Title: "Construcción", s1Desc: "Desde construcciones en terreno baldío hasta ampliaciones estructurales — diseñadas con precisión y calidad duradera.", s1Tags: ["Nuevas Construcciones", "Ampliaciones", "Comercial", "Residencial"],
    s2Title: "Renovación", s2Desc: "Transforme los espacios existentes en obras maestras arquitectónicas. Combinamos estética moderna con integridad estructural.", s2Tags: ["Interior", "Exterior", "Remodelación Total", "Cocinas", "Baños"],
    s3Title: "Paisajismo", s3Desc: "Entornos exteriores curados que complementan su propiedad — bellamente diseñados y mantenidos de forma sostenible.", s3Tags: ["Pavimento", "Terraza", "Entradas", "Jardines", "Piscinas"],
    s4Title: "Mantenimiento", s4Desc: "Programas de mantenimiento integrales que protegen su inversión y mantienen su propiedad en óptimas condiciones durante todo el año.", s4Tags: ["Estacional", "Preventivo", "Emergencias", "Inspecciones"],
    marquee: ["Construcción", "Renovación", "Paisajismo", "Instalación de Pavimento", "Diseño de Entrada", "Arquitectura de Jardín", "Planes de Mantenimiento", "Construcciones Comerciales", "Proyectos Residenciales", "Bordes de Piscina", "Muros de Contención", "Vida al Aire Libre"],
  },
  portfolio: {
    eyebrow: "Vitrina", title: "Proyectos Destacados",
    subtitle: "Explore nuestra colección completa de proyectos — cada uno es un testimonio de precisión y artesanía.",
    viewAll: "Ver Todos los Proyectos", filterLabel: "Filtrar portafolio por categoría",
    filterAll: "Todo", filterConstruction: "Construcción", filterRenovation: "Renovación",
    filterLandscaping: "Paisajismo", filterMaintenance: "Mantenimiento",
    viewCaseStudy: "Ver Caso de Estudio",
    moreNote: "¿Quiere ver más? Tenemos <strong>más de 250 proyectos completados</strong>.",
    fullGallery: "Galería Completa",
    pageSubtitle: "Explore nuestra colección completa de proyectos — cada uno es un testimonio de precisión y artesanía.",
    pageTitle: "Portafolio & Galería", galleryEyebrow: "Vitrina",
  },
  store: {
    eyebrow: "Mercancía", title: "Tienda SM", subtitle: "Vista la marca. Lleve el oficio. Mercancía exclusiva para quienes aprecian la calidad en cada detalle.",
    visitStore: "Visitar la Tienda Completa",
    freeShipping: "Envío Gratis en Pedidos Superiores a $100",
    freeShippingDesc: "Todos los pedidos se envían en 3-5 días hábiles en todo Canadá.",
    shopNow: "Comprar Ahora",
    quickView: "Vista Rápida", addedToCart: "Añadido al carrito",
    pageTitle: "Tienda SM & Colección SM",
    pageSubtitle: "Herramientas profesionales para el trabajo. Mercancía de marca exclusiva para el estilo de vida. Dos mundos, un estándar de excelencia.",
    tabStore: "Tienda SM", tabCollection: "Colección SM",
    cart: "Carrito", yourCart: "Su Carrito", cartEmpty: "Su carrito está vacío",
    subtotal: "Subtotal", checkout: "Proceder al Pago",
    selectOptions: "Seleccionar Opciones", quickAdd: "Agregar Rápido", addToCart: "Agregar al Carrito",
    added: "¡Agregado!", color: "Color", size: "Talla",
    collectionTitle: "Colección SM", collectionSubtitle: "Vista el oficio. Ediciones limitadas. Lanzamientos exclusivos.",
    accepts: "Acepta:", limitedBadge: "Limitado",
    payment: {
      secureCheckout: "Pago Seguro", chooseMethod: "Elegir Método de Pago",
      interacLabel: "Transferencia Interac", creditLabel: "Tarjeta de Crédito",
      debitLabel: "Tarjeta de Débito", cashLabel: "Efectivo / Transferencia Bancaria",
      interacSub: "Instantáneo · Sin cargos · Seguro", creditSub: "Visa · Mastercard · Amex",
      debitSub: "Débito Interac · Pago Directo", cashSub: "En persona o transferencia bancaria",
      popular: "Popular", continue: "Continuar", back: "Atrás",
      cardNumber: "Número de Tarjeta", cardName: "Titular de la Tarjeta", expiry: "Vencimiento", cvc: "CVV",
      sendTransferTo: "Envíe su transferencia Interac a:",
      securityQuestion: "Pregunta de Seguridad",
      securityAnswer: "Respuesta: Su número de pedido se enviará por correo electrónico tras la confirmación.",
      amountToSend: "Monto a Enviar",
      wireDetails: "Datos de Transferencia Bancaria", cashInPerson: "Efectivo en Persona",
      cashInPersonDesc: "Disponible para pedidos de recogida local. Contáctenos para coordinar.",
      wireNote: "Use su nombre y artículos del pedido como referencia. Los pedidos se envían después de confirmar el pago (1-3 días hábiles).",
      interacNote: "Incluya su nombre o artículos del pedido en el campo mensaje. Los pedidos se procesan después de recibir el pago.",
      orderSummary: "Resumen del Pedido", total: "Total",
      payComplete: "Pago Completado", orderConfirmed: "¡Pedido Confirmado!",
      thankYou: "¡Gracias!",
      paymentSuccess: "Su pago fue procesado. Un correo de confirmación está en camino.",
      interacSuccess: "Complete su transferencia Interac para finalizar el pedido. Confirmaremos al recibirla.",
      cashSuccess: "Su pedido ha sido realizado. Complete su transferencia bancaria o pago en efectivo para confirmar el envío.",
      orderTotal: "Total del Pedido", backToStore: "Volver a la Tienda", processing: "Procesando…",
      iveSentTransfer: "He Enviado la Transferencia", placeOrder: "Realizar Pedido", pay: "Pagar",
      errCardNumber: "Ingrese un número de tarjeta válido de 16 dígitos", errCardName: "El nombre del titular es obligatorio",
      errExpiry: "Ingrese una fecha de vencimiento válida (MM/AA)", errCVC: "Ingrese un CVV válido",
    },
  },
  community: {
    eyebrow: "Redes Sociales", title: "Nuestra Comunidad",
    subtitle: "Proyectos reales. Artesanía real. Siga nuestro viaje cinematográfico en todas las plataformas.",
    joinCta: "Únase a Nuestra Comunidad",
    stat1: "48K+", stat1Label: "Seguidores en Instagram",
    stat2: "210K+", stat2Label: "Vistas en YouTube",
    stat3: "95K+", stat3Label: "Reproducciones TikTok / Mes",
    pageEyebrow: "Redes Sociales", pageTitle: "Nuestra Comunidad", pageSubtitle: "Proyectos reales. Artesanía real. Siga nuestro viaje cinematográfico en todas las plataformas.",
    hubTitle: "Centro Comunitario", forumTitle: "Foro de Debate", forumDesc: "Módulo de foro comunitario y preguntas — listo para implementación.",
    directoryTitle: "Directorio de Miembros", directoryDesc: "Miembros verificados y perfiles comunitarios — listo para implementación.",
  },
  contact: {
    eyebrow: "Contáctenos", title: "Construyamos Algo Extraordinario", subtitle: "Cuéntenos su visión. Ya sea una construcción, renovación, entrada o paisajismo — crearemos un plan personalizado.",
    location: "Ubicación", phone: "Teléfono", email: "Correo Electrónico",
    mapPlaceholder: "Mapa",
    fullName: "Nombre Completo", emailLabel: "Correo Electrónico", phoneLabel: "Teléfono",
    projectType: "Tipo de Proyecto", budget: "Presupuesto", details: "Detalles del Proyecto",
    detailsPlaceholder: "Describa su proyecto, ubicación, cronograma…", namePlaceholder: "Juan García",
    selectType: "Seleccionar tipo…", selectBudget: "Seleccionar presupuesto…",
    types: ["Construcción", "Renovación", "Paisajismo", "Mantenimiento", "Otro"],
    budgets: ["Menos de $10K", "$10K – $50K", "$50K – $150K", "$150K+"],
    send: "Enviar Mensaje", sending: "Enviando…", privacy: "Respondemos en 24 horas. Su información es privada.",
    successTitle: "¡Mensaje Recibido!", successDesc: "Nuestro equipo se pondrá en contacto en 24 horas.",
    sendAnother: "Enviar Otro Mensaje",
    nameRequired: "El nombre es obligatorio.", emailRequired: "El correo es obligatorio.", messageRequired: "El mensaje es obligatorio.",
    pageEyebrow: "Contáctenos", pageTitle: "Contáctenos", pageSubtitle: "Cuéntenos su visión y crearemos un plan personalizado.",
  },
  footer: {
    tagline: "Servicios premium de construcción, renovación, paisajismo y mantenimiento. Creando espacios con un toque cinematográfico desde 2015.",
    stayUpdated: "Manténgase Informado", stayUpdatedDesc: "Suscríbase para revelaciones de proyectos, perspectivas del sector y ofertas exclusivas.",
    subscribe: "Suscribirse", subscribed: "¡Está suscrito!",
    emailPlaceholder: "su@correo.com",
    copyright: "Todos los derechos reservados.", ourStory: "Nuestra Historia", academy: "Academia", craftedIn: "Creado en Montréal, QC",
    companyGroup: "Empresa", exploreGroup: "Explorar", legalGroup: "Legal",
    links: {
      aboutUs: "Acerca de", services: "Servicios", portfolio: "Portafolio", blog: "Blog", contact: "Contacto",
      smStore: "Tienda SM", smCollection: "Colección SM", community: "Comunidad", maintenance: "Mantenimiento", academy: "Academia",
      privacy: "Política de Privacidad", terms: "Términos de Servicio", cookies: "Política de Cookies", sitemap: "Mapa del Sitio",
    },
  },
  portalBanner: {
    clientAccess: "Acceso de Cliente", title: "Siga Su Proyecto en Tiempo Real",
    subtitle: "¿Ya es cliente? Inicie sesión en su portal privado para actualizaciones en vivo, documentos y comunicación directa con su gerente de proyecto.",
    accessPortal: "Acceder al Portal", requestAccess: "Solicitar Acceso",
    f1: "Seguimiento de proyecto en vivo", f2: "Acceso a documentos", f3: "Mensajería directa", f4: "Actualizaciones fotográficas",
  },
  reviews: {
    eyebrow: "Lo Que Dicen los Clientes", title: "Reseñas de Clientes", allReviews: "Todas las Reseñas", companyResponse: "Respuesta de la Empresa",
  },
  about: {
    eyebrow: "Nuestra Historia", title: "Acerca de Aménagement Monzon",
    subtitle: "Donde la precisión arquitectónica se une a la narrativa cinematográfica. Cada proyecto, una obra maestra.",
    statsSection: "",
    stat1Value: "250+", stat1Label: "Proyectos Entregados",
    stat2Value: "8+", stat2Label: "Años en Operación",
    stat3Value: "100%", stat3Label: "Satisfacción del Cliente",
    stat4Value: "50+", stat4Label: "Miembros del Equipo",
    missionTitle: "Misión & Valores", teamTitle: "Conoce al Equipo", teamMember: "Miembro del Equipo",
    missionValues: ["Excelencia", "Trabajo en Equipo", "Artesanía", "Sostenibilidad"],
    fullStory: "Descubra nuestra historia completa", fullStoryDesc: "Fundador, héroes, cronología, valores y premios.",
    ourCompany: "Nuestra Empresa",
    founderRole: "Fundador & CEO", architectRole: "Arquitecto Principal",
    constructionRole: "Jefe de Construcción", landscapingRole: "Director de Paisajismo",
    pmRole: "Gerente de Proyecto", creativeRole: "Director Creativo",
  },
  blog: {
    eyebrow: "Perspectivas", title: "Nuestro Blog",
    subtitle: "Conocimiento del sector, revelaciones de proyectos e inspiración de diseño del equipo de Aménagement Monzon.",
    searchPlaceholder: "Buscar artículos…", readMore: "Leer Más", loadingMore: "Cargando…",
    searchFiltersTitle: "Búsqueda y Filtros del Blog", paginationTitle: "Paginación",
    searchFiltersDesc: "Búsqueda de texto completo, filtros de categorías y etiquetas — listo para implementación.",
    paginationDesc: "Navegación de páginas.",
  },
  servicesPage: {
    eyebrow: "Lo Que Hacemos", title: "Nuestros Servicios",
    subtitle: "Un espectro completo de servicios inmobiliarios premium, entregados con la precisión y el arte que define a Aménagement Monzon.",
    processTitle: "Nuestro Proceso",
    steps: ["Descubrimiento & Estimación", "Diseño & Planificación", "Ejecución", "Entrega & Soporte"],
    step: "Paso", processDesc: "Paso del proceso — listo para contenido.",
  },
  academy: {
    pageEyebrow: "Aprender & Crecer", pageTitle: "Academia Monzon",
    pageSubtitle: "No somos solo constructores — somos educadores. Desarrolle habilidades, obtenga coaching y crezca en la industria.",
    stat1: "12+", stat1Label: "Programas Activos",
    stat2: "340+", stat2Label: "Estudiantes Inscritos",
    stat3: "8", stat3Label: "Instructores Expertos",
    stat4: "97%", stat4Label: "Tasa de Éxito",
    filterAll: "Todo", filterCourse: "Cursos", filterCoaching: "Coaching",
    filterWorkshop: "Talleres", filterEvent: "Eventos",
    enroll: "Inscribirse", duration: "Duración", instructor: "Instructor",
    noItems: "No hay elementos en esta categoría aún.",
    ctaTitle: "¿Listo para mejorar?", ctaSubtitle: "Únase a cientos de estudiantes que han avanzado sus habilidades con la Academia Monzon.", ctaBtn: "Contáctenos",
  },
  maintenance: {
    pageEyebrow: "Mercado de Servicios", pageTitle: "Servicios de Mantenimiento",
    pageSubtitle: "Planes de mantenimiento recurrentes y únicos para propiedades residenciales y comerciales. Suscríbase y olvídese — nosotros nos encargamos del resto.",
    tabServices: "Servicios", tabSubscriptions: "Planes de Suscripción",
    filterAll: "Todos los Servicios",
    subscribe: "Suscribirse", add: "Agregar", added: "¡Agregado!",
    popular: "Más Popular",
    subscribeTitle: "Elija Su Suscripción", subscribeSubtitle: "Todos los planes incluyen acceso a nuestro catálogo completo. Mejore o cancele en cualquier momento.",
    customPlanTitle: "¿Necesita un plan personalizado?", customPlanDesc: "Propiedades comerciales, edificios de unidades múltiples y necesidades especializadas — crearemos un plan a su medida.", customPlanBtn: "Solicitar Cotización Personalizada",
    getStarted: "Comenzar",
    categoryAll: "Todos los Servicios", categoryExterior: "Exterior", categoryInterior: "Interior",
    categoryLandscaping: "Paisajismo", categorySnow: "Remoción de Nieve", categorySeasonal: "Estacional",
    categoryEmergency: "Emergencia",
    priceTypeMonthly: "mensual", priceTypeFixed: "fijo", priceTypeCustom: "a solicitud",
  },
  chat: {
    greeting: "¡Hola! 👋 Soy **Monzon AI**. Puedo responder preguntas sobre nuestros servicios, proceso y materiales. ¿En qué puedo ayudarle hoy?",
    placeholder: "Haga una pregunta…", askAnything: "Haga una pregunta…",
    typing: "Escribiendo…", poweredBy: "Desarrollado por Monzon AI · Nunca comparte precios",
    online: "En línea · 24/7", chatWith: "Chatear con Monzon AI", open: "Abrir chat IA", close: "Cerrar chat IA",
    suggestions: ["¿Qué servicios ofrecen?", "¿Cuánto dura una renovación?", "¿Qué materiales usan?", "¿Cómo inicio un proyecto?"],
    responses: {},
  },
  portal: {
    secureAccess: "Acceso Seguro", title: "Portal del Cliente",
    subtitle: "Inicie sesión para acceder a sus facturas, cotizaciones, proyectos, órdenes de trabajo, historial de pagos y mensajería directa.",
    signInBtn: "Iniciar Sesión en el Portal", notClient: "¿Aún no es cliente?", requestAccess: "Solicitar acceso →",
    overview: "Resumen", myProjects: "Mis Proyectos", documents: "Documentos",
    payments: "Pagos", schedule: "Mi Agenda", activity: "Actividad",
    messages: "Mensajes", myProfile: "Mi Perfil", signOut: "Cerrar Sesión",
    welcomeBack: "Bienvenido de nuevo", overviewSubtitle: "Aquí está el resumen de sus proyectos y facturación.",
    invoices: "Facturas", estimates: "Cotizaciones", paid: "Pagado", pending: "Pendiente",
    recentDocuments: "Documentos Recientes", viewAll: "Ver todos", quickActions: "Acciones Rápidas",
    viewProjects: "Ver Proyectos", viewAllInvoices: "Ver Todas las Facturas",
    approveEstimates: "Aprobar Cotizaciones", paymentHistory: "Historial de Pagos", sendMessage: "Enviar un Mensaje",
    myProjectsTitle: "Mis Proyectos", noProjects: "No se encontraron proyectos para su cuenta.",
    documentsTitle: "Documentos y Facturas", allDocuments: "Todos los Documentos", noDocuments: "No hay documentos disponibles.", approve: "Aprobar",
    paymentsTitle: "Historial de Pagos", allPayments: "Todos los Pagos", noPayments: "No hay pagos registrados.",
    activityTitle: "Registro de Actividad", docStatusActivity: "Actividad del Estado de Documentos", noActivity: "Sin actividad.",
    messagesTitle: "Mensajes", supportName: "Soporte Aménagement Monzon", supportAvailability: "Equipo disponible Lun–Vie",
    noMessages: "No hay mensajes. Escríbanos y nuestro equipo responderá en 24 horas.",
    typeMessage: "Escribir un mensaje…", send: "Enviar",
    scheduleTitle: "Mi Agenda", scheduleSubtitle: "Hitos del proyecto, visitas y citas programadas por su equipo.",
    noSchedule: "No hay eventos programados. Su equipo añadirá hitos de proyecto y visitas aquí.",
    profileTitle: "Mi Perfil", accountInfo: "Información de la Cuenta", edit: "Editar", cancel: "Cancelar",
    fullName: "Nombre Completo", email: "Correo Electrónico", emailNote: "El correo no puede modificarse aquí. Contacte al soporte.",
    accountType: "Tipo de Cuenta", saveChanges: "Guardar Cambios", notifications: "Notificaciones",
    notifInvoices: "Correo: Nuevas Facturas", notifEstimates: "Correo: Cotización Lista",
    notifPayments: "Correo: Confirmación de Pago", notifSMS: "SMS: Actualizaciones del Proyecto",
    billedTo: "Facturado a", approveEstimate: "Aprobar Cotización",
    docEstimate: "cotización", docInvoice: "factura", docReceipt: "recibo", docWorkOrder: "orden de trabajo", docCreditNote: "nota de crédito",
  },
  admin: {
    title: "Panel Admin", signIn: "Panel Admin", signInDesc: "Inicie sesión para acceder al tablero de Aménagement Monzon.", signInBtn: "Iniciar Sesión en Admin",
    adminEmail: "Correo admin:", accessRestricted: "Acceso Restringido", accessRestrictedDesc: "Su cuenta no tiene acceso de admin o staff. Contacte a su administrador.",
    goToPortal: "Ir al Portal del Cliente", signOut: "Cerrar Sesión", viewSite: "Ver Sitio", toggleSidebar: "Alternar barra lateral",
    groups: { core: "Principal", finance: "Finanzas & Ops", content: "Contenido & Marca", ai: "IA", appearance: "Apariencia", settings: "Sistema" },
    panels: {
      dashboard: "Tablero", projects: "Proyectos", clients: "Clientes", employees: "Empleados",
      media: "Gestor de Medios", store: "Tienda", community: "Comunidad", billing: "Facturación",
      economics: "Tablero Económico", expenses: "Gastos & Ingresos", leads: "Gestión de Leads",
      hours: "Horas Empleados", profitability: "Rentabilidad", aiAnalyst: "Analista IA Económico",
      theme: "Gestor de Temas", appearanceBase: "Apariencia Base", splash: "Pantalla de Inicio",
      video: "Gestor de Video", reviews: "Reseñas", metrics: "Editor de Métricas", logo: "Gestor de Logo",
      company: "Identidad Corporativa", academy: "Gestor Academia", serviceShop: "Tienda de Servicios",
      analytics: "Analítica", calendar: "Calendario", messaging: "Centro de Mensajería",
      roles: "Gestor de Roles", users: "Gestor de Usuarios", integrations: "Integraciones",
      notifications: "Notificaciones", notifSettings: "Config. Notif.", pwa: "Configuración PWA",
      settings: "Configuración", i18n: "Traducciones",
    },
    dashboard: {
      title: "Tablero", subtitle: "Bienvenido de nuevo. Aquí está el resumen de su sitio.",
      activeProjects: "Proyectos Activos", clients: "Clientes", employees: "Empleados", mediaFiles: "Archivos de Medios",
      quickActions: "Acciones Rápidas", recentContacts: "Contactos Recientes", noSubmissions: "Aún no hay envíos.",
      addProject: "Agregar Proyecto", addClient: "Agregar Cliente", uploadMedia: "Subir Medios", viewAnalytics: "Ver Analítica",
    },
    projects: {
      title: "Proyectos", subtitle: "Gestionar el portafolio y proyectos de construcción activos.", addProject: "Agregar Proyecto", editProject: "Editar Proyecto",
      titleField: "Título del Proyecto *", titlePlaceholder: "ej. Renovación de Entrada – Nombre del Cliente", linkClient: "Vincular a Cliente",
      noClientLinked: "— Sin cliente vinculado —", category: "Categoría", status: "Estado", year: "Año",
      budget: "Presupuesto", startDate: "Fecha de Inicio", endDate: "Fecha de Fin", address: "Dirección del Sitio",
      addressPlaceholder: "123 Calle Ejemplo, Montréal", description: "Descripción", coverImage: "Imagen de Portada",
      coverImagePlaceholder: "https://… o subir →", uploadBtn: "Subir", internalNotes: "Notas Internas",
      notesPlaceholder: "Notas privadas solo visibles para admin/staff.", cancel: "Cancelar", saveChanges: "Guardar Cambios", createProject: "Crear Proyecto",
      back: "← Volver a proyectos", edit: "Editar",
      tabs: { overview: "resumen", notes: "notas", photos: "fotos", team: "equipo", billing: "facturación" },
      overview: "Resumen", descriptionLabel: "Descripción", internalNotesLabel: "Notas Internas",
      addNote: "Agregar", notePlaceholder: "Agregar una nota interna…", noNotes: "Aún no hay notas.",
      uploadPhotos: "Subir Fotos", uploading: "Subiendo…", noPhotos: "Aún no hay fotos subidas.",
      assignedEmployees: "Empleados Asignados", assignEmployee: "+ Asignar Empleado", noEmployeesAssigned: "Aún no hay empleados asignados.",
      totalLaborCost: "Costo Total de Mano de Obra", hours: "horas", laborCost: "costo mano de obra",
      projectFinancials: "Finanzas del Proyecto", addExpense: "+ Agregar Gasto", addToBill: "+ Agregar a Factura",
      totalIncome: "Ingresos Totales", totalExpenses: "Gastos Totales", netMargin: "Margen Neto",
      billingDocuments: "Documentos de Facturación", noDocsLinked: "Aún no hay documentos vinculados.", expenses: "Gastos",
      noExpenses: "No hay gastos registrados.", income: "Ingresos", noIncome: "No hay ingresos registrados.",
      saveExpense: "Guardar Gasto", assignLogHours: "Asignar & Registrar Horas",
      status_planning: "Planificación", status_active: "Activo", status_onHold: "En Pausa",
      status_completed: "Completado", status_cancelled: "Cancelado",
      noProjects: "Aún no hay proyectos. Haga clic en 'Agregar Proyecto' para comenzar.",
    },
    clients: {
      title: "Clientes", subtitle: "Gestionar registros de clientes, proyectos y acceso al portal.", addClient: "+ Agregar Cliente", editClient: "Editar Cliente",
      contactPerson: "Persona de Contacto *", companyName: "Nombre de la Empresa / Hogar", email: "Correo Electrónico", phone: "Teléfono",
      address: "Dirección", city: "Ciudad", serviceInterest: "Servicio de Interés", status: "Estado",
      portalAccess: "Acceso al Portal", portalYes: "Sí – Conceder acceso", portalNo: "No – Sin acceso",
      internalNotes: "Notas Internas", cancel: "Cancelar", saveChanges: "Guardar Cambios", addClientBtn: "Agregar Cliente",
      back: "← Volver a clientes", edit: "Editar", totalBilled: "facturado",
      tabs: { info: "info", projects: "proyectos", billing: "facturación", store: "tienda", activity: "actividad", notes: "notas" },
      contactDetails: "Datos de Contacto", noProjects: "Aún no hay proyectos vinculados a este cliente.",
      noBilling: "Aún no hay documentos de facturación para este cliente.",
      storeOrders: "Pedidos de Tienda", totalSpent: "Total Gastado (Tienda)", activeSubscriptions: "Suscripciones Activas",
      noOrders: "No se encontraron pedidos de tienda.", noSubscriptions: "No hay documentos de suscripción para este cliente.",
      leadsTitle: "Leads / CRM", noLeads: "Aún no hay leads vinculados a este cliente.",
      chatTitle: "Chat IA / Mensajes del Portal", noMessages: "Aún no hay mensajes de este cliente.",
      addNote: "Agregar", notePlaceholder: "Agregar una nota sobre este cliente…", noNotes: "Aún no hay notas.",
      noClients: "Aún no hay clientes. Haga clic en 'Agregar Cliente' para comenzar.",
    },
    employees: {
      title: "Empleados", subtitle: "Directorio del personal, salarios y asignaciones de proyectos.", addEmployee: "+ Agregar Empleado", editEmployee: "Editar Empleado",
      firstName: "Nombre", lastName: "Apellido", role: "Título / Rol", email: "Correo Electrónico", phone: "Teléfono",
      address: "Dirección", roleLevel: "Nivel de Rol", hourlyRate: "Tarifa por Hora ($)", startDate: "Fecha de Inicio",
      bio: "Bio / Notas", portalAccess: "Conceder Acceso al Portal", cancel: "Cancelar", saveChanges: "Guardar Cambios",
      totalHours: "Horas Totales", laborCost: "Costo Mano de Obra", loggedEntries: "Entradas Registradas",
      projectAssignments: "Asignaciones de Proyectos", noHoursLogged: "Aún no hay horas registradas.",
      editProfile: "Editar Perfil", noEmployees: "Aún no hay empleados. Haga clic en 'Agregar Empleado' para comenzar.",
      back: "← Volver a la lista",
    },
    media: {
      title: "Gestor de Medios", subtitle: "Subir y gestionar imágenes, videos, archivos 3D y documentos.",
      addViaUrl: "Agregar via URL", uploadFile: "← Subir Archivo",
      dropzone: "Arrastre y suelte archivos aquí, o haga clic para explorar",
      dropzoneTypes: "MP4, WebM, PNG, JPG, GLB, PDF · cualquier tamaño",
      uploading: "Subiendo…", failedUpload: "Subida fallida — pruebe con un archivo más pequeño.",
      fileUrl: "URL del Archivo", fileUrlPlaceholder: "https://...", displayName: "Nombre de Visualización (opcional)",
      displayNamePlaceholder: "video-hero.mp4", saveUrl: "Guardar URL", cancel: "Cancelar",
      filterAll: "Todo", noAssets: "Aún no hay medios. Suba su primer archivo.",
    },
    settings: {
      title: "Configuración", subtitle: "Configurar ajustes globales del sitio, metadatos y módulos del sistema.",
      siteIdentity: "Identidad del Sitio", siteIdentityDesc: "Configuración SEO y de marca.",
      siteTitle: "Título del Sitio", metaDesc: "Meta Descripción", adminEmail: "Correo Admin", phone: "Teléfono",
      address: "Dirección", instagram: "Identificador de Instagram", facebook: "Página de Facebook",
      saveChanges: "Guardar Cambios", systemModules: "Módulos del Sistema",
    },
    notifications: {
      title: "Centro de Notificaciones", subtitle: "Todas las notificaciones in-app para admin y staff.",
      unread: "sin leer", testNotif: "Probar Notificación", markAllRead: "Marcar Todo como Leído", clearAll: "Borrar Todo",
      filterAll: "Todo", filterUnread: "Sin leer", noNotifications: "No hay notificaciones",
      viewAll: "Ver todas las notificaciones →", markAllReadBtn: "Marcar todo leído", justNow: "ahora mismo",
    },
    i18n: {
      title: "Gestor de Traducciones", subtitle: "Edite todas las traducciones del sitio (ES / EN / FR) directamente desde el panel admin.",
      selectLang: "Idioma", section: "Sección", key: "Clave", value: "Traducción",
      saveSection: "Guardar Sección", saved: "¡Guardado!", resetSection: "Restablecer",
      searchPlaceholder: "Buscar claves…", noResults: "No se encontraron claves coincidentes.",
      sections: { nav: "Navegación", hero: "Sección Hero", services: "Servicios", portfolio: "Portafolio", store: "Tienda", community: "Comunidad", contact: "Contacto", footer: "Pie de Página", about: "Acerca de", blog: "Blog", academy: "Academia", maintenance: "Mantenimiento", portal: "Portal del Cliente", admin: "Panel Admin", billing: "Facturación", common: "Etiquetas Comunes" },
    },
  },
  billing: {
    estimate: "Cotización", invoice: "Factura", receipt: "Recibo", workOrder: "Orden de Trabajo", creditNote: "Nota de Crédito",
    documentNumber: "Documento N°", clientName: "Nombre del Cliente", status: "Estado", total: "Total",
    type: "Tipo", lineItems: "Partidas", companyInfo: "Info de la Empresa", source: "Fuente",
    statusDraft: "Borrador", statusSent: "Enviado", statusApproved: "Aprobado",
    statusPaid: "Pagado", statusOverdue: "Vencido", statusCancelled: "Cancelado",
    subtotal: "Subtotal", tax: "Impuesto", discount: "Descuento", grandTotal: "Total General",
    description: "Descripción", qty: "Cant.", unit: "Unidad", unitPrice: "Precio Unitario",
    newDocument: "Nuevo Documento", editDocument: "Editar Documento", deleteDocument: "Eliminar Documento",
    preview: "Vista Previa", sendEmail: "Enviar por Correo", download: "Descargar",
    billedTo: "Facturado a", dueDate: "Fecha de Vencimiento", issueDate: "Fecha de Emisión",
    paymentTerms: "Condiciones de Pago", notes: "Notas", thankyou: "Gracias por su confianza.",
  },
  common: {
    loading: "Cargando…", error: "Error", client: "Cliente", active: "Activo", completed: "Completado",
    all: "Todo", viewDetail: "Ver Detalle", required: "obligatorio", optional: "opcional",
    status: "Estado", date: "Fecha", amount: "Monto", name: "Nombre",
    save: "Guardar", delete: "Eliminar", close: "Cerrar", add: "Agregar", edit: "Editar",
    cancel: "Cancelar", confirm: "Confirmar", search: "Buscar", filter: "Filtrar",
    noData: "No hay datos disponibles.", tryAgain: "Intentar de nuevo", back: "Atrás", next: "Siguiente", done: "Hecho",
    yes: "Sí", no: "No", or: "o", and: "y",
    createdAt: "Creado", updatedAt: "Actualizado", actions: "Acciones",
    upload: "Subir", download: "Descargar", preview: "Vista Previa", share: "Compartir",
    enabled: "Habilitado", disabled: "Deshabilitado", on: "Activado", off: "Desactivado",
  },
};

export const T: Record<Lang, Translations> = { en, fr, es };
