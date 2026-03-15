import { useEffect } from 'react';
import {
  buildHomeStructuredData,
  getSiteUrl,
  resolveAbsoluteUrl,
  seoPages,
  siteConfig,
} from '../lib/siteConfig';

const MANAGED_ATTRIBUTE = 'data-seo-managed';

const upsertMetaTag = (attributeName, attributeValue, content) => {
  if (!content) {
    return;
  }

  let metaTag = document.head.querySelector(`meta[${attributeName}="${attributeValue}"]`);

  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeName, attributeValue);
    metaTag.setAttribute(MANAGED_ATTRIBUTE, 'true');
    document.head.appendChild(metaTag);
  }

  metaTag.setAttribute('content', content);
};

const upsertLinkTag = (rel, href, extraAttributes = {}) => {
  if (!href) {
    return;
  }

  let linkTag = document.head.querySelector(`link[rel="${rel}"]`);

  if (!linkTag) {
    linkTag = document.createElement('link');
    linkTag.setAttribute('rel', rel);
    linkTag.setAttribute(MANAGED_ATTRIBUTE, 'true');
    document.head.appendChild(linkTag);
  }

  linkTag.setAttribute('href', href);

  Object.entries(extraAttributes).forEach(([attributeName, value]) => {
    linkTag.setAttribute(attributeName, value);
  });
};

const replaceStructuredData = (structuredData) => {
  document.head
    .querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTRIBUTE}="true"]`)
    .forEach((scriptTag) => {
      scriptTag.remove();
    });

  structuredData.forEach((schema, index) => {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.setAttribute(MANAGED_ATTRIBUTE, 'true');
    scriptTag.setAttribute('data-schema-index', `${index}`);
    scriptTag.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptTag);
  });
};

const SeoHead = ({ pageKey }) => {
  useEffect(() => {
    const pageConfig = seoPages[pageKey] || seoPages.home;
    const siteUrl = getSiteUrl(window.location.origin);
    const pageUrl = resolveAbsoluteUrl(pageConfig.path, siteUrl);
    const imageUrl = resolveAbsoluteUrl(siteConfig.images.og, siteUrl);

    document.documentElement.lang = siteConfig.language;
    document.title = pageConfig.title;

    upsertMetaTag('name', 'description', pageConfig.description);
    upsertMetaTag('name', 'keywords', siteConfig.keywords.join(', '));
    upsertMetaTag('name', 'robots', pageConfig.robots);
    upsertMetaTag('name', 'googlebot', pageConfig.robots);
    upsertMetaTag('name', 'author', siteConfig.legalName);
    upsertMetaTag('name', 'application-name', siteConfig.name);
    upsertMetaTag('name', 'apple-mobile-web-app-title', siteConfig.name);
    upsertMetaTag('name', 'theme-color', siteConfig.themeColor);

    upsertMetaTag('property', 'og:site_name', siteConfig.legalName);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:locale', siteConfig.locale);
    upsertMetaTag('property', 'og:title', pageConfig.title);
    upsertMetaTag('property', 'og:description', pageConfig.description);
    upsertMetaTag('property', 'og:url', pageUrl);
    upsertMetaTag('property', 'og:image', imageUrl);
    upsertMetaTag('property', 'og:image:alt', `${siteConfig.legalName} brand image`);

    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', pageConfig.title);
    upsertMetaTag('name', 'twitter:description', pageConfig.description);
    upsertMetaTag('name', 'twitter:image', imageUrl);

    upsertLinkTag('canonical', pageUrl);
    upsertLinkTag('icon', siteConfig.images.logo, { type: 'image/png' });
    upsertLinkTag('apple-touch-icon', siteConfig.images.logo);
    upsertLinkTag('manifest', '/site.webmanifest');

    replaceStructuredData(pageKey === 'home' ? buildHomeStructuredData(siteUrl) : []);
  }, [pageKey]);

  return null;
};

export default SeoHead;
