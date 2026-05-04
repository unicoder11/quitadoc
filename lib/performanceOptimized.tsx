'use client'

import { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

// Componentes com lazy loading dinâmico
const SimuladorDivida = dynamic(() => import('./simulador-divida').then(m => ({ default: m.SimuladorDivida })), {
  loading: () => <div className="h-96 bg-secondary/50 rounded-xl animate-pulse" />,
  ssr: false
})

const InterLinkingSection = dynamic(() => import('./interlinking-section').then(m => ({ default: m.default })), {
  loading: () => <div className="h-48 bg-secondary/50 rounded-xl animate-pulse" />,
})

const AutoridadeBuilder = dynamic(() => import('./autoridade-builder').then(m => ({ default: m.AutoridadeBuilder })), {
  loading: () => <div className="h-96 bg-secondary/50 rounded-xl animate-pulse" />,
})

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
      
      {/* Lazy load simulador após hero */}
      <Suspense fallback={<div className="h-96 bg-secondary/50 rounded-xl animate-pulse" />}>
        <SimuladorDivida />
      </Suspense>
      
      {/* Lazy load interlinking */}
      <Suspense fallback={<div className="h-48 bg-secondary/50 rounded-xl animate-pulse" />}>
        <InterLinkingSection />
      </Suspense>
      
      {/* Lazy load autoridade */}
      <Suspense fallback={<div className="h-96 bg-secondary/50 rounded-xl animate-pulse" />}>
        <AutoridadeBuilder />
      </Suspense>
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
