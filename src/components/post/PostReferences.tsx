'use client';

import { LinkStatusIndicator } from '@/components/ui/LinkStatusIndicator';

interface PostReferencesProps {
  references: string[];
}

export function PostReferences({ references }: PostReferencesProps) {
  return (
    <div className="mt-10 pt-6 border-t border-ds-outline-variant">
      <h2 className="text-lg font-semibold text-ds-on-surface mb-3">References</h2>
      <ul className="space-y-2">
        {references.map((ref) => (
          <li key={ref} className="flex items-center gap-2.5">
            <LinkStatusIndicator url={ref} className="mt-0.5" />
            <a
              href={ref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ds-primary hover:underline break-all"
            >
              {ref}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
