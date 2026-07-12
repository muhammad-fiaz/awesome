'use client';
import { Cancel01Icon, CookieIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@/components/ui/button';
import { BASE_PATH } from '@/config/site';
import { useCookieStore } from '@/store/cookieStore';
import { useState, useEffect } from 'react';

export function CookieBanner() {
  const { consentAccepted, setConsent } = useCookieStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || consentAccepted !== null) return null;

  const accept = () => setConsent(true);
  const decline = () => setConsent(false);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-200 md:max-w-sm animate-none">
      <div className="rounded-2xl border border-ds-outline-variant bg-ds-surface-container shadow-2xl p-4">
        <div className="flex items-start gap-3 mb-3">
          <HugeiconsIcon
            icon={CookieIcon}
            size={22}
            strokeWidth={1.5}
            className="text-ds-primary shrink-0 mt-0.5"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-ds-on-surface mb-1">
              Cookie Notice
            </p>
            <p className="text-xs text-ds-on-surface-variant leading-relaxed">
              We use cookies to enhance your experience. By continuing, you
              agree to our{' '}
              <a
                href={`${BASE_PATH}/legal/cookie-policy/`}
                className="text-ds-primary hover:underline font-medium"
              >
                Cookie Policy
              </a>
              .
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={decline}
            aria-label="Dismiss"
            className="h-6 w-6 shrink-0"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={14} strokeWidth={2} />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={accept} size="sm" className="flex-1">
            Accept All
          </Button>
          <Button
            type="button"
            onClick={decline}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
