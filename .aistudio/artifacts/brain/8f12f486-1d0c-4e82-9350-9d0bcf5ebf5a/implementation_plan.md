# Kalkidan Teka — TikTok Video Editor Portfolio

A sleek, high-converting cinematic dark-mode portfolio website for **Kalkidan Teka**, a professional video editor specializing in high-retention TikTok videos, short-form storytelling, kinetic motion graphics, sound design, and color grading.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Your Phase 1 preference is locked in below, with recommended defaults applied for the skipped visual and interactive options. Please review and approve to begin building, or request any adjustments first.

- **Confirmed Specialization**: **TikTok Videos** — Copy, project case studies, filter categories, services, and booking options will focus on short-form vertical retention editing, viral hooks, kinetic captions, sound design, and TikTok brand ads.
- **Default Accent Color (Cinema Crimson `#FF3B30`)**: Anchors the `#0A0A0A` obsidian canvas and `#141414` editorial cards for bold, cinema-grade visual contrast across CTAs, active tabs, and video timeline playheads.
- **Default Interactive Showcases**: Includes a **playable simulated showreel & project lightbox player** (with live tabular timecode, scrubbable timeline, chapter markers, and 9:16 vertical preview staging) plus an **interactive drag-to-compare Before/After Color Grading slider**.
- **Contact & Booking Behavior**: Validated client-side inquiry form displaying an instant confirmation receipt with a one-click pre-filled email handoff to `kalteka243@gmail.com` and click-to-copy email controls—keeping the site fast and self-contained without requiring a backend database.

---

## 1. Overview & Core Concept

- **What It Does**: Showcases Kalkidan Teka's editing reel, curated TikTok case studies with edit breakdowns, service offerings, four-step production workflow, creative background, client testimonials, and a frictionless project inquiry flow.
- **Target Audience**: TikTok creators, DTC e-commerce brands, podcast hosts, and marketing agencies seeking a reliable short-form editor who engineers high 3-second hook retention and watch-time completion.
- **Key Value**: Proves editing craft immediately above the fold through cinematic visual framing, interactive playback controls, measurable retention outcomes, and a clear path from portfolio browsing to booking a project.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Immediate Proof & Showreel Playback**: Visitors land on a full-width split cinematic hero with bold typography and a vertical TikTok reel preview motif. Clicking **"Watch Showreel"** launches the interactive fullscreen cinema modal; clicking **"Hire Me"** or **"Book a Project"** smoothly scrolls to the booking section.
2. **Embedded 16:9 Showreel Exploration**: Scrolling down reveals a dedicated 16:9 widescreen showreel player with interactive play/pause, scrubbable timeline bar, live timecode (`00:00:00:00`), and clickable chapter cues (Hook Architecture, Kinetic Typography, Sound Design, Final Color Grade).
3. **Portfolio Filtering & Case Study Lightbox**: Visitors filter the selected work Bento grid across categories (**All**, **TikTok Viral**, **Brand Ads**, **Talking Head**, **Color Grading**). Selecting any card opens a high-contrast lightbox modal showcasing a staged 9:16 vertical player alongside the edit breakdown (**Goal**, **Software Used**, and **Results / Views**).
4. **Interactive Color Grading Proof**: An interactive before/after drag slider lets prospective clients scrub between ungraded flat log footage and Kalkidan's final cinema-grade TikTok look.
5. **Service Evaluation & Booking**: Visitors scan the 4 core services, 4-step workflow, Kalkidan's bio/stats/tool stack, and 3 client testimonials before submitting a validated inquiry (Name, Email, Project Type, Budget Range, Message) with instant visual confirmation.

### Visual Identity & Theme
- **Aesthetic Direction**: Dark-room cinema suite meets editorial monograph—uncluttered, media-first, high-contrast, with generous negative space and zero generic pill-badge clutter or decorative status dots.
- **Color Palette & Mood (60-30-10 Discipline)**:
  - `--background`: `#0A0A0A` (60% deep obsidian canvas)
  - `--surface`: `#141414` with subtle `#242424` hairline borders (30% structural cards and media frames)
  - `--foreground`: `#FFFFFF` primary text and `#A1A1AA` muted secondary copy (WCAG AA compliant, optically compensated for dark mode)
  - `--accent`: `#FF3B30` Cinema Crimson (10% focal budget reserved strictly for primary CTAs, active tabs, and timeline playhead indicators)
- **Typography & Hierarchy**:
  - *Display Headings*: **Outfit** (Bold 700, tight tracking, `text-wrap: balance` to prevent orphan words)
  - *Body Prose*: **Plus Jakarta Sans** (Regular 400 / Medium 500, 15px–16px comfortable reading measure)
  - *Timecode & Metrics*: **JetBrains Mono** with `tabular-nums` strictly for video timecodes, durations, and numeric stats
- **Component Styling & Layout**:
  - *Top Bar Contract*: Strict single-row 3-zone sticky header (`Kalkidan Teka` wordmark · 5 single-line nav links: Showreel, Work, Services, About, Contact · 1 primary `Book a Project` CTA), with a compact mobile menu staying well within the 15% mobile sticky viewport cap.
  - *Zero-Pill Discipline*: Project metadata (`Client · Role · Views`) renders as crisp unboxed typography with typographic dot separators (`·`). Editorial numbering (`01.`, `02.`, `03.`, `04.`) structures the workflow cleanly without mechanical code prefixes or thick left-accent borders.
  - *Bespoke Visual Assets*: All portfolio thumbnails, showreel frames, color-grading comparison visuals, and Kalkidan's studio portrait will be custom-generated high-resolution assets with resilient fallback styling.

### Interactive Feedback & Motion
- Smooth compositor-only animations (`transform`, `opacity`) via `motion` for section reveals, modal staging, and thumbnail hover depth (settling within 200ms).
- Keyboard accessibility (`Escape` to close lightbox/showreel modals, visible `focus-visible` outlines, keyboard-operable color slider and scrubbers).
- Inline form validation with explicit error text (never color-only) and a clear post-submission confirmation card.

---

## 3. Key Product Decisions & Trade-Offs

- **Simulated Interactive Cinema Player vs. External Video Embeds**
  - *Chosen Approach*: Build a tactile, custom-styled interactive video player (animated ken-burns/cut-sequence playback across bespoke generated frames, real-time scrubbable timeline, live SMPTE-style timecode, sound-wave visualizer, and clickable edit chapters) for both the 16:9 Showreel and 9:16 TikTok Lightbox modals.
  - *Why*: External YouTube/TikTok iframe embeds frequently fail, show third-party branding/ads, or break in sandboxed environments, while a dedicated interactive player guarantees instant, reliable playback and lets Kalkidan easily swap in hosted `.mp4` sources later.
  - *Alternatives Considered*: Static image placeholders (less engaging) or hardcoded external embeds (fragile and visually jarring).

- **Bento / Editorial Portfolio Grid with 9:16 Lightbox Staging**
  - *Chosen Approach*: Present portfolio cards in a balanced responsive grid with clean metadata beneath each frame, opening into a split lightbox where the left pane stages a crisp vertical 9:16 TikTok playback frame and the right pane displays the structured edit breakdown.
  - *Why*: Preserves clean horizontal grid alignment on 1440px desktops while authentically showcasing vertical TikTok framing inside the detail viewer.

- **Client-Side Inquiry Flow with Email Handoff**
  - *Chosen Approach*: Validate and process booking requests locally with an instant interactive booking summary receipt, copyable confirmation reference, and a direct `mailto:` launch option alongside copy-to-clipboard email.
  - *Why*: Delivers a complete, zero-latency booking experience tailored to a personal portfolio without introducing database setup or login friction.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram
```
┌──────────────────────────────────────────────────────────────────────────┐
│                         Application Shell (App)                          │
│  State: activeCategory | selectedProject | isShowreelOpen | mobileNav    │
└───────┬──────────────────────────┬───────────────────────────┬───────────┘
        │                          │                           │
        ▼                          ▼                           ▼
┌───────────────────┐    ┌────────────────────────┐   ┌────────────────────┐
│  Sticky Top Bar   │    │   Page Sections Flow   │   │  Overlay Modals    │
│ ┌───────────────┐ │    │  1. Hero + Stats Strip │   │ ┌────────────────┐ │
│ │ Wordmark      │ │    │  2. 16:9 Showreel      │   │ │ Showreel Modal │ │
│ │ 5 Nav Links   │ │    │  3. Work Filter & Grid │   │ │ (16:9 Player)  │ │
│ │ Book CTA      │ │    │  4. Color Grade Slider │   │ └────────────────┘ │
│ └───────────────┘ │    │  5. Services & 4-Step  │   │ ┌────────────────┐ │
│ + Mobile Drawer   │    │  6. About & Tech Stack │   │ │ Project Detail │ │
└───────────────────┘    │  7. Testimonials (3x)  │   │ │ Lightbox (9:16 │ │
                         │  8. Booking Form/Links │   │ │ + Breakdown)   │ │
                         └────────────────────────┘   │ └────────────────┘ │
                                                      └────────────────────┘
                                     │
                                     ▼
                  ┌──────────────────────────────────────┐
                  │   Structured Portfolio Data Module   │
                  │  (Projects, Showreel Chapters,       │
                  │   Services, Workflow, Tools, Reviews)│
                  └──────────────────────────────────────┘
```

### Data Model & State
- **PortfolioProject**: `id`, `title`, `client`, `category` (`TikTok Viral` | `Brand Ads` | `Talking Head` | `Color Grading`), `role`, `views`, `retentionMetric`, `duration`, `thumbnail`, `storyboardFrames`, `goal`, `software[]`, `results`, `aspectHint`.
- **ShowreelChapter**: `id`, `label`, `timestampSec`, `caption`, `frameImage`.
- **BookingInquiry**: `name`, `email`, `projectType`, `budget`, `message`, paired with validation errors and submitted receipt state.

### Interactive Component & State Mapping
- **Navigation & Smooth Scroll**: Clicking any section link or CTA smoothly scrolls to the target anchor and closes the mobile drawer if open.
- **Interactive Video Player (Showreel & Lightbox)**: Maintains `isPlaying`, `currentTime`, `isMuted`, and `activeChapter` via a clean `requestAnimationFrame`/interval ticker; scrubbing the progress bar or clicking a chapter updates playback time and active visual frame immediately.
- **Portfolio Filter Bar**: Mutates `activeCategory` to animate and filter project cards in real time, displaying result count and an accessible empty-state fallback if needed.
- **Before/After Color Grading Slider**: Supports pointer drag, touch drag, and arrow-key adjustments (`0%`–`100%`) to reveal Raw Log vs. Graded frames cleanly via CSS clip-path.
- **Booking Inquiry Form**: Validates required fields and email syntax on submit, prevents empty submissions with clear inline messages, transitions to an interactive confirmation state with reset and `mailto:` options, and provides instant toast feedback when copying Kalkidan's direct email.
