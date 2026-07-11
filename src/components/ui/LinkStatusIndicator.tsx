'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface LinkStatusIndicatorProps {
  url: string;
  className?: string;
}

// Module-level cache to prevent duplicate fetches for same links
const urlStatusCache = new Map<string, 'active' | 'inactive'>();

export async function fetchLinkStatus(url: string): Promise<'active' | 'inactive'> {
  if (!url) return 'inactive';

  if (url.startsWith('mailto:') || url.startsWith('tel:')) {
    return 'active';
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 2000);

    try {
      const res = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        credentials: 'omit',
      });
      clearTimeout(id);
      return res.status === 404 ? 'inactive' : 'active';
    } catch (e) {
      const controller2 = new AbortController();
      const id2 = setTimeout(() => controller2.abort(), 3000);
      
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
      const res = await fetch(proxyUrl, {
        method: 'GET',
        signal: controller2.signal,
      });
      clearTimeout(id2);
      return res.status === 404 ? 'inactive' : 'active';
    }
  } catch (error) {
    return 'inactive';
  }
}

export function LinkStatusIndicator({ url, className }: LinkStatusIndicatorProps) {
  const [status, setStatus] = useState<'active' | 'inactive' | undefined>(urlStatusCache.get(url));
  const [isLoading, setIsLoading] = useState(status === undefined);

  useEffect(() => {
    const cached = urlStatusCache.get(url);
    if (cached !== undefined) {
      setStatus(cached);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fetchLinkStatus(url)
      .then((res) => {
        urlStatusCache.set(url, res);
        setStatus(res);
      })
      .catch(() => {
        urlStatusCache.set(url, 'inactive');
        setStatus('inactive');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);

  if (isLoading) {
    return (
      <span className={cn("inline-flex items-center justify-center shrink-0", className)} title="Checking status...">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-outline/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-outline/50"></span>
        </span>
      </span>
    );
  }

  const isActive = status === 'active';

  return (
    <span 
      className={cn("inline-flex items-center justify-center shrink-0", className)} 
      title={isActive ? "Active (Online)" : "Inactive (Offline)"}
    >
      <span className="relative flex h-2 w-2">
        {isActive ? (
          <>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-success/40 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-success"></span>
          </>
        ) : (
          <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-error"></span>
        )}
      </span>
    </span>
  );
}
