'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, ArrowDown01Icon } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/types';

interface MobileTocProps {
  toc: TocItem[];
}

export function MobileToc({ toc }: MobileTocProps) {
  if (!toc || toc.length === 0) return null;

  const [isOpen, setIsOpen] = useState(false);

  const renderItems = (items: TocItem[], depth = 0) => {
    return (
      <ul className={cn("space-y-2", depth > 0 && "pl-4 mt-2 border-l border-ds-outline-variant/30")}>
        {items.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-sm transition-colors duration-150 py-0.5",
                depth === 0 ? "text-ds-on-surface font-medium hover:text-ds-primary" : "text-ds-on-surface-variant hover:text-ds-on-surface"
              )}
            >
              {item.text}
            </a>
            {item.children && item.children.length > 0 && renderItems(item.children, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="xl:hidden mb-6 border border-ds-outline-variant/40 rounded-xl bg-ds-surface-card overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-ds-on-surface text-sm hover:bg-ds-surface-high/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HugeiconsIcon icon={Menu01Icon} size={16} className="text-ds-primary" />
          <span>On This Page</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-ds-text-muted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-ds-outline-variant/20 bg-ds-surface-low/50">
              <nav className="mt-3">
                {renderItems(toc)}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
