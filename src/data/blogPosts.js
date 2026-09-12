// src/data/blogPosts.js
//
// Single source of truth for blog content. Blog.jsx (the index/listing
// page) and BlogPost.jsx (the individual post page) both import POSTS
// from here — add a new post by adding a new object to this array,
// nothing else needs to change for it to show up and be readable at
// /blog/:id.
//
// `content` is a list of blocks rendered in order on the post page.
// Supported block types for now: "paragraph" and "heading".

export const POSTS = [
  {
    id: "product-photography-sales",
    category: "Marketing",
    title:
      "Why your product photos are losing you sales (even when the product isn't the problem)",
    excerpt:
      "Two clients selling near-identical products saw wildly different conversion rates. The only real difference was what people saw before they scrolled past.",
    date: "Sep 10, 2026",
    readTime: "5 min",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "When a client asks us why people aren't buying, the conversation almost always jumps straight to pricing, targeting, or the product itself. Photos rarely come up — even though they're usually the first thing anyone sees, and the thing that decides whether a scroll stops or keeps going.",
      },
      {
        type: "heading",
        text: "The comparison that made it obvious",
      },
      {
        type: "paragraph",
        text: "We had two furniture clients selling in a similar price range around the same time. One was shooting product shots on a phone in a dim showroom corner. The other invested in a proper shoot — even lighting, consistent background, a couple of angles per piece. Same product quality, same rough audience size, and a noticeably different add-to-cart rate.",
      },
      {
        type: "heading",
        text: "What actually changed",
      },
      {
        type: "paragraph",
        text: "Nothing dramatic. A clean, consistent background across the catalog so the eye isn't adjusting to a new setting every scroll. One close-up detail shot per item — stitching, texture, hardware — because that's usually what a customer is trying to judge and can't from a single wide shot. And one lifestyle shot showing the piece in a room, which did more for the higher-ticket items than any spec sheet.",
      },
      {
        type: "heading",
        text: "Where we'd tell you to save money instead",
      },
      {
        type: "paragraph",
        text: "Not every catalog needs a full studio day. If you're selling lower-ticket items with fast turnover, a decent phone camera, a cheap lighting kit, and consistency across shots will get you most of the way there. Where we push clients to actually invest is anything above a certain price point, anything where texture or craftsmanship is the selling point, or a hero handful of bestsellers that carry the rest of the catalog's credibility.",
      },
    ],
  },
  {
    id: "social-media-strategy-beyond-posting",
    category: "Marketing",
    title:
      "Posting every day isn't a social media strategy — here's what actually moves the needle",
    excerpt:
      "Clients come to us already posting daily and still not growing. The problem usually isn't the frequency.",
    date: "Sep 3, 2026",
    readTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "Most social media audits we run start the same way: a client who's been posting daily for months, sometimes years, with a follower count and engagement rate that hasn't moved much. The instinct is always to post more. That's rarely the fix.",
      },
      {
        type: "heading",
        text: "The habit we had to break first",
      },
      {
        type: "paragraph",
        text: "Consistency gets mistaken for strategy. A content calendar full every day looks productive, but when we pull the actual grid, it's often a mix of generic reels, festival greetings, and quote graphics with no thread connecting them — nothing that tells a new visitor what the business actually does or why they should stick around.",
      },
      {
        type: "heading",
        text: "What we replace it with",
      },
      {
        type: "paragraph",
        text: "Three or four content pillars tied directly to what the business sells or wants to be known for, then batching a week of content around those pillars instead of scrambling daily. For a skincare client, that meant cutting from seven posts a week down to four, with every single one tied to either a product benefit, a customer result, or a behind-the-scenes moment — nothing filler.",
      },
      {
        type: "heading",
        text: "The metric that mattered more than followers",
      },
      {
        type: "paragraph",
        text: "For that same client, we stopped reporting follower growth as the headline number and started tracking saves, shares, and DMs asking about products. Follower count barely moved in the first two months. DM inquiries roughly doubled — which is the number that actually turns into revenue.",
      },
      {
        type: "paragraph",
        text: "One honest caveat: this doesn't mean fewer posts is always better. It means every post should be doing a job. If you can't say what job a post is doing before you publish it, that's the one to cut.",
      },
    ],
  },
  {
    id: "meta-vs-google-ads-first",
    category: "Growth",
    title: "Meta Ads vs Google Ads: which should you run first?",
    excerpt:
      "A fixed first-month budget and no clear answer online. Here's how we actually decide with clients.",
    date: "Aug 27, 2026",
    readTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "This is one of the first questions almost every new client asks, usually with a fixed budget and pressure to not waste it. The honest answer is that it depends on what your customer is doing right before they'd buy from you — not on which platform is generically 'better'.",
      },
      {
        type: "heading",
        text: "When Google wins",
      },
      {
        type: "paragraph",
        text: "If people already know they need what you sell and are actively typing it into a search bar — a plumber, a lawyer, a specific product model — Google Ads puts you in front of that intent directly. You're not creating demand, you're capturing it at the exact moment someone's looking.",
      },
      {
        type: "heading",
        text: "When Meta wins",
      },
      {
        type: "paragraph",
        text: "If you're a newer brand, or selling something visual and impulse-driven that nobody's actively searching for yet, Meta is usually the better starting point. Nobody is googling a saree brand they've never heard of — but a well-shot ad in their feed can introduce them to it.",
      },
      {
        type: "heading",
        text: "What we actually recommend most often",
      },
      {
        type: "paragraph",
        text: "Start with whichever channel matches how your current customers actually find you — check your existing traffic and referral sources before assuming. Run that one alone for the first few weeks with enough budget to get a real read, then add the second channel once you have data to justify splitting the spend, rather than dividing a small budget across both from day one and getting weak signal on either.",
      },
      {
        type: "paragraph",
        text: "The one thing we'd flag regardless of platform: below a certain daily spend, neither platform's algorithm has enough data to optimize properly. Underfunding both channels at once is usually worse than fully funding one.",
      },
    ],
  },
  {
    id: "custom-app-vs-better-website",
    category: "Development",
    title: "Do you actually need a custom app, or just a better website?",
    excerpt:
      "Plenty of founders come to us wanting an app because a competitor has one. That's rarely a good enough reason on its own.",
    date: "Aug 20, 2026",
    readTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "A good number of the app conversations we have start the same way: a founder wants one because it feels like the next serious step, or because a competitor launched one first. Neither is a reason to build one on its own — an app is a bigger, more expensive commitment than most people expect going in.",
      },
      {
        type: "heading",
        text: "The questions we ask before agreeing to build one",
      },
      {
        type: "paragraph",
        text: "Does this need push notifications people will actually want? Offline access? A device feature like the camera or GPS baked into the core flow? And will someone realistically open this multiple times a week — not once, out of curiosity, and never again? If the honest answer to most of these is no, an app usually isn't the right first move.",
      },
      {
        type: "heading",
        text: "Where a better website wins",
      },
      {
        type: "paragraph",
        text: "A well-built, mobile-first website shows up in search, doesn't ask anyone to clear storage space or sit through an app store download, and lets us push changes instantly instead of waiting on app store review cycles. For most service businesses and even a lot of e-commerce, that's the better bet — and it's a fraction of the cost.",
      },
      {
        type: "heading",
        text: "When we do build the app",
      },
      {
        type: "paragraph",
        text: "The clients where it genuinely pays off are usually running something with real repeat, frequent use built into the model — logistics tracking, appointment-heavy service businesses, loyalty programs people check weekly. There, the app isn't a nice-to-have layer on top of the website, it's doing something the website structurally can't.",
      },
      {
        type: "paragraph",
        text: "If you're not sure which camp you're in, that's usually the first conversation worth having before any development starts.",
      },
    ],
  },
  {
    id: "whatsapp-conversion-channel",
    category: "Marketing",
    title:
      "WhatsApp is quietly becoming India's highest-converting sales channel",
    excerpt:
      "Open rates on email keep sliding. Here's what we've learned running WhatsApp campaigns for a dozen local businesses this year.",
    date: "Aug 14, 2026",
    readTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "Somewhere around the third client this year, we stopped treating WhatsApp as a support channel and started treating it as a sales channel. The numbers made the decision for us — open rates sitting north of 80% while the same client's email list was struggling to clear 20%.",
      },
      {
        type: "heading",
        text: "Why it's converting better",
      },
      {
        type: "paragraph",
        text: "It's not that WhatsApp copy is smarter than email copy. It's that a WhatsApp message shows up in the same place as a message from someone's mother, their boss, and their group chat — so it gets opened out of habit, not out of a decision to check inbox. Email has to fight for that decision every single time.",
      },
      {
        type: "paragraph",
        text: "For one client running a furniture business out of two showrooms, we set up automated catalog messages that triggered when a customer browsed a category on the website but didn't buy. Reply rate on those was higher than their entire email nurture sequence had ever pulled in a month.",
      },
      {
        type: "heading",
        text: "Where it still needs a human",
      },
      {
        type: "paragraph",
        text: "Automation gets someone to reply. It doesn't close the sale by itself — not yet, and we're skeptical it ever fully will for anything above a certain price point. The businesses seeing the best results are the ones where automation handles the first response and a real person takes over the moment the conversation gets specific.",
      },
      {
        type: "paragraph",
        text: "If you're weighing whether to build this out, the honest advice is: start with one flow — abandoned cart, post-purchase follow-up, whatever your biggest drop-off point is — and measure it against what you're currently doing before touching anything else.",
      },
    ],
  },
  {
    id: "podcast-studio-local-businesses",
    category: "Growth",
    title:
      "We built a podcast studio for local businesses — here's who actually uses it",
    excerpt:
      "We expected mostly one-off interview shoots. The clients who got the most out of it were doing something else entirely.",
    date: "Aug 6, 2026",
    readTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "When we set up the podcast studio, we assumed most bookings would be exactly what the name suggests — a host, a guest, a mic each, a one-off conversation. That's part of it. It's not the part that's kept people coming back.",
      },
      {
        type: "heading",
        text: "Who actually walked in",
      },
      {
        type: "paragraph",
        text: "Real estate agents recording monthly market updates. Coaches and consultants recording client testimonial interviews they'd otherwise have grabbed on a shaky phone call. A recruiter running a short interview series with hiring managers to build credibility before ever pitching a role. None of these people think of themselves as podcasters — they think of themselves as businesses that need to look and sound credible on camera.",
      },
      {
        type: "heading",
        text: "What surprised us",
      },
      {
        type: "paragraph",
        text: "The single biggest value for most clients wasn't the finished long-form episode — it was the raw footage. A 30-minute recording gets cut into six or seven short clips for Instagram and LinkedIn, which is genuinely where most of the reach ends up coming from. The 'podcast' is often the byproduct, not the point.",
      },
      {
        type: "heading",
        text: "Who it's not for",
      },
      {
        type: "paragraph",
        text: "If you're booking it for a single, one-off video and have no plan to come back, you're probably better off with a simpler shoot — the studio setup pays off once you're committing to a recurring series, because that's when the clip-repurposing math actually adds up. We tell prospective clients this upfront, even though it means talking some of them out of the bigger booking.",
      },
    ],
  },
  {
    id: "lead-gen-funnel-worth-copying",
    category: "Growth",
    title: "The lead-gen funnel we'd actually recommend to a friend",
    excerpt:
      "No 40-step automation. Three touchpoints, one clear offer, and a follow-up that doesn't sound like a robot.",
    date: "Jul 22, 2026",
    readTime: "7 min",
    content: [
      {
        type: "paragraph",
        text: "Most lead-gen funnels we're asked to fix aren't broken because they're missing something — they're broken because they have too much in them. Twelve-email sequences where the offer changes every other email. Landing pages trying to speak to five different audiences at once.",
      },
      {
        type: "heading",
        text: "The version we actually use",
      },
      {
        type: "paragraph",
        text: "One offer, three touchpoints: an ad or post that states the offer plainly, a landing page that repeats it without adding new ones, and a single follow-up message for anyone who didn't convert the first time. That's it. No drip campaign running for three weeks in the background.",
      },
      {
        type: "paragraph",
        text: "For a client in the events space, cutting their sequence from nine emails down to this exact structure raised their conversion rate on the landing page by roughly a third — not because the shorter version was more persuasive, but because it stopped diluting the one thing they were actually good at explaining.",
      },
      {
        type: "heading",
        text: "When you actually need more steps",
      },
      {
        type: "paragraph",
        text: "This isn't a universal rule. High-ticket B2B sales with a long consideration cycle genuinely need more touchpoints — a single follow-up isn't going to move a six-figure decision. The mistake is applying that same complexity to a lead magnet that should convert in one sitting.",
      },
    ],
  },
  {
    id: "graphic-design-vs-canva",
    category: "Marketing",
    title:
      '"Can\'t I just use Canva?" — what we tell clients before they hire a designer',
    excerpt:
      "It's the most common pushback we get on a design retainer, and honestly, the answer isn't always no.",
    date: "Jul 15, 2026",
    readTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "It comes up in almost every first design conversation: 'can't I just use Canva for this?' We'd rather answer that honestly than pitch around it, because sometimes the answer really is yes.",
      },
      {
        type: "heading",
        text: "Where Canva is genuinely fine",
      },
      {
        type: "paragraph",
        text: "Quick internal announcements, a simple festival greeting, a one-off social post that doesn't need to carry brand weight — there's no shame in reaching for a template for any of that. We'd never charge a client a designer's time for it.",
      },
      {
        type: "heading",
        text: "Where it starts costing you",
      },
      {
        type: "paragraph",
        text: "The problem shows up slowly. Templates get reused across thousands of businesses, so a brand built entirely on them starts blending into a wall of near-identical competitors. And once more than one person on a team is designing without a shared system, consistency breaks down fast — different fonts, different spacing, a logo placed a different way in every post.",
      },
      {
        type: "heading",
        text: "The actual value a designer adds",
      },
      {
        type: "paragraph",
        text: "It's rarely the software. It's the decisions — what to leave out, how to build a visual hierarchy that guides the eye, when to break a grid on purpose instead of by accident. That's the part a template can't do for you.",
      },
      {
        type: "paragraph",
        text: "Our honest advice to most early-stage businesses: use Canva until you have a consistent brand system worth protecting, then invest in a designer to build and guard that system. Doing it the other way around usually means paying twice.",
      },
    ],
  },
  {
    id: "google-business-basics",
    category: "Marketing",
    title:
      "Your Google Business listing is doing more selling than your homepage",
    excerpt:
      "A rundown of the five fields that actually move the needle, and the ones you can safely ignore.",
    date: "Jun 28, 2026",
    readTime: "4 min",
    content: [
      {
        type: "paragraph",
        text: "For any business with a physical location, the Google Business listing usually gets seen by more people in a week than the website does in a month. Most owners set it up once and never touch it again.",
      },
      {
        type: "heading",
        text: "The fields that actually matter",
      },
      {
        type: "paragraph",
        text: "Accurate hours, a primary category that matches what you actually do (not the closest-sounding option), recent photos taken by the business rather than customers, a review response rate above 80%, and posts published at least twice a month. That's the list. Everything else is marginal.",
      },
      {
        type: "heading",
        text: "What to stop worrying about",
      },
      {
        type: "paragraph",
        text: "The 'services' and 'products' sections rarely move rankings on their own, and chasing five-star-only reviews by filtering out anything less is a losing game — a listing with a handful of honest 4-star reviews alongside the 5-stars reads as more credible than one that's suspiciously perfect.",
      },
      {
        type: "paragraph",
        text: "If you only have twenty minutes a month for this, spend it responding to reviews and swapping in one new photo. That's consistently where we've seen the clearest return.",
      },
    ],
  },
  {
    id: "case-study-salon-photography-ads",
    category: "Case Studies",
    title:
      "What happened when a salon paired product photography with its ad budget",
    excerpt:
      "Same targeting, same spend, one new set of photos. The cost-per-lead drop told us where the real bottleneck had been all along.",
    date: "Jun 18, 2026",
    readTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "A salon client came to us convinced their Meta ads were a targeting problem. Cost per lead had been climbing for two months despite several rounds of audience adjustments. Before touching targeting again, we looked at what the ads actually looked like — a rotation of rough phone photos taken in-store between appointments.",
      },
      {
        type: "heading",
        text: "What we changed",
      },
      {
        type: "paragraph",
        text: "We ran a single half-day shoot at their space — service shots, a few staff-in-action photos, a couple of clean before-and-afters — and swapped the ad creative rotation with the new set. We deliberately left targeting, budget, and copy untouched, so if anything moved, we'd know exactly why.",
      },
      {
        type: "heading",
        text: "The result",
      },
      {
        type: "paragraph",
        text: "Cost per lead dropped by roughly 30% within the first two weeks on the new creative, and click-through rate nearly doubled on the best-performing new photo compared to the old rotation's top performer.",
      },
      {
        type: "heading",
        text: "Why we think it worked",
      },
      {
        type: "paragraph",
        text: "The audience hadn't gone stale — the creative had. People had simply seen the same handful of photos enough times to stop noticing them. It's a mistake we see constantly: chasing targeting fixes for a problem that's actually sitting in the ad's first three seconds.",
      },
      {
        type: "paragraph",
        text: "Our rule of thumb now, before any client touches their targeting settings: check when the creative was last refreshed first.",
      },
    ],
  },
  {
    id: "nfc-cards-worth-it",
    category: "Development",
    title: "Are NFC business cards actually worth it, or just a gimmick?",
    excerpt:
      "We handed them out for three months and tracked what happened. The answer depends entirely on who you're meeting.",
    date: "Jun 11, 2026",
    readTime: "5 min",
    content: [
      {
        type: "paragraph",
        text: "We were skeptical going in, honestly. An NFC card that opens a contact-sharing page with one tap sounds like a novelty — the kind of thing that gets a reaction at a networking event and then sits in a drawer.",
      },
      {
        type: "heading",
        text: "What we tracked",
      },
      {
        type: "paragraph",
        text: "Over three months of handing them out at trade shows and client meetings, the taps that actually converted into saved contacts or follow-up emails clustered almost entirely around events with younger, more tech-forward attendees. At an industry event with an older crowd, most people asked for a paper card instead.",
      },
      {
        type: "heading",
        text: "The honest verdict",
      },
      {
        type: "paragraph",
        text: "It's not a universal upgrade over paper cards — it's a different tool for a different room. For founders doing a lot of tech-conference or startup-scene networking, it's genuinely useful and the analytics on who tapped and when are a nice bonus. For anyone whose network skews older or more traditional, a good paper card still does the job better.",
      },
      {
        type: "paragraph",
        text: "Our actual recommendation to most clients now: carry both, and let the room decide which one you hand over.",
      },
    ],
  },
  {
    id: "virtual-tour-conversion",
    category: "Growth",
    title: "A 360° virtual tour paid for itself in eleven days",
    excerpt:
      "For one client, at least. Here's the math, and the two situations where we'd tell you to skip it.",
    date: "May 30, 2026",
    readTime: "6 min",
    content: [
      {
        type: "paragraph",
        text: "A client running a banquet hall was losing bookings to a competitor two streets over that had a virtual tour on their listing and they didn't. We shot and published a 360° tour of the space, and started tracking inquiries the day it went live.",
      },
      {
        type: "heading",
        text: "The math",
      },
      {
        type: "paragraph",
        text: "The shoot and setup cost roughly what the venue makes on one mid-sized booking. Within eleven days of the tour going live, three inquiries mentioned the tour specifically as the reason they reached out instead of calling a competing venue first. One of those became a booking. The tour had already paid for itself.",
      },
      {
        type: "heading",
        text: "When we'd tell you to skip it",
      },
      {
        type: "paragraph",
        text: "Two situations, specifically. If your space genuinely doesn't look better in person than in regular photos — a small office, say, with nothing visually distinct — a tour won't add much a good photo set doesn't already cover. And if your sales cycle depends on a phone call or site visit regardless of what people see online, the tour becomes a nice-to-have rather than something that changes outcomes.",
      },
      {
        type: "paragraph",
        text: "For anything space-dependent — venues, showrooms, clinics, real estate — it's one of the higher-return investments we recommend, and it usually doesn't take long to see why.",
      },
    ],
  },
];
