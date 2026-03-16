import { useState, useCallback } from "react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  EnvelopeSimple, Robot, Video, Cube, Image, GitFork, Key,
  CheckCircle, Database, Eye, EyeSlash, Plus, Trash, ArrowSquareOut,
  WarningCircle, Info, CloudArrowUp, Lightning, Funnel,
} from "@phosphor-icons/react";

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */
type FieldDef = {
  key: string;
  label: string;
  placeholder: string;
  type?: "text" | "password" | "url" | "number" | "textarea" | "select";
  options?: string[];
  hint?: string;
  envKey?: string; // environment variable name for reference
};

type IntegrationModule = {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  accentClass: string;         // bg + text classes
  borderClass: string;
  badge?: string;
  badgeColor?: string;
  fields: FieldDef[];
  sections?: { title: string; keys: string[] }[]; // optional field grouping
  docUrl?: string;
  enabled: boolean;
};

type ModuleState = { enabled: boolean; values: Record<string, string> };
type PanelState  = Record<string, ModuleState>;

/* ═══════════════════════════════════════════════════════════
   STORAGE HELPERS — localStorage only; no real keys sent
═══════════════════════════════════════════════════════════ */
const STORAGE_KEY = "sm_integrations_v2";

function loadState(modules: IntegrationModule[]): PanelState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: PanelState = raw ? JSON.parse(raw) : {};
    return Object.fromEntries(
      modules.map((m) => [
        m.id,
        { enabled: parsed[m.id]?.enabled ?? m.enabled, values: parsed[m.id]?.values ?? {} },
      ])
    );
  } catch {
    return Object.fromEntries(modules.map((m) => [m.id, { enabled: m.enabled, values: {} }]));
  }
}

function persistState(state: PanelState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ═══════════════════════════════════════════════════════════
   INTEGRATION DEFINITIONS
═══════════════════════════════════════════════════════════ */
const MODULES: IntegrationModule[] = [
  /* ── 1. Supabase ── */
  {
    id: "supabase",
    label: "Supabase",
    description: "Primary database, auth provider, and file storage backend.",
    icon: Database,
    accentClass: "bg-emerald-50 text-emerald-600",
    borderClass: "border-emerald-200",
    badge: "Core Infrastructure",
    badgeColor: "bg-emerald-100 text-emerald-700",
    docUrl: "https://supabase.com/docs",
    enabled: false,
    sections: [
      { title: "Connection", keys: ["supabaseUrl", "supabaseAnonKey", "supabaseServiceKey"] },
      { title: "Auth", keys: ["supabaseJwtSecret", "supabaseAuthRedirectUrl", "supabaseAuthProviders"] },
      { title: "Storage", keys: ["supabaseStorageBucket", "supabaseStorageCdnUrl", "supabaseStorageMaxSizeMb"] },
    ],
    fields: [
      {
        key: "supabaseUrl",
        label: "Project URL",
        placeholder: "https://xyzcompany.supabase.co",
        type: "url",
        hint: "Found in Project Settings → API",
        envKey: "VITE_SUPABASE_URL",
      },
      {
        key: "supabaseAnonKey",
        label: "Anon / Public Key",
        placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        type: "password",
        hint: "Safe to expose in frontend. Used for public DB + auth.",
        envKey: "VITE_SUPABASE_ANON_KEY",
      },
      {
        key: "supabaseServiceKey",
        label: "Service Role Key (Secret)",
        placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        type: "password",
        hint: "Server-side only. Never expose in client bundles.",
        envKey: "SUPABASE_SERVICE_ROLE_KEY",
      },
      {
        key: "supabaseJwtSecret",
        label: "JWT Secret",
        placeholder: "your-jwt-secret",
        type: "password",
        hint: "Used to verify auth tokens server-side.",
        envKey: "SUPABASE_JWT_SECRET",
      },
      {
        key: "supabaseAuthRedirectUrl",
        label: "Auth Redirect URL",
        placeholder: "https://amenagementmonzon.com/auth/callback",
        type: "url",
        hint: "OAuth / magic-link redirect. Must match allowed URLs in Supabase dashboard.",
        envKey: "VITE_SUPABASE_REDIRECT_URL",
      },
      {
        key: "supabaseAuthProviders",
        label: "Enabled Auth Providers",
        placeholder: "google, github, email",
        hint: "Comma-separated: google, github, email, phone, …",
        envKey: "VITE_SUPABASE_AUTH_PROVIDERS",
      },
      {
        key: "supabaseStorageBucket",
        label: "Default Storage Bucket",
        placeholder: "monzon-media",
        hint: "Bucket created in Supabase → Storage.",
        envKey: "VITE_SUPABASE_STORAGE_BUCKET",
      },
      {
        key: "supabaseStorageCdnUrl",
        label: "Storage CDN Base URL",
        placeholder: "https://xyzcompany.supabase.co/storage/v1/object/public/monzon-media/",
        type: "url",
        hint: "Prefix for all public asset URLs.",
        envKey: "VITE_SUPABASE_STORAGE_CDN",
      },
      {
        key: "supabaseStorageMaxSizeMb",
        label: "Max Upload Size (MB)",
        placeholder: "50",
        type: "number",
        envKey: "VITE_SUPABASE_MAX_UPLOAD_MB",
      },
    ],
  },

  /* ── 2. Groq AI ── */
  {
    id: "groq",
    label: "Groq AI",
    description: "Ultra-fast LLM inference for the public chatbot and admin financial analyst.",
    icon: Lightning,
    accentClass: "bg-orange-50 text-orange-500",
    borderClass: "border-orange-200",
    badge: "AI Engine",
    badgeColor: "bg-orange-100 text-orange-600",
    docUrl: "https://console.groq.com/docs",
    enabled: false,
    sections: [
      { title: "API Credentials", keys: ["groqApiKey", "groqBaseUrl"] },
      { title: "Public Chatbot", keys: ["groqChatModel", "groqChatMaxTokens", "groqChatTemperature", "groqChatSystemPrompt"] },
      { title: "Admin Analyst", keys: ["groqAnalystModel", "groqAnalystMaxTokens", "groqAnalystSystemPrompt"] },
      { title: "Rate Limiting", keys: ["groqRpmLimit", "groqDailyBudgetUsd"] },
    ],
    fields: [
      {
        key: "groqApiKey",
        label: "Groq API Key",
        placeholder: "gsk_...",
        type: "password",
        hint: "Generate at console.groq.com. Never expose in client code.",
        envKey: "GROQ_API_KEY",
      },
      {
        key: "groqBaseUrl",
        label: "API Base URL",
        placeholder: "https://api.groq.com/openai/v1",
        type: "url",
        hint: "Default: https://api.groq.com/openai/v1",
        envKey: "GROQ_BASE_URL",
      },
      {
        key: "groqChatModel",
        label: "Chatbot Model",
        placeholder: "llama3-8b-8192",
        type: "select",
        options: ["llama3-8b-8192", "llama3-70b-8192", "mixtral-8x7b-32768", "gemma-7b-it", "gemma2-9b-it"],
        hint: "Recommended: llama3-8b-8192 for speed + cost.",
        envKey: "VITE_GROQ_CHAT_MODEL",
      },
      {
        key: "groqChatMaxTokens",
        label: "Chatbot Max Tokens",
        placeholder: "512",
        type: "number",
        envKey: "VITE_GROQ_CHAT_MAX_TOKENS",
      },
      {
        key: "groqChatTemperature",
        label: "Chatbot Temperature (0–1)",
        placeholder: "0.7",
        type: "number",
        envKey: "VITE_GROQ_CHAT_TEMPERATURE",
      },
      {
        key: "groqChatSystemPrompt",
        label: "Chatbot System Prompt",
        placeholder: "You are the Aménagement Monzon assistant. Help visitors understand our hardscape, construction, and maintenance services...",
        type: "textarea",
        hint: "Sets the bot's persona and scope for public visitors.",
        envKey: "GROQ_CHAT_SYSTEM_PROMPT",
      },
      {
        key: "groqAnalystModel",
        label: "Analyst Model",
        placeholder: "llama3-70b-8192",
        type: "select",
        options: ["llama3-8b-8192", "llama3-70b-8192", "mixtral-8x7b-32768", "gemma2-9b-it"],
        hint: "Recommended: llama3-70b for deeper financial reasoning.",
        envKey: "VITE_GROQ_ANALYST_MODEL",
      },
      {
        key: "groqAnalystMaxTokens",
        label: "Analyst Max Tokens",
        placeholder: "2048",
        type: "number",
        envKey: "VITE_GROQ_ANALYST_MAX_TOKENS",
      },
      {
        key: "groqAnalystSystemPrompt",
        label: "Analyst System Prompt",
        placeholder: "You are a financial analyst AI for Aménagement Monzon. You have access to revenue, expenses, project margins, and lead data...",
        type: "textarea",
        hint: "Defines the analyst's reasoning context inside the admin panel.",
        envKey: "GROQ_ANALYST_SYSTEM_PROMPT",
      },
      {
        key: "groqRpmLimit",
        label: "Max Requests / Minute",
        placeholder: "30",
        type: "number",
        hint: "Client-side guard. Groq free tier: 30 RPM.",
        envKey: "VITE_GROQ_RPM_LIMIT",
      },
      {
        key: "groqDailyBudgetUsd",
        label: "Daily Budget Cap (USD)",
        placeholder: "5.00",
        type: "number",
        hint: "Soft cap — tracked client-side. Use Groq billing limits server-side.",
        envKey: "VITE_GROQ_DAILY_BUDGET",
      },
    ],
  },

  /* ── 3. Gmail SMTP ── */
  {
    id: "gmail-smtp",
    label: "Gmail SMTP",
    description: "Send invoices, estimates, notifications, and client messages via Gmail.",
    icon: EnvelopeSimple,
    accentClass: "bg-blue-50 text-blue-500",
    borderClass: "border-blue-200",
    badge: "Email",
    badgeColor: "bg-blue-100 text-blue-600",
    docUrl: "https://support.google.com/mail/answer/185833",
    enabled: false,
    sections: [
      { title: "SMTP Credentials", keys: ["gmailSmtpUser", "gmailAppPassword", "gmailSmtpHost", "gmailSmtpPort", "gmailSmtpSecure"] },
      { title: "Sender Identity", keys: ["gmailFromName", "gmailFromAddress", "gmailReplyTo"] },
      { title: "Notification Routing", keys: ["gmailAdminNotifyEmail", "gmailLeadAlertEmail", "gmailInvoiceEmail"] },
      { title: "Templates", keys: ["gmailInvoiceSubject", "gmailEstimateSubject", "gmailLeadSubject", "gmailFooterText"] },
    ],
    fields: [
      {
        key: "gmailSmtpUser",
        label: "Gmail Address",
        placeholder: "silviolmonzon@gmail.com",
        hint: "The Gmail account used to send all emails.",
        envKey: "GMAIL_SMTP_USER",
      },
      {
        key: "gmailAppPassword",
        label: "App Password",
        placeholder: "xxxx xxxx xxxx xxxx",
        type: "password",
        hint: "Generate at myaccount.google.com → Security → App passwords. Requires 2FA enabled.",
        envKey: "GMAIL_APP_PASSWORD",
      },
      {
        key: "gmailSmtpHost",
        label: "SMTP Host",
        placeholder: "smtp.gmail.com",
        hint: "Always smtp.gmail.com for Gmail.",
        envKey: "GMAIL_SMTP_HOST",
      },
      {
        key: "gmailSmtpPort",
        label: "SMTP Port",
        placeholder: "587",
        type: "number",
        hint: "587 (TLS/STARTTLS) or 465 (SSL). Recommended: 587.",
        envKey: "GMAIL_SMTP_PORT",
      },
      {
        key: "gmailSmtpSecure",
        label: "Encryption",
        placeholder: "TLS",
        type: "select",
        options: ["TLS (STARTTLS, port 587)", "SSL (port 465)", "None (not recommended)"],
        envKey: "GMAIL_SMTP_SECURE",
      },
      {
        key: "gmailFromName",
        label: "Sender Display Name",
        placeholder: "Aménagement Monzon",
        envKey: "GMAIL_FROM_NAME",
      },
      {
        key: "gmailFromAddress",
        label: "From Email Address",
        placeholder: "contact@amenagementmonzon.com",
        hint: "Can differ from the Gmail address if using a custom domain alias.",
        envKey: "GMAIL_FROM_ADDRESS",
      },
      {
        key: "gmailReplyTo",
        label: "Reply-To Address",
        placeholder: "info@amenagementmonzon.com",
        envKey: "GMAIL_REPLY_TO",
      },
      {
        key: "gmailAdminNotifyEmail",
        label: "Admin Notification Email",
        placeholder: "silviol@amenagementmonzon.com",
        hint: "Receives alerts for new leads, contact forms, and payments.",
        envKey: "GMAIL_ADMIN_NOTIFY",
      },
      {
        key: "gmailLeadAlertEmail",
        label: "Lead Alert Email",
        placeholder: "leads@amenagementmonzon.com",
        hint: "Receives instant notification when a new lead is captured.",
        envKey: "GMAIL_LEAD_ALERT",
      },
      {
        key: "gmailInvoiceEmail",
        label: "Billing CC Email",
        placeholder: "billing@amenagementmonzon.com",
        hint: "CC'd on all invoices and estimate emails sent to clients.",
        envKey: "GMAIL_INVOICE_CC",
      },
      {
        key: "gmailInvoiceSubject",
        label: "Invoice Email Subject",
        placeholder: "Your Invoice from Aménagement Monzon – #{number}",
        hint: "Use #{number} for dynamic document number.",
        envKey: "GMAIL_INVOICE_SUBJECT",
      },
      {
        key: "gmailEstimateSubject",
        label: "Estimate Email Subject",
        placeholder: "Your Estimate from Aménagement Monzon – #{number}",
        envKey: "GMAIL_ESTIMATE_SUBJECT",
      },
      {
        key: "gmailLeadSubject",
        label: "Lead Notification Subject",
        placeholder: "New Lead: #{name} – #{service}",
        hint: "Use #{name}, #{service}, #{budget} as dynamic tokens.",
        envKey: "GMAIL_LEAD_SUBJECT",
      },
      {
        key: "gmailFooterText",
        label: "Email Footer Text",
        placeholder: "Aménagement Monzon · Montreal, QC · amenagementmonzon.com",
        type: "textarea",
        envKey: "GMAIL_FOOTER_TEXT",
      },
    ],
  },

  /* ── 4. YouTube / Vimeo ── */
  {
    id: "video",
    label: "YouTube / Vimeo",
    description: "Video sources for the hero reel, project showcases, and academy content.",
    icon: Video,
    accentClass: "bg-red-50 text-red-500",
    borderClass: "border-red-200",
    badge: "Media",
    badgeColor: "bg-red-100 text-red-600",
    docUrl: "https://developers.google.com/youtube/v3",
    enabled: false,
    sections: [
      { title: "YouTube", keys: ["ytApiKey", "ytChannelId", "ytPlaylistIdHero", "ytPlaylistIdProjects"] },
      { title: "Vimeo", keys: ["vimeoToken", "vimeoUserId", "vimeoShowcaseId"] },
      { title: "Fallback / CDN", keys: ["videoCdnBase", "heroVideoUrl", "heroVideoFallbackUrl"] },
      { title: "Playback Defaults", keys: ["videoAutoplay", "videoMuted", "videoLoop", "videoQuality"] },
    ],
    fields: [
      {
        key: "ytApiKey",
        label: "YouTube Data API v3 Key",
        placeholder: "AIzaSy...",
        type: "password",
        hint: "Create at console.cloud.google.com → YouTube Data API v3.",
        envKey: "VITE_YT_API_KEY",
      },
      {
        key: "ytChannelId",
        label: "YouTube Channel ID",
        placeholder: "UCxxxxxxxxxxxxxxxxxxxxxxxxx",
        hint: "Found at youtube.com/account_advanced.",
        envKey: "VITE_YT_CHANNEL_ID",
      },
      {
        key: "ytPlaylistIdHero",
        label: "Hero Reel Playlist ID",
        placeholder: "PLxxxxxxxxxxxxxxxxxxxxxxxxx",
        hint: "Videos from this playlist rotate in the hero section.",
        envKey: "VITE_YT_PLAYLIST_HERO",
      },
      {
        key: "ytPlaylistIdProjects",
        label: "Projects Showcase Playlist ID",
        placeholder: "PLxxxxxxxxxxxxxxxxxxxxxxxxx",
        envKey: "VITE_YT_PLAYLIST_PROJECTS",
      },
      {
        key: "vimeoToken",
        label: "Vimeo Access Token",
        placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        type: "password",
        hint: "Generate at developer.vimeo.com → Apps → Access tokens.",
        envKey: "VITE_VIMEO_TOKEN",
      },
      {
        key: "vimeoUserId",
        label: "Vimeo User / Account ID",
        placeholder: "123456789",
        envKey: "VITE_VIMEO_USER_ID",
      },
      {
        key: "vimeoShowcaseId",
        label: "Vimeo Showcase ID",
        placeholder: "9876543",
        hint: "Optional: pulls videos from a specific Vimeo showcase/album.",
        envKey: "VITE_VIMEO_SHOWCASE_ID",
      },
      {
        key: "videoCdnBase",
        label: "Direct Video CDN Base URL",
        placeholder: "https://cdn.amenagementmonzon.com/videos/",
        type: "url",
        hint: "Fallback if YouTube/Vimeo are not configured.",
        envKey: "VITE_VIDEO_CDN_BASE",
      },
      {
        key: "heroVideoUrl",
        label: "Hero Video URL (Primary)",
        placeholder: "https://cdn.amenagementmonzon.com/videos/hero-hardscape.mp4",
        type: "url",
        hint: "Direct .mp4 or .webm for the landing page hero.",
        envKey: "VITE_HERO_VIDEO_URL",
      },
      {
        key: "heroVideoFallbackUrl",
        label: "Hero Video URL (Fallback / Poster)",
        placeholder: "https://cdn.amenagementmonzon.com/images/hero-poster.jpg",
        type: "url",
        hint: "Poster image shown while video loads or on mobile.",
        envKey: "VITE_HERO_VIDEO_POSTER",
      },
      {
        key: "videoAutoplay",
        label: "Autoplay Videos",
        placeholder: "true",
        type: "select",
        options: ["true", "false"],
        envKey: "VITE_VIDEO_AUTOPLAY",
      },
      {
        key: "videoMuted",
        label: "Muted by Default",
        placeholder: "true",
        type: "select",
        options: ["true", "false"],
        hint: "Must be true for autoplay to work in most browsers.",
        envKey: "VITE_VIDEO_MUTED",
      },
      {
        key: "videoLoop",
        label: "Loop Videos",
        placeholder: "true",
        type: "select",
        options: ["true", "false"],
        envKey: "VITE_VIDEO_LOOP",
      },
      {
        key: "videoQuality",
        label: "Preferred Quality",
        placeholder: "1080p",
        type: "select",
        options: ["4K", "1080p", "720p", "480p", "Auto"],
        envKey: "VITE_VIDEO_QUALITY",
      },
    ],
  },

  /* ── 5. 3D Asset Storage ── */
  {
    id: "3d-assets",
    label: "3D Asset Storage",
    description: "Supabase Storage or CDN for GLB, OBJ, GLTF, HDR, and environment maps.",
    icon: Cube,
    accentClass: "bg-purple-50 text-purple-600",
    borderClass: "border-purple-200",
    badge: "3D / XR",
    badgeColor: "bg-purple-100 text-purple-700",
    enabled: false,
    sections: [
      { title: "Storage Provider", keys: ["assetProvider", "assetBucket", "assetCdnUrl"] },
      { title: "Supabase Storage", keys: ["asset3dSupabaseUrl", "asset3dSupabaseKey", "asset3dSupabaseBucket"] },
      { title: "Custom CDN", keys: ["asset3dCdnBase", "asset3dCdnToken"] },
      { title: "Asset Paths", keys: ["assetPathGlb", "assetPathHdr", "assetPathGltf", "assetPathObj"] },
      { title: "Loading", keys: ["asset3dMaxSizeMb", "asset3dPreloadList"] },
    ],
    fields: [
      {
        key: "assetProvider",
        label: "Storage Provider",
        placeholder: "supabase",
        type: "select",
        options: ["supabase", "s3", "cloudflare-r2", "gcs", "custom-cdn"],
        hint: "Choose where 3D assets are stored and served from.",
        envKey: "VITE_3D_ASSET_PROVIDER",
      },
      {
        key: "assetBucket",
        label: "Bucket / Container Name",
        placeholder: "monzon-3d-assets",
        envKey: "VITE_3D_ASSET_BUCKET",
      },
      {
        key: "assetCdnUrl",
        label: "Public CDN Base URL",
        placeholder: "https://xyzcompany.supabase.co/storage/v1/object/public/monzon-3d-assets/",
        type: "url",
        hint: "All asset URLs are constructed as: {CDN_BASE}{filename}",
        envKey: "VITE_3D_CDN_URL",
      },
      {
        key: "asset3dSupabaseUrl",
        label: "Supabase Project URL",
        placeholder: "https://xyzcompany.supabase.co",
        type: "url",
        hint: "If using Supabase for 3D storage (can reuse the main Supabase project).",
        envKey: "VITE_3D_SUPABASE_URL",
      },
      {
        key: "asset3dSupabaseKey",
        label: "Supabase Anon Key",
        placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        type: "password",
        envKey: "VITE_3D_SUPABASE_ANON_KEY",
      },
      {
        key: "asset3dSupabaseBucket",
        label: "Supabase Storage Bucket",
        placeholder: "monzon-3d",
        envKey: "VITE_3D_SUPABASE_BUCKET",
      },
      {
        key: "asset3dCdnBase",
        label: "Custom CDN Base URL",
        placeholder: "https://cdn.amenagementmonzon.com/3d/",
        type: "url",
        envKey: "VITE_3D_CDN_BASE",
      },
      {
        key: "asset3dCdnToken",
        label: "CDN Auth Token (if needed)",
        placeholder: "Bearer xxxxx",
        type: "password",
        hint: "Only required if your CDN uses token-authenticated requests.",
        envKey: "3D_CDN_TOKEN",
      },
      {
        key: "assetPathGlb",
        label: "GLB Assets Subfolder",
        placeholder: "models/glb/",
        hint: "Appended to CDN base URL for .glb files.",
        envKey: "VITE_3D_PATH_GLB",
      },
      {
        key: "assetPathHdr",
        label: "HDR / Environment Maps Subfolder",
        placeholder: "env/hdr/",
        envKey: "VITE_3D_PATH_HDR",
      },
      {
        key: "assetPathGltf",
        label: "GLTF Assets Subfolder",
        placeholder: "models/gltf/",
        envKey: "VITE_3D_PATH_GLTF",
      },
      {
        key: "assetPathObj",
        label: "OBJ Assets Subfolder",
        placeholder: "models/obj/",
        envKey: "VITE_3D_PATH_OBJ",
      },
      {
        key: "asset3dMaxSizeMb",
        label: "Max Single Asset Size (MB)",
        placeholder: "100",
        type: "number",
        envKey: "VITE_3D_MAX_SIZE_MB",
      },
      {
        key: "asset3dPreloadList",
        label: "Assets to Preload (comma-separated filenames)",
        placeholder: "paver-hero.glb, construction-cube.glb",
        hint: "These assets are fetched as the app boots for instant 3D rendering.",
        envKey: "VITE_3D_PRELOAD",
      },
    ],
  },

  /* ── 6. Image Library ── */
  {
    id: "image-library",
    label: "Image Library",
    description: "Cloudinary, Imgix, BunnyCDN, or S3-compatible image hosting and transformation.",
    icon: Image,
    accentClass: "bg-amber-50 text-amber-600",
    borderClass: "border-amber-200",
    badge: "Media",
    badgeColor: "bg-amber-100 text-amber-700",
    docUrl: "https://cloudinary.com/documentation",
    enabled: false,
    sections: [
      { title: "Provider", keys: ["imgProvider"] },
      { title: "Cloudinary", keys: ["imgCloudName", "imgApiKey", "imgApiSecret", "imgUploadPreset"] },
      { title: "Imgix / S3 / BunnyCDN", keys: ["imgBaseUrl", "imgCdnToken", "imgS3Bucket", "imgS3Region"] },
      { title: "Transformation Defaults", keys: ["imgDefaultQuality", "imgDefaultFormat", "imgDefaultWidth", "imgLazyLoad"] },
      { title: "Upload Settings", keys: ["imgMaxFileSizeMb", "imgAllowedTypes", "imgWatermarkUrl"] },
    ],
    fields: [
      {
        key: "imgProvider",
        label: "Image Provider",
        placeholder: "cloudinary",
        type: "select",
        options: ["cloudinary", "imgix", "bunnycdn", "s3", "supabase", "custom-cdn"],
        envKey: "VITE_IMG_PROVIDER",
      },
      {
        key: "imgCloudName",
        label: "Cloudinary Cloud Name",
        placeholder: "monzon-media",
        hint: "Found at cloudinary.com/console.",
        envKey: "VITE_CLOUDINARY_CLOUD_NAME",
      },
      {
        key: "imgApiKey",
        label: "Cloudinary API Key",
        placeholder: "123456789012345",
        type: "password",
        envKey: "CLOUDINARY_API_KEY",
      },
      {
        key: "imgApiSecret",
        label: "Cloudinary API Secret",
        placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        type: "password",
        hint: "Server-side only. Never expose in client builds.",
        envKey: "CLOUDINARY_API_SECRET",
      },
      {
        key: "imgUploadPreset",
        label: "Cloudinary Upload Preset",
        placeholder: "monzon_uploads",
        hint: "Unsigned preset for client-side uploads.",
        envKey: "VITE_CLOUDINARY_UPLOAD_PRESET",
      },
      {
        key: "imgBaseUrl",
        label: "Custom CDN / Imgix Base URL",
        placeholder: "https://monzon.imgix.net/",
        type: "url",
        hint: "For Imgix, BunnyCDN, or custom CDN setups.",
        envKey: "VITE_IMG_BASE_URL",
      },
      {
        key: "imgCdnToken",
        label: "CDN Auth Token",
        placeholder: "Bearer xxxxx",
        type: "password",
        hint: "Only needed for token-authenticated CDN requests.",
        envKey: "IMG_CDN_TOKEN",
      },
      {
        key: "imgS3Bucket",
        label: "S3 Bucket Name",
        placeholder: "monzon-images",
        hint: "For S3-compatible providers (AWS, Backblaze B2, Wasabi).",
        envKey: "IMG_S3_BUCKET",
      },
      {
        key: "imgS3Region",
        label: "S3 Region",
        placeholder: "ca-central-1",
        envKey: "IMG_S3_REGION",
      },
      {
        key: "imgDefaultQuality",
        label: "Default Quality (%)",
        placeholder: "85",
        type: "number",
        envKey: "VITE_IMG_QUALITY",
      },
      {
        key: "imgDefaultFormat",
        label: "Default Output Format",
        placeholder: "webp",
        type: "select",
        options: ["webp", "avif", "jpeg", "png", "auto"],
        envKey: "VITE_IMG_FORMAT",
      },
      {
        key: "imgDefaultWidth",
        label: "Default Max Width (px)",
        placeholder: "1440",
        type: "number",
        envKey: "VITE_IMG_MAX_WIDTH",
      },
      {
        key: "imgLazyLoad",
        label: "Lazy Load Images",
        placeholder: "true",
        type: "select",
        options: ["true", "false"],
        envKey: "VITE_IMG_LAZY_LOAD",
      },
      {
        key: "imgMaxFileSizeMb",
        label: "Max Upload Size (MB)",
        placeholder: "10",
        type: "number",
        envKey: "VITE_IMG_MAX_UPLOAD_MB",
      },
      {
        key: "imgAllowedTypes",
        label: "Allowed File Types",
        placeholder: "image/jpeg, image/png, image/webp, image/avif",
        hint: "Comma-separated MIME types.",
        envKey: "VITE_IMG_ALLOWED_TYPES",
      },
      {
        key: "imgWatermarkUrl",
        label: "Watermark Image URL",
        placeholder: "https://cdn.amenagementmonzon.com/brand/watermark.png",
        type: "url",
        hint: "Optional. Applied to project photos uploaded by clients.",
        envKey: "VITE_IMG_WATERMARK_URL",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   WEBHOOK TYPES
═══════════════════════════════════════════════════════════ */
type WebhookEntry = {
  id: string;
  label: string;
  url: string;
  event: string;
  secret: string;
  enabled: boolean;
  retries: number;
};

const DEFAULT_WEBHOOKS: WebhookEntry[] = [
  { id: "wh-zapier-lead",     label: "New Lead → Zapier",             url: "", event: "lead.created",       secret: "", enabled: false, retries: 3 },
  { id: "wh-slack-invoice",   label: "Invoice Sent → Slack",          url: "", event: "invoice.sent",       secret: "", enabled: false, retries: 2 },
  { id: "wh-qb-payment",      label: "Payment Received → QuickBooks", url: "", event: "payment.received",   secret: "", enabled: false, retries: 3 },
  { id: "wh-slack-project",   label: "Project Status Changed → Slack",url: "", event: "project.updated",    secret: "", enabled: false, retries: 2 },
  { id: "wh-zapier-contact",  label: "Contact Form → Zapier",         url: "", event: "contact.submitted",  secret: "", enabled: false, retries: 3 },
  { id: "wh-custom-1",        label: "Custom Endpoint #1",            url: "", event: "custom",             secret: "", enabled: false, retries: 1 },
];

const WEBHOOK_EVENTS = [
  "lead.created", "lead.updated", "invoice.sent", "invoice.paid",
  "payment.received", "project.created", "project.updated", "project.completed",
  "contact.submitted", "estimate.approved", "client.created", "custom",
];

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */

/* Toggle */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-checked={checked}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${checked ? "bg-gold" : "bg-gray-200"}`}
    >
      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-1"}`} />
    </button>
  );
}

/* Field with show/hide, textarea, select */
function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);

  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-sans text-xs text-charcoal resize-y focus:outline-none focus:ring-1 focus:ring-gold"
      />
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 font-sans text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
      >
        <option value="">{field.placeholder}</option>
        {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    );
  }

  if (field.type === "password") {
    return (
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="font-mono text-xs border-gray-200 rounded-xl pr-16"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-gray-400 hover:text-charcoal focus:outline-none"
        >
          {show ? <EyeSlash size={11} /> : <Eye size={11} />}
          {show ? "hide" : "show"}
        </button>
      </div>
    );
  }

  return (
    <Input
      type={field.type ?? "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className="font-sans text-xs border-gray-200 rounded-xl"
    />
  );
}

/* Env variable badge */
function EnvBadge({ envKey }: { envKey: string }) {
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 border border-gray-200 select-all">
      <Key size={9} />
      {envKey}
    </span>
  );
}

/* Single integration module card */
function ModuleCard({
  module,
  state,
  onChange,
  onToggle,
  onSave,
  saved,
}: {
  module: IntegrationModule;
  state: ModuleState;
  onChange: (key: string, value: string) => void;
  onToggle: () => void;
  onSave: () => void;
  saved: boolean;
}) {
  const Icon = module.icon;
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Group fields by section
  const sections = module.sections ?? [{ title: "Configuration", keys: module.fields.map((f) => f.key) }];

  const fieldByKey = Object.fromEntries(module.fields.map((f) => [f.key, f]));

  // Count configured fields
  const configuredCount = module.fields.filter((f) => !!state.values[f.key]).length;
  const totalFields = module.fields.length;

  return (
    <Card className={`bg-white border-gray-200 shadow-sm transition-all ${state.enabled ? "" : "opacity-90"}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${module.accentClass}`}>
              <Icon size={18} weight="regular" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="font-headline text-sm text-charcoal">{module.label}</CardTitle>
                {module.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase tracking-wider ${module.badgeColor ?? "bg-gray-100 text-gray-500"}`}>
                    {module.badge}
                  </span>
                )}
                {configuredCount > 0 && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200">
                    {configuredCount}/{totalFields} fields set
                  </span>
                )}
              </div>
              <CardDescription className="font-sans text-xs text-gray-400 mt-0.5 truncate">{module.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {module.docUrl && (
              <a
                href={module.docUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-charcoal transition-colors"
                title="Documentation"
              >
                <ArrowSquareOut size={14} />
              </a>
            )}
            <Toggle checked={state.enabled} onChange={onToggle} />
          </div>
        </div>

        {/* Not-connected notice when disabled */}
        {!state.enabled && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
            <Info size={12} className="text-gray-400 flex-shrink-0" />
            <p className="font-sans text-[11px] text-gray-400">
              Enable to configure. No connection is made until you deploy and save real credentials.
            </p>
          </div>
        )}
      </CardHeader>

      {state.enabled && (
        <CardContent className="pt-0">
          {/* Section accordion */}
          <div className="flex flex-col gap-2">
            {sections.map((sec) => {
              const sectionFields = sec.keys.map((k) => fieldByKey[k]).filter(Boolean);
              const isOpen = openSection === sec.title;
              const sectionConfigured = sectionFields.filter((f) => !!state.values[f.key]).length;

              return (
                <div key={sec.title} className={`rounded-xl border transition-colors ${isOpen ? `${module.borderClass} bg-white` : "border-gray-100 bg-gray-50"}`}>
                  <button
                    type="button"
                    onClick={() => setOpenSection(isOpen ? null : sec.title)}
                    className="w-full flex items-center justify-between px-4 py-2.5 gap-2 text-left focus:outline-none"
                  >
                    <span className="font-mono text-[11px] font-semibold text-charcoal uppercase tracking-widest">{sec.title}</span>
                    <div className="flex items-center gap-2">
                      {sectionConfigured > 0 && (
                        <span className="font-mono text-[9px] text-green-600">
                          {sectionConfigured}/{sectionFields.length}
                        </span>
                      )}
                      <span className={`transition-transform text-gray-400 text-xs ${isOpen ? "rotate-180" : ""}`}>▾</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 flex flex-col gap-4 border-t border-gray-100 pt-3">
                      {sectionFields.map((f) => (
                        <div key={f.key} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{f.label}</Label>
                            {f.envKey && <EnvBadge envKey={f.envKey} />}
                          </div>
                          <FieldInput
                            field={f}
                            value={state.values[f.key] ?? ""}
                            onChange={(v) => onChange(f.key, v)}
                          />
                          {f.hint && (
                            <p className="font-sans text-[10px] text-gray-400 leading-relaxed">{f.hint}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Save row */}
          <div className="flex items-center gap-3 pt-4">
            <Button
              onClick={onSave}
              className="bg-gold text-charcoal hover:bg-gold-dark text-xs h-8 px-4 rounded-xl shadow-none font-semibold"
            >
              Save Changes
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-xs text-green-600 font-sans">
                <CheckCircle size={13} weight="fill" /> Configuration saved
              </span>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

/* ── Webhooks ── */
function WebhooksModule() {
  const [webhooks, setWebhooks] = useState<WebhookEntry[]>(() => {
    try {
      const raw = localStorage.getItem("sm_webhooks_v2");
      return raw ? JSON.parse(raw) : DEFAULT_WEBHOOKS;
    } catch {
      return DEFAULT_WEBHOOKS;
    }
  });
  const [saved, setSaved] = useState<string | null>(null);
  const [showSecret, setShowSecret] = useState<Record<string, boolean>>({});

  const update = useCallback(<K extends keyof WebhookEntry>(id: string, field: K, value: WebhookEntry[K]) => {
    setWebhooks((prev) => prev.map((w) => w.id === id ? { ...w, [field]: value } : w));
  }, []);

  const addWebhook = () => {
    const newEntry: WebhookEntry = {
      id: `wh-custom-${Date.now()}`,
      label: "New Endpoint",
      url: "",
      event: "custom",
      secret: "",
      enabled: false,
      retries: 3,
    };
    setWebhooks((prev) => [...prev, newEntry]);
  };

  const removeWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
  };

  const saveWebhook = (id: string) => {
    localStorage.setItem("sm_webhooks_v2", JSON.stringify(webhooks));
    setSaved(id);
    setTimeout(() => setSaved(null), 2500);
  };

  const toggleSecret = (id: string) => setShowSecret((p) => ({ ...p, [id]: !p[id] }));

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
            <GitFork size={18} weight="regular" className="text-violet-500" />
          </div>
          <div>
            <CardTitle className="font-headline text-sm text-charcoal flex items-center gap-2">
              Webhooks &amp; Automation
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-600 uppercase tracking-wider">Outbound</span>
            </CardTitle>
            <CardDescription className="font-sans text-xs text-gray-400">
              Push events to Zapier, Slack, QuickBooks, or any custom endpoint.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 mb-3">
          {webhooks.map((w) => (
            <div key={w.id} className="rounded-xl border border-gray-100 bg-gray-50 flex flex-col gap-0 overflow-hidden">
              {/* Header row */}
              <div className="flex items-center justify-between px-4 py-3 gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${w.enabled ? "bg-green-400" : "bg-gray-300"}`} />
                  <input
                    value={w.label}
                    onChange={(e) => update(w.id, "label", e.target.value)}
                    className="font-sans text-sm font-medium text-charcoal bg-transparent focus:outline-none focus:underline min-w-0 flex-1"
                  />
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Toggle checked={w.enabled} onChange={(v) => update(w.id, "enabled", v)} />
                  <button
                    type="button"
                    onClick={() => removeWebhook(w.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors focus:outline-none"
                    title="Remove webhook"
                  >
                    <Trash size={13} />
                  </button>
                </div>
              </div>

              {/* Detail form */}
              {w.enabled && (
                <div className="flex flex-col gap-3 px-4 pb-4 border-t border-gray-100 pt-3">
                  <div className="flex flex-col gap-1.5">
                    <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Endpoint URL</Label>
                    <Input
                      value={w.url}
                      onChange={(e) => update(w.id, "url", e.target.value)}
                      placeholder="https://hooks.zapier.com/hooks/catch/..."
                      className="font-mono text-xs border-gray-200 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Event Trigger</Label>
                      <select
                        value={w.event}
                        onChange={(e) => update(w.id, "event", e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 font-mono text-xs text-charcoal focus:outline-none focus:ring-1 focus:ring-gold"
                      >
                        {WEBHOOK_EVENTS.map((ev) => <option key={ev} value={ev}>{ev}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">Retry Attempts</Label>
                      <Input
                        type="number"
                        value={w.retries}
                        onChange={(e) => update(w.id, "retries", Number(e.target.value) as any)}
                        className="font-mono text-xs border-gray-200 rounded-xl"
                        min={0}
                        max={10}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                        Signing Secret (optional)
                      </Label>
                      <button type="button" onClick={() => toggleSecret(w.id)} className="text-[10px] font-mono text-gray-400 hover:text-charcoal focus:outline-none">
                        {showSecret[w.id] ? "hide" : "show"}
                      </button>
                    </div>
                    <Input
                      type={showSecret[w.id] ? "text" : "password"}
                      value={w.secret}
                      onChange={(e) => update(w.id, "secret", e.target.value)}
                      placeholder="whsec_..."
                      className="font-mono text-xs border-gray-200 rounded-xl"
                    />
                    <p className="font-sans text-[10px] text-gray-400">Used to sign payloads (HMAC-SHA256). Verify on the receiving end.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => saveWebhook(w.id)}
                      className="bg-gold text-charcoal hover:bg-gold-dark text-xs h-7 px-4 rounded-xl shadow-none font-semibold"
                    >
                      Save
                    </Button>
                    {saved === w.id && (
                      <span className="flex items-center gap-1 text-xs text-green-600 font-sans">
                        <CheckCircle size={12} weight="fill" /> Saved
                      </span>
                    )}
                    <span className="font-mono text-[9px] text-gray-300 ml-auto">ENV: SM_WEBHOOK_{w.event.toUpperCase().replace(".", "_")}_URL</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addWebhook}
          className="flex items-center gap-2 text-xs font-sans text-gray-400 hover:text-charcoal transition-colors focus:outline-none"
        >
          <Plus size={13} /> Add webhook endpoint
        </button>

        <div className="mt-4 p-3 rounded-xl bg-violet-50 border border-violet-100">
          <p className="font-sans text-[11px] text-violet-700 leading-relaxed">
            <strong>Payload format:</strong> All events send a JSON body with <code className="font-mono text-[10px]">event</code>, <code className="font-mono text-[10px]">timestamp</code>, <code className="font-mono text-[10px]">data</code>, and an <code className="font-mono text-[10px]">X-SM-Signature</code> header for verification.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Environment Variables Reference ── */
function EnvVarsReference({ modules }: { modules: IntegrationModule[] }) {
  const [open, setOpen] = useState(false);
  const allFields = modules.flatMap((m) => m.fields.filter((f) => f.envKey));

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-between w-full text-left focus:outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
              <Key size={18} weight="regular" className="text-gray-500" />
            </div>
            <div>
              <CardTitle className="font-headline text-sm text-charcoal">Environment Variables Reference</CardTitle>
              <CardDescription className="font-sans text-xs text-gray-400">
                Copy these into your <code className="font-mono text-[10px]">.env</code> file or deployment platform secrets.
              </CardDescription>
            </div>
          </div>
          <span className={`text-gray-400 text-xs transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
        </button>
      </CardHeader>

      {open && (
        <CardContent className="pt-0">
          <div className="rounded-xl border border-gray-100 bg-gray-50 overflow-hidden">
            <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Variable Name → Module → Description</span>
            </div>
            <div className="divide-y divide-gray-100 max-h-[420px] overflow-y-auto">
              {allFields.map((f) => (
                <div key={f.envKey} className="flex items-start gap-3 px-4 py-2.5 hover:bg-white transition-colors">
                  <code className="font-mono text-[10px] text-charcoal flex-shrink-0 w-56 truncate select-all">{f.envKey}</code>
                  <span className="font-sans text-[10px] text-gray-500 leading-relaxed">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <p className="font-sans text-[11px] text-amber-700 leading-relaxed">
              <strong>Production tip:</strong> Variables prefixed <code className="font-mono text-[10px]">VITE_</code> are embedded in the client bundle at build time. All others should be server-side only and managed via your hosting platform's secrets manager (Vercel, Netlify, Railway, etc.).
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PANEL
═══════════════════════════════════════════════════════════ */
export default function IntegrationsPanel() {
  const [state, setState] = useState<PanelState>(() => loadState(MODULES));
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<"all" | "enabled" | "unconfigured">("all");

  const toggle = (id: string) => {
    setState((p) => {
      const next = { ...p, [id]: { ...p[id], enabled: !p[id].enabled } };
      persistState(next);
      return next;
    });
  };

  const change = (id: string, key: string, value: string) => {
    setState((p) => ({ ...p, [id]: { ...p[id], values: { ...p[id].values, [key]: value } } }));
  };

  const save = (id: string) => {
    setState((curr) => {
      persistState(curr);
      return curr;
    });
    setSaved((p) => ({ ...p, [id]: true }));
    setTimeout(() => setSaved((p) => ({ ...p, [id]: false })), 2500);
  };

  const enabledCount = MODULES.filter((m) => state[m.id]?.enabled).length;

  const filteredModules = MODULES.filter((m) => {
    if (filter === "enabled") return state[m.id]?.enabled;
    if (filter === "unconfigured") {
      const hasValues = m.fields.some((f) => !!state[m.id]?.values[f.key]);
      return !hasValues;
    }
    return true;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-headline font-bold text-2xl text-charcoal">Integrations</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Configure all external services. Enable and fill in credentials after deployment — nothing connects until you save real keys.
        </p>
      </div>

      {/* Deployment readiness banner */}
      <div className="mb-6 p-4 rounded-xl bg-charcoal border border-charcoal/80 flex items-start gap-3">
        <CloudArrowUp size={20} className="text-gold flex-shrink-0 mt-0.5" weight="regular" />
        <div>
          <p className="font-headline text-sm font-semibold text-white">Ready for Post-Deployment Configuration</p>
          <p className="font-sans text-[11px] text-white/60 mt-0.5 leading-relaxed">
            All modules are scaffolded and waiting. Deploy the app, then return here to paste your real API keys and save. No external calls are made until credentials are set and the module is enabled.
          </p>
        </div>
      </div>

      {/* Status strip */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className="font-mono text-[10px] text-gray-400">{enabledCount}/{MODULES.length} enabled</span>
        <span className="w-px h-3 bg-gray-200 mx-1" />
        {MODULES.map((m) => {
          const on = state[m.id]?.enabled;
          const configured = m.fields.some((f) => !!state[m.id]?.values[f.key]);
          return (
            <span
              key={m.id}
              className={`flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
                on && configured ? "border-green-200 bg-green-50 text-green-700"
                : on ? "border-amber-200 bg-amber-50 text-amber-600"
                : "border-gray-200 bg-gray-50 text-gray-400"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${on && configured ? "bg-green-500" : on ? "bg-amber-400" : "bg-gray-300"}`} />
              {m.label}
            </span>
          );
        })}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-5">
        <Funnel size={13} className="text-gray-400" />
        {(["all", "enabled", "unconfigured"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`font-mono text-[10px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer focus:outline-none capitalize ${filter === f ? "border-charcoal bg-charcoal text-white" : "border-gray-200 text-gray-500 hover:border-charcoal"}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Module cards */}
      <div className="flex flex-col gap-4">
        {filteredModules.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            state={state[m.id] ?? { enabled: m.enabled, values: {} }}
            onChange={(key, val) => change(m.id, key, val)}
            onToggle={() => toggle(m.id)}
            onSave={() => save(m.id)}
            saved={!!saved[m.id]}
          />
        ))}
        <WebhooksModule />
        <EnvVarsReference modules={MODULES} />
      </div>

      {/* Footer note */}
      <div className="mt-6 flex items-start gap-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
        <WarningCircle size={13} className="text-amber-500 mt-0.5 flex-shrink-0" weight="fill" />
        <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
          All credentials entered here are stored in localStorage for convenience during development. <strong>In production</strong>, move secrets to your deployment platform's environment variable manager. The env variable names shown in each field are the exact keys your app will read at runtime.
        </p>
      </div>
    </div>
  );
}
