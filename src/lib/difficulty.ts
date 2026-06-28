import type { Difficulty } from '@/types/post';

export const difficultyColors: Record<Difficulty, string> = {
  beginner: 'bg-ds-success/15 text-ds-success border-ds-success/30',
  intermediate: 'bg-ds-warning/15 text-ds-warning border-ds-warning/30',
  advanced: 'bg-ds-error/15 text-ds-error border-ds-error/30',
  expert: 'bg-ds-primary/15 text-ds-primary border-ds-primary/30',
};
