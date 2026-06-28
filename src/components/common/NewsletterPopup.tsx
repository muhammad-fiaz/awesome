'use client';
import { Cancel01Icon, Rocket01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BASE_PATH } from '@/config/site';

export function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('newsletter-popup-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletter-popup-dismissed', 'true');
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
            className="fixed z-101 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg"
          >
            <div className="relative bg-ds-surface-card border border-ds-outline-variant rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                type="button"
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors backdrop-blur-sm"
                aria-label="Close popup"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={16} className="text-white" />
              </button>

              {/* Gradient header */}
              <div className="relative px-8 pt-8 pb-6 bg-linear-to-br from-ds-primary-container via-ds-secondary-container to-ds-tertiary-container">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                    <HugeiconsIcon icon={Rocket01Icon} size={28} className="text-white" strokeWidth={1.8} />
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/20 text-white backdrop-blur-sm">
                    Stay Ahead
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-white leading-tight">
                  Know What's Next
                  <br />
                  <span className="text-white/90">in AI and Software</span>
                </h2>
                <p className="text-white/80 text-sm mt-2">
                  Before Everyone Else.
                </p>
              </div>

              {/* Content */}
              <div className="px-8 py-6 space-y-4">
                <p className="text-sm text-ds-on-surface-variant leading-relaxed">
                  Discover the latest curated developer resources, AI tools, tutorials, and industry insights before they trend.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-ds-on-surface">
                    <svg class="w-4 h-4 text-ds-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    Curated AI and software resources
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ds-on-surface">
                    <svg class="w-4 h-4 text-ds-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    tutorials and guides
                  </div>
                  <div className="flex items-center gap-2 text-sm text-ds-on-surface">
                    <svg class="w-4 h-4 text-ds-success shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    industry insights and trends
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <a
                    href={`${BASE_PATH}/posts/`}
                    onClick={handleClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-ds-primary text-ds-on-primary hover:opacity-90 transition-opacity"
                  >
                    Explore Posts
                    <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                  </a>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-3 rounded-xl text-sm font-bold border border-ds-outline-variant text-ds-on-surface hover:bg-ds-surface-high transition-colors"
                  >
                    Later
                  </button>
                </div>

                <p className="text-[11px] text-ds-text-muted text-center">
                  No spam. Just quality content. Read our{' '}
                  <a href={`${BASE_PATH}/legal/privacy-policy/`} className="underline hover:text-ds-primary transition-colors">
                    Privacy Policy
                  </a>.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
