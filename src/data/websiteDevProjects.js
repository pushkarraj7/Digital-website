// src/data/websiteDevProjects.js
//
// Drop-in data source for the WebsiteDevelopmentPortfolio page.
// `type` drives which tint the BrowserFrame + badge use ("wordpress" | "custom").
// Swap image/url/summary for your real projects.

export const websiteDevProjects = [
  {
    slug: "example-wordpress-storefront",
    title: "Example WordPress Storefront",
    type: "wordpress",
    url: "storefront-example.com",
    summary:
      "Custom WordPress theme with a WooCommerce checkout and a page builder the client's own team runs day to day.",
    stack: ["WordPress", "WooCommerce", "PHP", "ACF"],
    image: "/src/assets/hero.png",
  },
  {
    slug: "example-custom-webapp",
    title: "Example Custom Web App",
    type: "custom",
    url: "app-example.com",
    summary:
      "Fully custom-coded marketing site with a React front end and a lightweight PHP API — no CMS underneath.",
    stack: ["React", "Vite", "PHP", "MySQL"],
    image: "/src/assets/mvm.png",
  },
  {
    slug: "example-wordpress-corporate",
    title: "Example Corporate WordPress Site",
    type: "wordpress",
    url: "corporate-example.com",
    summary:
      "Multi-page corporate site on a custom block theme, migrated from a legacy CMS with zero SEO regression.",
    stack: ["WordPress", "Gutenberg", "PHP"],
    image: "/src/assets/mvm.webp",
  },
  {
    slug: "example-custom-dashboard",
    title: "Example Custom Dashboard",
    type: "custom",
    url: "dashboard-example.com",
    summary:
      "Internal analytics dashboard built from scratch, with role-based access and a REST API feeding live data.",
    stack: ["React", "Node.js", "PostgreSQL"],
    image: "/src/assets/hero.png",
  },
  {
    slug: "example-wordpress-blog",
    title: "Example WordPress Publication",
    type: "wordpress",
    url: "publication-example.com",
    summary:
      "High-traffic editorial site on a custom theme, tuned for Core Web Vitals with a headless-style content workflow.",
    stack: ["WordPress", "PHP", "ACF"],
    image: "/src/assets/mvm.png",
  },
  {
    slug: "example-custom-booking",
    title: "Example Custom Booking Platform",
    type: "custom",
    url: "booking-example.com",
    summary:
      "Booking and scheduling platform with real-time availability, custom-built end to end for the client's workflow.",
    stack: ["React", "Vite", "PHP", "MySQL"],
    image: "/src/assets/mvm.webp",
  },
];

export const websiteDevStats = {
  value: "40+",
  label: "sites shipped across WordPress and custom builds",
};
