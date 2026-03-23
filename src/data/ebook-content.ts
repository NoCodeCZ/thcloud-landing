export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level: 2 | 3 }
  | { type: "bullet-list"; items: string[] }
  | { type: "pull-quote"; text: string }
  | { type: "comparison-table"; headers: [string, string]; rows: { left: string; right: string }[] }
  | { type: "architecture-diagram" }
  | { type: "roadmap-timeline" }
  | { type: "department-table"; rows: { dashboard: string; aiKnows: string }[] }
  | { type: "readiness-checklist"; items: string[] };

export interface EbookSection {
  id: string;
  title: string;
  blocks: ContentBlock[];
}

export const ebookSections: EbookSection[] = [
  {
    id: "the-problem",
    title: "The Problem",
    blocks: [
      {
        type: "paragraph",
        text: "You have tried AI. Maybe ChatGPT, maybe Copilot, maybe something your IT team installed.",
      },
      {
        type: "paragraph",
        text: "And it was impressive — for about a week.",
      },
      { type: "heading", text: "Then reality hit:", level: 3 },
      {
        type: "bullet-list",
        items: [
          "It does not know your business. Every conversation starts from zero. It does not know your products, your pricing, your SOPs, your customers, or your suppliers.",
          "Your team gave up on it. They said \"it does not understand us\" and went back to doing things manually.",
          "You are paying for multiple subscriptions — ChatGPT here, Copilot there — and nobody can tell you what it is actually producing.",
          "You are afraid of the data risk. Someone on your team is probably sending sensitive documents to a US server right now. You know it. You cannot stop it without taking their tools away.",
        ],
      },
      {
        type: "paragraph",
        text: "Here is the truth nobody tells you:",
      },
      {
        type: "pull-quote",
        text: "Generic AI fails for businesses not because AI is bad — but because the business has no data layer beneath it.",
      },
      {
        type: "paragraph",
        text: "ChatGPT is a brain with no memory, no access to your systems, and no ability to take action. It is brilliant in isolation and useless in context.",
      },
      {
        type: "paragraph",
        text: "What your business actually needs is not a smarter chatbot. It is a connected AI operating system — one that knows your data, understands your context, and can act on your behalf.",
      },
      {
        type: "paragraph",
        text: "That is what this blueprint is about.",
      },
    ],
  },
  {
    id: "what-is-possible",
    title: "What Is Possible",
    blocks: [
      {
        type: "paragraph",
        text: "Before we get into the layers, here is the difference between what most businesses have vs. what is actually possible.",
      },
      {
        type: "comparison-table",
        headers: ["What most businesses have today", "What a connected AI OS delivers"],
        rows: [
          {
            left: "Employee asks ChatGPT",
            right: "Employee asks a question",
          },
          {
            left: "Generic answer",
            right: "AI queries your real business data",
          },
          {
            left: "No business context",
            right: "AI understands your operations, sales, marketing context",
          },
          {
            left: "No data access",
            right: "AI gives a specific, accurate answer",
          },
          {
            left: "No action taken",
            right: "AI agent takes action in your systems",
          },
          {
            left: "Nothing tracked",
            right: "Everything is tracked, controlled, and owned by you",
          },
        ],
      },
      { type: "heading", text: "Real example:", level: 3 },
      {
        type: "paragraph",
        text: "Your sales manager asks: \"What is our top-performing product this quarter in the northern region, and which customers have not reordered in 90 days?\"",
      },
      {
        type: "comparison-table",
        headers: ["With generic AI", "With connected AI OS"],
        rows: [
          {
            left: "\"I do not have access to your sales data. Please provide the information you would like me to analyze.\"",
            right: "A direct, accurate answer — pulled from your actual database — in seconds. Plus an AI agent that can draft and send the reorder outreach automatically.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "That is the gap we are going to close for you.",
      },
    ],
  },
  {
    id: "the-5-layers",
    title: "The 5 Layers",
    blocks: [
      {
        type: "paragraph",
        text: "A connected AI operating system is built in 5 layers. Think of it like a building — each floor depends on the one below it.",
      },
      { type: "architecture-diagram" },
      {
        type: "paragraph",
        text: "Most businesses try to skip straight to the top. That is why AI fails for them.",
      },
      {
        type: "pull-quote",
        text: "You have to build from the bottom up.",
      },
    ],
  },
  {
    id: "layer-1",
    title: "Layer 1 — Data Foundation",
    blocks: [
      { type: "heading", text: "What it is", level: 3 },
      {
        type: "paragraph",
        text: "A unified data warehouse that collects and organizes all your business data — sales records, inventory, customer data, operational metrics, financial figures — into one structured, queryable source of truth.",
      },
      { type: "heading", text: "Why it matters", level: 3 },
      {
        type: "paragraph",
        text: "AI can only be as intelligent as the data it has access to. If your data lives in 5 different spreadsheets, 2 ERPs, and someone's personal hard drive, no AI in the world can make sense of it.",
      },
      { type: "heading", text: "What we connect", level: 3 },
      {
        type: "paragraph",
        text: "POS systems, ERP data, CRM records, operational databases, financial systems, inventory management — cleaned, structured, and stored in a centralized data warehouse.",
      },
      { type: "heading", text: "What this looks like in practice:", level: 3 },
      {
        type: "bullet-list",
        items: [
          "All sales data from every channel, unified",
          "Inventory levels updated in real-time",
          "Customer purchase history accessible instantly",
          "Operational metrics (production output, defect rates, throughput) in one view",
        ],
      },
      {
        type: "pull-quote",
        text: "Without Layer 1, everything above it is guessing. With Layer 1, everything above it becomes intelligent.",
      },
    ],
  },
  {
    id: "layer-2",
    title: "Layer 2 — MindsDB",
    blocks: [
      { type: "heading", text: "The Data Brain", level: 3 },
      {
        type: "paragraph",
        text: "MindsDB sits on top of your data foundation and makes it AI-queryable. It connects your data warehouse to AI models — so instead of a data analyst running SQL queries, your team can ask questions in plain language and get accurate answers from real data.",
      },
      { type: "heading", text: "Why it matters", level: 3 },
      {
        type: "paragraph",
        text: "Your data exists but it is locked. Only technical staff can query it. MindsDB removes that lock — it translates natural language into database queries automatically.",
      },
      { type: "heading", text: "What this enables:", level: 3 },
      {
        type: "bullet-list",
        items: [
          "\"What were our top 10 products by margin last month?\" → Direct answer from your actual data",
          "\"Which sales reps are underperforming vs. target this quarter?\" → Real numbers, not estimates",
          "\"What is our current inventory for SKU-2847 across all warehouses?\" → Live data",
        ],
      },
      {
        type: "paragraph",
        text: "Your entire business data becomes conversational. Anyone in your team — not just IT — can query it. The AI now has a memory and it is YOUR memory.",
      },
      {
        type: "department-table",
        rows: [
          { dashboard: "Sales", aiKnows: "Pipeline, conversion rates, rep performance, revenue by region" },
          { dashboard: "Operations", aiKnows: "Production output, defect rates, delivery timelines, supplier performance" },
          { dashboard: "Marketing", aiKnows: "Campaign performance, lead sources, cost per acquisition" },
          { dashboard: "Finance", aiKnows: "Cash flow, margins, outstanding receivables, cost centers" },
        ],
      },
    ],
  },
  {
    id: "layer-3",
    title: "Layer 3 — Directus",
    blocks: [
      { type: "heading", text: "The Business Operating System", level: 3 },
      {
        type: "paragraph",
        text: "Directus is the operational layer of your AI system — an open-source platform that manages your business logic, runs automations, powers chatbots, and connects your AI to your actual business workflows.",
      },
      { type: "heading", text: "Why it matters", level: 3 },
      {
        type: "paragraph",
        text: "Data intelligence is only half the value. The other half is action. Directus is where AI stops just answering questions and starts running processes.",
      },
      { type: "heading", text: "What this enables:", level: 3 },
      {
        type: "bullet-list",
        items: [
          "Automated workflows: When a customer has not reordered in 60 days, Directus triggers an AI-drafted outreach automatically",
          "Internal chatbots: Customer service bot that knows your entire product catalog and can process requests",
          "Document automation: Contracts, quotations, reports — generated by AI from your real data",
          "Approval flows: Purchase orders, leave requests, budget approvals — routed and tracked automatically",
        ],
      },
      {
        type: "pull-quote",
        text: "Your business runs workflows automatically. AI does not just answer — it acts. Repetitive processes that consumed 20-30% of your team's time start running on autopilot.",
      },
      { type: "heading", text: "Example for manufacturing:", level: 3 },
      {
        type: "paragraph",
        text: "Before Directus: Production manager manually checks inventory, manually emails procurement, manually updates the ERP.",
      },
      {
        type: "paragraph",
        text: "After Directus: When inventory drops below threshold, Directus detects it, AI drafts the purchase order, routes it for approval, sends to supplier — automatically.",
      },
    ],
  },
  {
    id: "layer-4",
    title: "Layer 4 — OpenWebUI",
    blocks: [
      { type: "heading", text: "The AI Interface", level: 3 },
      {
        type: "paragraph",
        text: "OpenWebUI is the single interface where your entire team accesses all AI capabilities — connected to every layer below it. Multiple AI models (ChatGPT, Claude, Gemini, DeepSeek) available through one login, with full management and tracking.",
      },
      { type: "heading", text: "Why it matters", level: 3 },
      {
        type: "paragraph",
        text: "Without a managed interface, your team uses personal ChatGPT accounts, sends company data to unknown servers, and you have zero visibility into what is happening.",
      },
      {
        type: "comparison-table",
        headers: ["Problem", "OpenWebUI Solution"],
        rows: [
          { left: "Team using personal AI accounts", right: "One company login, role-based access" },
          { left: "No visibility into AI usage", right: "Full dashboard: who used what, when, how much" },
          { left: "Data going to unknown servers", right: "Self-hosted on your own infrastructure" },
          { left: "Generic AI with no business context", right: "Connected to your data layer via MindsDB" },
          { left: "Paying per-seat for multiple tools", right: "One flat fee for the whole team" },
        ],
      },
      { type: "heading", text: "What your team sees:", level: 3 },
      {
        type: "paragraph",
        text: "One clean interface. They type a question. The AI — connected to your data warehouse via MindsDB, aware of your business context via Metabase dashboards — gives a specific, accurate answer about YOUR business.",
      },
      { type: "heading", text: "What you see as the owner:", level: 3 },
      {
        type: "paragraph",
        text: "One dashboard. Every conversation. Every model used. Every cost. Every user. Fully in your control.",
      },
    ],
  },
  {
    id: "layer-5",
    title: "Layer 5 — Custom MCPs",
    blocks: [
      { type: "heading", text: "AI Agents", level: 3 },
      {
        type: "paragraph",
        text: "Model Context Protocol (MCP) agents are AI that can take action — not just answer questions, but actually operate within your business systems. These are custom-built for your specific use cases.",
      },
      {
        type: "pull-quote",
        text: "Every layer below this prepares the foundation. This layer is where ROI becomes measurable in hours saved, headcount reduced, and revenue generated.",
      },
      { type: "heading", text: "Examples of custom MCPs we build:", level: 3 },
      {
        type: "bullet-list",
        items: [
          "Sales: Agent monitors pipeline, flags deals at risk, drafts follow-up messages. Pulls competitor pricing, compares to your catalog, suggests positioning.",
          "Operations (Manufacturing): Agent monitors production metrics, alerts on anomalies. Tracks supplier performance, flags delays, initiates escalation workflows.",
          "Customer Service: Agent handles first-contact resolution for 70%+ of standard queries. Routes complex issues to the right human with full context pre-loaded.",
          "Finance: Agent generates weekly P&L summaries from live data. Flags unusual spending patterns and requests explanation from relevant manager.",
        ],
      },
      { type: "heading", text: "ROI example:", level: 3 },
      {
        type: "paragraph",
        text: "A manufacturing business with 3 custom MCPs handling production monitoring, supplier alerts, and inventory reordering: estimated 2.5 hours saved per operations manager per day = 180,000 THB/year per manager in recovered productive time.",
      },
    ],
  },
  {
    id: "roadmap",
    title: "The 4-Month Roadmap",
    blocks: [
      {
        type: "paragraph",
        text: "Every business is different. A retail business with clean POS data moves faster. A manufacturer with 10 years of data across 3 systems takes longer. The phases are the same — the pace depends on your starting point.",
      },
      { type: "roadmap-timeline" },
      { type: "heading", text: "Investment", level: 3 },
      {
        type: "bullet-list",
        items: [
          "Starting from 3,000,000 THB depending on scope and complexity",
          "Timeline varies by project — scoped after the discovery call",
          "Included: All 5 layers + training + 90-day post-launch support",
        ],
      },
    ],
  },
  {
    id: "what-this-makes-possible",
    title: "What This Makes Possible",
    blocks: [
      {
        type: "paragraph",
        text: "Once all phases are complete, here is what your business looks like:",
      },
      { type: "heading", text: "The owner's morning:", level: 3 },
      {
        type: "paragraph",
        text: "Open one dashboard. See overnight sales performance by region. See production output vs. target. See which customers are at risk of churn. Ask one question to the AI: \"What is the biggest operational bottleneck this week?\" — get a specific answer from your actual data in seconds.",
      },
      { type: "heading", text: "The sales team's day:", level: 3 },
      {
        type: "paragraph",
        text: "Every sales rep opens OpenWebUI. The AI already knows the full product catalog, all customer history, and current inventory. New rep onboarding time drops from 3 weeks to 3 days.",
      },
      { type: "heading", text: "Operations:", level: 3 },
      {
        type: "paragraph",
        text: "Production anomalies are flagged before they become problems. Procurement orders trigger automatically when inventory hits threshold. Supplier performance is tracked and reported weekly without anyone manually pulling data.",
      },
      { type: "heading", text: "The competitive reality:", level: 3 },
      {
        type: "paragraph",
        text: "While your competitors are still copying and pasting data into ChatGPT and getting generic answers, your business runs on AI that knows every metric, every product, every customer — and takes action automatically.",
      },
      {
        type: "pull-quote",
        text: "That is not the future. That is what we are building right now for manufacturers and business owners across Thailand.",
      },
    ],
  },
  {
    id: "is-your-business-ready",
    title: "Is Your Business Ready?",
    blocks: [
      {
        type: "paragraph",
        text: "Answer these 5 questions:",
      },
      {
        type: "readiness-checklist",
        items: [
          "Do you currently have business data scattered across multiple systems, spreadsheets, or tools?",
          "Has your team tried AI tools but found they do not understand your specific business?",
          "Are you making key business decisions without real-time visibility into your actual data?",
          "Do you have employees using personal AI accounts with no management or visibility?",
          "Are you concerned that a competitor who implements connected AI will pull ahead of you in the next 12 months?",
        ],
      },
      {
        type: "paragraph",
        text: "If you answered Yes to 3 or more: your business is exactly where most 50M THB+ companies are right now — aware that AI should be working for you, but missing the infrastructure layer that makes it actually work.",
      },
      {
        type: "paragraph",
        text: "The good news: you do not need to build this yourself. You do not need an internal IT team. You do not need to understand the technical architecture.",
      },
      {
        type: "pull-quote",
        text: "You need a partner who has already built it.",
      },
    ],
  },
  {
    id: "next-step",
    title: "Next Step",
    blocks: [
      {
        type: "paragraph",
        text: "We are currently building this system live for a manufacturing client in Thailand.",
      },
      {
        type: "paragraph",
        text: "In the next 2 weeks, we will publish a 30-minute walkthrough showing exactly how the 5-layer stack works — with real dashboards, real data queries, and real AI agents operating in a live business.",
      },
      { type: "heading", text: "Two ways to move forward:", level: 3 },
      {
        type: "paragraph",
        text: "Option 1 — Watch the Free Webinar: See the complete system demonstrated on a real business. Understand exactly what Layer 1 through Layer 5 looks like when it is running. No pitch. Just a technical walkthrough.",
      },
      {
        type: "paragraph",
        text: "Option 2 — Book a Discovery Call: If you already know this is the direction you want to go, let us talk about your specific business. We will map your data landscape and scope what implementation looks like for your specific business.",
      },
    ],
  },
];
