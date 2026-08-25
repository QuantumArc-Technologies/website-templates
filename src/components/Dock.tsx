import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react'
import { templates, type TemplateMeta } from '../templates'

interface Props {
  current: TemplateMeta
}

/**
 * Floating gallery chrome. It overlays the template (instead of pushing it)
 * so every template gets the full viewport — exactly like its original page,
 * including fixed headers and window-width based mobile layouts.
 */
export default function Dock({ current }: Props) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const index = templates.indexOf(current)
  const go = (i: number) => {
    setOpen(false)
    navigate(`/templates/${templates[(i + templates.length) % templates.length].slug}`)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return
      if (e.key === 'ArrowRight') go(index + 1)
      if (e.key === 'ArrowLeft') go(index - 1)
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [current.slug])

  return (
    <div className="gallery-ui" style={{ position: 'relative', zIndex: 2147483000 }}>
      {/* pill */}
      <div className="fixed bottom-4 left-4 flex items-center gap-1 rounded-full border border-white/10 bg-ink/85 p-1.5 shadow-[0_10px_40px_-10px_rgba(0,0,0,.9)] backdrop-blur-xl">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 transition-colors hover:bg-white/10"
          aria-label="Open template list"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-full font-mono text-[11px] font-semibold text-ink"
            style={{ background: current.accent }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-[13px] font-semibold text-white">{current.name}</span>
            <span className="block text-[11px] text-zinc-400">
              {index + 1} / {templates.length} · {current.category}
            </span>
          </span>
          <LayoutGrid size={16} className="text-zinc-400 sm:hidden" />
        </button>
        <span className="mx-0.5 h-6 w-px bg-white/10" />
        <button onClick={() => go(index - 1)} className="rounded-full p-2 text-zinc-300 hover:bg-white/10" aria-label="Previous template">
          <ChevronLeft size={16} />
        </button>
        <button onClick={() => go(index + 1)} className="rounded-full p-2 text-zinc-300 hover:bg-white/10" aria-label="Next template">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* drawer */}
      {open && (
        <>
          <div className="gallery-fade fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="gallery-fade fixed inset-y-0 left-0 flex w-[min(20rem,100vw)] flex-col border-r border-line bg-ink-2 shadow-2xl">
            <div className="flex items-center justify-between px-5 py-5">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-ink">
                  <LayoutGrid size={16} strokeWidth={2.5} />
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold">Template Gallery</p>
                  <p className="text-[11px] text-zinc-500">by Vaishakh K</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-md p-1.5 text-zinc-400 hover:bg-ink-3" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <p className="px-5 pb-2 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Templates · {templates.length}
            </p>
            <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 pb-4">
              {templates.map((t, i) => {
                const active = t.slug === current.slug
                return (
                  <Link
                    key={t.slug}
                    to={`/templates/${t.slug}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                      active ? 'bg-ink-3 text-white' : 'text-zinc-400 hover:bg-ink-3/60 hover:text-zinc-200'
                    }`}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-xs font-medium"
                      style={{ background: active ? t.accent : '#202024', color: active ? '#0f0f10' : '#a1a1aa' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{t.name}</span>
                      <span className="block truncate text-xs text-zinc-500">{t.tagline}</span>
                    </span>
                    <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-zinc-500">{t.category}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="border-t border-line px-5 py-4 text-[11px] text-zinc-500">
              ← → keys switch templates · Esc closes
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
