import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface TemplateMeta {
  slug: string
  name: string
  tagline: string
  category: string
  /** Accent color used in the sidebar swatch */
  accent: string
  component: LazyExoticComponent<ComponentType>
}

/**
 * Template registry. To add a template:
 *  1. create src/templates/<folder>/index.tsx exporting a default component
 *  2. add an entry below
 */
export const templates: TemplateMeta[] = [
  {
    slug: 'template-one',
    name: 'Template One',
    tagline: 'Bold editorial landing page',
    category: 'Landing',
    accent: '#f5c451',
    component: lazy(() => import('./one')),
  },
  {
    slug: 'template-two',
    name: 'Template Two',
    tagline: 'Minimal portfolio',
    category: 'Portfolio',
    accent: '#7dd3fc',
    component: lazy(() => import('./two')),
  },
  {
    slug: 'template-three',
    name: 'Template Three',
    tagline: 'SaaS product page',
    category: 'SaaS',
    accent: '#a7f3d0',
    component: lazy(() => import('./three')),
  },
  {
    slug: 'template-four',
    name: 'Template Four',
    tagline: 'Agency / studio site',
    category: 'Agency',
    accent: '#fda4af',
    component: lazy(() => import('./four')),
  },
  {
    slug: 'template-five',
    name: 'Template Five',
    tagline: 'Blog & publication',
    category: 'Blog',
    accent: '#c4b5fd',
    component: lazy(() => import('./five')),
  },
]

export const defaultTemplate = templates[0]
export const findTemplate = (slug?: string) => templates.find((t) => t.slug === slug)
