'use client';
import { Search01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { useSearchStore } from '@/store/searchStore';

export function SearchTrigger({ mobile = false }: { mobile?: boolean }) {
  const { openSearch } = useSearchStore();

  if (mobile) {
    return (
      <Button
        id="search-trigger-mobile"
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Search"
        onClick={openSearch}
        className="md:hidden"
      >
        <HugeiconsIcon icon={Search01Icon} size={20} strokeWidth={1.5} />
      </Button>
    );
  }

  return (
    <Button
      id="search-trigger"
      type="button"
      variant="ghost"
      aria-label="Open search"
      onClick={openSearch}
      className="w-full justify-start gap-2.5 px-3 py-2 text-sm rounded-lg bg-ds-surface-high border border-ds-outline-variant text-ds-text-muted hover:border-ds-primary hover:bg-ds-surface-high transition-colors duration-150 cursor-pointer"
    >
      <HugeiconsIcon
        icon={Search01Icon}
        size={16}
        strokeWidth={1.5}
        className="shrink-0"
      />
      <span className="flex-1 text-left">Search resources...</span>
      <kbd className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono rounded border border-ds-outline-variant text-ds-text-muted">
        ⌘K
      </kbd>
    </Button>
  );
}
