import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BASE_PATH } from '@/config/site';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export function resolveImageUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) {
    if (url.startsWith(BASE_PATH)) return url;
    return `${BASE_PATH}${url}`;
  }
  return url;
}

export function stripContentId(id: string): string {
  return id.replace(/\.(md|mdx)$/, '');
}
