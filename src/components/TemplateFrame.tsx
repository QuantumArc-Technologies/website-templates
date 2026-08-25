import { useState } from 'react'
import type { TemplateMeta } from '../templates'

/** Renders a template's original HTML file verbatim, isolated in an iframe. */
export default function TemplateFrame({ template }: { template: TemplateMeta }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative h-full w-full bg-ink">
      {!loaded && (
        <div className="absolute inset-0 grid place-items-center text-zinc-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-600 border-t-zinc-200" />
        </div>
      )}
      <iframe
        key={template.slug}
        src={template.file}
        title={template.name}
        onLoad={() => setLoaded(true)}
        allow="autoplay; fullscreen"
        className={`h-full w-full border-0 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
