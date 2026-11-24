/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import {
  ASSETS,
  CORE_SKILLS,
  EXPERIENCE_TIMELINE,
  HERO_METRICS,
  NOTABLE_CLIENTS,
  PORTFOLIO_PROJECTS,
  PROFILE_INFO,
  PROJECT_CATEGORIES,
  SERVICES,
  SHOWREEL_CHAPTERS,
  TECH_STACK,
  TESTIMONIALS,
  WORKFLOW_STEPS,
  type PortfolioProject,
  type ProjectCategory,
} from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { ResilientImage } from './components/ResilientImage';
import { ShowreelPlayer } from './components/ShowreelPlayer';
import { ShowreelModal } from './components/ShowreelModal';
import { ProjectLightbox } from './components/ProjectLightbox';
import { VideoProjectCard } from './components/VideoProjectCard';
import { BookingSection } from './components/BookingSection';

const MARQUEE_PHRASES = [
  'tiktok & social video editing',
  'commercials & branded content',
  'motion graphics',
  'color grading & correction',
  'sound design & syncing',
  'videography & storyboarding',
  'graphic design',
];

const CINEMA_EASE = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState<string | undefined>(undefined);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const landscapeProjects = useMemo(
    () => filteredProjects.filter((project) => project.orientation === 'landscape'),
    [filteredProjects]
  );

  const verticalProjects = useMemo(
    () => filteredProjects.filter((project) => project.orientation === 'vertical'),
    [filteredProjects]
  );

  const scrollToContact = (preset?: string) => {
    if (preset) {
      setBookingPreset(preset);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#0A0A0A] text-white">
      <ScrollProgressBar />
      <Navbar onBookClick={() => scrollToContact()} />

      <main>
        {/* 1. Hero Section — Balanced Split Screen + Full-Width Proof Strip */}
        <section className="mx-auto max-w-7xl px-6 pt-12 pb-16 lg:px-10 lg:pt-20 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Typographic Anchor */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col justify-between py-2"
            >
              <div>
                <p className="text-sm font-medium text-[#FF3B30] mb-4">
                  {PROFILE_INFO.headlineRoles}
                </p>

                <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.75rem] font-bold leading-[1.06] tracking-tight text-white">
                  Turning Raw Footage Into High-Retention TikTok &amp; Brand Stories.
                </h1>

                <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">
                  I’m Kalkidan Teka—based in Addis Ababa, Ethiopia. From storyboarding and filming through TikTok editing, motion graphics, color grading, and sound design, I craft polished, on-brand visual content for brands and institutions.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsShowreelModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#FF3B30] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#E02E24] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
                  >
                    <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    <span>Watch Showreel</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToContact()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#242424] bg-[#141414] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-150 hover:border-zinc-500 hover:bg-[#1A1A1A] cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
                  >
                    <span>Hire Me</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[#242424] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400">
                <span className="text-zinc-300 font-medium">Selected Clients:</span>
                <span>SantimPay</span>
                <span aria-hidden="true">·</span>
                <span>Ethiopian Ministry of Education</span>
                <span aria-hidden="true">·</span>
                <span>Zefnesh Furniture</span>
                <span aria-hidden="true">·</span>
                <span>Elixir</span>
              </div>
            </motion.div>

            {/* Right Visual Anchor (Matching Height) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex"
            >
              <button
                type="button"
                onClick={() => setIsShowreelModalOpen(true)}
                aria-label="Play Kalkidan Teka 2026 Showreel"
                className="group relative flex w-full min-h-[320px] lg:h-full overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
              >
                <ResilientImage
                  src={ASSETS.heroSuite}
                  alt="Kalkidan Teka dark-room post-production suite with calibrated cinema monitor"
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />

                {/* Center Play Trigger */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3B30] text-white transition-transform duration-200 group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current ml-0.5" aria-hidden="true" />
                  </span>
                </div>

                {/* Bottom Unboxed Frame Metadata */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="text-xs font-medium text-zinc-300">2026 Showreel Playlist</p>
                    <p className="font-display text-lg font-semibold text-white mt-0.5">
                      Real Client Edits &amp; Color Breakdowns
                    </p>
                  </div>
                  <span className="font-mono text-xs tabular-nums text-zinc-200 shrink-0">
                    {SHOWREEL_CHAPTERS.length} Chapters · HD Audio
                  </span>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Full-Width 4-Column Quantitative Proof Row */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#242424] rounded-2xl border border-[#242424] bg-[#141414]">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className="px-6 py-6 sm:px-8">
                <p className="font-display text-3xl sm:text-4xl font-bold tabular-nums tracking-tight text-white">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Section Ribbon */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-y border-[#242424] bg-[#0E0E0E] py-3.5"
        >
          <div className="flex w-max animate-marquee items-center gap-8 text-xs font-medium tracking-wide text-zinc-400">
            {[...MARQUEE_PHRASES, ...MARQUEE_PHRASES, ...MARQUEE_PHRASES, ...MARQUEE_PHRASES].map(
              (phrase, idx) => (
                <span key={`${phrase}-${idx}`} className="flex items-center gap-8 whitespace-nowrap">
                  <span>{phrase}</span>
                  <span className="text-[#FF3B30]">·</span>
                </span>
              )
            )}
          </div>
        </div>

        {/* 2. Featured Showreel Section (Embedded Responsive 16:9 Player) */}
        <section id="showreel" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-28">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[#FF3B30] mb-3">Featured Showreel</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Real client edits, pacing, and raw-to-final color breakdowns.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
              Press play with sound or switch between chapters to watch Kalkidan’s actual TikTok promos, architectural walkthroughs, and commercial cuts.
            </p>
          </div>

          <ShowreelPlayer onExpandModal={() => setIsShowreelModalOpen(true)} />
        </section>

        {/* 3. Portfolio / Selected Work Grid */}
        <section id="work" className="border-t border-[#242424] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium text-[#FF3B30] mb-3">Selected Work</p>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  TikTok reels, commercials, and educational videos crafted to deliver.
                </h2>
              </div>

              {/* Interactive Filter Tabs */}
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-1 rounded-xl border border-[#242424] bg-[#141414] p-1 self-start lg:self-auto"
              >
                {PROJECT_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  const count =
                    category === 'All'
                      ? PORTFOLIO_PROJECTS.length
                      : PORTFOLIO_PROJECTS.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveCategory(category)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] ${
                        isActive
                          ? 'bg-[#FF3B30] text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>{category}</span>
                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          isActive ? 'text-white/80' : 'text-zinc-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Widescreen Commercials & Films (16:9) */}
            {landscapeProjects.length > 0 && (
              <div className="mb-14">
                <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-[#242424] pb-3">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                    Widescreen Commercials &amp; Films
                  </h3>
                  <span className="font-mono text-xs tabular-nums text-zinc-400">
                    16:9 Landscape · {landscapeProjects.length}{' '}
                    {landscapeProjects.length === 1 ? 'Film' : 'Films'}
                  </span>
                </div>
                <div
                  className={
                    landscapeProjects.length === 1
                      ? 'grid grid-cols-1 max-w-3xl gap-6'
                      : 'grid grid-cols-1 md:grid-cols-2 gap-6'
                  }
                >
                  {landscapeProjects.map((project, index) => (
                    <VideoProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Vertical Reels & TikTok Edits (9:16) */}
            {verticalProjects.length > 0 && (
              <div>
                <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-[#242424] pb-3">
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                    Vertical Reels &amp; TikTok Edits
                  </h3>
                  <span className="font-mono text-xs tabular-nums text-zinc-400">
                    9:16 Vertical · {verticalProjects.length}{' '}
                    {verticalProjects.length === 1 ? 'Reel' : 'Reels'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {verticalProjects.map((project, index) => (
                    <VideoProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 4. Services & 4-Step Workflow */}
        <section id="services" className="border-t border-[#242424] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: CINEMA_EASE }}
              className="max-w-2xl mb-12"
            >
              <p className="text-sm font-medium text-[#FF3B30] mb-3">Services &amp; Process</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                Post-production tailored for vertical attention.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Whether you need a high-velocity monthly creator retainer or a flagship TikTok product launch ad, every deliverable is cut for mobile retention.
              </p>
            </motion.div>

            {/* 4 Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.5,
                    delay: prefersReducedMotion ? 0 : index * 0.08,
                    ease: CINEMA_EASE,
                  }}
                  className="flex flex-col justify-between rounded-2xl border border-[#242424] bg-[#141414] p-7 sm:p-8 transition-colors duration-200 hover:border-zinc-600"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight">
                        <span className="font-mono text-base text-[#FF3B30] mr-2.5">
                          {service.number}
                        </span>
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#242424] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-xs text-zinc-400">{service.deliverables}</span>
                    <button
                      type="button"
                      onClick={() => scrollToContact(service.bookingPreset)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-[#FF3B30] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
                    >
                      <span>Book Service</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 4-Step Workflow */}
            <div className="mt-20">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: CINEMA_EASE }}
                className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8"
              >
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  From raw footage to final TikTok export in four steps.
                </h3>
                <span className="text-sm text-zinc-400">
                  Predictable handoffs · Zero agency bloat
                </span>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#242424] rounded-2xl border border-[#242424] bg-[#141414]">
                {WORKFLOW_STEPS.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: prefersReducedMotion ? 0 : index * 0.07,
                      ease: CINEMA_EASE,
                    }}
                    className="p-6 sm:p-7 flex flex-col justify-between gap-5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-sm font-medium text-[#FF3B30]">
                          {step.number}
                        </span>
                        <span className="font-mono text-xs tabular-nums text-zinc-500">
                          {step.turnaround}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-semibold text-white">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. About, Experience, Skills & Tech Stack */}
        <section id="about" className="border-t border-[#242424] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
              {/* Left Portrait */}
              <div className="lg:col-span-5 flex">
                <div className="relative w-full min-h-[420px] lg:h-full overflow-hidden rounded-2xl border border-[#242424] bg-[#141414]">
                  <ResilientImage
                    src={ASSETS.kalkidanPortrait}
                    alt="Portrait of Kalkidan Teka"
                    className="h-full w-full object-cover object-[50%_20%]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-display text-lg font-semibold text-white">
                      {PROFILE_INFO.name}
                    </p>
                    <p className="text-xs text-zinc-200 mt-0.5">
                      {PROFILE_INFO.location} · {PROFILE_INFO.education}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Profile Bio, Clients & Core Skills */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-9">
                <div>
                  <p className="text-sm font-medium text-[#FF3B30] mb-3">About Me</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Full-pipeline video editor, videographer, and graphic designer.
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-zinc-200">
                    {PROFILE_INFO.bioPrimary}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-zinc-400">
                    {PROFILE_INFO.bioSecondary}
                  </p>

                  {/* Education & Availability Summary Row */}
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 border-y border-[#242424] py-6">
                    <div>
                      <p className="text-xs text-zinc-400">Education</p>
                      <p className="mt-1 font-display text-base font-semibold text-white">
                        {PROFILE_INFO.education}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Location</p>
                      <p className="mt-1 font-display text-base font-semibold text-white">
                        {PROFILE_INFO.location}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-400">Engagement</p>
                      <p className="mt-1 font-display text-base font-semibold text-white">
                        Freelance &amp; Part-Time
                      </p>
                    </div>
                  </div>
                </div>

                {/* Notable Clients & Core Skills */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 mb-3">
                      Clients &amp; Organizations
                    </h3>
                    <p className="text-sm leading-7 text-zinc-200">
                      {NOTABLE_CLIENTS.join('  ·  ')}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-zinc-400 mb-3">
                      Core Skills &amp; Disciplines
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 border-t border-[#242424] pt-4 text-sm text-zinc-200">
                      {CORE_SKILLS.map((skill) => (
                        <div key={skill} className="flex items-baseline gap-2.5">
                          <span className="text-[#FF3B30] font-mono text-xs" aria-hidden="true">
                            —
                          </span>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline (2026 -> 2023) */}
            <div className="mt-20 pt-16 border-t border-[#242424]">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, ease: CINEMA_EASE }}
                className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-10"
              >
                <div>
                  <p className="text-sm font-medium text-[#FF3B30] mb-2">Experience</p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Production &amp; editing track record (2023–2026).
                  </h3>
                </div>
                <span className="text-sm text-zinc-400">
                  Commercials · Social Media · Interior · EdTech
                </span>
              </motion.div>

              <div className="divide-y divide-[#242424] border-y border-[#242424]">
                {EXPERIENCE_TIMELINE.map((item, index) => (
                  <motion.div
                    key={`${item.company}-${item.period}`}
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.48,
                      delay: prefersReducedMotion ? 0 : index * 0.07,
                      ease: CINEMA_EASE,
                    }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-7"
                  >
                    <div className="lg:col-span-4">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-sm tabular-nums text-[#FF3B30]">
                          {item.period}
                        </span>
                        <h4 className="font-display text-xl font-semibold text-white">
                          {item.company}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">{item.role}</p>
                    </div>

                    <ul className="lg:col-span-8 space-y-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                      {item.highlights.map((bullet) => (
                        <li key={bullet} className="flex items-baseline gap-3">
                          <span className="text-zinc-500 shrink-0" aria-hidden="true">
                            ·
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Post-Production Software Stack */}
            <div className="mt-16">
              <h3 className="text-xs font-semibold text-zinc-400 mb-4">
                Core Post-Production Tools
              </h3>
              <div className="divide-y divide-[#242424] border-y border-[#242424]">
                {TECH_STACK.map((tool) => (
                  <div
                    key={tool.name}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 py-3.5 items-baseline"
                  >
                    <span className="sm:col-span-3 font-display text-base font-semibold text-white">
                      {tool.name}
                    </span>
                    <span className="sm:col-span-3 text-xs font-medium text-[#FF3B30]">
                      {tool.role}
                    </span>
                    <span className="sm:col-span-6 text-xs sm:text-sm text-zinc-400">
                      {tool.specialty}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. Client Testimonials — Clean 3-Column Attributable Grid */}
        <section className="border-t border-[#242424] py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-medium text-[#FF3B30] mb-3">Client Feedback</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Trusted by creators and growth teams who measure results.
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#242424] bg-[#141414] p-7 sm:p-8"
                >
                  <div>
                    <p className="font-mono text-xs tabular-nums text-[#FF3B30] mb-4">
                      {item.outcome}
                    </p>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
                      “{item.quote}”
                    </p>
                  </div>

                  <footer className="mt-7 pt-5 border-t border-[#242424]">
                    <p className="font-display text-base font-semibold text-white">
                      {item.name}
                    </p>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {item.role} · {item.company}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Contact / Booking Section */}
        <BookingSection preselectedProjectType={bookingPreset} />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-[#242424] bg-[#0A0A0A] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-10 text-xs text-zinc-400">
          <p className="text-zinc-300 font-medium">
            © {new Date().getFullYear()} Kalkidan Teka. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <a href="#showreel" className="hover:text-white transition-colors">
              Showreel
            </a>
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#top" className="text-zinc-200 hover:text-[#FF3B30] transition-colors">
              Back to top
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Overlays */}
      <ShowreelModal
        isOpen={isShowreelModalOpen}
        onClose={() => setIsShowreelModalOpen(false)}
      />

      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onBookSimilar={(preset) => scrollToContact(preset)}
      />
    </div>
  );
}
