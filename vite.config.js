import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { siteConfig } from './src/data/siteConfig.js';

// Custom build-time SEO and metadata injection plugin
function injectSeoPlugin() {
  return {
    name: 'html-seo-injection',
    transformIndexHtml(html) {
      const robots = siteConfig.demoMode
        ? '<meta name="robots" content="noindex, nofollow" />'
        : '<meta name="robots" content="index, follow" />';

      const jsonLd = !siteConfig.demoMode ? `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "${siteConfig.name}",
      "description": "${siteConfig.seo.description}",
      "telephone": "${siteConfig.phone}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${siteConfig.address.street}",
        "addressLocality": "${siteConfig.address.city}",
        "addressRegion": "${siteConfig.address.state}",
        "postalCode": "${siteConfig.address.postalCode}",
        "addressCountry": "${siteConfig.address.country}"
      }
    }
    </script>` : '';

      return html
        .replace(/<title>.*?<\/title>/, `<title>${siteConfig.seo.title}</title>`)
        .replace('</head>', `  <meta name="description" content="${siteConfig.seo.description}" />
  ${robots}
  <meta property="og:title" content="${siteConfig.seo.title}" />
  <meta property="og:description" content="${siteConfig.seo.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="${siteConfig.seo.ogImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#0B0C0E" />
  <link rel="preload" href="/assets/hero/hero-01.webp" as="image" type="image/webp" />${jsonLd}
</head>`);
    }
  };
}

export default defineConfig({
  plugins: [react(), injectSeoPlugin()]
});
