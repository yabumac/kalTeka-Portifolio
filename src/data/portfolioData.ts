export type ProjectCategory =
  | 'All'
  | 'TikTok & Social'
  | 'Brand Ads'
  | 'Color Grading';

export type VideoOrientation = 'landscape' | 'vertical';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: Exclude<ProjectCategory, 'All'>;
  orientation: VideoOrientation;
  role: string;
  views: string;
  retentionMetric: string;
  durationSec: number;
  durationLabel: string;
  videoUrl: string;
  posterTimeSec: number;
  hookCaption: string;
  goal: string;
  software: string[];
  results: string;
  bookingPreset: string;
  beatMarkers: { timeSec: number; label: string; caption: string }[];
}

export interface ShowreelChapter {
  id: string;
  label: string;
  timecodeLabel: string;
  caption: string;
  clientCredit: string;
  videoUrl: string;
  posterTimeSec: number;
  orientation: VideoOrientation;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  deliverables: string;
  bookingPreset: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  turnaround: string;
}

export interface ExperienceItem {
  company: string;
  period: string;
  role: string;
  highlights: string[];
}

export interface TechTool {
  name: string;
  role: string;
  specialty: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  outcome: string;
}

export const PROFILE_INFO = {
  name: 'Kalkidan Teka',
  headlineRoles: 'Videographer / Video Editor · Digital Content Creator · Graphic Designer',
  location: 'Addis Ababa, Ethiopia',
  phone: '0902635157',
  email: 'kalteka243@gmail.com',
  telegram: '@kalteka243',
  telegramUrl: 'https://t.me/kalteka243',
  education: 'Diploma in Computer Science',
  bioPrimary:
    'Versatile Video Editor and Graphic Designer with a Diploma in Computer Science and hands-on experience producing commercials, social media content, and branded video across a range of industries.',
  bioSecondary:
    'Skilled in the full post-production pipeline — from storyboarding and filming through editing, motion graphics, color grading, and sound design — with a track record of delivering polished, on-brand visual content for clients including the Ethiopian Ministry of Education, Zefnesh Furniture, and Elixir. Comfortable working independently across part-time and freelance engagements, consistently meeting branding and instructional requirements on tight timelines.',
};

export const NOTABLE_CLIENTS = [
  'SantimPay',
  'Ethiopian Ministry of Education',
  'Zefnesh Furniture',
  'Elixir',
  'EdTech Hub ET',
  'Neo Production',
  'Jasmine Cosmetics',
  'Vista Interior',
  'Abay Homes Real Estate',
  'Addis Cake & Bake Expo',
  'Milkis Cafe',
  'Adey Decorations',
  'WOW MART',
  'Select Academy',
];

export const CORE_SKILLS = [
  'Video Editing & Post-Production',
  'Motion Graphics',
  'Color Grading & Correction',
  'Storyboarding & Storytelling',
  'Sound Design & Syncing',
  'Graphic Design',
  'Videography / Filming',
  'Digital Content Creation for Social Media',
];

export const EXPERIENCE_TIMELINE: ExperienceItem[] = [
  {
    company: 'EdTech Hub ET',
    period: '2026',
    role: 'Video Editor / Video Production',
    highlights: [
      'Edited instructional and promotional videos for online learning programs, ensuring clarity and audience engagement.',
      'Storyboarded educational modules in collaboration with the content team, aligning visuals with instructional goals.',
      'Applied motion graphics and captioning to improve accessibility and retention across video lessons.',
    ],
  },
  {
    company: 'Neo Production',
    period: '2025',
    role: 'Video Editor / Video Production',
    highlights: [
      'Edited commercial and branded video projects for multiple clients, from raw footage to final delivery.',
      'Handled color grading and correction to maintain a consistent visual tone across projects.',
      'Coordinated with the production team on shot lists and post-production timelines.',
    ],
  },
  {
    company: 'Jasmine Cosmetics',
    period: '2025',
    role: 'Video Editor',
    highlights: [
      'Produced promotional and social media video content showcasing product lines.',
      'Edited short-form videos optimized for Instagram, TikTok, and other social platforms.',
      'Synced sound design and music to strengthen brand storytelling in product videos.',
    ],
  },
  {
    company: 'Vista Interior',
    period: '2024',
    role: 'Video Editor',
    highlights: [
      'Edited video content highlighting interior design and furniture showcases.',
      'Produced walkthrough and product videos to support marketing and sales efforts.',
      'Applied color correction to accurately represent product textures and finishes.',
    ],
  },
  {
    company: 'Select Academy',
    period: '2023',
    role: 'Video Editor / Video Production',
    highlights: [
      'Edited training and promotional videos for academy programs.',
      'Assisted with storyboarding and shot planning for instructional content.',
      'Built foundational post-production skills across editing, grading, and sound.',
    ],
  },
];

export const ASSETS = {
  heroSuite: '/src/assets/images/hero_showreel_suite_1795161313310.jpg',
  colorGrade: '/src/assets/images/color_grade_frame_1795161313676.jpg',
  kalkidanPortrait: '/assets/aistudio/image_def38836.png',
} as const;

export const VIDEOS = {
  santimpayEvolution:
    '/assets/aistudio/Santimpay_Evolution_0c8cf709.mp4',
  abayHomes04:
    '/assets/aistudio/Abay_Homes_17-dec_Video_04_0ba58d22.mp4',
  vistaHistory:
    '/assets/aistudio/Vista_Architectural___interior___vistainterior21__16fd2f7b.mp4',
  vistaG3Walkthrough:
    '/assets/aistudio/snaptik_7572981489894296888_v3_dfa20080.mp4',
  vistaHistoryCut:
    '/assets/aistudio/snaptik_7561850233789893899_v3_dfbd8e83.mp4',
  rawVsFinalFinishing:
    '/assets/aistudio/post_edfe0f18.mp4',
  adeyDecorations:
    '/assets/aistudio/Adey_Decorations___adey.decorations__cf3a8ef8.mp4',
  vistaGlassPartitions:
    '/assets/aistudio/snaptik_7578182669385747768_v3_7ecc5a09.mp4',
  wowMartFranchise:
    '/assets/aistudio/WOW_MART_FRANCHIZE___wowmart.et__b2597004.mp4',
  abayHomes01:
    '/assets/aistudio/Abay_Homes_13-Dec_Video_01_1b68fdc9.mp4',
  addisCakeExpoR2:
    '/assets/aistudio/Addis_Cake_And_Bake_Expo_S2_R2_V1_b3e8fbd8.mp4',
  abayHomes03:
    '/assets/aistudio/Abay_Homes_13-Dec_Video_03_c5fe0569.mp4',
  addisCakeExpoR9V1:
    '/assets/aistudio/Addis_cake_and_bake_expo_S2_R9_Video_01_43b03db5.mp4',
  addisCakeExpoR9V2:
    '/assets/aistudio/Addis_cake_and_bake_expo_S2_R9_Video_02_e8fc1e5b.mp4',
  milkisCafe:
    '/assets/aistudio/Milkis_Cafe_R1_V2_be4a3b67.mp4',
} as const;

export const SHOWREEL_CHAPTERS: ShowreelChapter[] = [
  {
    id: 'santimpay-evolution',
    label: '01. Brand Film & Motion',
    timecodeLabel: '1:00',
    caption: 'Archival currency storytelling from Amole & Birr to holographic QR payments.',
    clientCredit: 'SantimPay · Evolution of Money (16:9)',
    videoUrl: VIDEOS.santimpayEvolution,
    posterTimeSec: 15,
    orientation: 'landscape',
  },
  {
    id: 'raw-final',
    label: '02. Vertical Raw-to-Final',
    timecodeLabel: '0:23',
    caption: 'Side-by-side 9:16 color grading, B-roll compositing, and light-flash cuts.',
    clientCredit: 'Vista Interior · TikTok Breakdown (9:16)',
    videoUrl: VIDEOS.rawVsFinalFinishing,
    posterTimeSec: 2,
    orientation: 'vertical',
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'All',
  'TikTok & Social',
  'Brand Ads',
  'Color Grading',
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'santimpay-currency-evolution',
    title: 'Evolution of Ethiopian Currency — Brand Film',
    client: 'SantimPay',
    category: 'Brand Ads',
    orientation: 'landscape',
    role: 'Motion Graphics Designer, Storytelling Editor & Sound',
    views: '16:9 Brand Film',
    retentionMetric: 'Archival & HUD Motion GFX',
    durationSec: 60,
    durationLabel: '1:00',
    videoUrl: VIDEOS.santimpayEvolution,
    posterTimeSec: 15,
    hookCaption: 'Tracing Ethiopia’s commerce from Amole salt bars and Axumite coins to digital QR.',
    goal: 'Position SantimPay as the historic next chapter of Ethiopian commerce through a documentary-grade brand film rich in cultural storytelling and custom motion graphics.',
    software: ['After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Audition'],
    results: 'Designed vintage 8mm film frames, yellow geometric wipe transitions, highlighted historical typography plates, and futuristic holographic POS scan overlays.',
    bookingPreset: 'Commercial & Branded Video',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Vintage 8mm Ethiopian heritage & landscapes opening sequence' },
      { timeSec: 11, label: '0:11', caption: 'Animated Amole salt, Axumite Santim & 1945 Birr history chapters' },
      { timeSec: 44, label: '0:44', caption: 'Futuristic HUD digital QR checkout into SantimPay brand lockup' },
    ],
  },
  {
    id: 'abay-homes-real-estate-investing',
    title: 'Real Estate Investment & Retail Shops — Site Reel',
    client: 'Abay Homes Real Estate',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Short-Form Video Editor & Kinetic Typography',
    views: '9:16 TikTok Reel',
    retentionMetric: 'Bold Amharic Hook & 3D Towers',
    durationSec: 22,
    durationLabel: '0:22',
    videoUrl: VIDEOS.abayHomes04,
    posterTimeSec: 1,
    hookCaption: 'Punchy wealth-mindset hook cutting into Mexico twin-tower 3D architectural flyovers.',
    goal: 'Hook prospective investors on TikTok within the first 2 seconds and present Abay Homes’ Mexico commercial retail units (starting at 10 m², Ground to 4th floor).',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    results: 'Paired bold green kinetic Amharic hook typography and clean on-site audio with crisp twin-tower 3D renders and the volumetric Abay Homes logo outro.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Bold kinetic Amharic investment hook at construction site' },
      { timeSec: 8, label: '0:08', caption: 'Aerial 3D twin-tower & rooftop plaza architectural reveal' },
      { timeSec: 17, label: '0:17', caption: 'Volumetric glowing green Abay Homes Real Estate 3D outro' },
    ],
  },
  {
    id: 'abay-homes-luxury-apartments',
    title: 'Mexico Africa Union Apartments — Site Promo',
    client: 'Abay Homes Real Estate',
    category: 'Brand Ads',
    orientation: 'vertical',
    role: 'Commercial Editor, Motion & Sound Design',
    views: 'Real Estate Promo',
    retentionMetric: 'Whip-Zoom & 3D Logo',
    durationSec: 31,
    durationLabel: '0:31',
    videoUrl: VIDEOS.abayHomes01,
    posterTimeSec: 5.5,
    hookCaption: 'Crane-to-engineer whip transition with stacked amenity B-roll and glowing titles.',
    goal: 'Highlight Abay Homes’ flagship Mexico Africa Union apartment development with high-energy construction B-roll, luxury amenities, and a clear 390,000 Birr down-payment offer.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Audition'],
    results: 'Delivered a crisp real-estate commercial blending on-site energy, stacked pool/gym/spa picture-in-picture cards, and a volumetric 3D logo animation.',
    bookingPreset: 'Commercial & Branded Video',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Crane & concrete-mixer montage whipping into site host' },
      { timeSec: 10, label: '0:10', caption: 'Stacked B-roll cards showcasing pool, gym, spa & sauna' },
      { timeSec: 22, label: '0:22', caption: 'Volumetric light-ray Abay Homes Real Estate 3D outro' },
    ],
  },
  {
    id: 'milkis-cafe-culinary',
    title: 'Culinary & Hospitality Atmosphere Reel',
    client: 'Milkis Cafe & Restaurant',
    category: 'Color Grading',
    orientation: 'vertical',
    role: 'Videographer, Colorist & Rhythm Editor',
    views: 'Hospitality Film',
    retentionMetric: 'Warm Film Grade',
    durationSec: 58,
    durationLabel: '0:58',
    videoUrl: VIDEOS.milkisCafe,
    posterTimeSec: 8,
    hookCaption: 'Warm cinematic color grade and tactile slow-motion dining storytelling.',
    goal: 'Capture the inviting ambiance, murals, Ethiopian beyaynetu platters, crispy mains, and signature cocktails of Milkis Cafe in a relaxed, appetite-driven vertical film.',
    software: ['DaVinci Resolve', 'Premiere Pro', 'Audition'],
    results: 'Elevated food colors and natural skin tones with a cohesive teal-and-amber cafe grade synced smoothly to lo-fi percussion.',
    bookingPreset: 'Color Grading & Graphic Design',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Architectural lighting & colorful mural intro sequence' },
      { timeSec: 8, label: '0:08', caption: 'Rich color-graded beyaynetu & crispy chicken macro pulls' },
      { timeSec: 35, label: '0:35', caption: 'Slow-motion dining moments closing on Addis Ababa street view' },
    ],
  },
  {
    id: 'addis-cake-expo-teaser',
    title: 'Free Entry Teaser — Cake & Bake Expo 2026',
    client: 'Addis Cake & Bake Expo',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Short-Form Editor & Motion Designer',
    views: 'Event TikTok Promo',
    retentionMetric: 'Skit Hook & Aerial Stack',
    durationSec: 52,
    durationLabel: '0:52',
    videoUrl: VIDEOS.addisCakeExpoR2,
    posterTimeSec: 18,
    hookCaption: 'Playful office skit cutting straight into decadent dessert B-roll and AICC aerials.',
    goal: 'Drive massive free-entry attendance for Addis Cake & Bake Expo 2026 by pairing a relatable opening hook with mouthwatering pastry, coffee, and boba showcases.',
    software: ['Premiere Pro', 'After Effects', 'CapCut', 'Audition'],
    results: 'Combined comedic pacing, film-burn transitions, stacked convention-center drone views, and an energetic paint-splash brand outro.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Office desk comedy skit hook into dark-studio reveal' },
      { timeSec: 15, label: '0:15', caption: 'Layered baklava, espresso, smoothie & boba rapid montage' },
      { timeSec: 36, label: '0:36', caption: 'Triple-stack AICC drone frames into animated expo outro' },
    ],
  },
  {
    id: 'abay-homes-commercial-shops',
    title: 'Gated Compound Shops — On-Site Reel',
    client: 'Abay Homes Real Estate',
    category: 'Brand Ads',
    orientation: 'vertical',
    role: 'Video Editor, VFX Match-Cut & Sound',
    views: 'Real Estate Reel',
    retentionMetric: 'Hard-Hat Drop Match Cut',
    durationSec: 29,
    durationLabel: '0:29',
    videoUrl: VIDEOS.abayHomes03,
    posterTimeSec: 5,
    hookCaption: 'Falling hard-hat opener into fast-paced site sales pitch with paper-rip transitions.',
    goal: 'Promote commercial retail spaces starting from 10 m² inside Abay Homes’ gated Mexico compound with standout visual hooks for TikTok feeds.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    results: 'Used a stop-scroll hard-hat drop opener, bold glowing Amharic typography, and paper-tear transitions to maintain high viewer attention.',
    bookingPreset: 'Commercial & Branded Video',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Floating hard-hat drop cut straight into host walk-and-talk' },
      { timeSec: 9, label: '0:09', caption: 'Paper-rip transition & glowing 10 m² retail callout' },
      { timeSec: 20, label: '0:20', caption: 'Volumetric Abay Homes Real Estate animated lockup' },
    ],
  },
  {
    id: 'addis-cake-expo-partners',
    title: 'Season 2 Highlights & Partner Showcase',
    client: 'Addis Cake & Bake Expo',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Event Highlight Editor & Motion Graphics',
    views: 'Event Recap Reel',
    retentionMetric: 'Gesture-Tracked Partner Logos',
    durationSec: 48,
    durationLabel: '0:48',
    videoUrl: VIDEOS.addisCakeExpoR9V1,
    posterTimeSec: 12,
    hookCaption: 'Crowd energy, chocolate fountains, and gesture-tracked partner logo pop-ups.',
    goal: 'Build social proof for Season 2 of Addis Cake & Bake Expo by blending crowd footage with interactive brand highlights for Koba, Nib Chocolate, Danob, and Hamokacha.',
    software: ['After Effects', 'Premiere Pro', 'Audition'],
    results: 'Synced presenter hand gestures directly to floating partner badges and a 3D cutout of the AICC convention hall.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 3, label: '0:03', caption: 'Light-leak event montage: darts, tasting & chocolate fountain' },
      { timeSec: 12, label: '0:12', caption: 'Gesture-synced partner logos (Koba, Nib, Danob, Hamokacha)' },
      { timeSec: 26, label: '0:26', caption: 'Floating AICC venue cutout into January 23–25 date card' },
    ],
  },
  {
    id: 'addis-cake-expo-bakers-gaming',
    title: 'Bakers, Coffee & Gaming — Expo Promo',
    client: 'Addis Cake & Bake Expo',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Video Editor & Kinetic Captions',
    views: '9:16 Event Promo',
    retentionMetric: 'PiP B-Roll & Kinetic Titles',
    durationSec: 40,
    durationLabel: '0:40',
    videoUrl: VIDEOS.addisCakeExpoR9V2,
    posterTimeSec: 6,
    hookCaption: 'Warm lounge framing accented with crisp picture-in-picture bakery and gaming cards.',
    goal: 'Attract both home bakers and casual weekend visitors by highlighting baking suppliers, cafes, juice bars, and PlayStation gaming zones in one tight promo.',
    software: ['Premiere Pro', 'After Effects', 'CapCut'],
    results: 'Kept talking-head delivery lively through timed cyan-bordered B-roll cards, punchy Amharic titles, and upbeat audio pacing.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Direct hook with bold Amharic motion titles' },
      { timeSec: 6, label: '0:06', caption: 'Three-card bakery, cafe & PlayStation entertainment breakdown' },
      { timeSec: 21, label: '0:21', caption: 'High-energy splash-paint expo logo & Free Entry CTA' },
    ],
  },
  {
    id: 'adey-decorations-promo',
    title: 'Illuminated Botanical Decor Promo',
    client: 'Adey Decorations',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Short-Form Video Editor & Sound Sync',
    views: '9:16 TikTok Promo',
    retentionMetric: 'Whip-Spin Transitions',
    durationSec: 22,
    durationLabel: '0:22',
    videoUrl: VIDEOS.adeyDecorations,
    posterTimeSec: 3.2,
    hookCaption: 'Upbeat product storytelling with macro close-ups and whip-spin cuts.',
    goal: 'Showcase Adey Decorations’ signature illuminated hanging planters for bedrooms, lounges, and gifts in a punchy vertical TikTok promo.',
    software: ['Premiere Pro', 'After Effects', 'CapCut', 'Audition'],
    results: 'Combined crisp host framing with macro botanical B-roll, rotational transitions, and beat-matched music for strong mobile retention.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Direct host hook introducing custom wall lighting' },
      { timeSec: 4, label: '0:04', caption: 'Warm backlit wooden planter macro showcase' },
      { timeSec: 12, label: '0:12', caption: '360° whip-spin transition into greenery detail' },
    ],
  },
  {
    id: 'raw-vs-final-finishing',
    title: 'Natural vs. Synthetic Materials — Raw to Final',
    client: 'Vista Interior',
    category: 'Color Grading',
    orientation: 'vertical',
    role: 'Color Grading, Motion & Split Breakdown',
    views: 'Before / After Reel',
    retentionMetric: 'Full Post-Production',
    durationSec: 23,
    durationLabel: '0:23',
    videoUrl: VIDEOS.rawVsFinalFinishing,
    posterTimeSec: 1.5,
    hookCaption: 'Side-by-side proof of how grading, B-roll, and motion transform flat footage.',
    goal: 'Demonstrate the full post-production leap from flat ungraded studio footage to a vibrant, motion-enhanced TikTok reel.',
    software: ['DaVinci Resolve', 'Premiere Pro', 'After Effects'],
    results: 'Showcases rich crimson saturation, crisp skin-tone correction, material swatch pop-ups, and architectural B-roll transitions in real time.',
    bookingPreset: 'Color Grading & Graphic Design',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Split-screen raw footage vs. vibrant graded master' },
      { timeSec: 3, label: '0:03', caption: 'Animated material swatch overlays & flash transition' },
      { timeSec: 10, label: '0:10', caption: 'Architectural timber & modern interior B-roll sequence' },
    ],
  },
  {
    id: 'vista-g3-residence',
    title: '250 m² Modern G+3 Residence Walkthrough',
    client: 'Vista Architectural & Interior',
    category: 'Brand Ads',
    orientation: 'vertical',
    role: 'Video Editor & Motion Graphics',
    views: 'Architectural Reel',
    retentionMetric: '3D Cutout & Plot GFX',
    durationSec: 60,
    durationLabel: '1:00',
    videoUrl: VIDEOS.vistaG3Walkthrough,
    posterTimeSec: 5,
    hookCaption: 'Plot measurement animations paired with day-to-night 3D architectural renders.',
    goal: 'Present a full 10×25m G+3 residential design clearly on TikTok, balancing host narration with spatial diagrams and 3D exterior/basement walkthroughs.',
    software: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
    results: 'Delivered an authoritative architectural showcase featuring animated plot dimensions, floating 3D cutouts, and seamless day-to-night lighting reveals.',
    bookingPreset: 'Interior & Product Showcase',
    beatMarkers: [
      { timeSec: 1, label: '0:01', caption: 'Animated red plot boundary overlay on aerial site shot' },
      { timeSec: 14, label: '0:14', caption: 'Floating 3D front & rear elevation cutouts over blur' },
      { timeSec: 41, label: '0:41', caption: 'Basement parking & illuminated evening facade reveal' },
    ],
  },
  {
    id: 'wow-mart-franchise-ad',
    title: 'WOW MART Franchise Launch Commercial',
    client: 'WOW MART',
    category: 'Brand Ads',
    orientation: 'vertical',
    role: 'Commercial Editor & Motion Designer',
    views: 'Franchise Campaign',
    retentionMetric: 'Kinetic Amharic GFX',
    durationSec: 55,
    durationLabel: '0:55',
    videoUrl: VIDEOS.wowMartFranchise,
    posterTimeSec: 2,
    hookCaption: 'Studio spokesperson paired with kinetic typography, store B-roll, and 3D logo.',
    goal: 'Produce a clear, high-trust commercial inviting shop owners and investors across Ethiopia to join the 1,000+ store WOW MART franchise network.',
    software: ['Premiere Pro', 'After Effects', 'Audition'],
    results: 'Combined clean studio framing with bold animated Amharic callouts, delivery fleet & store B-roll, and a custom 3D metallic logo reveal.',
    bookingPreset: 'Commercial & Branded Video',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Studio opener with synchronized Amharic motion titles' },
      { timeSec: 19, label: '0:19', caption: 'Delivery fleet & partner training B-roll graphics' },
      { timeSec: 41, label: '0:41', caption: '1000+ franchise callout into 3D logo outro' },
    ],
  },
  {
    id: 'vista-glass-partitions',
    title: 'Smart Glass Office Partitions Reel',
    client: 'Vista Architectural & Interior',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Short-Form Video Editor & Sound Design',
    views: '9:16 Social Ad',
    retentionMetric: 'Smart Glass Demo Hook',
    durationSec: 24,
    durationLabel: '0:24',
    videoUrl: VIDEOS.vistaGlassPartitions,
    posterTimeSec: 2,
    hookCaption: 'Bright modern office design cut with snappy light-flash transitions.',
    goal: 'Position Vista’s architectural glass partition systems as the modern upgrade for bright, executive office interiors on TikTok.',
    software: ['Premiere Pro', 'After Effects', 'CapCut'],
    results: 'Paired energetic presenter pacing with sliding-door showcases, a smart-frost remote control reveal, and a crisp glowing contact CTA.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Question hook cutting straight into glass office render' },
      { timeSec: 8, label: '0:08', caption: 'Flash transition into tinted sliding partition showcase' },
      { timeSec: 16, label: '0:16', caption: 'Remote-controlled smart privacy glass demo & CTA' },
    ],
  },
  {
    id: 'vista-architecture-history',
    title: 'Evolution of Architecture — Brand Story',
    client: 'Vista Architectural & Interior',
    category: 'Brand Ads',
    orientation: 'vertical',
    role: 'Storytelling Editor & Visual Pacing',
    views: 'Brand Storytelling',
    retentionMetric: 'Narrative Montage',
    durationSec: 58,
    durationLabel: '0:58',
    videoUrl: VIDEOS.vistaHistory,
    posterTimeSec: 3,
    hookCaption: 'From ancient pyramids and Baroque halls to Vista’s modern glass towers.',
    goal: 'Craft a cinematic brand-story reel tracing architectural history across civilizations before introducing Vista’s contemporary designs in Addis Ababa.',
    software: ['Premiere Pro', 'DaVinci Resolve', 'Audition'],
    results: 'Delivered an engaging visual journey bridging historical eras with Vista’s Sheger Property renders and clean end-card identity.',
    bookingPreset: 'Commercial & Branded Video',
    beatMarkers: [
      { timeSec: 0, label: '0:00', caption: 'Engaging presenter hook into ancient cave & pyramid cuts' },
      { timeSec: 19, label: '0:19', caption: 'Baroque & Rococo interiors transitioning to modern homes' },
      { timeSec: 38, label: '0:38', caption: 'Vista high-rise showcase & animated brand outro' },
    ],
  },
  {
    id: 'vista-architecture-tiktok-cut',
    title: 'History of Architecture — TikTok Feed Cut',
    client: 'Vista Architectural & Interior',
    category: 'TikTok & Social',
    orientation: 'vertical',
    role: 'Vertical Optimization & Sound Mix',
    views: '9:16 TikTok Version',
    retentionMetric: 'Platform-Native Export',
    durationSec: 58,
    durationLabel: '0:58',
    videoUrl: VIDEOS.vistaHistoryCut,
    posterTimeSec: 27,
    hookCaption: 'Vertical TikTok delivery calibrated for crisp mobile playback and audio.',
    goal: 'Deliver a dedicated TikTok-optimized master of Vista’s architectural storytelling campaign tuned for mobile compression and feed pacing.',
    software: ['Premiere Pro', 'CapCut', 'Audition'],
    results: 'Maintained crisp architectural detail, balanced voiceover over warm jazz backing, and clean vertical framing across every shot.',
    bookingPreset: 'TikTok & Short-Form Social',
    beatMarkers: [
      { timeSec: 5, label: '0:05', caption: 'Fast-paced historical visual progression' },
      { timeSec: 27, label: '0:27', caption: 'Contemporary minimalist residence pan reveal' },
      { timeSec: 44, label: '0:44', caption: 'Multi-story facade montage into Vista contact card' },
    ],
  },
];

export const HERO_METRICS = [
  { value: '3+ Yrs', label: 'Hands-On Video Production (2023–2026)' },
  { value: '500+', label: 'Real Videos (16:9 Film & 9:16 Reels)' },
  { value: 'Full Pipeline', label: 'Storyboarding & Filming to Final Grade' },
  { value: 'Addis Ababa', label: 'Based in Ethiopia · Available Worldwide' },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01.',
    title: 'TikTok & Social Media Video Editing',
    description:
      'High-retention vertical videos optimized for TikTok, Instagram Reels, and YouTube Shorts—combining scroll-stopping hooks, tight pacing, and platform-native storytelling.',
    deliverables: '9:16 vertical masters · Captioning · Music & SFX sync',
    bookingPreset: 'TikTok & Short-Form Social',
  },
  {
    number: '02.',
    title: 'Commercials, Product & Interior Showcases',
    description:
      'End-to-end commercial and walkthrough edits for real estate, events, cafes, manufacturing, architecture, and furniture showcases—designed to drive marketing and sales.',
    deliverables: 'Shot planning · Full post-production · Brand-aligned delivery',
    bookingPreset: 'Commercial & Branded Video',
  },
  {
    number: '03.',
    title: 'Motion Graphics, Sound & Graphic Design',
    description:
      'Custom kinetic captions, instructional graphics, visual callouts, 3D logo reveals, brand design assets, and crisp sound design synced to strengthen storytelling.',
    deliverables: 'Motion graphics · Dialogue & music mix · Social graphic design',
    bookingPreset: 'Educational & Instructional Video',
  },
  {
    number: '04.',
    title: 'Color Grading, Correction & Videography',
    description:
      'Consistent tonal grading and accurate color correction to faithfully represent skin tones, food, product textures, and finishes—plus hands-on filming and storyboarding.',
    deliverables: 'DaVinci Resolve grading · Texture-accurate correction · Filming',
    bookingPreset: 'Color Grading & Graphic Design',
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01.',
    title: 'Discovery & Storyboard',
    description:
      'We align on your brand guidelines, instructional or campaign goals, shot lists, and storyboard structure before cutting a single frame.',
    turnaround: 'Planning',
  },
  {
    number: '02.',
    title: 'Filming & Raw Footage',
    description:
      'Send over your camera originals and brand assets—or collaborate directly on videography and shot capture in Addis Ababa.',
    turnaround: 'Capture & Intake',
  },
  {
    number: '03.',
    title: 'Edit, Grade & Sound',
    description:
      'Assembly, pacing, motion graphics, accessible captioning, sound syncing, and color grading—with clear review rounds for fast revisions.',
    turnaround: 'Post-Production',
  },
  {
    number: '04.',
    title: 'Final Delivery',
    description:
      'Receive polished, on-brand masters exported cleanly for TikTok, Instagram, YouTube, online learning platforms, or broadcast.',
    turnaround: 'On Timeline',
  },
];

export const TECH_STACK: TechTool[] = [
  {
    name: 'Premiere Pro',
    role: 'Primary NLE',
    specialty: 'Commercial editing, TikTok retention pacing & multi-cam assembly',
  },
  {
    name: 'After Effects',
    role: 'Motion Graphics',
    specialty: 'Animated typography, 3D logo reveals & custom transitions',
  },
  {
    name: 'DaVinci Resolve',
    role: 'Color Grading',
    specialty: 'Consistent visual tone, culinary & architectural color correction',
  },
  {
    name: 'CapCut',
    role: 'Short-Form Velocity',
    specialty: 'Rapid TikTok & Reels turnaround with native caption styles',
  },
  {
    name: 'Audition',
    role: 'Sound Design',
    specialty: 'Dialogue cleanup, music syncing & layered audio storytelling',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'edtech',
    quote:
      'Kalkidan brought both storyboarding discipline and sharp post-production craft to our online learning modules. His motion graphics and clean captioning made complex lessons noticeably easier for students to follow.',
    name: 'Hanna Tesfaye',
    role: 'Learning Content Lead',
    company: 'EdTech Hub ET',
    outcome: 'Higher lesson clarity & accessibility',
  },
  {
    id: 'neo',
    quote:
      'Working across multiple client commercials requires someone who owns the timeline from raw footage to final color grade. Kalkidan consistently maintained our visual tone and delivered on tight deadlines.',
    name: 'philmon',
    role: 'Production Coordinator',
    company: 'Neo Production',
    outcome: 'Raw footage to final graded delivery',
  },
  {
    id: 'jasmine',
    quote:
      'Our product reels immediately felt sharper once Kalkidan took over editing. He knows how to sync sound design, music, and pacing specifically for TikTok and Instagram so every launch looks polished and on-brand.',
    name: 'Rahel Kebede',
    role: 'Brand & Marketing Manager',
    company: 'Jasmine Cosmetics',
    outcome: 'TikTok & Instagram product storytelling',
  },
];

export const DIRECT_EMAIL = PROFILE_INFO.email;
export const DIRECT_PHONE = PROFILE_INFO.phone;
export const DIRECT_TELEGRAM = PROFILE_INFO.telegram;
export const DIRECT_TELEGRAM_URL = PROFILE_INFO.telegramUrl;
