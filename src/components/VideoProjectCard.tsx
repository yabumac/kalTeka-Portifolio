import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play } from 'lucide-react';
import type { PortfolioProject } from '../data/portfolioData';

interface VideoProjectCardProps {
  project: PortfolioProject;
  index: number;
  onSelect: (project: PortfolioProject) => void;
}

export function VideoProjectCard({
  project,
  index,
  onSelect,
}: VideoProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = project.posterTimeSec;
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#242424] bg-[#141414] transition-colors duration-200 hover:border-zinc-600"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="flex flex-col flex-1 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3B30]"
      >
        {/* Real Video Thumbnail with Hover Live Preview */}
        <div
          className={`relative w-full overflow-hidden bg-[#0B0B0B] ${
            project.orientation === 'landscape' ? 'aspect-video' : 'aspect-[9/14]'
          }`}
        >
          <video
            ref={videoRef}
            src={`${project.videoUrl}#t=${project.posterTimeSec}`}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

          {/* Center Play Button Affordance */}
          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-95">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3B30]/92 text-white transition-transform duration-200 group-hover:scale-110">
              <Play className="h-5 w-5 fill-current ml-0.5" aria-hidden="true" />
            </span>
          </div>

          {/* Unboxed Duration & Craft Line */}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-5 py-4 text-xs">
            <span className="font-mono tabular-nums text-white font-medium truncate">
              {project.views} · {project.retentionMetric}
            </span>
            <span className="font-mono tabular-nums text-zinc-200 shrink-0">
              {project.durationLabel}
            </span>
          </div>
        </div>

        {/* Clean Unboxed Card Metadata */}
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
              <span className="text-zinc-200 font-medium">{project.client}</span>
              <span aria-hidden="true">·</span>
              <span>{project.category}</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight group-hover:text-[#FF3B30] transition-colors duration-150">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{project.role}</p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#242424] flex items-center justify-between text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
            <span>Watch With Sound &amp; Breakdown</span>
            <ArrowUpRight className="h-4 w-4 text-[#FF3B30]" aria-hidden="true" />
          </div>
        </div>
      </button>
    </motion.article>
  );
}
