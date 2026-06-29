'use client';
import { Moon01Icon, Sun01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

interface ThemeToggleProps {
  size?: 'sm' | 'md';
  className?: string;
}

export function ThemeToggle({ size = 'md', className }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const iconSize = size === 'sm' ? 20 : 22;

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('relative', className)}
        aria-label="Toggle theme"
      >
        <HugeiconsIcon icon={Moon01Icon} size={iconSize} strokeWidth={1.5} />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn('relative', className)}
    >
      <HugeiconsIcon
        icon={theme === 'dark' ? Sun01Icon : Moon01Icon}
        size={iconSize}
        strokeWidth={1.5}
      />
    </Button>
  );
}
