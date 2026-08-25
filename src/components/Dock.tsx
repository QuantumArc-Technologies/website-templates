import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid, X } from 'lucide-react'
import { templates, type TemplateMeta } from '../templates'

interface Props {
  current: TemplateMeta
}

/**
 * Floating gallery chrome. It overlays the template (instead of pushing it)
 * so every template gets the full viewport — exactly like its original page.
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

      {/* sidebar */}
      {open && (
        <>
          <div className="gallery-fade fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="gallery-slide fixed inset-y-0 left-0 flex w-[min(25rem,100vw)] flex-col p-3 sm:p-4">
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] backdrop-blur-2xl">
              {/* header */}
              <div className="flex items-center justify-between px-5 pb-4 pt-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-ink">
                    <LayoutGrid size={17} strokeWidth={2.5} />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[15px] font-semibold">Template Gallery</p>
                    <p className="text-[11px] text-zinc-500">by Vaishakh K · {templates.length} templates</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* list */}
              <nav className="scrollbar-thin flex-1 space-y-1.5 overflow-y-auto px-3 pb-3">
                {templates.map((t, i) => {
                  const active = t.slug === current.slug
                  return (
                    <Link
                      key={t.slug}
                      to={`/templates/${t.slug}`}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative flex items-center gap-3.5 rounded-2xl border px-3 py-3 transition-all ${
                        active
                          ? 'border-white/10 bg-white/[0.07]'
                          : 'border-transparent hover:border-white/5 hover:bg-white/[0.04]'
                      }`}
                    >
                      {/* accent bar */}
                      <span
                        className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
                        style={{ background: t.accent }}
                      />
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-[12px] font-semibold transition-colors"
                        style={{
                          background: active ? t.accent : 'rgba(255,255,255,0.05)',
                          color: active ? '#0f0f10' : '#a1a1aa',
                          boxShadow: active ? `0 8px 24px -8px ${t.accent}` : undefined,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-[14px] font-semibold ${active ? 'text-white' : 'text-zinc-200'}`}>{t.name}</span>
                        <span className="block truncate text-[12px] text-zinc-500">{t.tagline}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                          {t.category}
                        </span>
                        <ArrowUpRight size={14} className={`text-zinc-500 transition-all ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                      </span>
                    </Link>
                  )
                })}
              </nav>

              {/* footer */}
              <div className="flex items-center justify-between border-t border-white/5 px-5 py-3 text-[11px] text-zinc-500">
                <span>
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">←</kbd>{' '}
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">→</kbd> switch
                </span>
                <span>
                  <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono">Esc</kbd> close
                </span>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
