const en = {
  metadata: {
    home: {
      title: "AI Transformation Blueprint | THCloud.AI",
      description:
        "Your business has data but your AI doesn't know about it. See how to turn scattered data into a business that thinks — with the free AI Transformation Blueprint.",
    },
    thankYou: {
      title: "Thank You | THCloud.AI",
      description: "Your blueprint is on the way.",
    },
    webinar: {
      title: "Watch Connected AI Running Live | THCloud.AI Webinar",
      description:
        "Watch a real Thai business run on connected AI — live system, real data, no theory. Register for the free 30-minute webinar walkthrough.",
    },
  },
  home: {
    hero: {
      tagline: "AI Transformation Blueprint",
      headline: "From Scattered Data to a Business That Thinks",
      subhead:
        "Most businesses already have the data they need to make better decisions. They just can't access it fast enough, in the right shape, at the right moment. We fix that.",
    },
    form: {
      emailLabel: "Work Email",
      emailPlaceholder: "you@company.com",
      submit: "Get the Free Blueprint",
      submitting: "Sending...",
      footer: "Free. No spam. Unsubscribe anytime.",
    },
    whoIsFor: {
      title: "Who This Is For",
      items: [
        "Running across multiple sales channels (online, social, chat) with no unified view",
        "Team spending hours pulling reports and compiling spreadsheets every week",
        "Want to use AI but tried tools that don't connect to your actual business data",
        "Ready to build infrastructure that compounds — every data point makes the system smarter",
      ],
      closing: "If you recognize your business here, this is a clear path forward.",
    },
    coreProblem: {
      title: "The Core Problem We Solve",
      problems: [
        {
          title: "Your data lives in too many places",
          body: "Every platform you sell on — Facebook, LINE, Shopee, Lazada, TikTok — generates data. But it's siloed. You can't see all channels in one place, in real time, without someone manually compiling it.",
        },
        {
          title: "Your team answers the same questions every day",
          body: '"What\'s today\'s revenue?" "Which campaign is performing?" These questions don\'t need a person. They need a system. Your best people are spending time on information retrieval instead of decisions.',
        },
        {
          title: "AI tools don't know your business",
          body: "ChatGPT and Gemini are powerful — but they know nothing about your promotions, your customers, your SKUs, or yesterday's sales. Without connecting AI to your actual data, you get generic answers to specific questions.",
        },
      ],
      result: "The result: Slow decisions. Missed opportunities. A team that's busy but not leveraged.",
    },
    whatWeBuild: {
      title: "What We Build",
      subtitle: "A complete AI infrastructure for your business in three interconnected layers.",
      layers: [
        {
          number: "1",
          name: "Your Data Foundation",
          tagline: "Build once. Query forever.",
          description: "We design a central data warehouse tailored to your business — your channels, your product categories, your sales flow. Then we connect it to every platform you run on.",
          sources: [
            { source: "Facebook & Instagram Ads", method: "Automated API", data: "Spend, reach, clicks, conversions" },
            { source: "Shopee", method: "Automated API", data: "Orders, revenue, SKU performance" },
            { source: "Lazada", method: "Automated API", data: "Orders, revenue, SKU performance" },
            { source: "LINE Official Account", method: "Automated API", data: "Messages, orders, discount codes" },
            { source: "TikTok Shop", method: "Scheduled import", data: "Orders, GMV, affiliate sales" },
            { source: "Google Ads", method: "Scheduled import", data: "Spend, impressions, conversions" },
            { source: "Internal order data", method: "Upload interface", data: "B2B orders, offline sales" },
          ],
          output: "One warehouse. All your data. Updated on a schedule that matches how your business moves.",
          tech: ["Airbyte", "ClickHouse", "Supabase", "Python"],
        },
        {
          number: "2",
          name: "Your Intelligence Layer",
          tagline: "Stop reading dashboards. Start asking questions.",
          description: "Once your data is unified, we build dashboards that give your team a live view, and AI agents that answer questions in natural language.",
          dashboards: [
            {
              name: "Marketing",
              items: ["Total ad spend across all channels", "Revenue per channel and campaign", "ROI and ROAS calculated automatically", "Conversion funnel — impression to sale"],
            },
            {
              name: "Sales",
              items: ["Daily/weekly/monthly revenue — all channels", "SKU-level sales across platforms", "Promotion code effectiveness", "B2B pipeline and invoice tracking"],
            },
            {
              name: "Operations",
              items: ["Order queue by fulfillment status", "Inventory levels and restock signals", "Shipping split by warehouse/courier"],
            },
          ],
          agentExamples: [
            "What was yesterday's revenue broken down by category?",
            "Which ad campaign had the best ROI this month?",
            "Compare this week's Shopee performance to last week.",
            "Which promotion codes were used most in the last 30 days?",
          ],
          tech: ["Metabase", "MindsDB", "pgvector", "Directus", "LangChain", "LangGraph"],
        },
        {
          number: "3",
          name: "Your AI Interface",
          tagline: "One platform for your entire team.",
          description: "A single, private AI interface your team logs into. It looks like ChatGPT — but it's connected to your data, your tools, and your business context.",
          teamFeatures: [
            "Access to ChatGPT, Claude, Gemini, DeepSeek, and Llama — all in one place",
            "AI agents connected to your live dashboards and data",
            "A shared prompt library — your best prompts, available to everyone",
            "Role-based access — finance sees finance tools, marketing sees marketing tools",
            "Full privacy — your conversations and data never leave your infrastructure",
          ],
          adminFeatures: [
            "Which models each team can use",
            "Which data each role can access",
            "Usage analytics — see what your team is asking AI every day",
            "Cost caps per model and per team",
          ],
          tech: ["Open WebUI", "LiteLLM"],
        },
      ],
    },
    timeline: {
      title: "The Transformation Blueprint — Step by Step",
      steps: [
        { week: "Week 1–2", title: "Discovery & Data Mapping", description: "We audit every data source, map what exists, and design the warehouse schema around your actual business.", deliverable: "Data architecture document. Schema design. Integration plan." },
        { week: "Week 2–3", title: "Infrastructure Setup", description: "Full stack deployed on your chosen infrastructure — configured, secured, and tested.", deliverable: "Live environment. All services running." },
        { week: "Week 3–5", title: "Data Ingestion & Warehouse Build", description: "Platforms connected. APIs configured. Historical data loaded. Warehouse starts filling.", deliverable: "Unified warehouse with clean, queryable data." },
        { week: "Week 5–7", title: "Dashboard Build", description: "Each dashboard built layer by layer — starting with what your team already tracks, then expanding.", deliverable: "Marketing, Sales, and Operations dashboards — live and verified." },
        { week: "Week 7–9", title: "AI Agent Deployment", description: "AI agents connected to dashboards and data. Tools configured. Responses tuned against real questions.", deliverable: "Working AI agents, tested with your actual data." },
        { week: "Week 9–10", title: "Team Onboarding & Handover", description: "Training for each team. Full documentation. You own the system.", deliverable: "Trained team. Full documentation. Ongoing support agreement." },
      ],
    },
    beforeAfter: {
      title: "What Changes After This",
      rows: [
        { situation: "Checking yesterday's revenue", before: "Someone compiles it manually every morning", after: "Ask the AI. Answer in 3 seconds, by category and channel." },
        { situation: "Comparing ad performance", before: "Export CSVs from each platform, paste into spreadsheet", after: "One dashboard. All channels. Updated daily." },
        { situation: "Finding ready-to-buy customers", before: "No system — relies on admin memory", after: "AI searches customer history semantically." },
        { situation: "Which campaign drove the most sales?", before: "Unknown — channels aren't linked", after: "Warehouse links ad data to orders. Agent tells you." },
        { situation: "Using AI", before: "Individual ChatGPT subscriptions, no context", after: "One private platform. Every model. Connected to your data." },
      ],
    },
    deployment: {
      title: "Deployment Options",
      subtitle: "The entire stack is containerized and can run anywhere.",
      options: [
        { option: "On-premise", bestFor: "Full control, sensitive data", dataStays: "Your own servers" },
        { option: "Private cloud", bestFor: "Scalability with privacy", dataStays: "Your cloud account" },
        { option: "Hybrid", bestFor: "Split by sensitivity", dataStays: "Data on-prem, AI on cloud" },
        { option: "Managed", bestFor: "Fastest to deploy", dataStays: "Our secure servers" },
      ],
    },
    differentiators: {
      title: "What Makes This Different",
      items: [
        { title: "We build AI infrastructure, not AI tools", body: "We build the data warehouse, the ingestion pipelines, the agent connections — so AI actually knows your business." },
        { title: "Model-agnostic", body: "We route between ChatGPT, Claude, Gemini, DeepSeek, and Llama. When a better model ships, you get it without rebuilding." },
        { title: "Designed for your workflow", body: "We map the system to what already exists — your spreadsheets, your LINE groups, your routines — and automate from there." },
        { title: "100% open-source and self-hostable", body: "Every tool is open-source. You are never locked into a vendor. You own the infrastructure. You own the data." },
      ],
    },
    stack: {
      title: "The Stack That Powers It",
      items: [
        { layer: "AI Interface", tool: "Open WebUI", what: "Your team's AI workspace" },
        { layer: "Model Router", tool: "LiteLLM", what: "Routes queries, controls costs" },
        { layer: "Language Models", tool: "ChatGPT · Claude · Gemini · DeepSeek · Llama", what: "The AI reasoning layer" },
        { layer: "Agent Engine", tool: "LangChain · LangGraph", what: "Connects AI to data and workflows" },
        { layer: "Operational DB", tool: "Supabase (PostgreSQL)", what: "Orders, customers, real-time data" },
        { layer: "Analytics", tool: "ClickHouse", what: "Fast aggregations, dashboard queries" },
        { layer: "Vector Search", tool: "pgvector", what: "Semantic search over messages & docs" },
        { layer: "Data Ingestion", tool: "Airbyte", what: "Automated pipelines from 300+ sources" },
        { layer: "Dashboards", tool: "Metabase", what: "Live BI for every team" },
        { layer: "Data Management", tool: "Directus", what: "Admin UI for non-technical staff" },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "Do we need technical staff to maintain this?", a: "No. Dashboards update automatically. The AI interface is as simple as chatting. For system changes, we provide ongoing support." },
        { q: "What if we use platforms that aren't listed?", a: "Airbyte has 300+ connectors. If your platform has an API, we can connect it. If not, we build a CSV import template." },
        { q: "How long before we see value?", a: "Working dashboards within 5–7 weeks. AI agents answering real questions by week 9. The data foundation pays dividends from day one." },
        { q: "Is our data private?", a: "Yes. Nothing leaves your infrastructure by default. We use open-source, self-hosted components specifically for this reason." },
        { q: "Can we start with just one part?", a: "Yes. The warehouse is the foundation — start there. Dashboards and AI agents are built on top. Phase the investment." },
        { q: "What happens after the build?", a: "You own everything. We offer ongoing support for monitoring, new integrations, and model upgrades. The system runs independently." },
      ],
    },
    finalCta: {
      title: "Ready to Start?",
      body: "The first step is a Demo Call. We show you the system running live, map your data landscape, and scope the build. No commitment required.",
      bookCall: "Book a Demo Call",
    },
    credibility: {
      line: "Built by Tong Hua Holding PCL (SET:TH) — 65 years in Thai business. Deploying now for manufacturing and SMB clients.",
    },
    ctaButton: "Get the Free Blueprint",
  },
  thankYou: {
    title: "You're in.",
    subtitle: "Check your email — the blueprint is on the way.",
    demoTitle: "See the system in action",
    demoSubtitle: "Book a 30-minute Demo Call. We'll show you exactly how the AI infrastructure works — with live dashboards, real data queries, and AI agents taking action.",
    demoForm: {
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      companyLabel: "Company Name",
      companyPlaceholder: "Your company",
      roleLabel: "Your Role",
      rolePlaceholder: "e.g. CEO, COO, CTO, VP Operations",
      industryLabel: "Industry",
      industryPlaceholder: "Select your industry",
      industries: ["Manufacturing", "Retail / E-commerce", "B2B Services", "Healthcare", "Finance", "Logistics", "Other"],
      revenueLabel: "Annual Revenue",
      revenuePlaceholder: "Select range",
      revenueRanges: ["Under 50M THB", "50–200M THB", "200M–1B THB", "Above 1B THB"],
      channelsLabel: "Sales Channels You Use",
      channelsPlaceholder: "Select all that apply",
      channels: ["Shopee", "Lazada", "TikTok Shop", "LINE OA", "Facebook/Instagram", "Own Website", "B2B / Direct Sales"],
      challengeLabel: "What's your biggest data or AI challenge right now?",
      challengePlaceholder: "e.g. We can't see all channel revenue in one place, our team spends hours on manual reports...",
      submit: "Book a Demo Call",
      submitting: "Submitting...",
      footer: "We'll reach out within 24 hours to schedule your demo.",
    },
    submitted: {
      title: "Demo request received.",
      subtitle: "We'll contact you within 24 hours to schedule your 30-minute demo.",
    },
    backHome: "Back to homepage",
  },
  webinar: {
    tagline:
      "\u201CWatch a connected AI system running live — in a real Thai business\u201D",
    headline:
      "Watch a Real Thai Business Run on Connected AI — Live System, Real Data, No Theory",
    subhead:
      "Our CTO walks through the complete 5-layer AI operating system — built for a manufacturing company — in 30 minutes. See dashboards pulling live data, AI agents taking action, and the full stack running end to end.",
    notice:
      "We are finalizing the recording. Register below and we will send you the link the moment it is live.",
    bulletTitle: "In 30 minutes, you will see:",
    bullets: [
      "Layer 1: A real data warehouse with live business data connected and cleaned",
      "Layer 2: MindsDB answering plain-language questions from actual company data",
      "Layer 3: Directus running automated workflows without human intervention",
      "Layer 4: OpenWebUI with the full team connected — usage tracked, data controlled",
      "Layer 5: Custom MCP agents taking action in real business systems",
      "The ROI math: how many hours saved, what that means in baht per year",
      "Q&A: the 5 most common questions from Thai business owners",
    ],
    whoIsFor: {
      forTitle: "This webinar is for you if:",
      items: [
        "You run a manufacturing, retail, or B2B business with 50M THB+ revenue",
        "You have tried AI tools and found they do not understand your specific business",
        "You want to see the full implementation before committing to anything",
        "You are evaluating whether a connected AI system is right for your business in 2026",
      ],
    },
    whoIsNotFor: {
      notForTitle: "This webinar is NOT for:",
      items: [
        "Individuals or freelancers (this is enterprise implementation)",
        "Businesses looking for a simple chatbot (this is a full data-connected AI OS)",
      ],
    },
    secondaryCta: {
      headline: "Do not want to wait for the webinar?",
      body: "If you already know connected AI is the direction for your business, let us talk now.",
      buttonText: "Book a Discovery Call Instead",
    },
  },
  components: {
    trustLogos: {
      label: "Powered by",
    },
    webinarForm: {
      nameLabel: "Full Name",
      namePlaceholder: "Your full name",
      emailLabel: "Work Email",
      emailPlaceholder: "you@company.com",
      companyLabel: "Company Name",
      companyPlaceholder: "Your company",
      industryLabel: "Industry",
      industryPlaceholder: "Select your industry",
      industries: ["Manufacturing", "Retail", "B2B Services", "Other"],
      revenueLabel: "Company Revenue Range",
      revenuePlaceholder: "Select revenue range",
      revenueRanges: [
        "Under 50M THB",
        "50-200M THB",
        "200M-1B THB",
        "Above 1B THB",
      ],
      challengeLabel: "What is your biggest AI challenge right now?",
      challengeOptional: "(optional)",
      challengePlaceholder: "Tell us about your current challenges...",
      submit: "Reserve My Free Spot",
      submitting: "Registering...",
      footer:
        "Free to watch. We will email you when the webinar is live. No spam.",
    },
    thankYou: {
      title: "You are on the list.",
      emailNotice: "We will email you at {email} the moment the webinar is live.",
      whileYouWait: "While you wait:",
      downloadPdf: "Download the Blueprint PDF",
      followLinkedin: "Follow on LinkedIn",
    },
    registrationCounter: {
      text: "{count} business owners have already registered",
    },
    languageSwitcher: {
      th: "TH",
      en: "EN",
    },
  },
} as const;

export default en;
