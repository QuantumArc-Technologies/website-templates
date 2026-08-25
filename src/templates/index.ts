export interface TemplateMeta {
  slug: string
  name: string
  tagline: string
  category: string
  /** Accent color used in the sidebar swatch */
  accent: string
  /** Path (under /public) to the self-contained HTML file rendered verbatim in an iframe */
  file: string
}

/**
 * Template registry. Each template is a self-contained HTML file in
 * public/templates/ and is rendered exactly as-is inside an iframe.
 * To add one: drop the .html into public/templates/ and add an entry below.
 */
export const templates: TemplateMeta[] = [
  {
    slug: 'liftflow-global-website',
    name: 'Liftflow Global Website',
    tagline: 'Specialized lifting & rigging',
    category: 'Corporate',
    accent: '#f5c451',
    file: '/templates/liftflow-global-website.html',
  },
  {
    slug: 'liftflow-global',
    name: 'LiftFlow Global',
    tagline: 'Lifting & rigging solutions',
    category: 'Corporate',
    accent: '#7dd3fc',
    file: '/templates/liftflow-global.html',
  },
  {
    slug: 'liftflow-home',
    name: 'LiftFlow Home',
    tagline: 'Motion-led homepage',
    category: 'Landing',
    accent: '#fda4af',
    file: '/templates/liftflow-home.html',
  },
  {
    slug: 'liftflow-website',
    name: 'Liftflow Website',
    tagline: 'Engineering confidence in every lift',
    category: 'Corporate',
    accent: '#a7f3d0',
    file: '/templates/liftflow-website.html',
  },
  {
    slug: 'liftflow-website1',
    name: 'LiftFlow Website 1',
    tagline: 'Abstract video hero',
    category: 'Landing',
    accent: '#c4b5fd',
    file: '/templates/liftflow-website1.html',
  },
]

export const defaultTemplate = templates[0]
export const findTemplate = (slug?: string) => templates.find((t) => t.slug === slug)
