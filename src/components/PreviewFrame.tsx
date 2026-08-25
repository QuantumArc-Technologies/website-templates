import type { ReactNode } from 'react'
import { Menu, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react'
import type { TemplateMeta } from '../templates'

export type Viewport = 'desktop' | 'tablet' | 'mobile'
const widths: Record<Viewport, string> = { desktop: '100%', tablet: '820px', mobile: '390px' }
const viewports = [
  { v: 'desktop', Icon: Monitor },
  { v: 'tablet', Icon: Tablet },
  { v: 'mobile', Icon: Smartphone },
] as const

interface Props {
  template: TemplateMeta
  index: number
  viewport: Viewport
  onViewport: (v: Viewport) => void
  onMenu: () => void
  children: ReactNode
}

export default function PreviewFrame({ template, index, viewport, onViewport, onMenu, children }: Props) {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-line bg-ink-2 px-4">
        <button onClick={onMenu} className="rounded-md p-1.5 text-zinc-400 hover:bg-ink-3 lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: template.accent }} />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm font-semibold">{template.name}</p>
          <p className="truncate font-mono text-[11px] text-zinc-500">
            {String(index + 1).padStart(2, '0')} · {template.tagline}
          </p>
        </div>
        <div className="ml-auto hidden items-center gap-1 rounded-lg border border-line bg-ink p-1 sm:flex">
          {viewports.map(({ v, Icon }) => (
            <button
              key={v}
              onClick={() => onViewport(v)}
              aria-label={v}
              className={`rounded-md p-1.5 transition-colors ${
                viewport === v ? 'bg-ink-3 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
        <a
          href={template.file}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs text-zinc-300 hover:bg-ink-3 sm:flex"
        >
          Open full <ExternalLink size={12} />
        </a>
      </header>

      <div className="flex-1 overflow-hidden bg-[radial-gradient(circle_at_1px_1px,#26262c_1px,transparent_0)] bg-[size:20px_20px] p-3 sm:p-5">
        <div
          className="mx-auto h-full overflow-hidden rounded-xl bg-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,.8)] ring-1 ring-white/10 transition-[max-width] duration-300"
          style={{ maxWidth: widths[viewport] }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
