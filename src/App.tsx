import { Suspense, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PreviewFrame, { type Viewport } from './components/PreviewFrame'
import { defaultTemplate, findTemplate, templates } from './templates'

function TemplatePage() {
  const { slug } = useParams()
  const [params] = useSearchParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [viewport, setViewport] = useState<Viewport>('desktop')

  const template = findTemplate(slug)
  if (!template) return <Navigate to={`/templates/${defaultTemplate.slug}`} replace />

  const Template = template.component

  // ?bare=1 renders the template alone, without the gallery chrome
  if (params.get('bare')) {
    return (
      <Suspense fallback={null}>
        <Template />
      </Suspense>
    )
  }

  return (
    <div className="flex h-full">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <PreviewFrame
        template={template}
        index={templates.indexOf(template)}
        viewport={viewport}
        onViewport={setViewport}
        onMenu={() => setMenuOpen(true)}
      >
        <Template key={template.slug} />
      </PreviewFrame>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/templates/:slug" element={<TemplatePage />} />
        <Route path="*" element={<Navigate to={`/templates/${defaultTemplate.slug}`} replace />} />
      </Routes>
    </BrowserRouter>
  )
}
