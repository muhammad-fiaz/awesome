'use client';
import React, { useState, useEffect } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback: React.ReactNode;
}

export function SafeImage({ src, alt, className, fallback, ...props }: SafeImageProps) {
  const [isBroken, setIsBroken] = useState(false);

  useEffect(() => {
    setIsBroken(false);
  }, [src]);

  if (!src || isBroken) {
    return <>{fallback}</>;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setIsBroken(true)}
      {...props}
    />
  );
}
