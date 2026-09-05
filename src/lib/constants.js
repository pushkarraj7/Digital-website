// Brand + content constants shared across the site.
// Edit copy here rather than inside components where practical.

export const BRAND = {
  name: "MVM Digital",
  tagline: "Turn Attention Into Growth.",
  supporting:
    "MVM Digital builds brands, experiences and digital strategies that turn attention into measurable business growth.",
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    groups: [
      {
        title: "Digital Marketing",
        items: [
          {
            label: "Social Media Marketing & Management",
            href: "/services/digital-marketing/social-media-marketing-management",
          },
          {
            label: "Google Business Management",
            href: "/services/digital-marketing/google-business-management",
          },
          {
            label: "Lead Generation Program",
            href: "/services/digital-marketing/lead-generation-program",
          },
          {
            label: "Online Advertise Campaign",
            href: "/services/digital-marketing/online-advertise-campaign",
          },
          {
            label: "WhatsApp Marketing",
            href: "/services/digital-marketing/whatsapp-marketing",
          },
        ],
      },
      {
        title: "Branding",
        items: [
          {
            label: "Property 360 Virtual Tour",
            href: "/services/branding/property-360-virtual-tour",
          },
          {
            label: "Google 360 Virtual Tour",
            href: "/services/branding/google-360-virtual-tour",
          },
          {
            label: "Graphic Design and Video Editing",
            href: "/services/branding/graphic-design-and-video-editing",
          },
          {
            label: "Product Photography",
            href: "/services/branding/product-photography",
          },
          {
            label: "Custom NFC Card",
            href: "/services/branding/custom-nfc-card",
          },
        ],
      },
      {
        title: "IT Solution",
        items: [
          {
            label: "Software Development",
            href: "/services/it-solution/software-development",
          },
          {
            label: "Application Development",
            href: "/services/it-solution/application-development",
          },
          {
            label: "Website Design & Development",
            href: "/services/it-solution/website-design-and-development",
          },
        ],
      },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    groups: [
      {
        title: "Portfolio",
        items: [
          { label: "Software Portfolio", href: "/portfolio/software" },
          { label: "Website Portfolio", href: "/portfolio/website" },
          {
            label: "Graphic Design Portfolio",
            href: "/portfolio/graphic-design",
          },
          { label: "Social Media Portfolio", href: "/portfolio/social-media" },
        ],
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const COLORS = {
  void: "#05070B",
  deep: "#0A0F1C",
  surface: "#0D1526",
  brand: "#0C2959",
  brandLight: "#163A73",
  electric: "#4E86FF",
  ion: "#7FB4FF",
  ink: "#F3F5F9",
  mist: "#8C95A8",
};

// Zones referenced by the hero interaction. Order matters: it is the
// narrative order the growth field cycles through when idle.
export const HERO_ZONES = [
  {
    id: "reach",
    label: "Reach",
    chain: ["Attention", "Awareness", "Discovery"],
  },
  {
    id: "engage",
    label: "Engage",
    chain: ["Content", "Story", "Relevance"],
  },
  {
    id: "convert",
    label: "Convert",
    chain: ["Traffic", "Intent", "Action"],
  },
  {
    id: "grow",
    label: "Grow",
    chain: ["Data", "Optimization", "Scale"],
  },
];

export const METHOD_STEPS = [
  {
    index: "01",
    title: "Discover",
    description:
      "Understand the business, the market and where growth is actually being lost.",
  },
  {
    index: "02",
    title: "Position",
    description:
      "Find the opportunity competitors are ignoring and the angle your audience responds to.",
  },
  {
    index: "03",
    title: "Create",
    description:
      "Build the brand, the content and the digital experience around that position.",
  },
  {
    index: "04",
    title: "Activate",
    description:
      "Launch campaigns and content across the channels your audience actually uses.",
  },
  {
    index: "05",
    title: "Optimize",
    description:
      "Learn from real behaviour, not assumptions, and refine what the data shows.",
  },
  {
    index: "06",
    title: "Grow",
    description:
      "Scale the channels, creative and campaigns that are already proven to work.",
  },
];

export const PRINCIPLES = [
  {
    title: "Strategy before execution",
    description: "Every creative decision should have a reason behind it.",
  },
  {
    title: "Design with purpose",
    description: "Beautiful is good. Effective is better.",
  },
  {
    title: "Built around people",
    description: "Technology matters. Human behaviour matters more.",
  },
  {
    title: "Optimize relentlessly",
    description:
      "Launch is not the finish line — it is where the real work starts.",
  },
];
