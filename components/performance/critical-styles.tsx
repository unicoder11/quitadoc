// Critical inline styles for above-the-fold content
// These are inlined to avoid render-blocking CSS

export const criticalStyles = `
  /* Critical CSS for initial render */
  *,*::before,*::after{box-sizing:border-box}
  html{-webkit-text-size-adjust:100%;tab-size:4}
  body{margin:0;font-family:system-ui,-apple-system,sans-serif;line-height:1.5}
  
  /* Layout primitives */
  .flex{display:flex}
  .items-center{align-items:center}
  .justify-between{justify-content:space-between}
  .justify-center{justify-content:center}
  .gap-2{gap:0.5rem}
  .gap-4{gap:1rem}
  
  /* Typography */
  .text-lg{font-size:1.125rem}
  .text-xl{font-size:1.25rem}
  .text-2xl{font-size:1.5rem}
  .text-3xl{font-size:1.875rem}
  .font-bold{font-weight:700}
  .font-semibold{font-weight:600}
  
  /* Spacing */
  .p-4{padding:1rem}
  .px-4{padding-left:1rem;padding-right:1rem}
  .py-4{padding-top:1rem;padding-bottom:1rem}
  .mx-auto{margin-left:auto;margin-right:auto}
  .max-w-7xl{max-width:80rem}
  
  /* Colors - using CSS variables */
  .bg-primary{background-color:var(--primary)}
  .bg-card{background-color:var(--card)}
  .text-primary{color:var(--primary)}
  .text-foreground{color:var(--foreground)}
  
  /* Header fixed */
  .sticky{position:sticky}
  .top-0{top:0}
  .z-50{z-index:50}
  
  /* Hero section critical */
  .min-h-screen{min-height:100vh}
  .relative{position:relative}
  .absolute{position:absolute}
  .inset-0{top:0;right:0;bottom:0;left:0}
`

// Component to inject critical CSS
export function CriticalCSS() {
  return (
    <style
      dangerouslySetInnerHTML={{ __html: criticalStyles }}
      data-critical="true"
    />
  )
}

// Preload hints for critical resources
export function PreloadHints() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/geist-sans.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="https://wa.me" />
      <link rel="preconnect" href="https://wa.me" />
    </>
  )
}
