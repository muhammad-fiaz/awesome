'use client';
import { Moon01Icon, Sun01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

interface ThemeToggleProps {
  size?: 'sm' | 'md';
  className?: string;
}

export function ThemeToggle({ size = 'md', className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useThemeStore();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
  };

  const iconSize = size === 'sm' ? 20 : 22;

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn('relative', className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <HugeiconsIcon icon={Sun01Icon} size={iconSize} strokeWidth={1.5} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.18 }}
          >
            <HugeiconsIcon
              icon={Moon01Icon}
              size={iconSize}
              strokeWidth={1.5}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}
