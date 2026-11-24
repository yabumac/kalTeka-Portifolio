import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { ASSETS } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function ColorGradeSlider() {
  const [splitPercent, setSplitPercent] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(96, Math.max(4, Math.round(raw)));
    setSplitPercent(clamped);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSplitPercent((prev) => Math.max(4, prev - 5));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSplitPercent((prev) => Math.min(96, prev + 5));
    }
  };

  return (
    <div className="rounded-2xl border border-[#242424] bg-[#141414] overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-[#242424] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold text-white tracking-tight">
            Interactive Color Grade Comparison
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Drag the divider to compare flat 10-bit S-Log3 footage against Kalkidan’s DaVinci Resolve 35mm film pipeline.
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-[#0A0A0A] p-1 border border-[#242424] shrink-0 self-start sm:self-auto">
          {[
            { label: 'Raw Focus', value: 82 },
            { label: '50 / 50', value: 50 },
            { label: 'Final Grade', value: 18 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setSplitPercent(preset.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30] ${
                Math.abs(splitPercent - preset.value) <= 4
                  ? 'bg-[#FF3B30] text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Split Frame */}
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label="Compare raw footage and final color grade"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={splitPercent}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        className="relative aspect-[16/9] w-full select-none overflow-hidden bg-[#080808] cursor-ew-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3B30]"
      >
        {/* Base Layer: Final Cinema Grade */}
        <ResilientImage
          src={ASSETS.colorGrade}
          alt="Final DaVinci Resolve color graded dusk city street frame"
          className="h-full w-full object-cover final-cinema-grade pointer-events-none"
        />

        {/* Overlay Layer: Raw Flat S-Log3 Clipped Left */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
        >
          <ResilientImage
            src={ASSETS.colorGrade}
            alt="Raw ungraded flat S-Log3 camera frame"
            className="h-full w-full object-cover raw-log-grade"
          />
        </div>

        {/* Measured top scrim for labels */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 to-transparent" />

        {/* Unboxed Corner Labels */}
        <div className="pointer-events-none absolute left-5 top-4 text-xs font-mono text-zinc-200 tracking-wide">
          Raw S-Log3 · Flat Profile
        </div>
        <div className="pointer-events-none absolute right-5 top-4 text-xs font-mono text-white tracking-wide">
          Final Grade · DaVinci Resolve
        </div>

        {/* Divider Line & Handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white/90"
          style={{ left: `${splitPercent}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-[#0A0A0A]/90 text-white">
            <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Technical Pipeline Specs (Unboxed Metadata Strip) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs text-zinc-400 border-t border-[#242424]">
        <div className="flex flex-wrap items-center gap-2">
          <span>DaVinci Wide Gamut</span>
          <span aria-hidden="true">·</span>
          <span>Kodak 2383 Print Emulation</span>
          <span aria-hidden="true">·</span>
          <span>Subtle Crimson Halation</span>
        </div>
        <span className="font-mono tabular-nums text-zinc-300">
          Split: {splitPercent}% Raw / {100 - splitPercent}% Graded
        </span>
      </div>
    </div>
  );
}
