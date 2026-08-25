import { useEffect, useRef, useState, type FormEvent } from 'react'
import './styles.css'
import { ABOUT, CATS, CERTS, CONTACT, DOCS, FACTS, FAVORITES, INDUSTRIES, LOGO, NAV, PROFILE_PDF, SERVICES, STRENGTHS, WHY } from './content'

/**
 * Template 06 — LiftFlow on a premium dark "Fluxo" theme: liquid-glass sticky
 * navbar, TubesCursor 3D background (threejs-components via jsDelivr), and the
 * full www.liftflowglobal.com content set as glass sections.
 */
const TUBES_URL = 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'

/* ── inline icons ── */
const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
)
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)
const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
)
const Star = () => <svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 5.9 21l1.3-6.8-5-4.7 6.8-.8z" /></svg>
const Shield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
)
const Wa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.8.9-.3.2-.5 0a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.7-1.8c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.7.1 2.8 2.8 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" /></svg>
)

/** Certification / programme wordmarks as inline SVG. */
function Mark({ top, main }: { top: string; main: string }) {
  return (
    <svg viewBox="0 0 150 40" aria-label={`${top} ${main}`} role="img">
      <rect x="0.5" y="0.5" width="149" height="39" rx="8" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <text x="14" y="15" fontFamily="Inter, system-ui, sans-serif" fontSize="8.5" fontWeight="500" letterSpacing="1.6" fill="currentColor" fillOpacity="0.7">{top}</text>
      <text x="14" y="30" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.2" fill="currentColor">{main}</text>
      <path d="M128 12l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function LiftflowSaas() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [open, setOpen] = useState(false)
  const [cat, setCat] = useState('all')
  const [sent, setSent] = useState(false)

  // 3D tubes background — static premium palette, no click randomisation
  useEffect(() => {
    let app: any
    let cancelled = false
    import(/* @vite-ignore */ TUBES_URL)
      .then((mod) => {
        if (cancelled || !canvasRef.current) return
        const TubesCursor = mod.default ?? mod.TubesCursor
        app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ['#ff008a', '#8b5cf6', '#3b82f6', '#ffffff'],
            lights: { intensity: 50, colors: ['#ff008a', '#8b5cf6', '#3b82f6', '#ffffff'] },
          },
        })
      })
      .catch(() => { /* decorative — page works without it */ })
    return () => {
      cancelled = true
      try { app?.dispose?.() } catch { /* ignore */ }
    }
  }, [])

  // reveal-on-scroll
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll<HTMLElement>('.fx-reveal')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((e) => e.classList.add('in')); return }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [cat])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const shownCats = cat === 'all' ? CATS : CATS.filter((c) => c.id === cat)
  const productCount = CATS.reduce((n, c) => n + c.items.length, 0)
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }

  return (
    <div className="fx" id="top" ref={rootRef}>
      <div className="fx-bg" />
      {/* fixed, viewport-sized parent: the tubes library sizes its canvas to the parent */}
      <div className="fx-canvas-wrap"><canvas id="canvas" ref={canvasRef} className="fx-canvas" /></div>
      <div className="fx-veil" />

      {/* ── liquid glass navbar ── */}
      <div className="fx-nav-wrap">
        <nav className="fx-nav" aria-label="Main">
          <a className="fx-logo" href="#top" aria-label="LiftFlow home"><img src={LOGO} alt="LiftFlow — Lifting Solutions" /></a>
          <div className="fx-links">
            {NAV.map((n) => <a key={n.label} href={n.href}>{n.label}{n.menu && <Chevron />}</a>)}
          </div>
          <div className="fx-actions">
            <a className="fx-login" href="tel:+97124916117">+971 24 916 117</a>
            <a className="fx-btn fx-btn-primary" href="#contact">Request a quote</a>
            <button className="fx-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              {open
                ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></svg>}
            </button>
          </div>
        </nav>
        {/* mobile drawer */}
        <div className={`fx-drawer${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
          {NAV.map((n) => <a key={n.label} href={n.href}>{n.label}{n.menu && <Chevron />}</a>)}
          <a className="fx-btn fx-btn-primary" href="#contact">Request a quote</a>
          <div className="fx-drawer-tel">{CONTACT.phones[0]} · {CONTACT.emails[0]}</div>
        </div>
      </div>

      <main className="fx-container">
        {/* ── hero ── */}
        <section className="fx-hero">
          <a className="fx-badge" href="#quality"><span className="tag">New</span><span>ADNOC ICV registered company</span><Arrow /></a>
          <h1 className="fx-h1">Leading lifting solutions<br />to power <span className="grad">every lift</span></h1>
          <p className="fx-sub">
            Lift Flow delivers high-quality lifting, rigging, and material handling solutions to industries where safety,
            reliability, and performance are critical.
          </p>
          <div className="fx-cta">
            <a className="fx-btn fx-btn-primary" href="#contact">Request a quote <Arrow /></a>
            <a className="fx-btn fx-btn-glass" href={PROFILE_PDF} target="_blank" rel="noreferrer">Download company profile</a>
          </div>
        </section>

        {/* ── social proof ── */}
        <section className="fx-proof">
          <p>Trusted across 7 industries in the Middle East</p>
          <div className="fx-logos">
            <a href="#quality"><Mark top="ISO 9001:2015" main="Quality" /></a>
            <a href="#quality"><Mark top="ISO 14001:2015" main="Environment" /></a>
            <a href="#quality"><Mark top="ISO 45001:2018" main="Safety" /></a>
            <a href="#quality"><Mark top="ADNOC" main="ICV Registered" /></a>
            <a href="#quality"><Mark top="DNV" main="Certified" /></a>
          </div>
          <div className="fx-review">
            <div className="fx-stars" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></div>
            <span>5.0/5 · {productCount} product lines · 8 categories · 7 industries</span>
          </div>
        </section>

        {/* ── about ── */}
        <section className="fx-section" id="about">
          <div className="fx-about">
            <div className="fx-reveal">
              <span className="fx-eyebrow">01 / Who we are</span>
              <h2 className="fx-h2">Trusted lifting &amp; rigging solutions for <span className="grad">critical industries</span></h2>
              <p className="fx-lead">{ABOUT.p1}</p>
              <p className="fx-lead">{ABOUT.p2}</p>
              <div className="fx-facts">
                {FACTS.map((f) => <div className="fx-fact" key={f.l}><b>{f.n}</b><span>{f.l}</span></div>)}
              </div>
            </div>
            <div className="fx-reveal">
              <div className="fx-panel"><h3>Vision</h3><p>{ABOUT.vision}</p></div>
              <div className="fx-panel">
                <h3>Mission</h3>
                <ul className="fx-list">{ABOUT.mission.map((m) => <li key={m}><Check />{m}</li>)}</ul>
              </div>
            </div>
          </div>
          <div className="fx-strengths fx-reveal">
            <span className="fx-eyebrow">02 / Our strengths</span>
            <h2 className="fx-h2">Why teams trust Lift Flow.</h2>
            <div className="fx-grid-3">
              {STRENGTHS.map((s, i) => (
                <div className="fx-card" key={s.name}><div className="fx-card-body"><span className="fx-num">{pad(i + 1)}</span><h3>{s.name}</h3><p>{s.desc}</p></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── services ── */}
        <section className="fx-section" id="services">
          <div className="fx-head fx-reveal">
            <div>
              <span className="fx-eyebrow">03 / Core services</span>
              <h2 className="fx-h2">End-to-end lifting, from <span className="grad">inquiry to delivery</span></h2>
            </div>
            <a className="fx-btn fx-btn-glass" href="#contact">Talk to an engineer <Arrow /></a>
          </div>
          <div className="fx-grid-3" style={{ marginTop: 40 }}>
            {SERVICES.map((s, i) => (
              <div className="fx-card fx-reveal" key={s.name}>
                <img className="fx-card-img" src={s.img} alt={s.name} loading="lazy" decoding="async" />
                <div className="fx-card-body"><span className="fx-num">{pad(i + 1)}</span><h3>{s.name}</h3><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── products ── */}
        <section className="fx-section" id="products">
          <div className="fx-head center fx-reveal">
            <span className="fx-eyebrow">04 / Product portfolio</span>
            <h2 className="fx-h2">Explore our complete <span className="grad">product catalogue</span></h2>
            <p className="fx-lead">Eight product families. One certified source. Select a category to explore lines.</p>
          </div>
          <div className="fx-chips fx-reveal" style={{ justifyContent: 'center' }}>
            <button className={`fx-chip${cat === 'all' ? ' on' : ''}`} onClick={() => setCat('all')}>All products<small>{productCount}</small></button>
            {CATS.map((c) => (
              <button key={c.id} className={`fx-chip${cat === c.id ? ' on' : ''}`} onClick={() => setCat(c.id)}>{c.name}<small>{c.items.length}</small></button>
            ))}
          </div>
          <div className="fx-grid-2 fx-cats">
            {shownCats.map((c) => (
              <div className="fx-card fx-reveal in" key={c.id}>
                <img className="fx-card-img" src={c.img} alt={c.name} loading="lazy" decoding="async" />
                <div className="fx-card-body">
                  <span className="fx-num">{pad(CATS.indexOf(c) + 1)} · {c.items.length} lines</span>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                  <div className="fx-items">{c.items.map((it) => <span key={it}>{it}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="fx-favs fx-reveal">
            <span className="fx-eyebrow">Industry favourites</span>
            <h2 className="fx-h2">Most requested equipment.</h2>
            <div className="fx-grid-4">
              {FAVORITES.map((f, i) => <a className="fx-fav" href="#contact" key={f}><b>{pad(i + 1)}</b>{f}</a>)}
            </div>
          </div>
        </section>

        {/* ── industries ── */}
        <section className="fx-section" id="industries">
          <div className="fx-head fx-reveal">
            <div>
              <span className="fx-eyebrow">05 / Industries we serve</span>
              <h2 className="fx-h2">Wherever the load is <span className="grad">critical.</span></h2>
            </div>
            <p className="fx-lead" style={{ marginTop: 0, maxWidth: '40ch' }}>
              Marine, Offshore, Oil &amp; Gas, Construction, Piling, Logistics and Crane sectors with certified products meeting international standards.
            </p>
          </div>
          <div className="fx-grid-3" style={{ marginTop: 40 }}>
            {INDUSTRIES.map((ind, i) => (
              <div className="fx-card fx-ind fx-reveal" key={ind.name}>
                <img src={ind.img} alt={ind.name} loading="lazy" decoding="async" />
                <div className="fx-ind-body">
                  <span className="fx-num">{pad(i + 1)}</span>
                  <h3>{ind.name}</h3>
                  <p>{ind.desc}</p>
                  <div className="fx-tags">{ind.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── quality ── */}
        <section className="fx-section" id="quality">
          <div className="fx-head center fx-reveal">
            <span className="fx-eyebrow">06 / Quality &amp; compliance</span>
            <h2 className="fx-h2">Safety is at the core of <span className="grad">everything we do.</span></h2>
            <p className="fx-lead">All products are sourced from carefully selected manufacturers with proven quality management systems.</p>
          </div>
          <div className="fx-grid-3" style={{ marginTop: 40 }}>
            {CERTS.map((c) => (
              <div className="fx-cert fx-reveal" key={c.std}>
                <b>{c.std.split(':')[0]}:<span>{c.std.split(':')[1]}</span></b>
                <p>{c.name}</p>
                <small>CERT NO. {c.no}</small>
              </div>
            ))}
          </div>
          <div className="fx-docs fx-reveal">
            <span className="fx-eyebrow">Supplied with every order</span>
            <ul className="fx-list">{DOCS.map((d) => <li key={d}><Check />{d}</li>)}</ul>
          </div>
          <div className="fx-why fx-reveal">
            <span className="fx-eyebrow">Why Lift Flow</span>
            <h2 className="fx-h2">The trusted choice for lifting &amp; rigging solutions.</h2>
            <div className="fx-grid-3">
              {WHY.map((w) => (
                <div className="fx-card" key={w.name}><div className="fx-card-body"><b><Shield /></b><div><h3>{w.name}</h3><p>{w.desc}</p></div></div></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── contact ── */}
        <section className="fx-section" id="contact">
          <div className="fx-head fx-reveal">
            <div>
              <span className="fx-eyebrow">07 / Contact us</span>
              <h2 className="fx-h2">Ready to lift with <span className="grad">confidence?</span></h2>
              <p className="fx-lead">Send us your lifting requirement — our team responds with certified product options and engineering guidance.</p>
            </div>
          </div>
          <div className="fx-contact" style={{ marginTop: 40 }}>
            <div className="fx-panel fx-reveal">
              {sent ? (
                <div className="fx-sent">
                  <b>Request received</b>
                  <p>Thank you — a Lift Flow engineer will contact you shortly.</p>
                  <button onClick={() => setSent(false)}>Send another request</button>
                </div>
              ) : (
                <form className="fx-form" onSubmit={submit}>
                  <div className="row">
                    <label>Name<input required name="name" placeholder="Your name" /></label>
                    <label>Phone<input required name="phone" type="tel" placeholder="+971 …" /></label>
                  </div>
                  <label>Email<input required name="email" type="email" placeholder="you@company.com" /></label>
                  <label>Requirement<textarea required name="message" placeholder="Product, capacity, quantity, project…" /></label>
                  <button className="fx-btn fx-btn-primary" type="submit">Send request <Arrow /></button>
                </form>
              )}
            </div>
            <div className="fx-info">
              <div className="fx-grid-2">
                <div className="fx-panel fx-reveal">
                  <h3>Phone</h3>
                  <p>{CONTACT.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} style={{ display: 'block' }}>{p}</a>)}</p>
                </div>
                <div className="fx-panel fx-reveal">
                  <h3>Email</h3>
                  <p>{CONTACT.emails.map((e) => <a key={e} href={`mailto:${e}`} style={{ display: 'block' }}>{e}</a>)}</p>
                </div>
              </div>
              <div className="fx-panel fx-reveal">
                <h3>Address</h3>
                <p>{CONTACT.company}<br />{CONTACT.address.join(', ')}</p>
              </div>
              <div className="fx-map fx-reveal">
                <iframe src={CONTACT.map} title="Lift Flow location — Musaffah, Abu Dhabi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
            </div>
          </div>
        </section>

        {/* ── footer ── */}
        <footer className="fx-footer">
          <div className="fx-footer-grid">
            <div>
              <img src={LOGO} alt="LiftFlow" />
              <p>Pioneering the future of industrial lifting solutions through next-generation precision engineering and uncompromising operational safety.</p>
            </div>
            <div>
              <h4>Navigate</h4>
              <ul>{NAV.map((n) => <li key={n.label}><a href={n.href}>{n.label}</a></li>)}</ul>
            </div>
            <div>
              <h4>Products</h4>
              <ul>{CATS.slice(0, 5).map((c) => <li key={c.id}><a href="#products" onClick={() => setCat(c.id)}>{c.name}</a></li>)}</ul>
            </div>
            <div>
              <h4>Abu Dhabi</h4>
              <ul>
                {CONTACT.address.map((l) => <li key={l}>{l}</li>)}
                <li><a href={`tel:${CONTACT.phones[0].replace(/\s/g, '')}`}>{CONTACT.phones[0]}</a></li>
                <li><a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a></li>
              </ul>
            </div>
          </div>
          <div className="fx-footer-bottom">
            <span>© 2026 {CONTACT.company}</span>
            <span>ISO 9001:2015 · ISO 14001:2015 · ISO 45001:2018 · ADNOC ICV</span>
            <span>{CONTACT.site}</span>
          </div>
        </footer>
      </main>

      <a className="fx-wa" href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp us"><Wa /><span>WhatsApp us</span></a>
    </div>
  )
}
