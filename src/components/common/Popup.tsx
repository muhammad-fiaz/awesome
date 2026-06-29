'use client';
import { BookmarkIcon, Cancel01Icon, CheckmarkCircle02Icon, StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BASE_PATH } from '@/config/site';

export function Popup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
    }
    const dismissed = localStorage.getItem('bookmark-popup-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('bookmark-popup-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-101 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg font-sans"
          >
            <div className="relative bg-ds-surface-card border border-ds-outline-variant rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Close popup"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-white" />
              </Button>

              {/* Gradient header */}
              <div className="relative px-8 pt-8 pb-6 bg-linear-to-br from-emerald-600 via-teal-700 to-indigo-900">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                    <HugeiconsIcon icon={BookmarkIcon} size={28} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm">
                    Bookmark Us
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-white leading-tight">
                  Keep Awesome Handy
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  Never miss out on high-quality development assets and tools.
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-4">
                <p className="text-sm text-ds-on-surface-variant leading-relaxed">
                  Bookmark this site for your daily development resources, projects, tools, and trending updates. Access curated lists instantly anytime.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-ds-on-surface">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="text-ds-success shrink-0" />
                    Handy projects & curated tools
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ds-on-surface">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="text-ds-success shrink-0" />
                    High-quality tutorials & ecosystem references
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ds-on-surface">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} className="text-ds-success shrink-0" />
                    Latest trending lists updated dynamically
                  </div>
                </div>

                <div className="bg-ds-surface-high/30 border border-ds-outline-variant/60 rounded-xl p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={StarIcon} size={16} className="text-ds-tertiary" />
                    <span className="text-xs font-medium text-ds-on-surface">Press shortcut to bookmark:</span>
                  </div>
                  <kbd className="px-2.5 py-1 text-xs font-mono font-bold rounded border border-ds-outline-variant bg-ds-surface-high text-ds-on-surface shadow-sm">
                    {isMac ? '⌘ + D' : 'Ctrl + D'}
                  </kbd>
                </div>

                {/* Contribution reminder */}
                <div className="text-xs text-ds-on-surface-variant text-center pt-2 border-t border-ds-outline-variant/40 leading-relaxed">
                  Want to contribute missing resources or refer to our guide?{' '}
                  <a href={`${BASE_PATH}/guide/`} className="text-ds-primary hover:underline font-semibold">
                    Read the Guide
                  </a>
                  {' '}or{' '}
                  <a href="https://github.com/muhammad-fiaz/awesome" target="_blank" rel="noopener noreferrer" className="text-ds-primary hover:underline font-semibold">
                    Contribute on GitHub
                  </a>.
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-5 py-3 rounded-xl text-sm font-bold bg-ds-primary text-ds-on-primary hover:opacity-90 transition-opacity"
                  >
                    Got it!
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="px-5 py-3 rounded-xl text-sm font-bold"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
