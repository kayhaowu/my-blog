"use client"
import React from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
  objectFit?: 'cover' | 'contain' | 'none' | 'scale-down';
  className?: string;
}

export  function CustomImage ({
  src,
  alt,
  width,
  height,
  layout = 'responsive',
  objectFit = 'cover',
  className,
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout={layout}
      objectFit={objectFit}
      className={className}
    />
  );
};
