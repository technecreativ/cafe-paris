import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Category, Lang, Product } from '../types'
import { Hero } from '../components/public/Hero'
import { AboutSection } from '../components/public/AboutSection'
import { ExperienceSection } from '../components/public/ExperienceSection'
import { CategoryNav } from '../components/public/CategoryNav'
import { ProductSection } from '../components/public/ProductSection'
import { PublicFooter } from '../components/public/PublicFooter'

interface MenuPageProps {
  lang: Lang
  onToggleLang: () => void
}

export function MenuPage({ lang, onToggleLang }: MenuPageProps) {
  const navigate = useNavigate()
  const menuRef  = useRef<HTMLDivElement>(null)

  const [categories,      setCategories]      = useState<Category[]>([])
  const [products,        setProducts]        = useState<Product[]>([])
  const [activeCategory,  setActiveCategory]  = useState('hot')
  const [loading,         setLoading]         = useState(true)

  useEffect(() => {
    async function load() {
      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('cafe_categorias').select('*').order('sort_order'),
        supabase.from('cafe_productos').select('*').eq('active', true).order('sort_order'),
      ])
      if (cats)  setCategories(cats as Category[])
      if (prods) setProducts(prods as Product[])
      setLoading(false)
    }
    void load()
  }, [])

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--paris-dark)' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--paris-muted)',
          animation: 'cpPulse 1.5s ease-in-out infinite' }}>Cargando menú...</span>
      </div>
    )
  }

  return (
    <div>
      <Hero lang={lang} onToggleLang={onToggleLang} onScrollDown={scrollToMenu} />
      <div ref={menuRef} id="menu-section">
        <CategoryNav
          categories={categories}
          lang={lang}
          activeId={activeCategory}
          onSelect={setActiveCategory}
        />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
          <ProductSection
            categories={categories}
            products={products}
            lang={lang}
            activeId={activeCategory}
          />
        </div>
      </div>
      <ExperienceSection lang={lang} />
      <div style={{ height: 80, background: 'var(--paris-dark)' }} />
      <AboutSection lang={lang} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <PublicFooter lang={lang} onGoAdmin={() => navigate('/admin')} />
      </div>
    </div>
  )
}
