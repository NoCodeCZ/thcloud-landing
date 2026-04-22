import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Database,
  FileText,
  Layers3,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ViewContentTracker } from "@/components/tracking/ViewContentTracker";
import { BlueprintStickyCTA } from "@/components/blueprint/BlueprintStickyCTA";
import { Button } from "@/components/ui/button";

const pageCopy = {
  en: {
    title: "AI Infrastructure Playbook",
    description:
      "A web-native playbook for building data foundations, dashboards, and AI agents that actually work in a business setting.",
    eyebrow: "THCloud.AI Playbook",
    subtitle:
      "This is the web version of the playbook, rebuilt as a proper reading experience. It covers the core decisions behind data foundations, dashboard architecture, and AI agents that operate on real business context.",
    sectionLinks: [
      { id: "how-to-use", label: "How to Use It" },
      { id: "failure-modes", label: "Why AI Fails" },
      { id: "data-foundation", label: "Data Foundation" },
      { id: "analytics-layer", label: "Analytics Layer" },
      { id: "ai-agent", label: "AI Agent" },
      { id: "roadmap", label: "Implementation" },
    ],
    ctaLabel: "Book a Call",
    finalEyebrow: "Next Step",
    finalTitle: "Book a discovery call when you are ready to scope Phase 1 properly.",
    finalBody:
      "We will map your current data landscape, identify the highest-value connections first, and show you what the rollout should look like for your business.",
    fallback: "Prefer to go through the deeper qualification form first?",
    fallbackLink: "Open the full demo intake form",
  },
  th: {
    title: "โครงสร้างพื้นฐาน AI ด้านข้อมูลสำหรับธุรกิจ",
    description:
      "playbook ฉบับเว็บสำหรับการวาง Data Foundation, Dashboard และ AI Agent ที่ใช้งานได้จริงในธุรกิจ",
    eyebrow: "THCloud.AI Playbook",
    subtitle:
      "นี่คือเวอร์ชันเว็บไซต์ของ playbook ที่ถูกเขียนใหม่ให้เหมาะกับการอ่านบนเว็บ ครอบคลุมตั้งแต่การวาง data foundation, การออกแบบ dashboard ไปจนถึง AI agent ที่เชื่อมกับบริบทธุรกิจจริง",
    sectionLinks: [
      { id: "how-to-use", label: "วิธีใช้คู่มือ" },
      { id: "failure-modes", label: "ทำไม AI ล้มเหลว" },
      { id: "data-foundation", label: "Data Foundation" },
      { id: "analytics-layer", label: "Analytics Layer" },
      { id: "ai-agent", label: "AI Agent" },
      { id: "roadmap", label: "การติดตั้ง" },
    ],
    ctaLabel: "จองคุย",
    finalEyebrow: "ขั้นตอนถัดไป",
    finalTitle: "ถ้าพร้อมจะเริ่ม Phase 1 แบบจริงจัง จอง discovery call ได้เลย",
    finalBody:
      "เราจะช่วย map data landscape ปัจจุบันของคุณ ระบุการเชื่อมต่อที่มีมูลค่าสูงสุดก่อน และวาง rollout ที่เหมาะกับธุรกิจคุณจริง",
    fallback: "ถ้าอยากกรอกข้อมูลเชิงลึกก่อนคุย",
    fallbackLink: "เปิดฟอร์ม demo แบบเต็ม",
  },
} as const;

const playbookContent = {
  guideParagraphs: [
    "คู่มือฉบับนี้ไม่ใช่เอกสารขายสินค้า แต่เป็นคู่มืออ้างอิงจริงสำหรับการวาง AI data infrastructure ให้ใช้งานได้จริงในธุรกิจที่มีหลายช่องทาง หลายทีม และหลายแหล่งข้อมูล",
    "คุณไม่จำเป็นต้องอ่านแบบเรียงหน้าเสมอไป ถ้าคุณอยู่ในช่วงเริ่มต้น ให้โฟกัส Data Foundation ก่อน ถ้ามี dashboard แล้วแต่ AI ยังไม่ตอบโจทย์ ให้ข้ามไปดูส่วน Analytics Layer และ AI Agent ได้ทันที",
  ],
  guideCards: [
    {
      title: "ยังไม่มีระบบข้อมูลกลาง",
      body: "เริ่มจาก Data Foundation เพื่อออกแบบ schema, audit แหล่งข้อมูล, และวาง ingestion ให้ถูกตั้งแต่ต้น",
    },
    {
      title: "มีข้อมูล แต่ dashboard ยังไม่ตอบคำถาม",
      body: "โฟกัส Analytics Layer โดยเริ่มจากการตัดสินใจที่ทีมต้องทำทุกวัน ไม่ใช่เริ่มจาก metric ที่มีอยู่",
    },
    {
      title: "มี dashboard แล้ว อยากเพิ่ม AI",
      body: "ไปที่ส่วน AI Agent เพื่อแยกให้ชัดว่าเมื่อไหร่ควรใช้ RAG และเมื่อไหร่ควรใช้ tool calling กับข้อมูลสด",
    },
    {
      title: "กำลังเลือกเครื่องมือ",
      body: "อ่านส่วน Tech Stack และ Roadmap เพื่อมอง trade-off ระหว่าง open-source, SaaS และลำดับการติดตั้งแต่ละเฟส",
    },
  ],
  failuresIntro:
    "ธุรกิจส่วนใหญ่ไม่ได้พลาดเพราะโมเดล AI ไม่เก่ง แต่พลาดเพราะลำดับการวางระบบผิด ทำให้ AI ไปอยู่บนข้อมูลที่กระจัดกระจาย ล้าสมัย หรือไม่มีโครงสร้างพอให้ใช้งานจริง",
  failures: [
    {
      title: "เริ่มจาก Interface ก่อน",
      body: "การซื้อ chatbot หรือ AI assistant ก่อนที่ข้อมูลจะสะอาดและรวมเป็นหนึ่ง จะทำให้ demo ดูดีแต่ใช้งานจริงไม่ได้ เพราะคำตอบจะดึงจากข้อมูลไม่ครบหรือไม่ทันเหตุการณ์",
    },
    {
      title: "รวมข้อมูลโดยไม่ Normalise",
      body: "การย้ายข้อมูลทุกอย่างมาไว้ใน warehouse เดียวไม่ได้แปลว่าข้อมูลพร้อมใช้ ถ้าแต่ละช่องทางใช้คำเรียก รายละเอียด และ grain ต่างกัน คุณแค่รวมความสับสนไว้ที่เดียว",
    },
    {
      title: "Engineering มากเกินไป",
      body: "การออกแบบเพื่อรองรับทุก use case ตั้งแต่วันแรก มักทำให้ pipeline ซับซ้อนเกินไป schema นามธรรมเกินไป และ dashboard ตอบคำถามที่ไม่มีใครถามจริง",
    },
    {
      title: "มอง AI เป็น Product ไม่ใช่ Layer",
      body: "AI tool เป็นเพียง interface ส่วน intelligence ที่ใช้งานได้จริงเกิดจากการเชื่อม AI เข้ากับ warehouse, dashboard และเครื่องมือธุรกิจที่มีข้อมูลสดและเชื่อถือได้",
    },
  ],
  foundationIntro: [
    "Data Foundation คือทุกอย่างที่อยู่ใต้ dashboard และ AI agent: ข้อมูลอยู่ที่ไหน มาอย่างไร สดแค่ไหน และถูกนิยามอย่างไร ถ้าทำส่วนนี้ถูกต้อง layer ด้านบนจะเสถียร ถ้าทำผิดคุณจะต้อง rebuild หลายรอบ",
    "เริ่มจากการ audit ข้อมูลที่มีอยู่จริงก่อนเขียน pipeline แม้แต่บรรทัดเดียว เพราะการรู้แหล่งข้อมูล เจ้าของข้อมูล และความถี่การเปลี่ยนแปลง คือสิ่งที่กำหนด design ทั้งหมด",
  ],
  foundationSteps: [
    {
      title: "1. Audit ข้อมูลทุกแหล่ง",
      body: "ตอบให้ได้ว่าข้อมูลอยู่ที่ไหน อยู่ใน format อะไร เปลี่ยนบ่อยแค่ไหน ใครเป็นเจ้าของ และยังขาดอะไรอยู่บ้างก่อนเริ่มเชื่อมต่อ",
    },
    {
      title: "2. ออกแบบ Schema ก่อน Ingest",
      body: "กำหนด vocabulary, entity หลัก, grain และ primary key ให้ชัดก่อน เพื่อไม่ต้องย้อนแก้ dashboard, query และ AI agent ภายหลัง",
    },
    {
      title: "3. เลือกสถาปัตยกรรม Ingestion ให้เหมาะ",
      body: "แยกให้ชัดว่าแหล่งไหนควรใช้ API แบบ incremental, แหล่งไหนใช้ scheduled export และแหล่งไหนควรใช้ manual upload พร้อม template",
    },
    {
      title: "4. วาง Data Quality Check ตั้งแต่วันแรก",
      body: "Row count validation, null checks, freshness monitoring และ reconciliation กับ source data ต้องอยู่ใน pipeline ตั้งแต่ต้น ไม่ใช่เพิ่มทีหลังเมื่อ dashboard เริ่มผิด",
    },
  ],
  auditQuestions: [
    "ข้อมูลอยู่ที่ไหน และเชื่อมต่อผ่าน API, export, webhook หรือ manual ได้อย่างไร",
    "ข้อมูลอยู่ในรูปแบบ JSON, CSV, database table หรือไฟล์ที่ต้องแปลงก่อน",
    "ข้อมูลเปลี่ยนบ่อยแค่ไหน เพื่อกำหนดความถี่การ sync ที่เหมาะสม",
    "ใครเป็นเจ้าของข้อมูล และใครอนุมัติการเข้าถึงเมื่อมีปัญหา",
    "ยังขาดข้อมูลอะไรอยู่บ้างที่จำเป็นต่อ dashboard หรือ AI use case ในอนาคต",
  ],
  analyticsIntro: [
    "Dashboard ที่ดีไม่ได้เริ่มจาก 'เรามีข้อมูลอะไร' แต่เริ่มจาก 'ทีมนี้ต้องตัดสินใจอะไรทุกวัน' ถ้าตัวเลขเปลี่ยนแล้วไม่มี action ตามมา metric นั้นไม่ควรอยู่บนหน้าจอ",
    "สำหรับธุรกิจ commerce หลายช่องทาง โครงสร้าง dashboard ที่ครอบคลุมส่วนใหญ่คือ Marketing, Sales และ Operations เพราะสามทีมนี้เป็นคนใช้ข้อมูลตัดสินใจแบบต่อเนื่องทุกวัน",
  ],
  dashboards: [
    {
      title: "Marketing Dashboard",
      body: "ใช้มองประสิทธิภาพการใช้จ่าย: ROAS, CPQL, CTR, conversion rate และการกระจาย budget ระหว่างช่องทาง",
    },
    {
      title: "Sales Dashboard",
      body: "ใช้มองการดำเนินงานรายได้: pipeline, lead-to-opportunity, deal progress, average order value และ quota attainment",
    },
    {
      title: "Operations Dashboard",
      body: "ใช้มองการปฏิบัติการจริง: inventory, stock turn, on-time delivery, lead time, shortage rate และจุดคอขวดของหน้างาน",
    },
  ],
  analyticsPrinciple:
    "หลักการที่สำคัญที่สุดคือเริ่มจากการตัดสินใจ ไม่ใช่เริ่มจาก data availability เพราะ dashboard ที่ทีมใช้ทุกวันต้องเป็น surface สำหรับ action ไม่ใช่เป็นแค่ report ที่ดูแล้วจบ",
  agentIntro: [
    "AI agent ทำงานได้จริงก็ต่อเมื่อรู้ว่าตัวเองกำลังเข้าถึงข้อมูลแบบไหน และข้อมูลนั้นเชื่อถือได้หรือไม่ จุดนี้คือสิ่งที่หลายระบบข้ามไป ทำให้ AI ตอบคล้ายจะถูกแต่ใช้งานต่อไม่ได้",
    "สำหรับงานธุรกิจจริง คุณต้องแยกให้ชัดว่าอะไรควรใช้ parametric knowledge, อะไรควรใช้ RAG และอะไรต้องใช้ tool calling กับข้อมูลสด",
  ],
  agentMethods: [
    {
      title: "Parametric Knowledge",
      body: "เหมาะกับการร่าง content, reasoning ทั่วไป และ Q&A ที่ไม่อิงข้อมูลธุรกิจเฉพาะของคุณ",
    },
    {
      title: "RAG",
      body: "เหมาะกับ product knowledge, policy, FAQ, history และข้อมูล unstructured ที่ต้องดึงเอกสารเข้า prompt ตอน query",
    },
    {
      title: "Tool Use / Function Calling",
      body: "เหมาะกับตัวเลขสด, inventory ปัจจุบัน, dashboard query, API call และทุกอย่างที่ต้องอิง state ล่าสุดของธุรกิจ",
    },
  ],
  agentTypes: [
    "Q&A agent สำหรับตอบคำถามจาก dashboard และ mart ที่ตรวจสอบแล้ว",
    "Insight agent สำหรับสรุป anomaly, trend และ bottleneck ที่เกิดขึ้นในแต่ละทีม",
    "Workflow agent สำหรับ trigger ขั้นตอนต่อเนื่อง เช่น follow-up, approval หรือ task routing",
    "Monitoring agent สำหรับเฝ้าดู sync failure, freshness issue และ threshold สำคัญ",
    "Multi-step agent สำหรับงานที่ต้องดึงข้อมูล วิเคราะห์ และตัดสินใจหลายรอบก่อนตอบ",
  ],
  ragWarning:
    "RAG มักล้มเหลวเมื่อ chunk ใหญ่เกินไป, embedding model จัดการภาษาไทยได้ไม่ดี หรือไม่มีข้อมูลที่เกี่ยวข้องใน knowledge base เลย ดังนั้นข้อมูลสดด้านตัวเลขควรใช้ tool call มากกว่าให้ RAG เดาแทน",
  stackIntro: [
    "การเลือก stack ที่ดีสำหรับบริบทนี้ไม่ได้อยู่ที่ตัวไหนดังที่สุด แต่อยู่ที่ว่าใครเป็นเจ้าของข้อมูล ขยายต้นทุนอย่างไร และทีมของคุณพร้อมรับ maintenance ระดับไหน",
    "สำหรับธุรกิจไทยที่มีข้อมูลลูกค้า การเงิน และการดำเนินงานอยู่ในระบบของตัวเอง แนวทาง open-source self-hosted มักเป็น default ที่ปลอดภัยกว่าในระยะยาว เพราะไม่ lock-in และควบคุม data sovereignty ได้ชัด",
  ],
  stackPrinciples: [
    "Data sovereignty มาก่อน convenience เมื่อข้อมูลมีความอ่อนไหวหรือมีข้อกำหนดทางธุรกิจ",
    "เลือก SaaS เมื่อ time-to-value สำคัญกว่า customization และทีมไม่พร้อมดู infrastructure",
    "ตรึง image version, backup, monitoring และ secret management ตั้งแต่วันแรกเพื่อไม่ให้ infra สะสมความเสี่ยงเงียบๆ",
  ],
  stackLayers: [
    { title: "AI Interface", body: "Open WebUI เป็นหน้าใช้งานเดียวสำหรับทั้งทีม และ route ไปยัง model provider หลายเจ้าได้" },
    { title: "Model Router", body: "LiteLLM ใช้ควบคุม routing, cost cap และการเลือก model ตาม use case" },
    { title: "Warehouse", body: "ClickHouse เหมาะกับ analytical workload หนัก ส่วน PostgreSQL เหมาะกับ operational state และ workflow" },
    { title: "Ingestion", body: "Airbyte เหมาะกับ connector เชิงมาตรฐาน แต่บางจุดยังต้องเสริมด้วย Python script หรือ scheduled job" },
    { title: "Vector Search", body: "pgvector เหมาะเมื่ออยากให้ vector search อยู่ใกล้ operational data และไม่อยากแตก stack โดยไม่จำเป็น" },
  ],
  roadmapIntro:
    "ลำดับการติดตั้งที่ดีคืออย่าเริ่มเฟสใหม่จนกว่าเฟสก่อนหน้าจะ validate แล้ว เพราะต้นทุนของการข้าม validation มักสูงกว่าการทำช้าอย่างมีวินัย",
  roadmapPhases: [
    {
      title: "เฟส 1 — Audit และสถาปัตยกรรมข้อมูล",
      duration: "สัปดาห์ 1–2",
      body: "สรุปรายการแหล่งข้อมูล ออกแบบ schema, grain, naming และระบุ ingestion strategy ของแต่ละแหล่งให้เรียบร้อยก่อน build อะไรจริง",
    },
    {
      title: "เฟส 2 — Infrastructure และ Ingestion",
      duration: "สัปดาห์ 2–4",
      body: "deploy service หลัก ตั้งค่า network, secrets, backup, monitoring และเริ่มโหลดข้อมูลจากแหล่งสำคัญเข้าระบบ",
    },
    {
      title: "เฟส 3 — Transformation และ Data Mart",
      duration: "สัปดาห์ 4–6",
      body: "normalize ข้อมูลจาก raw ไป staged และสร้าง mart ที่พร้อมให้ dashboard กับ AI query ใช้งานได้จริง",
    },
    {
      title: "เฟส 4 — Dashboard Build และ Review",
      duration: "สัปดาห์ 6–8",
      body: "สร้าง dashboard ตามการตัดสินใจของแต่ละทีม ตรวจสอบ metric สำคัญกับ stakeholder และทำ reconciliation กับ source data",
    },
    {
      title: "เฟส 5 — AI Agent Deployment",
      duration: "สัปดาห์ 8–10",
      body: "เชื่อม agent เข้ากับ mart, tool function และ workflow ที่พร้อมใช้งานจริง พร้อม guardrail, logging และ feedback loop",
    },
  ],
  checklistGroups: [
    {
      title: "Data Foundation",
      items: [
        "audit แหล่งข้อมูลครบ พร้อม owner, connection type และ known gaps",
        "กำหนด grain ของทุก fact table ชัดเจนว่า 1 row แทนอะไร",
        "ตกลงนิยาม revenue, customer identity และ attribution policy แล้ว",
      ],
    },
    {
      title: "Infrastructure",
      items: [
        "service ทุกตัวรันใน Docker พร้อม pinned image version",
        "secrets ไม่อยู่ใน plain text และมี backup/restore test แล้ว",
        "monitoring, alerting และ disk/memory thresholds ถูกตั้งค่าครบ",
      ],
    },
    {
      title: "ก่อน Dashboard Sign-off",
      items: [
        "revenue reconciliation กับ platform อยู่ในกรอบที่ยอมรับได้",
        "row count, null check และ freshness check ผ่านสำหรับ connector สำคัญ",
        "อย่างน้อย 3 metric ถูก verify โดย business stakeholder กับ source data",
      ],
    },
    {
      title: "ก่อน Agent Go-Live",
      items: [
        "tool function สำคัญมี unit test และ historical validation",
        "agent ตอบ query หลักตรงกับ dashboard และ source data",
        "มี hallucination guardrail, log และ feedback loop สำหรับการปรับ prompt กับข้อมูล",
      ],
    },
  ],
  worksheetIntro:
    "สอง artifacts ที่ช่วยให้ implementation ไม่หลุด scope คือ worksheet สำหรับ audit แหล่งข้อมูล และ framework สำหรับจัดลำดับ KPI ตามการตัดสินใจของแต่ละทีม",
} as const;

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-4 py-5 md:py-6">
      <div className="mx-auto max-w-[1180px] rounded-[36px] border border-slate-200 bg-white px-5 py-10 shadow-[0_30px_100px_rgba(15,23,42,0.16)] md:px-10 md:py-14">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/72 md:text-sm">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-medium text-brand-title md:text-4xl">{title}</h2>
          <div className="mt-8 border-t border-slate-200 pt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

function ParagraphGroup({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <p
          key={item}
          className="text-base leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]"
        >
          {item}
        </p>
      ))}
    </div>
  );
}

function FigureBleed({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative left-1/2 w-[calc(100%+2.5rem)] -translate-x-1/2 overflow-hidden rounded-[32px] border border-slate-200 bg-white p-2 shadow-[0_24px_80px_rgba(15,23,42,0.12)] md:w-[calc(100%+5rem)] md:p-3 lg:w-[calc(100%+8rem)] xl:w-[calc(100%+10rem)] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full rounded-[24px]"
      />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = pageCopy[locale as Locale] ?? pageCopy.th;

  return {
    title: `${copy.title} | THCloud.AI`,
    description: copy.description,
    alternates: {
      languages: {
        th: "/th/blueprint/read",
        en: "/en/blueprint/read",
        "x-default": "/th/blueprint/read",
      },
    },
  };
}

export default async function BlueprintReadPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { locale } = await params;
  const { email } = await searchParams;
  const dict = await getDictionary(locale as Locale);
  const copy = pageCopy[locale as Locale] ?? pageCopy.th;
  const demoHref = `/${locale}/demo${email ? `?email=${encodeURIComponent(email)}` : ""}`;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#0c1020_0%,#131935_24%,#0c1020_100%)] text-white">
      <ViewContentTracker contentName="AI Infrastructure Playbook" />
      <BlueprintStickyCTA href="#book-a-call" label={copy.ctaLabel} />
      <TopBar locale={locale} actionLabel={copy.ctaLabel} actionHref="#book-a-call" />

      <section className="px-4 pb-8 pt-8 md:pb-10 md:pt-14">
        <div className="mx-auto max-w-[1180px] rounded-[40px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.28)]">
          <div className="rounded-[30px] bg-white px-6 py-10 text-brand-title md:px-12 md:py-14">
            <div className="mx-auto max-w-5xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-navy/12 bg-brand-navy/5 px-3 py-1 text-sm font-medium text-brand-navy">
                <FileText className="h-4 w-4" />
                {copy.eyebrow}
              </div>
              <h1 className="mt-6 text-4xl font-medium leading-tight md:max-w-4xl md:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-600 md:text-lg font-[family-name:var(--font-prompt)]">
                {copy.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {copy.sectionLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={`#${link.id}`}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 border-t border-slate-200 pt-8">
                <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-brand-navy/70">
                  ครอบคลุม: Data Architecture · ETL · Warehouse · Dashboard · AI Agent · Deployment
                </p>
                <div className="mt-8 overflow-hidden rounded-[30px] border border-slate-200 bg-[#f8fbff] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:p-8">
                  <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-navy/60">
                      THCloud.AI Blueprint
                    </p>
                    <h2 className="mt-3 text-3xl font-medium leading-tight text-brand-title md:text-5xl">
                      คู่มือฉบับเว็บที่จัดวางเหมือน playbook จริง
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                      อ่านเป็นลำดับตั้งแต่ data foundation ไปจนถึง AI agent หรือข้ามไปยัง section ที่ตรงกับสถานะของธุรกิจคุณได้ทันที
                    </p>
                  </div>
                  <div className="mt-8">
                    <Image
                      src="/blueprint-playbook/images/image4.png"
                      alt="THCloud.AI logo"
                      width={985}
                      height={255}
                      className="mx-auto h-auto w-full max-w-[760px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-5xl grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: "Data Foundation",
                body: "audit, schema design, ingestion strategy และ data quality check ที่วางถูกตั้งแต่ต้น",
              },
              {
                icon: Layers3,
                title: "Dashboard & KPI",
                body: "ออกแบบ dashboard โดยเริ่มจากการตัดสินใจของทีม ไม่ใช่เริ่มจากรายชื่อ metric",
              },
              {
                icon: Network,
                title: "AI Agent",
                body: "แยกให้ชัดว่าเมื่อไหร่ควรใช้ RAG, เมื่อไหร่ควรใช้ tool call และจะ deploy อย่างไรให้เชื่อถือได้",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-slate-200 bg-slate-50 p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-navy/8 text-brand-navy">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-medium text-brand-title">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                    {item.body}
                  </p>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      <SectionShell id="how-to-use" eyebrow="Reading Guide" title="วิธีใช้คู่มือนี้ให้ได้ประโยชน์สูงสุด">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <ParagraphGroup items={playbookContent.guideParagraphs} />
          <div className="grid gap-4 sm:grid-cols-2">
            {playbookContent.guideCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-medium text-brand-title">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="failure-modes" eyebrow="Failure Modes" title="ทำไม AI ส่วนใหญ่ถึงใช้ไม่ได้ผลจริง">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6">
            <p className="text-base leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
              {playbookContent.failuresIntro}
            </p>
            <div className="mt-6 rounded-2xl border border-red-200 bg-white p-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-red-700">
                Core Principle
              </p>
              <p className="mt-3 text-lg leading-relaxed text-brand-title">
                ลำดับที่ถูกต้องคือ Data Foundation ก่อน → Analytics Layer ถัดมา → AI Interface เป็นขั้นสุดท้าย
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {playbookContent.failures.map((failure) => (
              <div
                key={failure.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-medium text-brand-title">{failure.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {failure.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="data-foundation" eyebrow="Part 1" title="การออกแบบ Data Foundation">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-8">
            <ParagraphGroup items={playbookContent.foundationIntro} />
            <div className="rounded-[26px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-navy/70">
                Audit Questions
              </p>
              <div className="mt-5 space-y-3">
                {playbookContent.auditQuestions.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {playbookContent.foundationSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-medium text-brand-title">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <FigureBleed
          src="/blueprint-playbook/images/image5.png"
          alt="Data ingestion architecture and pipeline flowchart"
          width={1408}
          height={768}
          className="mt-10"
        />

        <div className="mt-10 rounded-[28px] border border-emerald-200 bg-emerald-50 p-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <h3 className="text-xl font-medium text-brand-title">Data Quality ต้องอยู่ใน pipeline ตั้งแต่วันแรก</h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
            Row count validation, freshness monitoring, null checks และ reconciliation กับ source data คือสิ่งที่ป้องกันไม่ให้ dashboard และ AI สูญเสียความน่าเชื่อถือเมื่อ sync ล้มเหลวแบบเงียบๆ
          </p>
        </div>
      </SectionShell>

      <SectionShell id="analytics-layer" eyebrow="Part 2" title="การสร้าง Analytics Layer">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="space-y-6">
            <ParagraphGroup items={playbookContent.analyticsIntro} />
            <div className="rounded-[28px] border border-sky-200 bg-sky-50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">
                Design Principle
              </p>
              <p className="mt-3 text-lg leading-relaxed text-brand-title">
                {playbookContent.analyticsPrinciple}
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {playbookContent.dashboards.map((dashboard) => (
              <div
                key={dashboard.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-medium text-brand-title">{dashboard.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {dashboard.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <FigureBleed
            src="/blueprint-playbook/images/image2.png"
            alt="Dashboard example"
            width={1903}
            height={956}
            className="mt-10"
          />
          <FigureBleed
            src="/blueprint-playbook/images/image6.png"
            alt="KPI prioritisation framework"
            width={1408}
            height={768}
          />
        </div>
      </SectionShell>

      <SectionShell id="ai-agent" eyebrow="Part 3" title="AI Agent ทำงานจริงอย่างไร">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <ParagraphGroup items={playbookContent.agentIntro} />
            <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700">
                RAG Warning
              </p>
              <p className="mt-3 text-base leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
                {playbookContent.ragWarning}
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            {playbookContent.agentMethods.map((method) => (
              <div
                key={method.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-medium text-brand-title">{method.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {method.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <FigureBleed
          src="/blueprint-playbook/images/image1.png"
          alt="RAG vs Tool Use"
          width={1408}
          height={768}
          className="mt-10"
        />

        <div className="mt-10 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-brand-navy" />
            <h3 className="text-xl font-medium text-brand-title">5 ประเภท agent ที่ควรเริ่มคิดใน Phase 1</h3>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {playbookContent.agentTypes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <p className="text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="tech-stack" eyebrow="Part 4" title="การประเมิน Tech Stack แต่ละ Layer">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <ParagraphGroup items={playbookContent.stackIntro} />
            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-navy/70">
                Selection Rules
              </p>
              <div className="mt-5 space-y-3">
                {playbookContent.stackPrinciples.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {playbookContent.stackLayers.map((layer) => (
              <div
                key={layer.title}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
              >
                <h3 className="text-lg font-medium text-brand-title">{layer.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                  {layer.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell id="roadmap" eyebrow="Implementation" title="การสร้างแบบเป็นรายเฟส">
        <div className="max-w-3xl">
          <p className="text-base leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
            {playbookContent.roadmapIntro}
          </p>
        </div>

        <FigureBleed
          src="/blueprint-playbook/images/image3.png"
          alt="Data audit worksheet"
          width={1408}
          height={768}
          className="mt-10"
        />

        <div className="mt-10 space-y-4">
          {playbookContent.roadmapPhases.map((phase) => (
            <div
              key={phase.title}
              className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-medium text-brand-title md:text-[1.7rem]">
                  {phase.title}
                </h3>
                <span className="rounded-full bg-brand-navy/8 px-3 py-1 text-xs font-medium text-brand-navy">
                  {phase.duration}
                </span>
              </div>
              <p className="mt-3 max-w-5xl text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)] md:text-base">
                {phase.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {playbookContent.checklistGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
            >
              <h3 className="text-lg font-medium text-brand-title">{group.title}</h3>
              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="worksheets" eyebrow="Artifacts" title="worksheet และ framework ที่ควรใช้คู่กับการติดตั้ง">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <p className="text-base leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
            {playbookContent.worksheetIntro}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Data Source Audit Worksheet",
                body: "ใช้เก็บรายการแหล่งข้อมูล format, owner, frequency และสถานะ readiness ก่อนเริ่ม build จริง",
                image: "/blueprint-playbook/images/image3.png",
              },
              {
                title: "KPI Prioritisation Framework",
                body: "ใช้จัดลำดับ metric ตามการตัดสินใจของทีม marketing, sales และ operations เพื่อไม่ให้ dashboard กลายเป็น report ที่ไม่มี action",
                image: "/blueprint-playbook/images/image6.png",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-slate-50"
              >
                <div className="border-b border-slate-200 p-5">
                  <h3 className="text-lg font-medium text-brand-title">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 font-[family-name:var(--font-prompt)]">
                    {item.body}
                  </p>
                </div>
                <div className="p-3">
                  <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={1408}
                      height={768}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <section id="book-a-call" className="px-4 pb-24 pt-6">
        <div className="mx-auto grid max-w-[1180px] gap-8 rounded-[36px] border border-slate-200 bg-white px-5 py-10 shadow-[0_30px_100px_rgba(15,23,42,0.16)] md:px-10 md:py-14 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 text-brand-title md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-navy/75">
              {copy.finalEyebrow}
            </p>
            <h2 className="mt-4 text-2xl font-medium leading-tight text-brand-title md:text-4xl">
              {copy.finalTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
              {copy.finalBody}
            </p>

            <div className="mt-8 space-y-3">
              {dict.demo.demoFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-navy/10 text-brand-navy">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 font-[family-name:var(--font-prompt)]">
                    {feature}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500 font-[family-name:var(--font-prompt)]">
                {copy.fallback}
              </p>
              <Button
                asChild
                variant="link"
                className="mt-2 h-auto px-0 text-sm font-medium text-brand-navy"
              >
                <Link href={demoHref}>
                  {copy.fallbackLink}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_120px_rgba(8,15,40,0.45)]">
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 text-brand-title">
              <CalendarDays className="h-5 w-5 text-brand-navy" />
              <div>
                <p className="text-sm font-medium text-brand-title">{dict.demo.pickTime}</p>
                <p className="text-xs text-brand-subtitle">{dict.demo.pickTimeSubtitle}</p>
              </div>
            </div>
            <iframe
              src="https://cal.tonghuagroup.com/tatchat"
              className="h-[760px] w-full border-0"
              title="Book a discovery call"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
