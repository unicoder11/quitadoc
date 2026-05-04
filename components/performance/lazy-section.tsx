"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazySection({ 
  children, 
  fallback = null,
  rootMargin = "200px",
  threshold = 0.1,
  className = ""
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  )
}

// Skeleton placeholder for sections
export function SectionSkeleton({ height = "400px" }: { height?: string }) {
  return (
    <div 
      className="animate-pulse bg-secondary/50 rounded-lg"
      style={{ height }}
    />
  )
}

// Image lazy load with blur placeholder
interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function LazyImage({ src, alt, width, height, className = "", priority = false }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: "50px" }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-secondary ${className}`}
      style={{ aspectRatio: `${width}/${height}` }}
    >
      {isInView && (
        <>
          {/* Blur placeholder */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-secondary animate-pulse" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
    </div>
  )
}
