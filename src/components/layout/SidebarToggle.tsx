'use client';
import { Cancel01Icon, Menu01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/store/sidebarStore';

export function SidebarToggle({ mobile = false }: { mobile?: boolean }) {
  const { isMobileOpen, toggleMobileSidebar } = useSidebarStore();

  if (!mobile) return null;

  return (
    <Button
      id="mobile-menu-btn"
      variant="ghost"
      size="icon"
      aria-label="Toggle menu"
      onClick={toggleMobileSidebar}
      className="md:hidden"
    >
      {isMobileOpen ? (
        <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.5} />
      ) : (
        <HugeiconsIcon icon={Menu01Icon} size={22} strokeWidth={1.5} />
      )}
    </Button>
  );
}
