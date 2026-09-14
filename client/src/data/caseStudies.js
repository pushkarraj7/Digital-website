// Demo case studies — fictional clients, written to read like real project
// summaries. Swap these for actual client work once available; keep the
// same shape (slug, name, industry, result, summary, stats, sections) so
// WorkShowcase and CaseStudy don't need structural changes later.

export const CASE_STUDIES = [
  {
    slug: "solace-clinics",
    name: "Solace Clinics",
    industry: "Healthcare",
    accent: "#22d3ee",
    result: "Appointment bookings up 3.2x in five months",
    summary:
      "Solace ran four clinics across the city but their online presence looked like one — patients couldn't tell which location was closest, and most bookings still came in over the phone.",
    challenge:
      "Solace had decent foot traffic at their physical locations but almost no digital footprint worth mentioning. Their Google Business listings were unclaimed or outdated, there was no consistent way for a patient to book online, and each clinic manager was posting to social media whenever they remembered to, with no shared plan.",
    approach:
      "We started by claiming and rebuilding all four Google Business profiles, then built a simple booking flow that routed patients to the nearest clinic automatically. On top of that, we set up a WhatsApp line for appointment reminders and quick questions, since that's genuinely how most of their patients preferred to communicate.",
    outcome:
      "Within five months, online bookings had overtaken phone bookings for the first time, and no-show rates dropped noticeably once automated WhatsApp reminders went live. The clinics also started showing up in local map searches they'd never ranked for before.",
    stats: [
      { label: "Booking increase", value: "3.2x" },
      { label: "No-show reduction", value: "41%" },
      { label: "Timeframe", value: "5 months" },
    ],
    tags: ["Digital Marketing", "Lead Generation", "WhatsApp Marketing"],
  },
  {
    slug: "northfield-realty",
    name: "Northfield Realty",
    industry: "Real Estate",
    accent: "#a78bfa",
    result: "Property inquiries doubled after launching virtual tours",
    summary:
      "Northfield was losing serious buyers to competitors who could show a property without requiring an in-person visit first — especially frustrating for out-of-city buyers.",
    challenge:
      "Photos alone weren't cutting it anymore. Buyers wanted to walk through a space before deciding whether a site visit was even worth their time, and Northfield had no way to offer that.",
    approach:
      "We shot and produced 360° virtual tours for their active listings and embedded them directly into a redesigned property page, alongside a cleaner inquiry form that captured what buyers actually cared about — budget range, move-in timeline, and preferred contact method.",
    outcome:
      "Listings with a virtual tour attached got meaningfully more time-on-page and more inquiries than listings without one. Out-of-city inquiries, which had barely existed before, became a regular part of their pipeline.",
    stats: [
      { label: "Inquiry increase", value: "2.1x" },
      { label: "Avg. time on listing", value: "+64%" },
      { label: "Timeframe", value: "3 months" },
    ],
    tags: ["Property 360 Virtual Tour", "Web Design", "Lead Generation"],
  },
  {
    slug: "kindra-foods",
    name: "Kindra Foods",
    industry: "D2C / Food & Beverage",
    accent: "#f472b6",
    result: "Ad spend down 28%, orders up regardless",
    summary:
      "Kindra had been running ads for over a year with no one really tracking what was working, so budget kept going to whatever channel felt busiest, not whatever was actually converting.",
    challenge:
      "Their ad accounts had years of history but no clean tracking setup, which meant they couldn't say with any confidence which campaigns, audiences, or creatives were driving actual orders versus just clicks.",
    approach:
      "We rebuilt their tracking from the ground up, killed three campaigns that had been quietly burning budget for months, and reallocated spend toward the two audience segments that were actually converting. Creative got refreshed to match what was working, not what looked nicest.",
    outcome:
      "Total ad spend dropped by over a quarter while order volume held steady and then grew — meaning the same budget was simply working harder. Kindra's team also finally had a dashboard they trusted enough to make weekly decisions from.",
    stats: [
      { label: "Ad spend reduction", value: "28%" },
      { label: "Order volume", value: "+15%" },
      { label: "Timeframe", value: "4 months" },
    ],
    tags: ["Online Advertise Campaign", "Lead Generation Program"],
  },
  {
    slug: "vantree-logistics",
    name: "Vantree Logistics",
    industry: "Logistics / B2B",
    accent: "#34d399",
    result: "Custom dispatch software cut manual scheduling by 70%",
    summary:
      "Vantree was still scheduling deliveries through a shared spreadsheet and a lot of phone calls, which worked fine at their old size and completely broke down as they grew.",
    challenge:
      "Dispatchers were manually cross-checking driver availability, vehicle capacity, and delivery windows every morning — a process prone to errors that got worse every time they added a new route or driver.",
    approach:
      "We built a custom dispatch and scheduling application tailored to how Vantree actually operates, not a generic off-the-shelf tool. It auto-assigns routes based on driver location and capacity, flags conflicts before they happen, and gives dispatchers a live view instead of a spreadsheet that's out of date by lunchtime.",
    outcome:
      "Manual scheduling work dropped dramatically, freeing up two dispatchers to take on route-planning work that actually needed a human. Vantree has since added the tool to their driver-facing app as well.",
    stats: [
      { label: "Manual work reduced", value: "70%" },
      { label: "Scheduling errors", value: "-85%" },
      { label: "Timeframe", value: "6 months" },
    ],
    tags: ["Software Development", "Application Development"],
  },
];
