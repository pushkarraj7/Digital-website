// Brand + content constants shared across the site.
// Edit copy here rather than inside components where practical.

export const BRAND = {
  name: "MVM Digital",
  tagline: "Turn Attention Into Growth.",
  supporting:
    "We build brands, craft experiences, and shape strategies that do more than get noticed — they get results. Every project we take on is built with one goal: turning attention into real, measurable growth.",
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
            label: "Podcast Studio Space",
            href: "/services/branding/podcast-studio-space",
          },
          {
            label: "Studio Shoot",
            href: "/services/branding/studio-shoot",
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
    groups: [
      {
        title: "Portfolio",
        items: [
          { label: "Software Portfolio", href: "/portfolio/software" },
          {
            label: "Website Portfolio",
            href: "/portfolio/website-development",
          },
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
  void: "#070A10",
  deep: "#0D1220",
  surface: "#11192C",
  brand: "#0C2959",
  brandLight: "#163A73",
  brandDark: "#081A3D",
  electric: "#4E86FF",
  ion: "#7FB4FF",
  aurora: "#7F5FFF",
  coral: "#FF8B6B",
  ink: "#F3F5F9",
  mist: "#8C95A8",
  haze: "#5A6478",
};

// Single accent set — every section should pull colors from here instead
// of inventing its own. This is what makes the site read as one system
// instead of five different card grids with unrelated color choices.
export const ACCENTS = ["#4E86FF", "#7FB4FF", "#7F5FFF", "#FF8B6B"];

// For components needing more than 4 steps (MethodJourney's 6) — still
// built from the same brand hues, varied by shade, not hue-hopping
// across the color wheel like a stock icon pack.
export const ACCENTS_EXTENDED = [
  "#4E86FF", // electric
  "#6C9FFF", // electric, lighter
  "#7FB4FF", // ion
  "#9C7FFF", // aurora, lighter
  "#7F5FFF", // aurora
  "#FF8B6B", // coral
];

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
