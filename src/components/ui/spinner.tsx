import { Loading03Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@/lib/utils';

interface SpinnerProps extends Omit<React.ComponentProps<'svg'>, 'strokeWidth' | 'size'> {
  size?: number;
  strokeWidth?: number;
}

function Spinner({
  className,
  size = 16,
  strokeWidth = 2,
  ...props
}: SpinnerProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={strokeWidth}
      size={size}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
}

export { Spinner };
