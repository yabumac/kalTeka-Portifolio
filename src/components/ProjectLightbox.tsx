import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';
import type { PortfolioProject } from '../data/portfolioData';

interface ProjectLightboxProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onBookSimilar: (preset: string) => void;
}

function formatShortTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export function ProjectLightbox({
  project,
  onClose,
  onBookSimilar,
}: ProjectLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!project) return;
    setCurrentTime(0);
    setDuration(project.durationSec);
    setIsMuted(false);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.muted = false;
      const playPromise = video.play();
      if (playPromise) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            video.muted = true;
            setIsMuted(true);
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      }
    }
  }, [project]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const activeBeat = useMemo(() => {
    if (!project) return null;
    let current = project.beatMarkers[0];
    for (const beat of project.beatMarkers) {
      if (currentTime >= beat.timeSec) {
        current = beat;
      }
    }
    return current;
  }, [project, currentTime]);

  if (!project) return null;

  const safeDuration = duration > 0 ? duration : project.durationSec;
  const progressPct = Math.min(100, (currentTime / safeDuration) * 100);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    setCurrentTime(seconds);
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-5xl rounded-2xl border border-[#242424] bg-[#141414] overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-[#242424] px-6 py-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
            <span className="text-zinc-200 font-medium">{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#FF3B30]">{project.views}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project breakdown"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#242424] bg-[#0A0A0A] text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Adaptive Lightbox Body: Widescreen 16:9 Cinema Stack or Split 9:16 Vertical Stage */}
        {(() => {
          const isLandscape = project.orientation === 'landscape';
          return (
            <div
              className={
                isLandscape
                  ? 'flex flex-col'
                  : 'grid grid-cols-1 lg:grid-cols-12'
              }
            >
              {/* Video Stage */}
              <div
                className={
                  isLandscape
                    ? 'flex flex-col items-center justify-center bg-[#0A0A0A] p-4 sm:p-6 border-b border-[#242424]'
                    : 'lg:col-span-5 flex flex-col items-center justify-center bg-[#0A0A0A] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#242424]'
                }
              >
                <div
                  className={`relative w-full overflow-hidden rounded-xl border border-[#242424] bg-black group ${
                    isLandscape
                      ? 'aspect-video max-w-4xl'
                      : 'aspect-[9/16] max-w-[300px]'
                  }`}
                >
                  <video
                    ref={videoRef}
                    key={project.id}
                    src={project.videoUrl}
                    playsInline
                    loop
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      if (Number.isFinite(e.currentTarget.duration)) {
                        setDuration(e.currentTarget.duration);
                      }
                    }}
                    onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="h-full w-full object-cover"
                  />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/75 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                  {/* Top frame timecode */}
                  <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 text-[11px] font-mono tabular-nums text-zinc-100">
                    <span>{isLandscape ? '16:9 Cinema Master' : '9:16 Master'}</span>
                    <span>
                      {formatShortTime(currentTime)} / {formatShortTime(safeDuration)}
                    </span>
                  </div>

                  {/* Center Play/Pause overlay */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 cursor-pointer ${
                      isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                    }`}
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3B30] text-white">
                      {isPlaying ? (
                        <Pause className="h-6 w-6 fill-current" />
                      ) : (
                        <Play className="h-6 w-6 fill-current ml-0.5" />
                      )}
                    </span>
                  </button>

                  {/* Bottom Scrubber & Audio Controls */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="relative mb-3 flex items-center">
                      <div className="h-1 w-full overflow-hidden rounded-full bg-white/30">
                        <div
                          className="h-full bg-[#FF3B30] transition-all duration-75"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={safeDuration}
                        step={0.05}
                        value={Math.min(currentTime, safeDuration)}
                        onChange={(e) => {
                          const next = Number(e.target.value);
                          setCurrentTime(next);
                          if (videoRef.current) videoRef.current.currentTime = next;
                        }}
                        aria-label="Scrub video timeline"
                        className="absolute inset-0 h-5 w-full cursor-pointer opacity-0"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#FF3B30] transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <Pause className="h-3.5 w-3.5" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                          <span>{isPlaying ? 'Pause' : 'Play'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsMuted((prev) => !prev)}
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                          className="inline-flex items-center gap-1 text-xs text-zinc-200 hover:text-white transition-colors cursor-pointer"
                        >
                          {isMuted ? (
                            <VolumeX className="h-3.5 w-3.5" />
                          ) : (
                            <Volume2 className="h-3.5 w-3.5" />
                          )}
                          <span>{isMuted ? 'Muted' : 'Sound'}</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => seekTo(0)}
                        aria-label="Restart video"
                        className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Replay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Breakdown Pane */}
              <div
                className={`${
                  isLandscape ? '' : 'lg:col-span-7'
                } flex flex-col justify-between p-6 sm:p-8 gap-6`}
              >
                <div className="space-y-6">
                  <div>
                    <h2
                      id="lightbox-project-title"
                      className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight"
                    >
                      {project.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Role: <span className="text-zinc-200">{project.role}</span> · Highlight:{' '}
                      <span className="font-mono tabular-nums text-white">{project.retentionMetric}</span>
                    </p>
                  </div>

                  {/* Edit Breakdown Sections */}
                  <div
                    className={`border-t border-[#242424] pt-5 ${
                      isLandscape ? 'grid grid-cols-1 lg:grid-cols-12 gap-6' : 'space-y-5'
                    }`}
                  >
                    <div className={isLandscape ? 'lg:col-span-7 space-y-5' : 'space-y-5'}>
                      <div>
                        <h3 className="text-xs font-semibold text-zinc-400 mb-1.5">
                          Edit Goal
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
                          {project.goal}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold text-zinc-400 mb-1.5">
                          Craft &amp; Execution
                        </h3>
                        <p className="text-sm sm:text-base leading-relaxed text-white font-medium">
                          {project.results}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xs font-semibold text-zinc-400 mb-2">
                          Software Used
                        </h3>
                        <p className="text-sm text-zinc-200">
                          {project.software.join('  ·  ')}
                        </p>
                      </div>
                    </div>

                    {/* Clickable Timeline Cue Sheet (seeks real video) */}
                    <div className={isLandscape ? 'lg:col-span-5' : ''}>
                      <h3 className="text-xs font-semibold text-zinc-400 mb-2.5">
                        Jump to Timeline Cues
                      </h3>
                      <div className="divide-y divide-[#242424] border-y border-[#242424]">
                        {project.beatMarkers.map((beat) => {
                          const isCurrent = activeBeat?.timeSec === beat.timeSec;
                          return (
                            <button
                              key={beat.label}
                              type="button"
                              onClick={() => seekTo(beat.timeSec)}
                              className={`flex w-full items-baseline gap-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                                isCurrent ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                              }`}
                            >
                              <span
                                className={`font-mono text-xs tabular-nums shrink-0 ${
                                  isCurrent ? 'text-[#FF3B30] font-semibold' : 'text-zinc-500'
                                }`}
                              >
                                {beat.label}
                              </span>
                              <span>{beat.caption}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#242424] pt-5">
                  <span className="text-xs text-zinc-400">
                    Want this pacing and polish for your next commercial or social campaign?
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onBookSimilar(project.bookingPreset);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#FF3B30] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E02E24] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Book a Similar Edit</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
