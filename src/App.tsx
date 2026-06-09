import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import type { Lang } from './types'
import { MenuPage }       from './pages/MenuPage'
import { AdminLoginPage } from './pages/AdminLoginPage'
import { AdminPanelPage } from './pages/AdminPanelPage'

export default function App() {
  const [lang, setLang] = useState<Lang>('es')
  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage lang={lang} onToggleLang={toggleLang} />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/panel" element={<AdminPanelPage />} />
      </Routes>
    </BrowserRouter>
  )
}
