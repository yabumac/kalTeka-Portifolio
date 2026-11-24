import { useEffect, useRef, useState } from 'react';
import { Maximize2, Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { SHOWREEL_CHAPTERS } from '../data/portfolioData';

interface ShowreelPlayerProps {
  autoPlay?: boolean;
  onExpandModal?: () => void;
  isModal?: boolean;
}

function formatTimecode(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00:00';
  const whole = Math.floor(seconds);
  const mins = Math.floor(whole / 60);
  const secs = whole % 60;
  const frames = Math.floor((seconds - whole) * 24);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
}

export function ShowreelPlayer({
  autoPlay = false,
  onExpandModal,
  isModal = false,
}: ShowreelPlayerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const pendingPlayRef = useRef(autoPlay);
  const hasPlayedChapterRef = useRef(autoPlay);

  const activeChapter = SHOWREEL_CHAPTERS[activeIndex];

  useEffect(() => {
    const main = mainVideoRef.current;
    const bg = bgVideoRef.current;
    if (!main) return;

    main.currentTime = 0;
    if (bg) bg.currentTime = 0;
    setCurrentTime(0);

    if (pendingPlayRef.current) {
      pendingPlayRef.current = false;
      hasPlayedChapterRef.current = true;
      main.muted = isMuted;
      const playPromise = main.play();
      if (playPromise) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            bg?.play().catch(() => {});
          })
          .catch(() => {
            main.muted = true;
            setIsMuted(true);
            main
              .play()
              .then(() => {
                setIsPlaying(true);
                bg?.play().catch(() => {});
              })
              .catch(() => {
                setIsPlaying(false);
              });
          });
      }
    } else {
      hasPlayedChapterRef.current = false;
      setIsPlaying(false);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (mainVideoRef.current) {
      mainVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    const main = mainVideoRef.current;
    const bg = bgVideoRef.current;
    if (!main) return;

    if (main.paused) {
      if (!hasPlayedChapterRef.current) {
        hasPlayedChapterRef.current = true;
        main.currentTime = 0;
        if (bg) bg.currentTime = 0;
      }
      main.muted = isMuted;
      main
        .play()
        .then(() => {
          setIsPlaying(true);
          if (bg) {
            bg.currentTime = main.currentTime;
            bg.play().catch(() => {});
          }
        })
        .catch(() => setIsPlaying(false));
    } else {
      main.pause();
      bg?.pause();
      setIsPlaying(false);
    }
  };

  const handleRestart = () => {
    const main = mainVideoRef.current;
    const bg = bgVideoRef.current;
    if (!main) return;
    main.currentTime = 0;
    if (bg) bg.currentTime = 0;
    setCurrentTime(0);
    main
      .play()
      .then(() => {
        setIsPlaying(true);
        bg?.play().catch(() => {});
      })
      .catch(() => {});
  };

  const handleScrub = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(event.target.value);
    setCurrentTime(targetTime);
    if (mainVideoRef.current) {
      mainVideoRef.current.currentTime = targetTime;
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.currentTime = targetTime;
    }
  };

  const handleSelectChapter = (index: number) => {
    if (index === activeIndex) {
      handleRestart();
      return;
    }
    pendingPlayRef.current = true;
    setActiveIndex(index);
  };

  const handleVideoEnded = () => {
    pendingPlayRef.current = true;
    setActiveIndex((prev) => (prev + 1) % SHOWREEL_CHAPTERS.length);
  };

  const safeDuration = duration > 0 ? duration : 1;
  const progressPct = Math.min(100, (currentTime / safeDuration) * 100);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-[#242424] bg-[#141414]">
      {/* 16:9 Cinema Stage supporting full-bleed 16:9 commercials and centered 9:16 reels */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#070707] group">
        {/* Ambient blurred widescreen backdrop (only needed for 9:16 vertical reels) */}
        {activeChapter.orientation === 'vertical' && (
          <video
            ref={bgVideoRef}
            key={`bg-${activeChapter.id}`}
            src={`${activeChapter.videoUrl}#t=${activeChapter.posterTimeSec}`}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-2xl"
          />
        )}

        {/* Crisp Main Real Video Stage */}
        <div
          className={`relative z-10 flex h-full w-full items-center justify-center ${
            activeChapter.orientation === 'vertical' ? 'py-2 sm:py-3' : ''
          }`}
        >
          <video
            ref={mainVideoRef}
            key={activeChapter.id}
            src={`${activeChapter.videoUrl}#t=${activeChapter.posterTimeSec}`}
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration || 0);
            }}
            onTimeUpdate={(e) => {
              setCurrentTime(e.currentTarget.currentTime);
            }}
            onEnded={handleVideoEnded}
            className={
              activeChapter.orientation === 'landscape'
                ? 'h-full w-full object-cover'
                : 'h-full max-w-full rounded-lg object-contain shadow-2xl'
            }
          />
        </div>

        {/* Measured top & bottom scrims for crisp UI contrast */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-black/92 via-black/55 to-transparent" />

        {/* Top Bar Metadata */}
        <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-4 text-xs text-zinc-200 sm:px-7 sm:py-5">
          <div className="flex items-center gap-2.5 truncate">
            <span className="font-medium text-white">Kalkidan Teka — Showreel</span>
            <span aria-hidden="true" className="text-zinc-500">·</span>
            <span className="hidden sm:inline text-zinc-300 truncate">
              {activeChapter.clientCredit}
            </span>
          </div>
          <div className="font-mono tabular-nums text-zinc-200 whitespace-nowrap shrink-0">
            {formatTimecode(currentTime)} <span className="text-zinc-500">/</span>{' '}
            {formatTimecode(duration)}
          </div>
        </div>

        {/* Center Play / Pause Hit Target */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause showreel' : 'Play showreel'}
          className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 cursor-pointer focus-visible:outline-none ${
            isPlaying ? 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
          }`}
        >
          <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-[#FF3B30] text-white transition-transform duration-200 hover:scale-105">
            {isPlaying ? (
              <Pause className="h-7 w-7 fill-current" />
            ) : (
              <Play className="h-7 w-7 fill-current ml-1" />
            )}
          </span>
        </button>

        {/* Bottom Caption Overlay & Real Scrubber */}
        <div className="absolute inset-x-0 bottom-0 z-30 px-5 pb-4 pt-6 sm:px-7 sm:pb-6">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium text-[#FF3B30] mb-0.5">
                {activeChapter.label}
              </p>
              <p className="font-display text-base sm:text-xl font-semibold text-white tracking-tight">
                {activeChapter.caption}
              </p>
            </div>

            <div className="hidden sm:flex items-end gap-1 h-5 shrink-0" aria-hidden="true">
              <span
                className={`w-0.5 rounded-full bg-white/80 origin-bottom ${
                  isPlaying && !isMuted ? 'h-5 animate-eq-1' : 'h-1.5 opacity-40'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-white/80 origin-bottom ${
                  isPlaying && !isMuted ? 'h-5 animate-eq-2' : 'h-2 opacity-40'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-[#FF3B30] origin-bottom ${
                  isPlaying && !isMuted ? 'h-5 animate-eq-3' : 'h-1.5 opacity-40'
                }`}
              />
              <span
                className={`w-0.5 rounded-full bg-white/80 origin-bottom ${
                  isPlaying && !isMuted ? 'h-5 animate-eq-4' : 'h-2 opacity-40'
                }`}
              />
            </div>
          </div>

          {/* Scrubbable Real Video Progress Bar */}
          <div className="relative mb-3 flex items-center">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
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
              onChange={handleScrub}
              aria-label="Scrub showreel video timeline"
              className="absolute inset-0 h-6 w-full cursor-pointer opacity-0"
            />
          </div>

          {/* Player Controls Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/25 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play Reel'}</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label="Restart current reel"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-200 hover:bg-white/15 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMuted((prev) => !prev)}
                aria-label={isMuted ? 'Unmute showreel audio' : 'Mute showreel audio'}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-200 hover:bg-white/15 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>

            {!isModal && onExpandModal && (
              <button
                type="button"
                onClick={() => {
                  mainVideoRef.current?.pause();
                  bgVideoRef.current?.pause();
                  setIsPlaying(false);
                  onExpandModal();
                }}
                className="inline-flex items-center gap-2 rounded-lg text-xs font-medium text-zinc-200 hover:text-white px-2.5 py-1.5 hover:bg-white/15 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Theater Mode</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Chapter Selector Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[#242424] border-t border-[#242424] bg-[#141414]">
        {SHOWREEL_CHAPTERS.map((chapter, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => handleSelectChapter(index)}
              className={`flex flex-col items-start gap-1 px-5 py-4 text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3B30] ${
                isActive ? 'bg-[#1B1B1B]' : 'hover:bg-[#181818]'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  className={`text-xs font-semibold ${
                    isActive ? 'text-[#FF3B30]' : 'text-zinc-300'
                  }`}
                >
                  {chapter.label}
                </span>
                <span className="font-mono text-xs tabular-nums text-zinc-500">
                  {chapter.timecodeLabel}
                </span>
              </div>
              <span className="text-xs text-zinc-400 truncate w-full">
                {chapter.clientCredit}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
