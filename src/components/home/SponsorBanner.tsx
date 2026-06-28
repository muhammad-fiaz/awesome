'use client';
import { FavouriteIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import { OWNER } from '@/config/site';

export function SponsorBanner() {
  return (
    <motion.div
      className="sponsor-gradient rounded-2xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {/* Decorative blob */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={32}
          className="text-white/80 mb-2 block"
        />
        <h3 className="text-lg font-bold text-ds-on-primary-container mb-1.5">
          Support Awesome
        </h3>
        <p className="text-sm text-ds-on-primary-container/80 mb-4 leading-relaxed">
          Help us keep the platform free and open for the global developer
          community.
        </p>
        <div className="flex flex-col gap-2">
          <motion.a
            href={OWNER.sponsor}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full py-2 text-center text-sm font-bold rounded-lg bg-white/95 text-ds-primary-container hover:bg-white transition-colors"
          >
            ❤ Sponsor on GitHub
          </motion.a>
          <a
            href={OWNER.support}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-2 text-center text-sm font-semibold rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            ☕ Buy a Coffee
          </a>
        </div>
      </div>
    </motion.div>
  );
}
