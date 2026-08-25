import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface TemplateMeta {
  slug: string
  name: string
  tagline: string
  category: string
  /** Accent color used in the gallery dock */
  accent: string
  /** Lazily loaded page component (generated from the original .html by scripts/build-templates.sh) */
  component: LazyExoticComponent<ComponentType>
  /** Triggers the chunk download (used for idle prefetch) */
  load: () => Promise<unknown>
}

const page = (loader: () => Promise<{ default: ComponentType }>) => ({ component: lazy(loader), load: loader })

/**
 * Template registry. Each template is compiled from its original bundled HTML
 * into src/templates/<slug>/Page.tsx (see scripts/build-templates.sh) and its
 * media lives in public/templates/<slug>/assets.
 */
export const templates: TemplateMeta[] = [
  {
    slug: 'liftflow-global-website',
    name: 'Liftflow Global Website',
    tagline: 'Specialized lifting & rigging',
    category: 'Corporate',
    accent: '#f5c451',
    ...page(() => import('./liftflow-global-website/Page')),
  },
  {
    slug: 'liftflow-global',
    name: 'LiftFlow Global',
    tagline: 'Lifting & rigging solutions',
    category: 'Corporate',
    accent: '#7dd3fc',
    ...page(() => import('./liftflow-global/Page')),
  },
  {
    slug: 'liftflow-home',
    name: 'LiftFlow Home',
    tagline: 'Motion-led homepage',
    category: 'Landing',
    accent: '#fda4af',
    ...page(() => import('./liftflow-home/Page')),
  },
  {
    slug: 'liftflow-website',
    name: 'Liftflow Website',
    tagline: 'Engineering confidence in every lift',
    category: 'Corporate',
    accent: '#a7f3d0',
    ...page(() => import('./liftflow-website')),
  },
  {
    slug: 'liftflow-website1',
    name: 'LiftFlow Website 1',
    tagline: 'Abstract video hero',
    category: 'Landing',
    accent: '#c4b5fd',
    ...page(() => import('./liftflow-website1/Page')),
  },
  {
    slug: 'liftflow-saas',
    name: 'LiftFlow Fluxo',
    tagline: 'Liquid-glass hero with 3D tubes',
    category: 'Landing',
    accent: '#c084fc',
    ...page(() => import('./liftflow-saas')),
  },
]

export const defaultTemplate = templates[0]
export const findTemplate = (slug?: string) => templates.find((t) => t.slug === slug)
