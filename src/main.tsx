import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// No <StrictMode>: the templates' logic classes (ported verbatim from the
// original pages) set up observers/intervals in componentDidMount and are not
// written for StrictMode's simulated double-mount, which would leave the
// reveal-on-scroll sections permanently hidden in dev.
createRoot(document.getElementById('root')!).render(<App />)
