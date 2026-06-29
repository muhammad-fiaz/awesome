'use client';
import { Comment01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GISCUS } from '@/config/site';

interface GiscusCommentsProps {
  term?: string;
  className?: string;
}

function getInitialTheme(): string {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

export function GiscusComments({ term, className }: GiscusCommentsProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [theme, setTheme] = useState(getInitialTheme);

  const sendThemeMessage = useCallback((newTheme: string) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: newTheme } } },
        'https://giscus.app',
      );
    }
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.classList.contains('light')
        ? 'light'
        : 'dark';
      setTheme(newTheme);
      sendThemeMessage(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [sendThemeMessage]);

  useEffect(() => {
    const container = document.getElementById('giscus-container');
    if (!container) return;

    const existing = container.querySelector('script[src="https://giscus.app/client.js"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', GISCUS.repo);
    script.setAttribute('data-repo-id', GISCUS.repoId);
    script.setAttribute('data-category', GISCUS.category);
    script.setAttribute('data-category-id', GISCUS.categoryId);
    script.setAttribute('data-mapping', term ? 'specific' : GISCUS.mapping);
    if (term) script.setAttribute('data-term', term);
    script.setAttribute('data-strict', GISCUS.strict);
    script.setAttribute('data-reactions-enabled', GISCUS.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS.emitMetadata);
    script.setAttribute('data-input-position', GISCUS.inputPosition);
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', GISCUS.lang);
    script.setAttribute('data-loading', GISCUS.loading);
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);

    const checkIframe = setInterval(() => {
      const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      if (iframe) {
        iframeRef.current = iframe;
        sendThemeMessage(theme);
        clearInterval(checkIframe);
      }
    }, 500);

    return () => clearInterval(checkIframe);
  }, [term, theme, sendThemeMessage]);

  return (
    <div className={className}>
      <div className="border-t border-ds-outline-variant pt-8 mt-8">
        <h2 className="text-xl font-semibold text-ds-on-surface mb-6 flex items-center gap-2">
          <HugeiconsIcon icon={Comment01Icon} size={22} className="text-ds-primary" />
          Discussion
        </h2>
        <div id="giscus-container" />
      </div>
    </div>
  );
}
