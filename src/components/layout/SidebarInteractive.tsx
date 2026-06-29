'use client';
import {
  ArrowRight01Icon,
  Cancel01Icon,
  Clock01Icon,
  FavouriteIcon,
  File02Icon,
  HelpCircleIcon,
  Home01Icon,
  Menu03Icon,
  MenuSquareIcon,
  RssIcon,
  StarIcon,
  Tag01Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  BASE_PATH,
  COMMUNITY_LINKS,
  DISCOVER_LINKS,
  NAV_LINKS,
} from '@/config/site';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/sidebarStore';

const ICON_MAP: Record<string, typeof File02Icon> = {
  home: Home01Icon,
  article: File02Icon,
  category: Tag01Icon,
  sell: Tag01Icon,
  person: UserIcon,
  star: StarIcon,
  schedule: Clock01Icon,
  rss_feed: RssIcon,
  favorite: FavouriteIcon,
  help: HelpCircleIcon,
};

function NavItem({
  href,
  icon,
  label,
  isActive,
  external,
  isOpen,
}: {
  href: string;
  icon: string;
  label: string;
  isActive?: boolean;
  external?: boolean;
  isOpen: boolean;
}) {
  const IconComp = ICON_MAP[icon] ?? File02Icon;

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'flex items-center rounded-lg text-sm font-medium transition-all duration-150',
        isOpen ? 'gap-3 px-3 py-2' : 'justify-center p-2.5',
        isActive
          ? 'bg-ds-primary-container text-ds-on-primary-container'
          : 'text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high',
      )}
      title={!isOpen ? label : undefined}
    >
      <HugeiconsIcon icon={IconComp} size={20} strokeWidth={1.5} />
      {isOpen && (
        <>
          <span className="text-xs font-bold tracking-wide uppercase truncate flex-1">
            {label}
          </span>
          {external && (
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={12}
              strokeWidth={2}
              className="opacity-40 shrink-0"
            />
          )}
        </>
      )}
    </a>
  );
}

function SectionLabel({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  if (!isOpen)
    return <div className="border-t border-ds-outline-variant my-2" />;
  return (
    <div className="px-3 pt-4 pb-1">
      <span className="text-[10px] font-bold tracking-widest uppercase text-ds-text-muted">
        {children}
      </span>
    </div>
  );
}

interface SidebarInteractiveProps {
  desktop?: boolean;
  mobile?: boolean;
  currentPath?: string;
}

export function SidebarInteractive({
  desktop,
  mobile,
  currentPath = '',
}: SidebarInteractiveProps) {
  const { isOpen, isMobileOpen, toggleSidebar, closeMobileSidebar } =
    useSidebarStore();

  const isActive = (href: string) => {
    if (href === `${BASE_PATH}/`) return currentPath === href;
    return currentPath.startsWith(href);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.remove('sidebar-collapsed');
      localStorage.setItem('sidebar-open', 'true');
    } else {
      document.documentElement.classList.add('sidebar-collapsed');
      localStorage.setItem('sidebar-open', 'false');
    }
  }, [isOpen]);

  if (desktop) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        className="h-7 w-7"
      >
        <HugeiconsIcon
          icon={isOpen ? MenuSquareIcon : Menu03Icon}
          size={18}
          strokeWidth={1.5}
        />
      </Button>
    );
  }

  if (mobile) {
    const navContent = (
      <nav className="flex flex-col gap-0.5 p-3 h-full overflow-y-auto">
        {NAV_LINKS.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={isActive(link.href)}
            isOpen={true}
          />
        ))}
        <SectionLabel isOpen={true}>Discover</SectionLabel>
        {DISCOVER_LINKS.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={isActive(link.href)}
            isOpen={true}
          />
        ))}
        <SectionLabel isOpen={true}>Community</SectionLabel>
        {COMMUNITY_LINKS.map((link) => (
          <NavItem
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isActive={isActive(link.href)}
            external={link.external}
            isOpen={true}
          />
        ))}
      </nav>
    );

    return (
      <>
        {isMobileOpen && (
          <>
            <div
              className="fixed inset-0 z-60 bg-black/60 md:hidden transition-opacity duration-200"
              onClick={closeMobileSidebar}
            />
            <aside
              className="fixed left-0 top-0 bottom-0 w-70 z-61 bg-ds-surface-low border-r border-ds-outline-variant flex flex-col md:hidden transition-transform duration-200"
            >
              <div className="flex items-center justify-between px-4 h-16 border-b border-ds-outline-variant">
                <span className="font-bold text-lg text-ds-on-surface">
                  Menu
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close sidebar"
                  onClick={closeMobileSidebar}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={20}
                    strokeWidth={1.5}
                  />
                </Button>
              </div>
              {navContent}
            </aside>
          </>
        )}
      </>
    );
  }

  return null;
}
