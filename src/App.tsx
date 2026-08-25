import { Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import Dock from './components/Dock'
import { defaultTemplate, findTemplate, templates } from './templates'
import './templates/mobile-fixes.css'

function TemplatePage() {
  const { slug } = useParams()
  const template = findTemplate(slug)

  useEffect(() => {
    if (template) document.title = `${template.name} · Template Gallery`
  }, [template])

  // Warm the other templates' code chunks while idle so switching is instant.
  useEffect(() => {
    const idle = (window as any).requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500))
    const id = idle(() => templates.forEach((t) => t.load()))
    return () => ((window as any).cancelIdleCallback ?? clearTimeout)(id)
  }, [])

  if (!template) return <Navigate to={`/templates/${defaultTemplate.slug}`} replace />
  const Page = template.component

  return (
    <>
      <div data-template={template.slug}>
        <Suspense fallback={null}>
          <Page key={template.slug} />
        </Suspense>
      </div>
      <Dock current={template} />
    </>
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
