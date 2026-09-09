// src/data/graphicDesignProjects.js
//
// Drop-in data source for the GraphicDesignPortfolio page.
// `size` controls the image's aspect ratio in the masonry grid — vary
// these across items so the grid doesn't look like a uniform table.
// Swap image/title/category for real project work.

export const designCategories = ["Branding", "Social Media", "Print", "Packaging"];

export const graphicDesignProjects = [
  {
    slug: "example-brand-identity-1",
    title: "Example Brand Identity",
    category: "Branding",
    size: "aspect-[4/5]",
    image: "/src/assets/hero.png",
  },
  {
    slug: "example-social-campaign-1",
    title: "Example Social Campaign",
    category: "Social Media",
    size: "aspect-square",
    image: "/src/assets/mvm.png",
  },
  {
    slug: "example-brochure-1",
    title: "Example Print Brochure",
    category: "Print",
    size: "aspect-[3/4]",
    image: "/src/assets/mvm.webp",
  },
  {
    slug: "example-product-packaging-1",
    title: "Example Product Packaging",
    category: "Packaging",
    size: "aspect-[4/3]",
    image: "/src/assets/hero.png",
  },
  {
    slug: "example-brand-identity-2",
    title: "Example Logo System",
    category: "Branding",
    size: "aspect-square",
    image: "/src/assets/mvm.png",
  },
  {
    slug: "example-social-campaign-2",
    title: "Example Instagram Series",
    category: "Social Media",
    size: "aspect-[4/5]",
    image: "/src/assets/mvm.webp",
  },
  {
    slug: "example-poster-1",
    title: "Example Event Poster",
    category: "Print",
    size: "aspect-[3/5]",
    image: "/src/assets/hero.png",
  },
  {
    slug: "example-product-packaging-2",
    title: "Example Box Packaging",
    category: "Packaging",
    size: "aspect-[4/5]",
    image: "/src/assets/mvm.png",
  },
  {
    slug: "example-brand-identity-3",
    title: "Example Stationery Set",
    category: "Branding",
    size: "aspect-[3/4]",
    image: "/src/assets/mvm.webp",
  },
  {
    slug: "example-social-campaign-3",
    title: "Example Story Templates",
    category: "Social Media",
    size: "aspect-[4/3]",
    image: "/src/assets/hero.png",
  },
];

export const designStats = {
  value: "150+",
  label: "designs shipped across branding, social, and print",
};