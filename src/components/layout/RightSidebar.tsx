'use client';
import {
  Book01Icon,
  BookOpen02Icon,
  Briefcase01Icon,
  CheckmarkCircle01Icon,
  CodeIcon,
  Download04Icon,
  ExternalLinkIcon,
  Globe02Icon,
  Link01Icon,
  Message01Icon,
  PlayCircleIcon,
  Share01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToc } from '@/hooks/useToc';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/types';

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
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: depth * 0.05 }}
    >
      <a
        href={`#${item.slug}`}
        className={cn(
          'block text-sm py-1 transition-all duration-200 border-l-2',
          depth === 0 && 'pl-3 font-medium',
          depth === 1 && 'pl-6',
          depth >= 2 && 'pl-9 text-xs',
          isActive
            ? 'border-ds-primary text-ds-primary font-semibold bg-ds-primary/5 rounded-r-lg'
            : 'border-transparent text-ds-on-surface-variant hover:text-ds-on-surface hover:border-ds-outline hover:bg-ds-surface-high/50 rounded-r-lg',
        )}
      >
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
    </motion.li>
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
  const [shareUrls, setShareUrls] = useState({ twitter: '', linkedin: '' });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent('Check out this developer resource!');
      setShareUrls({
        twitter: `https://x.com/intent/tweet?url=${url}&text=${text}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      });
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

  return (
    <aside
      id="right-sidebar"
      className={cn(
        'hidden xl:flex flex-col gap-6',
        'fixed right-0 top-16 bottom-0 w-64 z-40',
        'p-5 overflow-hidden',
        'border-l border-ds-outline-variant',
        'bg-ds-surface-low',
        className,
      )}
    >
      {toc.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
            On This Page
          </h2>
          <ul className="space-y-0.5">
              {toc.map((item) => (
                <TocItemComponent
                  key={item.slug}
                  item={item}
                  activeId={activeId}
                />
              ))}
            </ul>
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
                <motion.a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 3 }}
                  className={cn(
                    'flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg',
                    key === 'download' || key === 'downloadUrl'
                      ? 'text-ds-primary font-medium hover:bg-ds-primary/10'
                      : 'text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high',
                    'transition-colors',
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
                </motion.a>
              );
            })}
          </div>
        </section>
      )}

      <section className="pt-4 border-t border-ds-outline-variant">
        <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
          Share Article
        </h2>
        <div className="flex flex-col gap-1.5">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCopyLink}
            className="justify-start gap-2 text-sm py-1.5 px-2 rounded-lg text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors text-left w-full cursor-pointer"
          >
            {copied ? (
              <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
            ) : (
              <HugeiconsIcon icon={Link01Icon} size={16} />
            )}
            <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
          </Button>
          <a
            href={shareUrls.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors"
          >
            <HugeiconsIcon icon={Share01Icon} size={16} />
            Share on X
          </a>
          <a
            href={shareUrls.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-lg text-ds-on-surface-variant hover:text-ds-on-surface hover:bg-ds-surface-high transition-colors"
          >
            <HugeiconsIcon icon={Briefcase01Icon} size={16} />
            Share on LinkedIn
          </a>
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
                className="text-sm text-ds-on-surface-variant hover:text-ds-primary transition-colors py-1"
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
