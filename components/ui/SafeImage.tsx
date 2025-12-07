/**
 * SafeImage Component
 *
 * External image kaynakları için fallback gösterir
 * 404 veya yükleme hatası durumunda placeholder gösterir
 */

"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export default function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  fill,
  priority,
  placeholder,
  blurDataURL,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    // Fallback: Gradient placeholder
    return (
      <div
        className={`bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center ${className || ""}`}
        style={fill ? undefined : { width, height }}
      >
        <span className="text-slate-400 text-xs">Görsel yüklenemedi</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      fill={fill}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoading(false)}
      style={{
        opacity: isLoading ? 0 : 1,
        transition: "opacity 0.3s",
      }}
    />
  );
}
