import { fallbackProjects } from "./defaultProjects.js";

const LOCAL_DEVELOPMENT_SITE_URL = "http://localhost:5173";

export const primaryNavigationLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export const footerCompanyLinks = [
  { name: "About Us", href: "#about" },
  { name: "Our Team", href: "#team" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
];

export const footerSupportLinks = [
  { name: "Contact Us", href: "#contact" },
  { name: "Start a Project", href: "#contact" },
];

export const aboutHighlights = [
  {
    iconKey: "rocket",
    title: "Innovation",
    description:
      "We stay ahead with modern tooling, motion, and maintainable architecture.",
  },
  {
    iconKey: "lightbulb",
    title: "Creativity",
    description:
      "Each build is tailored to the brand, goals, and conversion flow of the client.",
  },
  {
    iconKey: "users",
    title: "Collaboration",
    description:
      "We work closely with clients from planning and prototyping through launch.",
  },
  {
    iconKey: "award",
    title: "Excellence",
    description:
      "We focus on quality, performance, and polish across every screen size.",
  },
];

export const serviceCatalog = [
  {
    iconKey: "code",
    title: "Websites & Web Apps",
    description:
      "Custom business websites, landing pages, and scalable web apps built for performance, usability, and growth.",
  },
  {
    iconKey: "smartphone",
    title: "Mobile Apps",
    description:
      "Custom mobile apps built for speed, usability, and seamless experiences across iOS and Android.",
  },
  {
    iconKey: "cpu",
    title: "AI Automation",
    description:
      "AI-powered automation solutions that streamline workflows, reduce manual tasks, and improve efficiency.",
  },
];

export const teamMembers = [
  { name: "Mohammad Alsaadi", role: "CEO & Founder" },
  { name: "Ali Hamdan", role: "CTO & Co-Founder" },
  { name: "Sarah Smadi", role: "Lead Designer" },
  { name: "Ahmad Hmoudah", role: "Full Stack Developer" },
  { name: "Mohammad Nairokh", role: "Frontend Developer" },
  { name: "Suhaip Abu-Zaineh", role: "Backend Developer" },
  { name: "Ahmad Emad", role: "UI/UX Designer" },
  { name: "Kinda Mohammad", role: "DevOps Engineer" },
];

export const socialProfiles = [
  {
    iconKey: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/vtc.web",
  },
  {
    iconKey: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61581585685459",
  },
];

export const siteConfig = {
  name: "VTC",
  legalName: "VTC Digital Solutions",
  shortName: "VTC",
  titleTemplate: "%s | VTC",
  defaultTitle: "VTC | Digital Solutions Agency",
  description:
    "VTC is a digital solutions agency providing custom websites, mobile apps, and AI automation built for performance, growth, and conversion.",
  heroTitle: "Digital Solutions Agency",
  heroSubtitle:
    "Websites, Mobile Apps, and AI Automation Built for Growth",
  heroDescription:
    "We design and build custom websites, mobile applications, and AI automation solutions that look polished, perform fast, and help businesses grow.",
  aboutSummary:
    "VTC is a digital solutions agency focused on websites, mobile apps, and AI automation that help modern brands grow faster and operate more efficiently.",
  portfolioSummary:
    "Recent work across e-commerce, SaaS, healthcare, wellness, and service businesses built with performance and presentation in mind.",
  contactHeading: "Let's Build Something Amazing",
  contactDescription:
    "Share your goals and we will help plan the right website, mobile app, or AI automation solution for your business.",
  locale: "en_US",
  language: "en",
  themeColor: "#0A0F1E",
  keywords: [
    "digital solutions agency",
    "website development",
    "mobile app development",
    "AI automation",
    "custom websites",
    "business websites",
    "web apps",
    "digital transformation",
  ],
  contact: {
    email: "vtc.web.co@gmail.com",
    phone: "0790191440",
    phoneHref: "tel:0790191440",
    locationLabel: "Remote-first team serving clients worldwide",
  },
  images: {
    logo: "/images/logo.png",
    og: "/images/logo.png",
  },
  robots: {
    default:
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    private:
      "noindex, nofollow, noarchive, nosnippet, noimageindex, max-image-preview:none",
  },
};

export const crawlableRoutes = [
  {
    path: "/",
    changefreq: "weekly",
    priority: "1.0",
  },
];

export const blockedRoutes = ["/dashboard"];

const processEnv = globalThis.process?.env ?? {};

const buildTimeSiteUrl =
  processEnv.VITE_SITE_URL ||
  processEnv.URL ||
  processEnv.DEPLOY_PRIME_URL ||
  processEnv.RENDER_EXTERNAL_URL ||
  "";

const browserSiteUrl = import.meta.env?.VITE_SITE_URL || "";

export const normalizeSiteUrl = (value) => {
  if (!value) {
    return "";
  }

  const trimmedValue = value.trim();
  const normalizedValue = /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    return new URL(normalizedValue).toString().replace(/\/$/, "");
  } catch {
    return "";
  }
};

export const getSiteUrl = (runtimeOrigin) =>
  normalizeSiteUrl(
    browserSiteUrl ||
      buildTimeSiteUrl ||
      runtimeOrigin ||
      LOCAL_DEVELOPMENT_SITE_URL,
  );

export const getBuildTimeSiteUrl = () => getSiteUrl();

export const resolveAbsoluteUrl = (path, baseUrl) => {
  const siteUrl = getSiteUrl(baseUrl);

  return new URL(path, `${siteUrl}/`).toString();
};

export const seoPages = {
  home: {
    path: "/",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    robots: siteConfig.robots.default,
  },
  dashboard: {
    path: "/dashboard",
    title: "Project Dashboard",
    description:
      "Internal project dashboard for managing VTC portfolio content.",
    robots: siteConfig.robots.private,
  },
};

export const buildOrganizationSchema = (siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteUrl,
  logo: resolveAbsoluteUrl(siteConfig.images.logo, siteUrl),
  image: resolveAbsoluteUrl(siteConfig.images.og, siteUrl),
  description: siteConfig.description,
  email: siteConfig.contact.email,
  telephone: siteConfig.contact.phone,
  sameAs: socialProfiles.map((profile) => profile.href),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      availableLanguage: ["English"],
    },
  ],
  member: teamMembers.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
  })),
});

export const buildWebsiteSchema = (siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteConfig.legalName,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
});

export const buildWebPageSchema = (siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${siteUrl}/#webpage`,
  url: siteUrl,
  name: siteConfig.defaultTitle,
  description: siteConfig.description,
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  primaryImageOfPage: resolveAbsoluteUrl(siteConfig.images.og, siteUrl),
  inLanguage: siteConfig.language,
});

export const buildServicesSchema = (siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#services`,
  name: "VTC Services",
  itemListElement: serviceCatalog.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  })),
});

export const buildProjectsSchema = (siteUrl) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/#projects`,
  name: "Featured Projects",
  itemListElement: fallbackProjects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: resolveAbsoluteUrl(project.thumbnailUrl, siteUrl),
      url: project.liveUrl || resolveAbsoluteUrl("/", siteUrl),
      keywords: project.techStack.join(", "),
    },
  })),
});

export const buildHomeStructuredData = (siteUrl) => [
  buildOrganizationSchema(siteUrl),
  buildWebsiteSchema(siteUrl),
  buildWebPageSchema(siteUrl),
  buildServicesSchema(siteUrl),
  buildProjectsSchema(siteUrl),
];
