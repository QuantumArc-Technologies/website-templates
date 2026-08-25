import { useEffect, useState } from 'react'
import Page from './Page'
import './mobile.css'

const LINKS = ['About', 'Services', 'Products', 'Industries', 'Quality', 'Contact']

/** Wraps the generated page with a mobile navigation + responsive overrides (see mobile.css). */
export default function LiftflowWebsite() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="lw-scope">
      <Page />
      <button className="lw-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span /><span /><span />
      </button>
      {open && (
        <nav className="lw-drawer" onClick={() => setOpen(false)}>
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
          <small>Lift Flow · Musaffah, Abu Dhabi</small>
        </nav>
      )}
    </div>
  )
}
