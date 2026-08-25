import { NavLink } from 'react-router-dom'
import { LayoutGrid, X } from 'lucide-react'
import { templates } from '../templates'

interface Props {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  return (
    <>
      {/* mobile backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-ink-2 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
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
          <button onClick={onClose} className="rounded-md p-1.5 text-zinc-400 hover:bg-ink-3 lg:hidden" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <p className="px-5 pb-2 pt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          Templates · {templates.length}
        </p>

        <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {templates.map((t, i) => (
            <NavLink
              key={t.slug}
              to={`/templates/${t.slug}`}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
                  isActive ? 'bg-ink-3 text-white' : 'text-zinc-400 hover:bg-ink-3/60 hover:text-zinc-200'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-xs font-medium transition-colors"
                    style={{
                      background: isActive ? t.accent : '#202024',
                      color: isActive ? '#0f0f10' : '#a1a1aa',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{t.name}</span>
                    <span className="block truncate text-xs text-zinc-500">{t.tagline}</span>
                  </span>
                  <span className="rounded-full border border-line px-2 py-0.5 text-[10px] text-zinc-500">
                    {t.category}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-line px-5 py-4 text-[11px] text-zinc-500">
          Select a template to preview it live.
        </div>
      </aside>
    </>
  )
}
