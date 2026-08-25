interface Props {
  number: number
  name: string
  tagline: string
  accent: string
}

/** Temporary stand-in shown until the real template is dropped in. */
export default function Placeholder({ number, name, tagline, accent }: Props) {
  return (
    <div className="min-h-full bg-[#fafafa] text-zinc-900">
      <header className="flex items-center justify-between border-b border-zinc-200 px-8 py-5">
        <span className="font-semibold tracking-tight">{name}</span>
        <nav className="hidden gap-8 text-sm text-zinc-500 sm:flex">
          <span>Work</span><span>About</span><span>Services</span><span>Contact</span>
        </nav>
        <span className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-900" style={{ background: accent }}>
          Get started
        </span>
      </header>

      <section className="mx-auto max-w-4xl px-8 py-28 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-400">
          Template {String(number).padStart(2, '0')}
        </p>
        <h1 className="mt-6 font-serif text-6xl leading-none sm:text-8xl">
          {tagline}
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-lg text-zinc-500">
          This is a placeholder. Replace <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm">src/templates/</code> content with the real template and it will render here.
        </p>
        <div className="mt-12 flex justify-center gap-3">
          <span className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white">Primary action</span>
          <span className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium">Secondary</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-8 pb-28 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="h-10 w-10 rounded-xl" style={{ background: accent }} />
            <h3 className="mt-5 font-semibold">Feature {i}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Short supporting copy describing this feature block goes here.
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
