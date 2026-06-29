'use client';
import { CheckmarkCircle01Icon, Copy01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export function CodeCopyButtons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pres = document.querySelectorAll('.prose pre:not([data-copy-initialized])');
    pres.forEach((pre) => {
      pre.setAttribute('data-copy-initialized', 'true');
      pre.classList.add('relative', 'group');

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'absolute top-2 right-2 z-10 h-7 w-7 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-ds-surface-high/80 hover:bg-ds-surface-high backdrop-blur-sm border border-ds-outline-variant/50 text-ds-on-surface-variant hover:text-ds-on-surface cursor-pointer';
      btn.title = 'Copy code';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code');
        if (!code) return;
        try {
          await navigator.clipboard.writeText(code.textContent ?? '');
        } catch {
          const range = document.createRange();
          range.selectNodeContents(code);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          document.execCommand('copy');
          sel?.removeAllRanges();
        }
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
        btn.classList.add('text-ds-success');
        setTimeout(() => {
          btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
          btn.classList.remove('text-ds-success');
        }, 2000);
      });

      pre.appendChild(btn);
    });
  }, []);

  return null;
}
