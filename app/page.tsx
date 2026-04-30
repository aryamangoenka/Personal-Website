"use client"

import { useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

// ---------- DATA ----------

const NOW = {
  company: "Assemblr",
  role: "Co-Founder",
  url: "https://assemblr.net",
  blurb:
    "Agents mined from how your teams actually work. We're early — building in San Francisco at Founders, Inc.",
  status: "Building",
}

const PROJECTS: {
  name: string
  year: string
  pitch: string
  detail: string
  stack: string[]
  link?: string
}[] = [
  {
    name: "Extractify",
    year: "2025",
    pitch: "Agentic NLP for unstructured customer conversations.",
    detail:
      "Built at ASAPP. Hybrid Regex + LLM pipeline (LangGraph + Gemini 2.5) extracting entities, intent, sentiment, and summaries from 10K+ multi-turn dialogues at 95–100% accuracy. Presented to ML leadership.",
    stack: ["LangGraph", "Gemini 2.5", "Python", "PCA / KMeans"],
  },
  {
    name: "Neuroblock",
    year: "2024 — 2025",
    pitch: "A drag-and-drop neural network builder for first-time learners.",
    detail:
      "Visually compose, train, and export classification, regression, and CNN models in the browser. Used by 500+ high school students learning ML hands-on.",
    stack: ["React", "Flask", "TensorFlow", "WebSockets"],
  },
  {
    name: "AI vs. Humans for Dietary Guidance",
    year: "2025 — 2026",
    pitch: "Benchmarking frontier models against WCRF/AICR cancer-prevention guidelines.",
    detail:
      "Research at the UMass ML for Education Lab. Systematically evaluating GPT-4.5, Gemini-2.5, Claude-3.7, and DeepSeek-R1 against evidence-based dietary questionnaires across age cohorts. Conference submission in progress.",
    stack: ["Research", "Eval", "Python"],
  },
  {
    name: "User Management System",
    year: "2025",
    pitch: "Production auth + RBAC stack shipped at Paktolus.",
    detail:
      "Django REST + FastAPI + Next.js 15. JWT auth, account lockout, file uploads, 80%+ test coverage. Used by admin, manager, and end-user tiers.",
    stack: ["Django REST", "FastAPI", "Next.js", "TypeScript"],
  },
]

const TRACK: {
  org: string
  role: string
  period: string
  note?: string
}[] = [
  {
    org: "Assemblr",
    role: "Co-Founder",
    period: "2026 —",
    note: "Founders, Inc. · San Francisco",
  },
  {
    org: "ASAPP",
    role: "AI Engineering Intern",
    period: "Sep — Dec 2025",
  },
  {
    org: "MIT Breakthrough Tech AI",
    role: "Fellow",
    period: "Apr 2025 —",
  },
  {
    org: "UMass Amherst — ML for Education Lab",
    role: "Undergraduate Researcher",
    period: "Sep 2025 — Jan 2026",
  },
  {
    org: "UMass Amherst — Advanced Learning Tech Lab",
    role: "Undergraduate Intern",
    period: "Feb 2025 — Jan 2026",
  },
  {
    org: "Paktolus",
    role: "Software Engineer Intern",
    period: "May — Jul 2025",
  },
  {
    org: "MassAI",
    role: "Project Lead",
    period: "Feb — May 2025",
  },
  {
    org: "Susquehanna International Group",
    role: "Discovery Day Fellow",
    period: "Dec 2025",
  },
  {
    org: "CICSoft @ UMass",
    role: "President",
    period: "2026 —",
  },
]

const RECOGNITION = [
  "Founders, Inc. — F26",
  "MIT Breakthrough Tech AI Fellow",
  "SIG Discovery Day Fellow",
  "1st Place — UMass Spring Classic (U1200)",
  "School Topper",
]

const EMAIL = "aryaman@assemblr.net"

const DISPATCHES: {
  kind: string
  date: string
  title: string
  lede: string
  body: string[]
  pullquote?: string
  tags?: string[]
}[] = [
  {
    kind: "Field Notes",
    date: "April 2026 · San Francisco",
    title: "I flew across the country in 24 hours. We won.",
    lede:
      "Thursday 9:08 PM: I get an email saying I've been accepted to a hackathon. Friday morning: I book a cross-country flight from Massachusetts. Friday night: I land in San Francisco. Saturday: my team wins first place.",
    body: [
      "Let me back up.",
      "1,000+ people applied. 30 builders were selected. The Voice & Video AI Hackathon at HF0's mansion in San Francisco — hosted by Knowtex, NomadicML, and HF0 — only wanted exceptional builders. I'm a sophomore at UMass Amherst. I almost didn't go because I couldn't afford the trip. I went anyway.",
      "12 hours. Unlimited credits from Anthropic and OpenAI. A room full of elite engineers building with swarms of AI agents, multimodal pipelines, and bleeding-edge voice and video models. The energy in that mansion was unreal.",
      "We built ColdBrew: a platform that gives warehouse cameras a brain. Real-time detection of safety violations, equipment failures, and shipment anomalies using NomadicML's vision API. We demoed it in front of top VCs, founders, and AI engineers in one of the most exclusive rooms in the Bay Area.",
      "First place. Won a Mac Mini. Also may have pitched a few VCs and founders about Assemblr (building with Aditya Hemanth Vellanki, launching soon) between rounds. You don't fly cross-country and not work every angle.",
      "{{PULLQUOTE}}",
      "But the prize isn't the part that mattered. The part that mattered was being 20 years old in a room at the Archbishop's Mansion with engineers from Roblox and xAI, founders building at HF0, and some of the sharpest people I've ever met. Being one of the youngest in the room and feeling like I belonged.",
      "Huge shoutout to my teammates Nisarga Patel, Mohammed Adnan, and James (Jaime) Orellana Orellana — we met that morning and shipped a winning product by evening. And special thanks to Mustafa Bal, Caroline Zhang, Jocelyn Kang, Evan Stites-Clayton, Akshay Gopalkrishnan, and Aadit Bhatia for putting together an incredible event. Great connecting with Auriel Wright, Nate Stone, Andor Kesselman, Shwetha Rao, and Rudresh Upadhyaya among many others.",
      "I fly back today. Still processing. One of the best experiences of my life. Can't wait to come back to SF.",
    ],
    pullquote:
      "If you're a student reading this and you think you can't afford to be in these rooms — find a way. Book the flight. Figure it out on the way there. The worst thing you can do is not show up.",
    tags: ["1st Place", "ColdBrew", "HF0 · Knowtex · NomadicML"],
  },
  {
    kind: "Research",
    date: "Accepted · NUTRITION 2026",
    title:
      "How accurately do AI systems give dietary advice? A colorectal cancer case study.",
    lede:
      "Last semester I collaborated with the ML4ED Lab and the UMass Nutrition Department on a research project exploring how accurately AI systems make dietary recommendations — using colorectal cancer prevention as a case study.",
    body: [
      "Most of my work is in agentic AI and developer tooling, so this was a fun exercise in cross-domain applicability. Turns out the techniques carry over pretty well.",
      "We benchmarked GPT-4.5, Gemini-2.5, Claude-3.7, and DeepSeek-R1 against the WCRF/AICR evidence-based dietary guidelines, comparing model outputs against human responses across adolescents, adults, and elders.",
      "Excited to share that the work was just accepted for presentation at NUTRITION 2026 — ASN's flagship annual meeting.",
    ],
    tags: ["ML4ED Lab", "UMass Nutrition", "ASN · NUTRITION 2026"],
  },
]

// ---------- COMPONENTS ----------

function Clock() {
  const [t, setT] = useState<string>("")
  useEffect(() => {
    const fmt = () => {
      const d = new Date()
      const sf = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Los_Angeles",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(d)
      setT(sf)
    }
    fmt()
    const id = setInterval(fmt, 30_000)
    return () => clearInterval(id)
  }, [])
  return <span className="tabular-nums">{t || "--:--"}</span>
}

function SectionLabel({
  num,
  children,
}: {
  num: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
      <span>{num}</span>
      <span className="h-px w-8 bg-[color:var(--rule)]" />
      <span>{children}</span>
    </div>
  )
}

// ---------- PAGE ----------

export default function Page() {
  return (
    <main className="grain relative">
      {/* ============ TOP STRIP ============ */}
      <header className="border-b border-[color:var(--rule)]">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-2)] md:px-10">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--accent)] blink" />
            <span>Founders, Inc · F26</span>
          </div>
          <div className="hidden gap-6 md:flex">
            <a href="#now" className="link-u">Now</a>
            <a href="#work" className="link-u">Work</a>
            <a href="#dispatches" className="link-u">Dispatches</a>
            <a href="#track" className="link-u">Track Record</a>
            <a href="#contact" className="link-u">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <span>SF</span>
            <span className="text-[color:var(--muted)]">/</span>
            <Clock />
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="mx-auto max-w-[1240px] px-6 pb-20 pt-16 md:px-10 md:pb-32 md:pt-24">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 md:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">
                ☞ A Personal Site
                <br />
                of Aryaman Goenka
                <br />
                Est. 2026
              </p>
            </div>

            <div className="col-span-12 md:col-span-10">
              <h1 className="font-serif display text-[clamp(3.2rem,11vw,10rem)]">
                Founder,
                <br />
                building <em className="italic text-[color:var(--accent)]">agents</em>.
              </h1>

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12">
                <p className="col-span-12 max-w-xl text-[17px] leading-[1.55] text-[color:var(--ink-2)] md:col-span-7">
                  I'm <span className="text-[color:var(--ink)]">Aryaman</span> — co-founder of{" "}
                  <a
                    href="https://assemblr.net"
                    target="_blank"
                    rel="noreferrer"
                    className="link-u text-[color:var(--accent)]"
                  >
                    Assemblr
                  </a>{" "}
                  at Founders, Inc. Previously shipped agentic systems at ASAPP, taught ML
                  to 500+ high schoolers with Neuroblock, and got pulled into AI through
                  MIT's Breakthrough Tech program. I build fast, write reluctantly, and
                  believe most of the interesting software hasn't been written yet.
                </p>

                <div className="col-span-12 flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.15em] text-[color:var(--muted)] md:col-span-5 md:items-end md:text-right">
                  <span>Currently in San Francisco</span>
                  <span>CS @ UMass Amherst, '28</span>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="link-u text-[color:var(--ink)]"
                  >
                    {EMAIL} →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="overflow-hidden border-y border-[color:var(--rule)] bg-[color:var(--paper-2)] py-5">
        <div className="marquee-track flex whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 pr-10 font-serif text-[clamp(1.6rem,3.5vw,2.6rem)] italic text-[color:var(--ink-2)]">
              <span>Founders, Inc.</span>
              <span className="text-[color:var(--accent)]">✦</span>
              <span>ASAPP</span>
              <span className="text-[color:var(--accent)]">✦</span>
              <span>MIT Breakthrough Tech AI</span>
              <span className="text-[color:var(--accent)]">✦</span>
              <span>UMass Amherst</span>
              <span className="text-[color:var(--accent)]">✦</span>
              <span>SIG Discovery Day</span>
              <span className="text-[color:var(--accent)]">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ NOW ============ */}
      <section id="now" className="border-b border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
          <SectionLabel num="01">Now</SectionLabel>

          <div className="mt-10 grid grid-cols-12 gap-y-10 md:gap-x-10">
            <div className="col-span-12 md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                <span className="inline-block h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-[color:var(--accent)] blink mr-2" />
                Currently building
              </p>
              <h2 className="mt-4 font-serif text-[clamp(2.4rem,6vw,4.5rem)] display">
                Assemblr.
              </h2>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                F26 · Founders, Inc · San Francisco
              </p>
            </div>

            <div className="col-span-12 md:col-span-7">
              <p className="font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.25] text-[color:var(--ink)]">
                {NOW.blurb}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[12px] uppercase tracking-[0.18em]">
                <a
                  href="https://assemblr.net"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--ink)] px-5 py-3 text-[color:var(--paper)] transition-colors hover:bg-[color:var(--accent)]"
                >
                  Visit assemblr.net
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section id="work" className="border-b border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <SectionLabel num="02">Selected Work</SectionLabel>
              <h2 className="mt-6 font-serif text-[clamp(2.6rem,7vw,5.5rem)] display">
                Things I've shipped.
              </h2>
            </div>
            <p className="hidden max-w-xs text-right font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)] md:block">
              ☟ Four out of a longer list.
              <br />
              The rest live on{" "}
              <a
                href="https://github.com/aryamangoenka"
                target="_blank"
                rel="noreferrer"
                className="link-u text-[color:var(--ink)]"
              >
                GitHub
              </a>
              .
            </p>
          </div>

          <ol className="mt-16">
            {PROJECTS.map((p, i) => (
              <li
                key={p.name}
                className="group grid grid-cols-12 gap-y-3 border-t border-[color:var(--rule)] py-8 transition-colors hover:bg-[color:var(--paper-2)] md:gap-x-8 md:py-10"
              >
                <div className="col-span-2 font-mono text-[12px] tracking-wider text-[color:var(--muted)] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="col-span-10 md:col-span-5">
                  <h3 className="font-serif text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {p.year}
                  </p>
                </div>

                <div className="col-span-12 md:col-span-6">
                  <p className="text-[17px] leading-[1.55] text-[color:var(--ink)]">
                    {p.pitch}
                  </p>
                  <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--ink-2)]">
                    {p.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[color:var(--rule)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--ink-2)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
            <li className="border-t border-[color:var(--rule)]" />
          </ol>
        </div>
      </section>

      {/* ============ DISPATCHES ============ */}
      <section id="dispatches" className="border-b border-[color:var(--rule)] bg-[color:var(--paper-2)]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
          <SectionLabel num="03">Dispatches</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(2.6rem,7vw,5.5rem)] display">
            Recently.
          </h2>

          <div className="mt-16 space-y-20 md:space-y-28">
            {DISPATCHES.map((d, i) => (
              <article
                key={d.title}
                className="grid grid-cols-12 gap-y-6 border-t border-[color:var(--rule)] pt-10 md:gap-x-10 md:pt-14"
              >
                <aside className="col-span-12 md:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
                    №{String(i + 1).padStart(2, "0")} · {d.kind}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    {d.date}
                  </p>
                  {d.tags && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {d.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[color:var(--rule)] bg-[color:var(--paper)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--ink-2)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </aside>

                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-serif text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] text-[color:var(--ink)]">
                    {d.title}
                  </h3>
                  <p className="mt-6 font-serif text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.4] text-[color:var(--ink-2)]">
                    {d.lede}
                  </p>

                  <div className="mt-8 space-y-5 text-[16.5px] leading-[1.7] text-[color:var(--ink-2)]">
                    {d.body.map((para, j) =>
                      para === "{{PULLQUOTE}}" && d.pullquote ? (
                        <blockquote
                          key={j}
                          className="my-4 border-l-2 border-[color:var(--accent)] pl-6 font-serif italic text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.35] text-[color:var(--ink)]"
                        >
                          {d.pullquote}
                        </blockquote>
                      ) : (
                        <p key={j}>{para}</p>
                      )
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TRACK RECORD ============ */}
      <section id="track" className="border-b border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1240px] px-6 py-24 md:px-10 md:py-32">
          <SectionLabel num="04">Track Record</SectionLabel>
          <h2 className="mt-6 font-serif text-[clamp(2.6rem,7vw,5.5rem)] display">
            Where I've been.
          </h2>

          <div className="mt-16 grid grid-cols-12 gap-y-10 md:gap-x-12">
            <ol className="col-span-12 md:col-span-8">
              {TRACK.map((row) => (
                <li
                  key={`${row.org}-${row.role}`}
                  className="grid grid-cols-12 items-baseline gap-2 border-t border-[color:var(--rule)] py-5 transition-colors hover:bg-[color:var(--paper-2)]"
                >
                  <div className="col-span-12 font-serif text-[1.35rem] leading-tight md:col-span-5">
                    {row.org}
                  </div>
                  <div className="col-span-7 text-[15px] text-[color:var(--ink-2)] md:col-span-4">
                    {row.role}
                    {row.note && (
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--muted)] mt-1">
                        {row.note}
                      </span>
                    )}
                  </div>
                  <div className="col-span-5 text-right font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted)] md:col-span-3">
                    {row.period}
                  </div>
                </li>
              ))}
              <li className="border-t border-[color:var(--rule)]" />
            </ol>

            <aside className="col-span-12 md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Recognition
              </p>
              <ul className="mt-4 space-y-3">
                {RECOGNITION.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 font-serif text-[1.1rem] leading-snug"
                  >
                    <span className="mt-2 inline-block h-px w-4 shrink-0 bg-[color:var(--accent)]" />
                    {r}
                  </li>
                ))}
              </ul>

              <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Top Skills
              </p>
              <p className="mt-3 text-[15px] leading-[1.55] text-[color:var(--ink-2)]">
                Agents · LLMs · Full-stack ML systems · Fast, opinionated product
                building.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section id="contact" className="relative overflow-hidden">
        <div className="mx-auto max-w-[1240px] px-6 py-28 md:px-10 md:py-40">
          <SectionLabel num="05">Contact</SectionLabel>
          <h2 className="mt-8 font-serif display text-[clamp(3rem,10vw,9rem)]">
            Say <em className="italic text-[color:var(--accent)]">hello</em>.
          </h2>

          <p className="mt-10 max-w-xl text-[18px] leading-[1.55] text-[color:var(--ink-2)]">
            I read every email. Best ways in: an intro to a builder, a sharp
            critique of Assemblr, or a project you're stuck on. I respond fastest
            to short notes.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Email · Best inbox
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-2 block font-serif text-[clamp(1.4rem,2.6vw,2rem)] link-u"
              >
                {EMAIL}
              </a>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Reply window · 24 hours
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Elsewhere
              </p>
              <ul className="mt-2 space-y-1 font-serif text-[clamp(1.2rem,2vw,1.5rem)]">
                <li>
                  <a
                    href="https://x.com/goenka_aryaman"
                    target="_blank"
                    rel="noreferrer"
                    className="link-u"
                  >
                    X / Twitter ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/aryaman-goenka"
                    target="_blank"
                    rel="noreferrer"
                    className="link-u"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/aryamangoenka"
                    target="_blank"
                    rel="noreferrer"
                    className="link-u"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    href="https://assemblr.net"
                    target="_blank"
                    rel="noreferrer"
                    className="link-u"
                  >
                    Assemblr ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[color:var(--rule)] bg-[color:var(--paper-2)]">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-6 px-6 py-10 font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--ink-2)] md:flex-row md:items-center md:px-10">
          <div className="flex items-center gap-3">
            <span className="font-serif text-[1.6rem] not-italic text-[color:var(--ink)]">
              AG
            </span>
            <span className="text-[color:var(--muted)]">— Aryaman Goenka</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[color:var(--muted)]">
            <span>© {new Date().getFullYear()}</span>
            <span>Made in San Francisco</span>
            <span>Set in Instrument Serif &amp; Inter</span>
            <a href="#" className="link-u text-[color:var(--ink)]">
              Back to top ↑
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
