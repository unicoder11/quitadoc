'use client'

import Image from 'next/image'

export function PerformanceOptimizedPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* Critical CSS Inline */
        .hero-critical {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 60vh;
          padding: 3rem 1rem;
        }
        .hero-critical h1 {
          font-size: clamp(1.5rem, 5vw, 4rem);
          font-weight: 700;
          line-height: 1.2;
        }
        .cta-button {
          display: inline-block;
          padding: 1rem 2rem;
          border-radius: 9999px;
          font-weight: 600;
          transition: transform 0.2s, background-color 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
        }
      `}</style>
      
      {children}
    </>
  )
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = ''
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3C/svg%3E"
      className={`object-cover ${className}`}
      unoptimized={false}
    />
  )
}
