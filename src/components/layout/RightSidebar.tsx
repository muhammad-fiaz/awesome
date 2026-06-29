'use client';
import {
  Book01Icon,
  BookOpen02Icon,
  CheckmarkCircle01Icon,
  CodeIcon,
  Copy01Icon,
  Download04Icon,
  ExternalLinkIcon,
  Globe02Icon,
  Message01Icon,
  PlayCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { icons as mdiIcons } from '@iconify-json/mdi';
import { Icon, addCollection } from '@iconify/react';
import { motion, LayoutGroup } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToc } from '@/hooks/useToc';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/types';

addCollection(mdiIcons);

interface RightSidebarProps {
  toc?: TocItem[];
  relatedLinks?: Array<{ label: string; href: string; external?: boolean }>;
  postLinks?: Record<string, string | undefined>;
  className?: string;
}

function TocItemComponent({
  item,
  activeId,
  depth = 0,
}: {
  item: TocItem;
  activeId: string;
  depth?: number;
}) {
  const isActive = activeId === item.slug;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="relative">
      <a
        href={`#${item.slug}`}
        className={cn(
          'relative block text-sm py-1.5 transition-colors duration-200 border-l-2 z-10',
          depth === 0 && 'pl-3 font-medium',
          depth === 1 && 'pl-6',
          depth >= 2 && 'pl-9 text-xs',
          isActive
            ? 'border-ds-primary text-ds-primary font-semibold'
            : 'border-transparent text-ds-on-surface-variant hover:text-ds-on-surface hover:border-ds-outline-variant hover:bg-ds-surface-high/30 rounded-r-lg',
        )}
      >
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-ds-primary/10 rounded-r-lg -z-10"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        )}
        {item.text}
      </a>
      {hasChildren && (
        <ul className="mt-0.5 space-y-0.5">
          {item.children?.map((child) => (
            <TocItemComponent
              key={child.slug}
              item={child}
              activeId={activeId}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const linkIcons: Record<string, typeof Globe02Icon> = {
  website: Globe02Icon,
  github: CodeIcon,
  documentation: BookOpen02Icon,
  demo: ExternalLinkIcon,
  npm: Book01Icon,
  crate: CodeIcon,
  youtube: PlayCircleIcon,
  discord: Message01Icon,
  downloadUrl: Download04Icon,
  download: Download04Icon,
};

export function RightSidebar({
  toc = [],
  relatedLinks = [],
  postLinks = {},
  className,
}: RightSidebarProps) {
  const activeId = useToc(toc);
  const activePostLinks = Object.entries(postLinks).filter(
    ([, v]) => v && v.trim() !== '',
  );

  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareTitle, setShareTitle] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(encodeURIComponent(window.location.href));
      setShareTitle(encodeURIComponent(document.title));
    }
  }, []);

  const handleCopyLink = async () => {
    if (typeof window !== 'undefined') {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  const shareLinks = [
    { label: 'Copy Link', icon: 'mdi:link-variant', href: '#', onClick: handleCopyLink, isButton: true },
    { label: 'X / Twitter', icon: 'mdi:twitter', href: `https://x.com/intent/tweet?url=${shareUrl}&text=${shareTitle}` },
    { label: 'LinkedIn', icon: 'mdi:linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` },
    { label: 'Facebook', icon: 'mdi:facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` },
    { label: 'WhatsApp', icon: 'mdi:whatsapp', href: `https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}` },
    { label: 'Reddit', icon: 'mdi:reddit', href: `https://reddit.com/submit?url=${shareUrl}&title=${shareTitle}` },
    { label: 'Hacker News', icon: 'mdi:alpha-y-box', href: `https://news.ycombinator.com/submitlink?u=${shareUrl}&t=${shareTitle}` },
    { label: 'Telegram', icon: 'mdi:telegram', href: `https://t.me/share/url?url=${shareUrl}&text=${shareTitle}` },
  ];

  return (
    <aside
      id="right-sidebar"
      className={cn(
        'hidden xl:flex flex-col gap-5',
        'fixed right-0 top-16 bottom-0 w-64 z-40',
        'p-5 overflow-hidden',
        'border-l border-ds-outline-variant',
        'bg-ds-surface-low',
        className,
      )}
    >
      {toc.length > 0 && (
        <section className="flex flex-col min-h-0 flex-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3 shrink-0">
            On This Page
          </h2>
          <div className="overflow-y-auto pr-1 flex-1 min-h-0 custom-scrollbar scrollbar-thin">
            <LayoutGroup id="toc">
              <ul className="space-y-0.5">
                {toc.map((item) => (
                  <TocItemComponent
                    key={item.slug}
                    item={item}
                    activeId={activeId}
                  />
                ))}
              </ul>
            </LayoutGroup>
          </div>
        </section>
      )}

      {activePostLinks.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
            Links
          </h2>
          <div className="flex flex-col gap-1.5">
            {activePostLinks.map(([key, href]) => {
              const linkLabel: Record<string, string> = {
                downloadUrl: 'Download',
                download: 'Download',
                website: 'Website',
                github: 'GitHub',
                documentation: 'Documentation',
                demo: 'Demo',
                npm: 'npm',
                crate: 'Crate',
                youtube: 'YouTube',
                discord: 'Discord',
              };
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg',
                    key === 'download' || key === 'downloadUrl'
                      ? 'text-ds-primary font-medium hover:bg-ds-primary/10'
                      : 'text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high',
                    'transition-colors duration-150',
                  )}
                >
                  {(() => {
                    const Icon = linkIcons[key] ?? ExternalLinkIcon;
                    return <HugeiconsIcon icon={Icon} size={16} />;
                  })()}
                  <span>{linkLabel[key] ?? key}</span>
                  <HugeiconsIcon
                    icon={ExternalLinkIcon}
                    size={12}
                    className="ml-auto opacity-50"
                  />
                </a>
              );
            })}
          </div>
        </section>
      )}

      <section className="pt-4 border-t border-ds-outline-variant">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
          Share Article
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {shareLinks.map((item) => {
            if (item.isButton) {
              return (
                <Button
                  key={item.label}
                  type="button"
                  variant="ghost"
                  onClick={item.onClick}
                  title={copied ? 'Link copied' : item.label}
                  aria-label={copied ? 'Link copied' : item.label}
                  className="h-9 w-9 rounded-lg p-0 text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors duration-150 cursor-pointer"
                >
                  {copied ? (
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />
                  ) : (
                    <HugeiconsIcon icon={Copy01Icon} size={18} />
                  )}
                  <span className="sr-only">{copied ? 'Link copied' : item.label}</span>
                </Button>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.label}
                aria-label={item.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors duration-150"
              >
                <Icon icon={item.icon} width={18} height={18} aria-hidden="true" />
                <span className="sr-only">{item.label}</span>
              </a>
            );
          })}
        </div>
      </section>

      {relatedLinks.length > 0 && (
        <section className="pt-4 border-t border-ds-outline-variant">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
            Related
          </h2>
          <div className="flex flex-col gap-1">
            {relatedLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className="text-sm text-ds-on-surface-variant hover:text-ds-primary transition-colors duration-150 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
