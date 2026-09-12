// src/pages/portfolio/SoftwarePortfolio.jsx
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  LayoutDashboard,
  CalendarCheck,
  Users,
  BarChart3,
  ShieldCheck,
  Zap,
  Building2,
  Boxes,
  ClipboardList,
  Workflow,
  Briefcase,
  Cloud,
  Globe,
  MessageCircle,
  Ticket,
  AlertTriangle,
  Target,
} from "lucide-react";
import { GlassPanel } from "../../components/ui/GlassPanel";
import { MagneticButton } from "../../components/ui/MagneticButton";
import { AnimatedCounter } from "../../components/ui/AnimatedCounter";
import { Sparkles, TrendingUp, Layers, MousePointerClick } from "lucide-react";
import { BrandsMarquee } from "../../components/sections/BrandsMarquee";
import { BrowserFrame } from "../../components/ui/BrowserFrame";

const EASE = [0.16, 1, 0.3, 1];
const viewportOnce = { once: true, margin: "-80px" };

// ---- Data -----------------------------------------------------------

const stats = [
  { icon: LayoutDashboard, value: 40, suffix: "+", label: "Screens Designed" },
  { icon: Boxes, value: 12, suffix: "", label: "Core Modules" },
  { icon: ShieldCheck, value: 99, suffix: "%", label: "Uptime" },
  { icon: TrendingUp, value: 3, suffix: "x", label: "Faster Bookings" },
];

const marqueeTags = [
  "CRM Software",
  "SaaS Development",
  "ERP Systems",
  "HRMS Platforms",
  "Business Management Tools",
  "Booking Engines",
  "Inventory Systems",
  "Custom Enterprise Software",
];

// Order matters — it maps 1:1 to the bento grid areas in ModuleShowcase
// (crm, saas, biz, erp, hrms, flow).
const solutions = [
  {
    icon: Users,
    title: "CRM Software",
    slug: "crm",
    dashboardIndex: 0,
    desc: "Track leads, customers, and deals in one pipeline built around how your sales team actually works — not a generic funnel bolted onto a spreadsheet export.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    features: [
      "Lead pipeline with drag-and-drop stages",
      "Full contact & deal activity timeline",
      "Sales rep performance leaderboard",
      "Custom tags, filters & saved views",
      "Automated follow-up reminders so leads don't go cold",
      "Deal value & win-rate tracked per stage",
      "Duplicate contact detection on import",
      "Email & call logging tied to each deal",
      "Quote/proposal generation straight from deal records",
      "Exportable pipeline reports for weekly reviews",
    ],
  },
  {
    icon: Cloud,
    title: "SaaS Product Development",
    slug: "saas",
    dashboardIndex: 3,
    desc: "Multi-tenant, subscription-ready SaaS platforms built to scale from your first paying user to your first thousand without a re-architecture in between.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    features: [
      "Multi-tenant workspace isolation",
      "Subscription billing built in",
      "Per-plan usage limits & metering",
      "White-label domains & branding",
      "Role-based team invites within each workspace",
      "Stripe/Razorpay webhook handling for renewals & failed payments",
      "Feature flags to roll out changes gradually",
      "Usage dashboards tenants can see themselves",
      "API rate limiting per plan tier",
      "Audit logs for account-level changes",
    ],
  },
  {
    icon: Briefcase,
    title: "Business Management Software",
    slug: "business",
    dashboardIndex: 0,
    desc: "Operations, billing, inventory, and staff — unified into a single day-to-day control panel so owners stop switching between four different tools to run one business.",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=900&auto=format&fit=crop",
    features: [
      "Unified billing & invoicing",
      "Live inventory across locations",
      "Staff scheduling & attendance",
      "Owner-level reporting dashboard",
      "Purchase order tracking with vendor history",
      "Expense logging tied to each branch",
      "Low-stock alerts before you run out",
      "Customer ledger with outstanding balances",
      "Daily cash/register reconciliation",
      "Multi-branch access with per-location permissions",
    ],
  },
  {
    icon: Boxes,
    title: "ERP Software",
    slug: "erp",
    dashboardIndex: 3,
    desc: "Connect finance, inventory, procurement, and reporting so every department reads from one source of truth instead of reconciling numbers at month-end.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
    features: [
      "Finance & procurement in one ledger",
      "Real-time inventory sync",
      "Cross-department reporting",
      "Configurable approval workflows",
      "Production/BOM tracking for manufacturing clients",
      "Vendor performance scoring",
      "Multi-currency support for cross-border operations",
      "Budget vs actuals by department",
      "Document attachments on every transaction",
      "Scheduled data exports to your accounting software",
    ],
  },
  {
    icon: ClipboardList,
    title: "HRMS Software",
    slug: "hrms",
    dashboardIndex: 2,
    desc: "Onboarding, attendance, leave, and payroll — automated end-to-end for teams that have outgrown WhatsApp groups and Excel attendance sheets.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop",
    features: [
      "Digital onboarding checklists",
      "Attendance & leave tracking",
      "Automated payroll runs",
      "Employee self-service portal",
      "Document vault for contracts & ID proofs",
      "Performance review cycles with manager sign-off",
      "In-app shift swap requests",
      "Statutory compliance reports (PF, ESI, TDS)",
      "Exit/offboarding workflow with asset return checklist",
      "Org chart that updates automatically with role changes",
    ],
  },
  {
    icon: Workflow,
    title: "Custom Workflow Tools",
    slug: "workflows",
    dashboardIndex: 1,
    desc: "Purpose-built internal tools for the processes off-the-shelf software was never designed for — the stuff you're currently running through spreadsheets and group chats.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
    features: [
      "Built around your exact process",
      "No forced generic templates",
      "Internal tool, external-grade UX",
      "Scales as the process changes",
      "Custom approval chains matching how your team actually signs off",
      "Integrates with tools you already use instead of replacing them",
      "Role-specific views so each team sees only what's relevant",
      "Audit trail for every status change",
      "Notifications routed to Slack/WhatsApp/email by urgency",
      "Documented handoff — not a black box only we understand",
    ],
  },
];

const dashboards = [
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    image:
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A client's support team was manually typing order status into WhatsApp chats all day — 200+ messages, and replies slowed to a crawl the moment two agents went on lunch at the same time.",
    solution:
      "Wired their backend into the WhatsApp Business API so order confirmations, status updates, and payment reminders fire on their own. A human only steps in when a customer types something outside the script.",
    features: [
      { icon: MessageCircle, label: "Automated order & status updates" },
      { icon: Zap, label: "Instant payment reminders" },
      { icon: Workflow, label: "Fallback to live agent on request" },
      { icon: ClipboardList, label: "Message logs tied to customer record" },
      { icon: ShieldCheck, label: "Opt-out handling built in" },
      { icon: BarChart3, label: "Delivery & read-rate tracking" },
    ],
  },
  {
    icon: Ticket,
    title: "Event Management CRM",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "An event company tracked vendor bookings, guest lists, and payment schedules across three spreadsheets that never matched by the time the event actually happened.",
    solution:
      "One CRM record per event ties vendors, RSVPs, seating, and payment milestones together, so anyone on the team can open an event and see exactly what's confirmed and what's still hanging.",
    features: [
      { icon: Ticket, label: "Vendor booking & contracts" },
      { icon: Users, label: "Guest list & RSVP tracking" },
      { icon: ClipboardList, label: "Seating & logistics planner" },
      { icon: Zap, label: "Payment milestone reminders" },
      { icon: Workflow, label: "Run-of-show timeline per event" },
      { icon: BarChart3, label: "Post-event budget summary" },
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Admin Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "An owner told us he was checking four different Google Sheets before his morning coffee just to figure out which branch made money yesterday.",
    solution:
      "Built one screen that pulls revenue, bookings, and staff performance across every branch, so that same check now takes fifteen seconds instead of four tabs.",
    features: [
      { icon: BarChart3, label: "Real-time revenue overview" },
      { icon: Building2, label: "Multi-branch switcher" },
      { icon: ShieldCheck, label: "Role-based access control" },
      { icon: Zap, label: "Instant activity alerts" },
      { icon: Users, label: "Top-performing branch & staff" },
      { icon: ClipboardList, label: "Pending approvals queue" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Insurance Portal",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "Agents were re-entering the same client details into three separate tools — one for quotes, one for issuing policies, one for renewals — and the details drifted apart every time.",
    solution:
      "A single portal where a client record moves from quote to policy to renewal without retyping anything, with renewal reminders that fire 30 days out on their own.",
    features: [
      { icon: ShieldCheck, label: "Quote-to-policy in one record" },
      { icon: Zap, label: "Automated renewal reminders" },
      { icon: ClipboardList, label: "Document uploads per policy" },
      { icon: Users, label: "Agent-wise client portfolio" },
      { icon: BarChart3, label: "Commission & payout tracking" },
      { icon: Building2, label: "Multi-branch agent access" },
    ],
  },
  {
    icon: ClipboardList,
    title: "HRMS",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "Shift swaps at one client ran through a WhatsApp group with 40 people in it, so every swap request got read by 39 people who didn't need to see it.",
    solution:
      "Replaced the group chat with a swap request that goes straight to the manager for approval — nobody else's phone buzzes for it.",
    features: [
      { icon: ClipboardList, label: "Digital onboarding checklists" },
      { icon: CalendarCheck, label: "Attendance & leave tracking" },
      { icon: Briefcase, label: "Automated payroll runs" },
      { icon: Workflow, label: "Shift swap approvals" },
      { icon: Users, label: "Employee self-service portal" },
      { icon: ShieldCheck, label: "Statutory compliance reports" },
    ],
  },
  {
    icon: Boxes,
    title: "ERP",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "A manufacturing client's finance team only found out about inventory shortages when procurement called asking why an order was late — by then it was already a problem.",
    solution:
      "Connected inventory, procurement, and finance into one ledger, so a low-stock trigger reaches procurement before the shortage turns into a missed order.",
    features: [
      { icon: Boxes, label: "Real-time inventory sync" },
      { icon: Briefcase, label: "Finance & procurement in one ledger" },
      { icon: Workflow, label: "Configurable approval workflows" },
      { icon: Globe, label: "Multi-currency support" },
      { icon: BarChart3, label: "Budget vs actuals by department" },
      { icon: ClipboardList, label: "Document attached to every transaction" },
    ],
  },
  {
    icon: Users,
    title: "CRM Portal",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    challenge:
      "Sales reps at a client were logging into a generic CRM that didn't match how their sales process actually worked, so half the pipeline just lived in reps' heads instead of the system.",
    solution:
      "Rebuilt the pipeline stages, tags, and follow-up reminders around their real sales process, so what's in the CRM is what's actually true — not a parallel system reps ignore.",
    features: [
      { icon: Users, label: "Custom pipeline stages" },
      { icon: Workflow, label: "Automated follow-up reminders" },
      { icon: BarChart3, label: "Deal value & win-rate per stage" },
      { icon: ClipboardList, label: "Full contact activity timeline" },
      { icon: Briefcase, label: "Quote generation from deal records" },
      { icon: Zap, label: "Duplicate contact detection" },
    ],
  },
];

// ---- Module Showcase: bento grid that morphs into an app window ------
//
// Each tile represents a real software module. Clicking one doesn't open
// a generic modal — the tile itself grows in place into a browser-chrome
// "window" showing the module's screenshot and feature set, then shrinks
// back to exactly where it came from. The interaction is the showcase.

function ModuleShowcase({ items, dashboards }) {
  const [expanded, setExpanded] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [hoverPos, setHoverPos] = useState(null);
  const [closingIndex, setClosingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const tileRefs = useRef([]);

  const openTile = (i) => {
    const rect = tileRefs.current[i]?.getBoundingClientRect();
    if (!rect) return;
    setOrigin({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
    setActiveTab("overview");
    setExpanded(i);
  };

  const close = () => {
    setClosingIndex(expanded);
    setExpanded(null);
  };

  useEffect(() => {
    if (expanded === null) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [expanded]);

  const active = expanded !== null ? items[expanded] : null;
  const areaClasses = [
    "sw-area-crm",
    "sw-area-saas",
    "sw-area-biz",
    "sw-area-erp",
    "sw-area-hrms",
    "sw-area-flow",
  ];

  return (
    <div className="mt-10">
      <style>{`
        .sw-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(150px, auto);
          grid-template-areas:
            "crm  saas saas biz"
            "erp  saas saas hrms"
            "flow flow flow flow";
          gap: 1rem;
        }
        @media (max-width: 860px) {
          .sw-bento-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "crm"
              "saas"
              "biz"
              "erp"
              "hrms"
              "flow";
          }
        }
        .sw-area-crm  { grid-area: crm; }
        .sw-area-saas { grid-area: saas; min-height: 260px; }
        .sw-area-biz  { grid-area: biz; }
        .sw-area-erp  { grid-area: erp; }
        .sw-area-hrms { grid-area: hrms; }
        .sw-area-flow { grid-area: flow; min-height: 120px; }
      `}</style>

      <div className="sw-bento-grid">
        {items.map(({ icon: Icon, title, desc, image }, i) => {
          const isFeatured = i === 1;
          const isFlow = i === 5;

          const tooltip = hoverPos?.index === i && (
            <span
              className="pointer-events-none absolute z-20 whitespace-nowrap rounded-full border border-ion/20 bg-void/90 px-3 py-1 text-[11px] text-ion shadow-lg backdrop-blur-sm"
              style={{ left: hoverPos.x + 14, top: hoverPos.y + 14 }}
            >
              Click to view more details
            </span>
          );

          const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setHoverPos({
              index: i,
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          };
          const handleMouseLeave = () => setHoverPos(null);

          // ---- Custom Workflow tile: pill shape instead of rectangle ----
          if (isFlow) {
            return (
              <button
                key={title}
                ref={(el) => (tileRefs.current[i] = el)}
                onClick={() => openTile(i)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-haspopup="dialog"
                className={`${areaClasses[i]} group relative flex items-stretch overflow-hidden rounded-2xl border border-ion/10 bg-white/[0.02] text-left transition-colors duration-200 hover:border-ion/30`}
                style={{
                  opacity: expanded === i || closingIndex === i ? 0 : 1,
                  pointerEvents:
                    expanded !== null || closingIndex !== null
                      ? "none"
                      : "auto",
                }}
              >
                {tooltip}

                <div className="flex flex-1 flex-col justify-center gap-3 p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ion/20 bg-void/60">
                      <Icon className="h-5 w-5 text-ion" />
                    </span>
                    <h3 className="font-display text-2xl text-ink">{title}</h3>
                  </div>
                  <p className="max-w-sm text-sm text-mist">
                    Got a process nobody else has software for? We build custom
                    workflow tools too.
                  </p>
                </div>

                <div className="relative hidden w-48 shrink-0 sm:block md:w-64">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/10 to-transparent" />
                </div>

                <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-ion/15 text-ion opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>
            );
          }

          // ---- All other tiles: original rectangle card ----
          return (
            <button
              key={title}
              ref={(el) => (tileRefs.current[i] = el)}
              onClick={() => openTile(i)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              aria-haspopup="dialog"
              className={`${areaClasses[i]} group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ion/10 bg-white/[0.02] p-5 text-left transition-[border-color,opacity] duration-200 hover:border-ion/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ion/60 ${
                isFeatured ? "p-7" : ""
              }`}
              style={{
                opacity: expanded === i || closingIndex === i ? 0 : 1,
                pointerEvents:
                  expanded !== null || closingIndex !== null ? "none" : "auto",
                backgroundImage: `linear-gradient(180deg, rgba(10,10,15,0.35), rgba(10,10,15,0.9)), url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {tooltip}
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ion/20 bg-void/60">
                  <Icon className="h-4 w-4 text-ion" />
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ion/15 text-ion opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>

              <div>
                <h3 className="font-display text-lg text-ink">{title}</h3>
                {isFeatured && (
                  <p className="mt-2 max-w-xs text-sm text-mist">{desc}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence
        onExitComplete={() => {
          setClosingIndex(null);
          setOrigin(null);
        }}
      >
        {active && origin && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-void/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="fixed z-50 flex flex-col overflow-hidden min-h-0 rounded-2xl border border-ion/15 bg-[#0d0d14] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
              initial={{
                top: origin.top,
                left: origin.left,
                x: 0,
                width: origin.width,
                height: origin.height,
              }}
              animate={{
                top: 96,
                left: "50%",
                x: "-50%",
                width: "min(720px, 90vw)",
                height: "min(600px, calc(100vh - 96px - 4vh))",
              }}
              exit={{
                top: origin.top,
                left: origin.left,
                x: 0,
                width: origin.width,
                height: origin.height,
              }}
              transition={{ type: "spring", damping: 32, stiffness: 320 }}
            >
              <motion.div
                className="flex flex-1 flex-col overflow-hidden min-h-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.15, duration: 0.2 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
              >
                {/* window chrome */}
                <div className="flex shrink-0 items-center gap-2 border-b border-ion/10 bg-white/[0.03] px-4 py-3">
                  <button
                    onClick={close}
                    aria-label="Close"
                    className="h-3 w-3 rounded-full bg-[#ff5f57] transition-transform hover:scale-110"
                  />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  <span className="ml-3 truncate rounded-md bg-white/[0.05] px-3 py-1 text-xs text-mist">
                    yourapp.io/{active.slug}
                  </span>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden min-h-0">
                  {/* Persistent banner — same image across all tabs */}
                  <img
                    src={active.image}
                    alt={active.title}
                    loading="lazy"
                    className="h-36 w-full shrink-0 object-cover sm:h-44"
                  />
                  {/* Tab bar — sits right under the banner, persistent across tabs */}
                  <div className="flex shrink-0 gap-1 border-b border-ion/10 bg-white/[0.02] px-4 pt-2">
                    {["overview", "features", "preview"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`rounded-t-lg px-4 py-2 text-xs font-medium capitalize transition-colors ${
                          activeTab === tab
                            ? "border-x border-t border-ion/20 bg-void text-ion"
                            : "text-mist hover:text-ink"
                        }`}
                      >
                        {tab === "preview" ? "Dashboard Preview" : tab}
                      </button>
                    ))}
                  </div>
                  {/* Scrollable content area — only this part scrolls, banner+tabs stay put */}
                  <div
                    className="flex-1 overflow-y-auto min-h-0"
                    style={{ overscrollBehavior: "contain" }}
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {activeTab === "overview" && (
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ion/20">
                            <active.icon className="h-5 w-5 text-ion" />
                          </span>
                          <h3 className="font-display text-2xl text-ink">
                            {active.title}
                          </h3>
                        </div>

                        <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">
                          {active.desc}
                        </p>

                        {/* Quick highlights pulled from the first 3 features */}
                        <div className="mt-6 flex flex-wrap gap-2">
                          {active.features.slice(0, 3).map((f) => (
                            <span
                              key={f}
                              className="rounded-full border border-ion/15 bg-white/[0.02] px-3 py-1.5 text-xs text-ink/80"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {activeTab === "features" && (
                      <div className="p-6 sm:p-8">
                        <p className="mb-5 text-sm text-mist">
                          Everything included in the{" "}
                          {active.title.toLowerCase()} module.
                        </p>
                        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {active.features.map((f) => (
                            <li
                              key={f}
                              className="flex items-start gap-2.5 rounded-xl border border-ion/10 bg-white/[0.02] p-3.5 text-sm text-ink/80"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ion" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeTab === "preview" &&
                      dashboards[active.dashboardIndex] && (
                        <div className="p-6 sm:p-8">
                          {/* <div className="overflow-hidden rounded-xl border border-ion/10">
                            <img
                              src={dashboards[active.dashboardIndex].image}
                              alt={dashboards[active.dashboardIndex].title}
                              className="h-40 w-full object-cover sm:h-48"
                            />
                          </div> */}

                          <h4 className="font-display text-lg text-ink">
                            {dashboards[active.dashboardIndex].title}
                          </h4>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
                            {dashboards[active.dashboardIndex].description}
                          </p>

                          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {dashboards[active.dashboardIndex].features.map(
                              ({ icon: Icon, label }) => (
                                <div
                                  key={label}
                                  className="flex items-start gap-2.5 rounded-xl border border-ion/10 bg-white/[0.02] p-3.5"
                                >
                                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-ion" />
                                  <span className="text-xs text-ink/80">
                                    {label}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---- Tilt card (used by the Platforms carousel further down the page) --

function TiltCard({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.03 }}
      className={`group relative shrink-0 overflow-hidden rounded-2xl border border-ion/10 bg-white/[0.02] transition-colors hover:border-ion/30 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ---- Feature Showcase: vertical list drives a live side panel ----

function FeatureShowcase({ items }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const DURATION_MS = 4000;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length);
    }, DURATION_MS);
    return () => clearInterval(id);
  }, [isPaused, active, items.length]);

  const ActiveIcon = items[active].icon;

  return (
    <div
      className="grid gap-3 overflow-hidden rounded-2xl border border-ion/10 bg-white/[0.02] lg:grid-cols-[1fr_1.1fr]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left: vertical clickable list */}
      <div className="flex flex-col divide-y divide-white/5 p-2">
        {items.map(({ icon: Icon, title, desc }, i) => {
          const isActive = active === i;
          return (
            <button
              key={title}
              onClick={() => setActive(i)}
              className={`group relative flex items-start gap-4 rounded-xl px-4 py-4 text-left transition-colors duration-200 ${
                isActive ? "bg-ion/[0.06]" : "hover:bg-white/[0.03]"
              }`}
            >
              <span
                className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                  isActive
                    ? "border-ion/40 bg-ion/10 text-ion"
                    : "border-ion/10 bg-white/[0.02] text-mist"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <h3
                  className={`font-display text-base transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-ink/70"
                  }`}
                >
                  {title}
                </h3>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: EASE }}
                      className="mt-1.5 overflow-hidden text-base leading-relaxed text-mist"
                    >
                      {desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* progress bar for active item only */}
              {isActive && (
                <span className="absolute bottom-0 left-4 right-4 h-px overflow-hidden bg-white/5">
                  <motion.span
                    key={`${active}-${isPaused}`}
                    className="block h-full bg-ion"
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{
                      duration: isPaused ? 0.2 : DURATION_MS / 1000,
                      ease: "linear",
                    }}
                  />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Right: live visual panel */}
      <div className="relative overflow-hidden border-t border-white/5 bg-void/60 lg:border-l lg:border-t-0">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ion/10 blur-[100px]" />

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative flex flex-col justify-center gap-6 p-6 sm:p-8 lg:h-full lg:p-10"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-ion/20 bg-ion/5 lg:h-16 lg:w-16">
                <ActiveIcon className="h-6 w-6 text-ion lg:h-7 lg:w-7" />
              </span>
              <div>
                <span className="inline-block rounded-full border border-ion/20 bg-ion/5 px-3 py-1 text-xs font-medium text-ion">
                  {items[active].tag}
                </span>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  {items[active].title}
                </h3>
              </div>
            </div>

            <p className="max-w-md text-base leading-relaxed text-mist">
              {items[active].desc}
            </p>

            <div className="space-y-3 border-t border-white/5 pt-6">
              {items[active].points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ion" />
                  <span className="text-sm text-ink/80">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-2 flex gap-1.5">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-6 bg-ion" : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---- Component --------------------------------------------------------

export function SoftwarePortfolio() {
  const [activeDashboard, setActiveDashboard] = useState(0);

  const [isPaused, setIsPaused] = useState(false);
  const AUTOPLAY_MS = 8000;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setActiveDashboard((prev) => (prev + 1) % dashboards.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, activeDashboard]);

  const handleTabClick = (i) => {
    setActiveDashboard(i);
  };

  return (
    <div className="relative overflow-hidden">
      {/* ================= Hero (no bg — sits on global background) ================= */}
      {/* <section className="relative z-10 flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-10 pt-28 sm:pt-24 md:px-12 md:pt-20">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-ion/10 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-ion/5 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Portfolio / Software
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-display-1 font-semibold text-ink sm:mt-8"
          >
            Software That Runs <br />
            <span className="italic text-ion">the Business</span>
            <br className="hidden md:block" />
            Not Just the Screen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-mist"
          >
            From CRMs to ERPs — a look at the platforms we've engineered for
            real operational scale.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          className="relative mx-auto mt-10 mb-16 grid max-w-4xl grid-cols-2 gap-3 sm:mb-0 md:grid-cols-4 md:gap-4"
        >
          {stats.map(({ icon: Icon, value, suffix, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE, delay: 0.5 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-ion/10 bg-white/[0.02] px-4 py-4 text-center transition-colors hover:border-ion/30 md:py-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ion/0 via-ion/0 to-ion/0 opacity-0 transition-opacity duration-300 group-hover:from-ion/10 group-hover:opacity-100" />
              <Icon className="relative mx-auto h-5 w-5 text-ion" />
              <AnimatedCounter
                value={value}
                suffix={suffix}
                className="relative mt-3 block font-display text-3xl text-ink"
              />
              <p className="relative mt-2 text-xs uppercase tracking-wide text-mist">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 sm:bottom-8 sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-9 w-6 items-start justify-center rounded-full border border-line p-1.5"
          >
            <span className="h-1.5 w-1 rounded-full bg-ion" />
          </motion.div>
        </motion.div>
      </section> */}

      {/* ================= Hero (no bg — sits on global background) ================= */}
      <section className="relative z-10 mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-6 pb-16 pt-28 md:grid-cols-[1fr_0.9fr] md:gap-6 md:pt-36 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pt-40">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-ion/10 blur-[160px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-ion/5 blur-[120px]" />

        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Portfolio / Software
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ink md:text-4xl lg:text-6xl"
          >
            Software That Runs
            <br className="hidden md:block" />
            <span className="italic text-ion">the Business</span>
            <br className="hidden md:block" />
            Not Just the Screen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-6 max-w-md text-base text-mist md:text-base lg:text-lg"
          >
            From CRMs to ERPs — a look at the platforms we've engineered for
            real operational scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6"
          >
            <MagneticButton href="/contact" className="group rounded-full">
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <a
              href="#work"
              className="group inline-flex items-center gap-1.5 text-sm text-mist transition-colors duration-300 hover:text-ink"
            >
              <span className="relative">
                See the work
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-ion transition-all duration-500 ease-premium group-hover:w-full" />
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 -translate-y-px opacity-60 transition-all duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist"
          >
            {stats.map(({ value, suffix, label }) => (
              <span key={label}>
                <span className="text-ink">
                  {value}
                  {suffix}
                </span>{" "}
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16, rotateY: -6 }}
          animate={{ opacity: 1, y: 0, rotateY: -6 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ perspective: 1200 }}
          className="[transform-style:preserve-3d] md:scale-90 lg:scale-100"
        >
          <BrowserFrame
            src={dashboards[0]?.image}
            alt={dashboards[0]?.title || "Product dashboard preview"}
            url="yourapp.io/dashboard"
            className="[transform:rotateY(-3deg)_rotateX(1deg)] md:[transform:rotateY(-3deg)_rotateX(1deg)] lg:[transform:rotateY(-6deg)_rotateX(2deg)]"
          />
        </motion.div>
      </section>

      {/* ================= Software We Build (bg-void) ================= */}
      <section className="relative z-10 bg-void px-6 py-24 md:px-12">
        {/* Infinite marquee strip */}
        <div className="relative mb-14 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
          <motion.div
            className="flex w-max gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          >
            {[...marqueeTags, ...marqueeTags].map((tag, i) => (
              <span
                key={`${tag}-${i}`}
                className="whitespace-nowrap rounded-full border border-ion/15 px-5 py-2 text-sm text-mist"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
            >
              <Layers className="h-3.5 w-3.5" />
              10+ Dashboards & Growing
            </motion.span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="text-center font-display text-display-2 font-semibold text-ink"
          >
            Software We <span className="italic text-ion">Build</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-center text-mist"
          >
            Every business runs on different software. Here's what we design and
            engineer.
          </motion.p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-mist/70">
            <MousePointerClick className="h-3.5 w-3.5" />
            Tap a module to look inside
          </div>

          <ModuleShowcase items={solutions} dashboards={dashboards} />
        </div>
      </section>

      {/* ================= Featured: iFloriana (no bg) ================= */}
      <section className="relative z-10 px-6 pt-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <GlassPanel className="grid gap-10 overflow-hidden p-8 md:grid-cols-2 md:p-12">
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.2em] text-ion">
                Featured Collaboration
              </span>
              <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                Collaboration with{" "}
                <a
                  href="https://iflorainfo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="italic text-ion">iFloriana</span>
                </a>
              </h2>
              <p className="mt-4 text-mist">
                We partnered with iFloriana to build a booking and business
                management platform that unifies scheduling, staff operations,
                and customer management across multiple locations — replacing a
                patchwork of spreadsheets with one connected system.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Multi-branch admin dashboard",
                  "Real-time booking & staff scheduling",
                  "Automated customer notifications",
                  "Revenue & performance analytics",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-ink/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ion" />
                    {item}
                  </li>
                ))}
              </ul>

              <MagneticButton
                as="a"
                href="/contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-ion px-6 py-3 text-sm font-medium text-void"
              >
                Start a similar project <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>

            <img
              src="https://cdn.dribbble.com/userupload/46140312/file/93a2a87835eafe1a17269be7123a62c2.png?resize=%7Bwidth%7Dx%7Bheight%7D&vertical=center"
              alt="iFloriana platform dashboard preview"
              className="h-72 w-full rounded-2xl border border-ion/10 object-cover sm:h-80 md:h-[360px] lg:h-full"
              loading="lazy"
            />
          </GlassPanel>
        </div>

        <BrandsMarquee />
      </section>

      {/* ================= Platforms We've Built (bg-void) ================= */}
      <section className="relative z-10 overflow-hidden bg-void px-6 py-24 md:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-ion/5 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
            >
              <LayoutDashboard className="h-3.5 w-3.5" />
              Under the Hood
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl"
            >
              Platforms We've <span className="italic text-ion">Built</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-mist"
            >
              Five core platforms, engineered for daily real-world use — not
              demo-only dashboards.
            </motion.p>
          </div>

          {/* Segmented pill tab bar with sliding indicator + autoplay progress */}
          <div
            className="mb-10 flex justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-ion/10 bg-white/[0.02] p-2 backdrop-blur-sm sm:gap-1 sm:rounded-full sm:p-1.5">
              {dashboards.map((d, i) => {
                const Icon = d.icon;
                const isActive = activeDashboard === i;
                return (
                  <button
                    key={d.title}
                    onClick={() => handleTabClick(i)}
                    className={`relative flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-2 text-xs font-medium transition-colors duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                      isActive ? "text-void" : "text-mist hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="platformTabPill"
                        className="absolute inset-0 rounded-full bg-ion"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        key={`progress-${activeDashboard}-${isPaused}`}
                        className="absolute bottom-0 left-0 h-[2px] rounded-full bg-void/40"
                        initial={{ width: "0%" }}
                        animate={{ width: isPaused ? "0%" : "100%" }}
                        transition={{
                          duration: isPaused ? 0.2 : AUTOPLAY_MS / 1000,
                          ease: "linear",
                        }}
                      />
                    )}
                    <Icon className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="relative z-10">{d.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDashboard}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <GlassPanel className="grid gap-8 overflow-hidden p-6 lg:grid-cols-2 lg:p-10">
                <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-ion/10">
                  <img
                    src={dashboards[activeDashboard].image}
                    alt={dashboards[activeDashboard].title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent" />
                  {/* <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-ion/20 bg-void/70 px-3 py-1 text-[11px] uppercase tracking-wide text-ion backdrop-blur-sm">
                    Module 0{activeDashboard + 1} / 0{dashboards.length}
                  </span> */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-ion/20 bg-void/70 px-3 py-1.5 text-xs text-ink/90 backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5 text-ion" />
                    10+ features included
                  </span>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ion/20 bg-ion/5">
                      {(() => {
                        const Icon = dashboards[activeDashboard].icon;
                        return <Icon className="h-4.5 w-4.5 text-ion" />;
                      })()}
                    </span>
                    <h3 className="font-display text-2xl text-ink">
                      {dashboards[activeDashboard].title}
                    </h3>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-mist">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        The Challenge
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">
                        {dashboards[activeDashboard].challenge}
                      </p>
                    </div>

                    <div className="rounded-xl border border-ion/20 bg-ion/[0.04] p-4">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-ion">
                        <Target className="h-3.5 w-3.5" />
                        Our Solution
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink/80">
                        {dashboards[activeDashboard].solution}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {dashboards[activeDashboard].features.map(
                      ({ icon: Icon, label }) => (
                        <span
                          key={label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-ion/10 bg-white/[0.02] px-3 py-1.5 text-xs text-ink/80 transition-colors duration-200 hover:border-ion/30"
                        >
                          <Icon className="h-3 w-3 text-ion" />
                          {label}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ================= Core Features (no bg) ================= */}
      <section className="relative z-10 overflow-hidden px-6 py-24 md:px-12">
        <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-ion/5 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              What's Under Every Build
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="mt-4 font-display text-3xl font-semibold text-ink md:text-4xl"
            >
              Why Teams Choose{" "}
              <span className="italic text-ion">Our Software</span>
            </motion.h2>
          </div>

          <FeatureShowcase
            items={[
              {
                icon: LayoutDashboard,
                title: "Unified Dashboard",
                desc: "Every branch, every role, every metric that matters — read from one screen instead of stitching together five exports.",
                tag: "One screen, not five tabs",
                points: [
                  "Revenue & bookings by branch",
                  "Staff performance at a glance",
                  "Custom widget layout per admin",
                ],
              },
              {
                icon: CalendarCheck,
                title: "Smart Scheduling",
                desc: "Conflict checks run before the click, not after — so double-bookings stop before they happen.",
                tag: "Zero double-bookings",
                points: [
                  "Real-time conflict detection",
                  "Buffer time between appointments",
                  "Self-service reschedule links",
                ],
              },
              {
                icon: Users,
                title: "Customer CRM",
                desc: "Full history and preferences on every customer, visible to whoever picks up the call.",
                tag: "Nothing lost between agents",
                points: [
                  "Full contact & booking timeline",
                  "Preferences saved per customer",
                  "Notes visible to every team member",
                ],
              },
              {
                icon: BarChart3,
                title: "Live Analytics",
                desc: "Revenue, retention, and staff KPIs update as the data comes in — not on a nightly batch job.",
                tag: "Updates as it happens",
                points: [
                  "Live revenue & retention charts",
                  "Staff-wise KPI breakdown",
                  "Scheduled reports to your inbox",
                ],
              },
              {
                icon: ShieldCheck,
                title: "Role-Based Access",
                desc: "Owners, managers, and staff each see exactly what their role needs — nothing more, nothing hidden.",
                tag: "Right access, right role",
                points: [
                  "Granular permission levels",
                  "Owner-only financial views",
                  "Audit log on sensitive actions",
                ],
              },
              {
                icon: Zap,
                title: "Fast Performance",
                desc: "Sub-second loads even under heavy booking data.",
                tag: "Sub-second, even at scale",
                points: [
                  "Optimized for high booking volume",
                  "No loading spinners on core screens",
                  "Built to stay fast as data grows",
                ],
              },
            ]}
          />
        </div>
      </section>

      {/* ================= CTA (bg-void) ================= */}
      <section className="relative z-10 overflow-hidden bg-void px-6 pb-28 pt-24 md:px-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-ion/10 blur-[150px]" />

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-ion/20 bg-ion/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-ion"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Let's Build Something
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-5 font-display text-3xl font-semibold text-ink md:text-5xl"
          >
            Still running the business{" "}
            <span className="italic text-ion">on spreadsheets?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mx-auto mt-5 max-w-xl text-mist"
          >
            Tell us what's breaking — a CRM, an ERP, an HRMS, or something more
            specific to how your team actually works — and we'll scope it
            properly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton
              as="a"
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.03]"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>

            <a
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3 text-sm font-medium text-ink transition-colors hover:border-white/30 hover:bg-white/5"
            >
              See more work
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
