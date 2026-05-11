import Image from "next/image"

/**
 * Componente de imagem otimizada com WebP, lazy loading
 * Suporta Largest Contentful Paint (LCP) otimizado
 */

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = "",
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      quality={75}
      placeholder="blur"
      blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3C/svg%3E"
      className={`h-auto w-full ${className}`}
      onLoad={(event) => {
        // Registrar WebCore Vitals
        const img = event.currentTarget as HTMLImageElement
        if (img.naturalWidth > 0) {
          console.log(`[v0] Image loaded: ${alt}`)
        }
      }}
    />
  )
}

/**
 * Script de preload crítico para fonts e recursos essenciais
 */
export function CriticalResourcesPreload() {
  return (
    <>
      {/* Preload do site font */}
      <link
        rel="preload"
        href="/fonts/geist-sans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {/* Preload do logo */}
      <link rel="preload" href="/logo.png" as="image" type="image/png" />
      {/* Preload favicon */}
      <link rel="preload" href="/favicon.png" as="image" type="image/png" />
      {/* DNS prefetch para recursos externos */}
      <link rel="dns-prefetch" href="https://wa.me" />
      <link rel="dns-prefetch" href="https://api.indexnow.org" />
    </>
  )
}

/**
 * Componente de CSS crítico inline
 * Reduz render-blocking CSS
 */
export function CriticalCSS() {
  const criticalStyles = `
    html {
      scroll-behavior: smooth;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
    }
    /* Evitar CLS - espaço reservado */
    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      line-height: 1.2;
    }
    .lazy-image {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: criticalStyles,
      }}
    />
  )
}
