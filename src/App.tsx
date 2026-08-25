import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import PreviewFrame, { type Viewport } from './components/PreviewFrame'
import TemplateFrame from './components/TemplateFrame'
import { defaultTemplate, findTemplate, templates } from './templates'

function TemplatePage() {
  const { slug } = useParams()
  const [menuOpen, setMenuOpen] = useState(false)
  const [viewport, setViewport] = useState<Viewport>('desktop')

  const template = findTemplate(slug)
  if (!template) return <Navigate to={`/templates/${defaultTemplate.slug}`} replace />

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
        <TemplateFrame template={template} />
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
