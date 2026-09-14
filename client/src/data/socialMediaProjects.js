// src/data/socialMediaProjects.js
//
// Drop-in data source for the SocialMediaPortfolio page. Grouped by
// platform since each platform gets its own row/section. `aspect`
// varies per platform to match how content actually looks there —
// Reels are vertical, Instagram/LinkedIn are square-ish.
// Engagement numbers (likes/comments/views/reposts) are placeholders —
// swap for real stats when you have them.

export const socialPlatforms = [
  {
    key: "instagram",
    name: "Instagram",
    icon: "Instagram",
    handle: "@youragency",
    stat: "2.4M+ combined reach",
    aspect: "aspect-square",
    posts: [
      {
        id: "ig-1",
        image: "/src/assets/hero.png",
        caption: "Product launch carousel",
        likes: "1.2k",
        comments: 84,
      },
      {
        id: "ig-2",
        image: "/src/assets/mvm.png",
        caption: "Brand campaign post",
        likes: "3.4k",
        comments: 212,
      },
      {
        id: "ig-3",
        image: "/src/assets/mvm.webp",
        caption: "Behind-the-scenes series",
        likes: "980",
        comments: 46,
      },
      {
        id: "ig-4",
        image: "/src/assets/hero.png",
        caption: "Seasonal promo",
        likes: "2.1k",
        comments: 130,
      },
      {
        id: "ig-5",
        image: "/src/assets/mvm.png",
        caption: "Testimonial highlight",
        likes: "1.5k",
        comments: 61,
      },
    ],
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: "Linkedin",
    handle: "Your Agency",
    stat: "180+ posts, B2B focus",
    aspect: "aspect-[4/3]",
    posts: [
      {
        id: "li-1",
        image: "/src/assets/mvm.webp",
        caption: "Thought leadership carousel",
        reactions: 412,
        comments: 38,
        reposts: 22,
      },
      {
        id: "li-2",
        image: "/src/assets/hero.png",
        caption: "Company milestone post",
        reactions: 890,
        comments: 74,
        reposts: 51,
      },
      {
        id: "li-3",
        image: "/src/assets/mvm.png",
        caption: "Case study breakdown",
        reactions: 305,
        comments: 29,
        reposts: 18,
      },
      {
        id: "li-4",
        image: "/src/assets/mvm.webp",
        caption: "Hiring announcement",
        reactions: 610,
        comments: 92,
        reposts: 40,
      },
    ],
  },
  {
    key: "reels",
    name: "Reels & Shorts",
    icon: "Clapperboard",
    handle: "@youragency",
    stat: "9M+ total views",
    aspect: "aspect-[9/16]",
    posts: [
      {
        id: "rl-1",
        image: "/src/assets/hero.png",
        caption: "Product demo reel",
        views: "1.1M",
        likes: "84k",
      },
      {
        id: "rl-2",
        image: "/src/assets/mvm.png",
        caption: "Trend-format edit",
        views: "640k",
        likes: "52k",
      },
      {
        id: "rl-3",
        image: "/src/assets/mvm.webp",
        caption: "Founder-led short",
        views: "2.3M",
        likes: "190k",
      },
      {
        id: "rl-4",
        image: "/src/assets/hero.png",
        caption: "Tutorial series",
        views: "410k",
        likes: "31k",
      },
      {
        id: "rl-5",
        image: "/src/assets/mvm.png",
        caption: "Event recap reel",
        views: "780k",
        likes: "64k",
      },
    ],
  },
  {
    key: "twitter",
    name: "X / Twitter",
    icon: "Twitter",
    handle: "@youragency",
    stat: "Daily engagement graphics",
    aspect: "aspect-video",
    posts: [
      {
        id: "tw-1",
        image: "/src/assets/mvm.webp",
        caption: "Announcement graphic",
        likes: 340,
        reposts: 62,
        comments: 18,
      },
      {
        id: "tw-2",
        image: "/src/assets/hero.png",
        caption: "Meme-format post",
        likes: 1200,
        reposts: 310,
        comments: 88,
      },
      {
        id: "tw-3",
        image: "/src/assets/mvm.png",
        caption: "Stat card",
        likes: 210,
        reposts: 40,
        comments: 12,
      },
      {
        id: "tw-4",
        image: "/src/assets/mvm.webp",
        caption: "Quote card",
        likes: 560,
        reposts: 95,
        comments: 31,
      },
    ],
  },
];

export const socialStats = {
  value: "12M+",
  label: "impressions generated across managed accounts",
};
