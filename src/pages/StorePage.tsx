import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
// import { useQuery, useMutation } from "@animaapp/playground-react-sdk"; // Removed SDK
import { Check, ShoppingBag, ShoppingCart, X, ArrowUpRight, Tag, Star, Plus, Minus, CreditCard, Bank, Money, ArrowsLeftRight, Lock, CheckCircle, Copy, Warning } from "@phosphor-icons/react";
import { useAppAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

// Stubs for removed SDK
const products = [];
const storeItems = []; // Use FALLBACK_STORE below
const collectionItems = []; // Use FALLBACK_COLLECTION below

/* ── Fallback products ── */
const FALLBACK_STORE = [
  { id: "f1", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_4.png", name: "Premium Tool Set", price: "$120", category: "Tools", description: "Professional-grade tool kit for residential and commercial use. Includes 48-piece set with carrying case.", stock: "12" },
  { id: "f2", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_3.png", name: "Brand Accessory Kit", price: "$65", category: "Accessories", description: "Monzon-branded accessories: hard hat, tape measure, level, and safety glasses.", stock: "25" },
  { id: "f3", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_5.png", name: "Site Gloves Pro", price: "$28", category: "Tools", description: "Heavy-duty cut-resistant work gloves with grip coating.", stock: "50" },
  { id: "f4", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_3.png", name: "Blueprint Notebook", price: "$22", category: "Accessories", description: "Grid-pattern professional notebook with Monzon branding. Water-resistant cover.", stock: "100" },
  { id: "f5", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_2.png", name: "Digital Project Guide", price: "$39", category: "Digital", description: "Complete PDF guide to managing residential renovation projects from start to finish.", stock: "Unlimited" },
];

const FALLBACK_COLLECTION = [
  { id: "c1", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_2.png", name: "Monzon Signature Tee", price: "$45", category: "Clothing", description: "Premium 100% cotton tee with embroidered Monzon signature logo. Available in multiple colors.", variants: '{"sizes":["S","M","L","XL","XXL"],"colors":["Black","White","Charcoal","Cream"]}', stock: "30" },
  { id: "c2", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_5.png", name: "Field Workwear Jacket", price: "$155", category: "Jackets", description: "Insulated work jacket with Monzon branding. Wind and water resistant. Built for the job site.", variants: '{"sizes":["S","M","L","XL","XXL"],"colors":["Charcoal","Black","Navy"]}', stock: "15" },
  { id: "c3", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_2.png", name: "Monzon Cap", price: "$35", category: "Hats", description: "Structured snapback with embroidered gold M logo. Adjustable fit.", variants: '{"sizes":["One Size"],"colors":["Black","Charcoal","White"]}', stock: "40" },
  { id: "c4", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_4.png", name: "SM Signature Hoodie", price: "$89", category: "Hoodies", description: "Heavyweight fleece hoodie with embroidered logo on chest and sleeve. Oversized fit.", variants: '{"sizes":["S","M","L","XL","XXL"],"colors":["Black","Charcoal"]}', stock: "20" },
  { id: "c5", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_3.png", name: "Limited Edition Varsity", price: "$199", category: "Limited Edition", description: "Limited run varsity jacket with custom patches and premium wool body. Only 50 made.", variants: '{"sizes":["S","M","L","XL"],"colors":["Black & Gold"]}', stock: "8" },
  { id: "c6", image: "https://c.animaapp.com/mmr3v89y52bO3P/img/ai_5.png", name: "Logo Pin Set", price: "$19", category: "Collectibles", description: "Set of 3 enamel lapel pins with Monzon logos and limited series artwork.", variants: '{"sizes":["One Size"],"colors":["Gold","Silver","Black"]}', stock: "75" },
];

type CartEntry = { id: string; name: string; price: string; image: string; quantity: number; variant?: string };

function ProductCard({ product, onAdd }: { product: any; onAdd: (id: string, name: string, price: string, image: string, variant?: string) => void }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [justAdded, setJustAdded] = useState(false);
  const { t } = useLanguage();

  const variants = (() => { try { return JSON.parse(product.variants || "{}"); } catch { return {}; } })();
  const hasVariants = (variants.sizes?.length > 0) || (variants.colors?.length > 0);

  const handleAdd = () => {
    const variantStr = [selectedSize, selectedColor].filter(Boolean).join(" / ");
    onAdd(product.id, product.name, product.price, product.image, variantStr || undefined);
    setJustAdded(true);
    setTimeout(() => { setJustAdded(false); setShowModal(false); }, 1500);
  };

  return (
    <>
      <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden card-cinematic hover:border-gray-300 hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute top-3 left-3">
            <span className="glass-dark px-2.5 py-1 text-[10px] font-mono text-gold/90 rounded-full">{product.category}</span>
          </div>
          {product.stock === "8" || (product.category === "Limited Edition") && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-500 text-white px-2 py-0.5 text-[9px] font-mono rounded-full">Limited</span>
            </div>
          )}
          <button onClick={() => hasVariants ? setShowModal(true) : handleAdd()}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="font-sans text-xs text-warm-white font-medium tracking-wider uppercase bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
              {hasVariants ? t.store.selectOptions : t.store.quickAdd}
            </span>
          </button>
        </div>
        <div className="flex items-center justify-between p-5 gap-4">
          <div className="min-w-0">
            <h3 className="font-headline font-bold text-[15px] text-charcoal leading-snug">{product.name}</h3>
            <p className="font-sans text-sm font-semibold text-gold mt-0.5">{product.price}</p>
          </div>
          <button onClick={() => hasVariants ? setShowModal(true) : handleAdd()}
            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none ${justAdded ? "bg-green-500 scale-110" : "bg-charcoal hover:scale-105"}`}>
            {justAdded ? <Check size={16} weight="bold" className="text-white" /> : <ShoppingBag size={16} weight="bold" className="text-warm-white" />}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={product.image} alt={product.name} className="w-full aspect-video object-cover" />
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
                <X size={16} weight="bold" className="text-charcoal" />
              </button>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-xl text-charcoal mb-1">{product.name}</h3>
              <p className="font-sans text-sm text-gray-500 mb-4">{product.description}</p>
              {variants.colors?.length > 0 && (
                <div className="mb-4">
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-2">{t.store.color}</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.colors.map((c: string) => (
                      <button key={c} onClick={() => setSelectedColor(c)} className={`px-3 py-1.5 text-xs font-sans rounded-lg border-2 cursor-pointer transition-all ${selectedColor === c ? "border-charcoal bg-charcoal text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>{c}</button>
                    ))}
                  </div>
                </div>
              )}
              {variants.sizes?.length > 0 && (
                <div className="mb-5">
                  <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider mb-2">{t.store.size}</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.sizes.map((s: string) => (
                      <button key={s} onClick={() => setSelectedSize(s)} className={`px-3 py-1.5 text-xs font-sans rounded-lg border-2 cursor-pointer transition-all ${selectedSize === s ? "border-charcoal bg-charcoal text-white" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="font-headline font-bold text-2xl text-charcoal">{product.price}</span>
                <button onClick={handleAdd} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-sans font-semibold text-sm cursor-pointer transition-all ${justAdded ? "bg-green-500 text-white" : "bg-charcoal text-gold hover:bg-gold hover:text-charcoal"}`}>
                  {justAdded ? <><Check size={15} weight="bold" /> {t.store.added}</> : <><ShoppingBag size={15} weight="bold" /> {t.store.addToCart}</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAYMENT MODAL
───────────────────────────────────────────────────────────────────────── */
type PaymentMethod = "interac" | "credit" | "debit" | "cash";

function PaymentModal({ total, cart, onClose, onSuccess }: { total: number; cart: CartEntry[]; onClose: () => void; onSuccess: () => void }) {
  const [step, setStep] = useState<"method" | "details" | "confirm" | "done">("method");
  const [method, setMethod] = useState<PaymentMethod | null>(null);
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const PAYMENT_METHODS: { id: PaymentMethod; label: string; sublabel: string; icon: React.ReactNode; color: string; badge?: string }[] = [
    { id: "interac", label: t.store.payment.interacLabel, sublabel: t.store.payment.interacSub, icon: <ArrowsLeftRight size={22} weight="bold" />, color: "from-yellow-400 to-yellow-500", badge: t.store.payment.popular },
    { id: "credit",  label: t.store.payment.creditLabel,  sublabel: t.store.payment.creditSub,  icon: <CreditCard size={22} weight="bold" />,      color: "from-blue-500 to-blue-600" },
    { id: "debit",   label: t.store.payment.debitLabel,   sublabel: t.store.payment.debitSub,   icon: <Bank size={22} weight="bold" />,             color: "from-emerald-500 to-emerald-600" },
    { id: "cash",    label: t.store.payment.cashLabel,    sublabel: t.store.payment.cashSub,    icon: <Money size={22} weight="bold" />,            color: "from-gray-500 to-gray-600" },
  ];

  // Credit/Debit form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  // Interac info
  const INTERAC_EMAIL = "payments@amenagementmonzon.com";
  const INTERAC_QUESTION = t.store.payment.securityQuestion;

  const formatCard = (v: string) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  const handleCopy = () => {
    navigator.clipboard.writeText(INTERAC_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const validateCard = () => {
    const e: Record<string, string> = {};
    if (cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = t.store.payment.errCardNumber;
    if (!cardName.trim()) e.cardName = t.store.payment.errCardName;
    if (cardExpiry.length < 5) e.cardExpiry = t.store.payment.errExpiry;
    if (cardCVC.length < 3) e.cardCVC = t.store.payment.errCVC;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if ((method === "credit" || method === "debit") && step === "details") {
      if (!validateCard()) return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("done");
    }, 1800);
  };

  const selectedMethod = PAYMENT_METHODS.find(m => m.id === method);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-charcoal px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] text-gold/60 uppercase tracking-widest mb-0.5">
              {step === "done" ? t.store.payment.payComplete : t.store.payment.secureCheckout}
            </p>
            <h2 className="font-headline font-bold text-white text-lg">
              {step === "method" && t.store.payment.chooseMethod}
              {step === "details" && selectedMethod?.label}
              {step === "confirm" && `${t.store.payment.continue} & ${t.store.payment.pay}`}
              {step === "done" && t.store.payment.orderConfirmed}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {step !== "done" && <Lock size={14} className="text-gold/60" />}
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>

        {/* Step indicator */}
        {step !== "done" && (
          <div className="flex items-center gap-1 px-6 py-3 bg-gray-50 border-b border-gray-100">
            {["method", "details", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${["method","details","confirm"].indexOf(step) >= i ? "bg-charcoal text-gold" : "bg-gray-200 text-gray-400"}`}>{i + 1}</div>
                {i < 2 && <div className={`h-0.5 w-8 transition-all ${["method","details","confirm"].indexOf(step) > i ? "bg-charcoal" : "bg-gray-200"}`} />}
              </div>
            ))}
            <span className="ml-auto font-sans text-sm font-semibold text-charcoal">${total.toFixed(2)}</span>
          </div>
        )}

        <div className="p-6 max-h-[60vh] overflow-y-auto">

          {/* STEP 1 — Choose method */}
          {step === "method" && (
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map(pm => (
                <button key={pm.id} onClick={() => setMethod(pm.id)}
                  className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-left w-full ${method === pm.id ? "border-charcoal bg-charcoal/5" : "border-gray-200 hover:border-gray-300 bg-white"}`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pm.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    {pm.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-sans font-semibold text-sm text-charcoal">{pm.label}</p>
                    <p className="font-mono text-[10px] text-gray-400 mt-0.5">{pm.sublabel}</p>
                  </div>
                  {pm.badge && (
                    <span className="text-[9px] font-bold bg-gold text-charcoal px-2 py-0.5 rounded-full uppercase tracking-wide">{pm.badge}</span>
                  )}
                  {method === pm.id && (
                    <div className="w-5 h-5 rounded-full bg-charcoal flex items-center justify-center ml-1 flex-shrink-0">
                      <Check size={10} weight="bold" className="text-gold" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* STEP 2 — Details */}
          {step === "details" && method === "interac" && (
            <div className="flex flex-col gap-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex gap-3">
                <ArrowsLeftRight size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm font-semibold text-yellow-800 mb-1">{t.store.payment.sendTransferTo}</p>
                  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-yellow-200">
                    <span className="font-mono text-sm text-charcoal flex-1">{INTERAC_EMAIL}</span>
                    <button onClick={handleCopy} className="text-yellow-600 hover:text-yellow-800 cursor-pointer transition-colors flex-shrink-0">
                      {copied ? <Check size={14} weight="bold" /> : <Copy size={14} />}
                    </button>
                  </div>
                  {copied && <p className="font-mono text-[10px] text-yellow-600 mt-1">Copied to clipboard!</p>}
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">{INTERAC_QUESTION}</p>
                <p className="font-mono text-[10px] text-gray-400">{t.store.payment.securityAnswer}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-2">{t.store.payment.amountToSend}</p>
                <p className="font-headline text-2xl font-bold text-charcoal">${total.toFixed(2)} <span className="text-sm font-sans font-normal text-gray-400">CAD</span></p>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Warning size={14} className="flex-shrink-0 mt-0.5 text-amber-500" />
                <span>{t.store.payment.interacNote}</span>
              </div>
            </div>
          )}

          {step === "details" && (method === "credit" || method === "debit") && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1.5">{t.store.payment.cardNumber}</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={e => setCardNumber(formatCard(e.target.value))}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-mono text-sm outline-none transition-all ${errors.cardNumber ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-charcoal"}`}
                />
                {errors.cardNumber && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.cardNumber}</p>}
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1.5">{t.store.payment.cardName}</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl font-sans text-sm outline-none transition-all ${errors.cardName ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-charcoal"}`}
                />
                {errors.cardName && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.cardName}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1.5">{t.store.payment.expiry}</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(formatExpiry(e.target.value))}
                    className={`w-full px-4 py-3 border-2 rounded-xl font-mono text-sm outline-none transition-all ${errors.cardExpiry ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-charcoal"}`}
                  />
                  {errors.cardExpiry && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.cardExpiry}</p>}
                </div>
                <div>
                  <label className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1.5">{t.store.payment.cvc}</label>
                  <input
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    value={cardCVC}
                    onChange={e => setCardCVC(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className={`w-full px-4 py-3 border-2 rounded-xl font-mono text-sm outline-none transition-all ${errors.cardCVC ? "border-red-400 bg-red-50" : "border-gray-200 focus:border-charcoal"}`}
                  />
                  {errors.cardCVC && <p className="text-red-500 text-[10px] mt-1 font-mono">{errors.cardCVC}</p>}
                </div>
              </div>
              {/* Card brand icons */}
              <div className="flex items-center gap-2 pt-1">
                <Lock size={12} className="text-gray-400" />
                <span className="font-mono text-[10px] text-gray-400">256-bit SSL encrypted</span>
                <div className="ml-auto flex items-center gap-1.5">
                  {["VISA", "MC", "AMEX"].map(b => (
                    <span key={b} className="px-2 py-0.5 text-[9px] font-bold border border-gray-200 rounded text-gray-500">{b}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === "details" && method === "cash" && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-3">{t.store.payment.wireDetails}</p>
                {[
                  { label: "Bank", value: "TD Canada Trust" },
                  { label: "Account Name", value: "Aménagement Monzon Inc." },
                  { label: "Transit No.", value: "00123" },
                  { label: "Institution No.", value: "004" },
                  { label: "Account No.", value: "1234567" },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="font-mono text-[11px] text-gray-400">{row.label}</span>
                    <span className="font-mono text-[11px] text-charcoal font-semibold">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
                <Money size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-sans text-sm font-semibold text-green-800 mb-1">{t.store.payment.cashInPerson}</p>
                  <p className="font-mono text-[10px] text-green-700">{t.store.payment.cashInPersonDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-xs text-gray-500">
                <Warning size={14} className="flex-shrink-0 mt-0.5 text-amber-500" />
                <span>{t.store.payment.wireNote}</span>
              </div>
            </div>
          )}

          {/* STEP 3 — Confirm */}
          {step === "confirm" && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-3">{t.store.payment.orderSummary}</p>
                <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
                  {cart.map(item => (
                    <div key={`${item.id}-${item.variant}`} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-sans text-xs text-charcoal truncate">{item.name}</p>
                          {item.variant && <p className="font-mono text-[9px] text-gray-400">{item.variant}</p>}
                        </div>
                      </div>
                      <span className="font-mono text-xs text-charcoal flex-shrink-0">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                  <span className="font-sans text-sm text-gray-600">{t.store.payment.total}</span>
                  <span className="font-headline font-bold text-lg text-charcoal">${total.toFixed(2)}</span>
                </div>
              </div>
              <div className={`rounded-2xl p-4 flex items-center gap-3 bg-gradient-to-r ${selectedMethod?.color} bg-opacity-10`} style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.08)" }}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedMethod?.color} flex items-center justify-center text-white flex-shrink-0`}>
                  {selectedMethod?.icon}
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-charcoal">{selectedMethod?.label}</p>
                  <p className="font-mono text-[10px] text-gray-400">{selectedMethod?.sublabel}</p>
                </div>
              </div>
              {(method === "credit" || method === "debit") && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3">
                  <CreditCard size={16} className="text-gray-400 flex-shrink-0" />
                  <span className="font-mono text-sm text-charcoal">•••• •••• •••• {cardNumber.replace(/\s/g, "").slice(-4)}</span>
                  <span className="font-mono text-xs text-gray-400 ml-auto">{cardExpiry}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4 — Done */}
          {step === "done" && (
            <div className="flex flex-col items-center text-center py-4 gap-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={44} weight="fill" className="text-green-500" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl text-charcoal mb-2">{t.store.payment.thankYou}</h3>
                <p className="font-sans text-sm text-gray-500">
                  {method === "credit" || method === "debit"
                    ? t.store.payment.paymentSuccess
                    : method === "interac"
                    ? t.store.payment.interacSuccess
                    : t.store.payment.cashSuccess}
                </p>
              </div>
              <div className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 flex items-center justify-between">
                <span className="font-mono text-[11px] text-gray-400">{t.store.payment.orderTotal}</span>
                <span className="font-headline font-bold text-lg text-charcoal">${total.toFixed(2)}</span>
              </div>
              <button onClick={() => { onSuccess(); onClose(); }} className="w-full py-3.5 bg-charcoal text-gold font-sans font-semibold text-sm rounded-xl hover:bg-gold hover:text-charcoal transition-all cursor-pointer">
                {t.store.payment.backToStore}
              </button>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {step !== "done" && (
          <div className="px-6 pb-6 flex gap-3">
            {step !== "method" && (
              <button onClick={() => {
                if (step === "details") setStep("method");
                if (step === "confirm") setStep("details");
              }} className="px-5 py-3 border-2 border-gray-200 rounded-xl font-sans font-medium text-sm text-gray-600 hover:border-gray-400 transition-all cursor-pointer">
                {t.store.payment.back}
              </button>
            )}
            <button
              disabled={!method || processing}
              onClick={() => {
                if (step === "method" && method) setStep("details");
                else if (step === "details") {
                  if (method === "credit" || method === "debit") { if (!validateCard()) return; }
                  setStep("confirm");
                } else if (step === "confirm") handleSubmit();
              }}
              className="flex-1 py-3.5 bg-charcoal text-gold font-sans font-semibold text-sm rounded-xl hover:bg-gold hover:text-charcoal transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> {t.store.payment.processing}</>
              ) : step === "method" ? (
                <>{t.store.payment.continue} <ArrowUpRight size={14} weight="bold" /></>
              ) : step === "details" && method === "interac" ? (
                <>{t.store.payment.iveSentTransfer} <Check size={14} weight="bold" /></>
              ) : step === "details" && method === "cash" ? (
                <>{t.store.payment.continue} <ArrowUpRight size={14} weight="bold" /></>
              ) : step === "confirm" ? (
                <>{method === "credit" || method === "debit" ? t.store.payment.pay : t.store.payment.placeOrder} ${total.toFixed(2)}</>
              ) : (
                <>{t.store.payment.continue} <ArrowUpRight size={14} weight="bold" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartDrawer({ cart, onRemove, onUpdateQty, onClose, onCheckout }: { cart: CartEntry[]; onRemove: (id: string) => void; onUpdateQty: (id: string, qty: number) => void; onClose: () => void; onCheckout: () => void }) {
  const total = cart.reduce((sum, item) => {
    const p = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    return sum + (isNaN(p) ? 0 : p * item.quantity);
  }, 0);
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-headline font-bold text-lg text-charcoal">{t.store.yourCart} ({cart.length})</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"><X size={16} weight="bold" className="text-charcoal" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingCart size={40} weight="regular" className="text-gray-300 mb-3" />
              <p className="font-sans text-sm text-gray-400">{t.store.cartEmpty}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.variant}`} className="flex gap-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-medium text-charcoal truncate">{item.name}</p>
                  {item.variant && <p className="font-mono text-[10px] text-gray-400">{item.variant}</p>}
                  <p className="font-sans text-sm text-gold font-semibold">{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"><Minus size={10} weight="bold" /></button>
                    <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"><Plus size={10} weight="bold" /></button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="self-start w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center cursor-pointer transition-colors"><X size={12} className="text-gray-400 hover:text-red-500" /></button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100">
            {/* Payment method icons preview */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-[10px] text-gray-400">{t.store.accepts}</span>
              <div className="flex items-center gap-1.5">
                <span className="flex items-center gap-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-lg text-[9px] font-bold text-yellow-700"><ArrowsLeftRight size={9} />Interac</span>
                <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-[9px] font-bold text-blue-700"><CreditCard size={9} />Credit</span>
                <span className="flex items-center gap-1 px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[9px] font-bold text-emerald-700"><Bank size={9} />Debit</span>
                <span className="flex items-center gap-1 px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-[9px] font-bold text-gray-600"><Money size={9} />Cash</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="font-sans text-sm text-gray-600">{t.store.subtotal}</span>
              <span className="font-headline font-bold text-lg text-charcoal">${total.toFixed(2)}</span>
            </div>
            <button onClick={onCheckout} className="w-full px-5 py-3.5 bg-charcoal text-gold font-sans font-semibold text-sm rounded-xl hover:bg-gold hover:text-charcoal transition-all cursor-pointer flex items-center justify-center gap-2">
              {t.store.checkout} <ArrowUpRight size={14} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const STORE_CATS  = ["All", "Tools", "Equipment", "Accessories", "Digital"];
const COLLECTION_CATS = ["All", "Clothing", "Hats", "Hoodies", "Jackets", "Limited Edition", "Collectibles"];

export default function StorePage() {
  const [tab, setTab] = useState<"store"|"collection">("store");
  const [storeCat, setStoreCat] = useState("All");
  const [collectionCat, setCollectionCat] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cart, setCart] = useState<CartEntry[]>([]);
  const { t } = useLanguage();

  const storeItems = FALLBACK_STORE;
  const collectionItems = FALLBACK_COLLECTION;

  const filteredStore = storeCat === "All" ? storeItems : storeItems.filter((p: any) => p.category === storeCat);
  const filteredCollection = collectionCat === "All" ? collectionItems : collectionItems.filter((p: any) => p.category === collectionCat);

  const addToCart = (id: string, name: string, price: string, image: string, variant?: string) => {
    setCart(prev => {
      const key = `${id}-${variant ?? ""}`;
      const existing = prev.find(i => `${i.id}-${i.variant ?? ""}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.variant ?? ""}` === key ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id, name, price, image, quantity: 1, variant }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const handleCheckout = () => { setCartOpen(false); setPaymentOpen(true); };
  const handlePaymentSuccess = () => { setCart([]); setPaymentOpen(false); };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <Helmet>
        <title>SM Store & Collection – Aménagement Monzon</title>
        <meta name="description" content="Shop SM Store tools and accessories, or browse the exclusive SM Collection brand merchandise." />
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t.store.eyebrow} title={t.store.pageTitle} subtitle={t.store.pageSubtitle} />

        {/* Tab switcher */}
        <section className="py-4 bg-white border-b border-gray-100 sticky top-[72px] z-30">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
              <button onClick={() => setTab("store")} className={`px-5 py-2 text-sm font-sans font-medium rounded-lg transition-all cursor-pointer ${tab === "store" ? "bg-white text-charcoal shadow-sm" : "text-gray-400"}`}>{t.store.tabStore}</button>
              <button onClick={() => setTab("collection")} className={`px-5 py-2 text-sm font-sans font-medium rounded-lg transition-all cursor-pointer ${tab === "collection" ? "bg-white text-charcoal shadow-sm" : "text-gray-400"}`}>{t.store.tabCollection}</button>
            </div>
            <button onClick={() => setCartOpen(true)} className="flex items-center gap-2 px-4 py-2.5 glass-light border border-gray-200 rounded-xl text-sm font-medium text-charcoal hover:border-charcoal transition-all duration-200 cursor-pointer">
              <ShoppingCart size={16} />
              {t.store.cart} {cartCount > 0 && <span className="w-5 h-5 rounded-full bg-gold text-charcoal text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-xl mx-auto px-6 md:px-10">

            {tab === "store" && (
              <>
                <div className="flex flex-wrap gap-2 mb-10">
                  {STORE_CATS.map(c => (
                    <button key={c} onClick={() => setStoreCat(c)} className={["px-4 py-2 text-xs font-mono rounded-xl border transition-all duration-200 cursor-pointer focus:outline-none", c === storeCat ? "bg-charcoal text-gold border-charcoal" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"].join(" ")}>{c}</button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredStore.map((product: any) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
                </div>
              </>
            )}

            {tab === "collection" && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-headline font-bold text-xl text-charcoal">{t.store.collectionTitle}</h2>
                    <p className="font-sans text-sm text-gray-500 mt-1">{t.store.collectionSubtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-10">
                  {COLLECTION_CATS.map(c => (
                    <button key={c} onClick={() => setCollectionCat(c)} className={["px-4 py-2 text-xs font-mono rounded-xl border transition-all duration-200 cursor-pointer focus:outline-none", c === collectionCat ? "bg-charcoal text-gold border-charcoal" : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"].join(" ")}>{c}</button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredCollection.map((product: any) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
                </div>
              </>
            )}
          </div>
        </section>
      </PageShell>

      {cartOpen && <CartDrawer cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />}
      {paymentOpen && (
        <PaymentModal
          total={cart.reduce((s, i) => { const p = parseFloat(i.price.replace(/[^0-9.]/g, "")); return s + (isNaN(p) ? 0 : p * i.quantity); }, 0)}
          cart={cart}
          onClose={() => setPaymentOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}

