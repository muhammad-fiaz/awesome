'use client';
import { Coffee02Icon, FavouriteIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { OWNER } from '@/config/site';

export function SponsorBanner() {
  return (
    <div className="bg-linear-to-br from-emerald-600 to-indigo-900 rounded-2xl p-4 md:p-6 relative overflow-hidden text-white shadow-md">
      {/* Decorative blob */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10">
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={32}
          className="text-white/90 mb-2 block"
        />
        <h3 className="text-lg font-bold text-white mb-1.5">
          Support Awesome
        </h3>
        <p className="text-sm text-white/80 mb-4 leading-relaxed">
          Help us keep the platform free and open for the global developer
          community.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={OWNER.sponsor}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold rounded-lg bg-white text-emerald-800 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            <HugeiconsIcon icon={FavouriteIcon} size={16} className="text-emerald-800 fill-current" />
            <span>Sponsor on GitHub</span>
          </a>
          <a
            href={OWNER.support}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold rounded-lg border border-white/30 text-white hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            <HugeiconsIcon icon={Coffee02Icon} size={16} className="text-white" />
            <span>Buy a Coffee</span>
          </a>
        </div>
      </div>
    </div>
  );
}

