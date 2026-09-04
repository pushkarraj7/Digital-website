// Services are grouped into four categories that mirror the hero's
// narrative (Attention -> Strategy -> Creation -> Distribution -> Conversion).
// Angles are laid out around a circle in ServicesExperience.jsx using `angle`.

export const SERVICE_CATEGORIES = [
  {
    id: 'strategy',
    label: 'Strategy',
    services: [
      {
        id: 'seo',
        name: 'SEO',
        line: 'Build visibility that compounds.',
        detail:
          'Technical, content and authority work that moves you up rankings that matter and keeps you there.',
        outcome: 'Organic traffic that keeps paying off long after the campaign ends.',
      },
      {
        id: 'paid-ads',
        name: 'Paid Advertising',
        line: 'Put the right message in front of the right audience.',
        detail:
          'Search, social and programmatic campaigns built around intent, not impressions.',
        outcome: 'Lower acquisition cost and a media budget that earns its keep.',
      },
      {
        id: 'lead-gen',
        name: 'Lead Generation',
        line: 'Turn interest into a pipeline.',
        detail: 'Funnels, landing experiences and offers engineered to convert curiosity into contact.',
        outcome: 'A steady stream of qualified leads your sales team wants to talk to.',
      },
    ],
  },
  {
    id: 'brand',
    label: 'Brand',
    services: [
      {
        id: 'branding',
        name: 'Branding',
        line: 'Give the business a voice worth remembering.',
        detail: 'Identity systems, positioning and verbal tone that hold up across every touchpoint.',
        outcome: 'A brand people recognise before they read the name.',
      },
      {
        id: 'graphic-design',
        name: 'Creative Graphic Design',
        line: 'Make attention easy to earn.',
        detail: 'Campaign creative, social assets and print-ready design built for how people actually scroll.',
        outcome: 'Visuals that stop the scroll instead of blending into it.',
      },
      {
        id: 'promotions',
        name: 'Brand & Online Promotions',
        line: 'Turn a launch into a moment.',
        detail: 'Promotional campaigns and partnerships that get a brand talked about, not just seen.',
        outcome: 'Reach that spreads past the audience you paid to reach.',
      },
    ],
  },
  {
    id: 'digital',
    label: 'Digital',
    services: [
      {
        id: 'web-dev',
        name: 'Web Development',
        line: 'Turn attention into an experience built to convert.',
        detail: 'Fast, modern websites and product builds designed around how customers decide.',
        outcome: 'A site that closes the sale your marketing already earned.',
      },
      {
        id: 'content',
        name: 'Content Marketing',
        line: 'Say something worth reading.',
        detail: 'Editorial, video and social content built around real audience questions.',
        outcome: 'An audience that trusts you before they ever speak to sales.',
      },
      {
        id: 'social',
        name: 'Social Media Marketing',
        line: 'Show up like a brand people follow.',
        detail: 'Channel strategy, content calendars and community management with a point of view.',
        outcome: 'A following that engages, not one that just watches.',
      },
    ],
  },
  {
    id: 'experience',
    label: 'Experience',
    services: [
      {
        id: 'virtual-tours',
        name: 'Google 360 Virtual Tours',
        line: 'Let customers walk in before they visit.',
        detail: 'Immersive 360 tours for hospitality, real estate and retail spaces, built for Google Maps.',
        outcome: 'More confident visitors and fewer wasted trips.',
      },
    ],
  },
];