'use client';
import { Comment01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect } from 'react';
import { GISCUS } from '@/config/site';

interface GiscusCommentsProps {
  term?: string;
  className?: string;
}

export function GiscusComments({ term, className }: GiscusCommentsProps) {
  useEffect(() => {
    // Dynamically load giscus script
    const existingScript = document.querySelector(
      'script[src="https://giscus.app/client.js"]',
    );
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS.repo);
    script.setAttribute('data-repo-id', GISCUS.repoId);
    script.setAttribute('data-category', GISCUS.category);
    script.setAttribute('data-category-id', GISCUS.categoryId);
    if (term) {
      script.setAttribute('data-mapping', 'specific');
      script.setAttribute('data-term', term);
    } else {
      script.setAttribute('data-mapping', GISCUS.mapping);
    }
    script.setAttribute('data-strict', GISCUS.strict);
    script.setAttribute('data-reactions-enabled', GISCUS.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS.emitMetadata);
    script.setAttribute('data-input-position', GISCUS.inputPosition);
    script.setAttribute('data-theme', GISCUS.theme);
    script.setAttribute('data-lang', GISCUS.lang);
    script.setAttribute('data-loading', GISCUS.loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    const container = document.getElementById('giscus-container');
    if (container) container.appendChild(script);
  }, [term]);

  return (
    <div className={className}>
      <div className="border-t border-ds-outline-variant pt-8 mt-8">
        <h2 className="text-xl font-semibold text-ds-on-surface mb-6 flex items-center gap-2">
          <HugeiconsIcon
            icon={Comment01Icon}
            size={22}
            className="text-ds-primary"
          />
          Discussion
        </h2>
        <div id="giscus-container" />
      </div>
    </div>
  );
}
