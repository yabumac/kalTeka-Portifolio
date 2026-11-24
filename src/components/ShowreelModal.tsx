import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ShowreelPlayer } from './ShowreelPlayer';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kalkidan Teka Showreel"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl my-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-zinc-300">
            Featured Showreel · Press Esc to close
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close showreel modal"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#242424] bg-[#141414] text-zinc-200 hover:text-white hover:border-zinc-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B30]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <ShowreelPlayer autoPlay isModal />
      </div>
    </div>
  );
}
