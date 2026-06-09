import { useEffect, useRef } from 'react'
import type { Category, Lang } from '../../types'

interface CategoryNavProps {
  categories: Category[]
  lang: Lang
  activeId: string
  onSelect: (id: string) => void
}

export function CategoryNav({ categories, lang, activeId, onSelect }: CategoryNavProps) {
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const btn = rail.querySelector<HTMLButtonElement>('[data-active="true"]')
    if (!btn) return
    const target = btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) / 2
    rail.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [activeId])

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(20,9,3,.95)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--paris-border)' }}>
      <div ref={railRef} className="cp-no-scroll"
        style={{ display: 'flex', overflowX: 'auto', gap: 0,
          padding: '0 20px', maxWidth: 1280, margin: '0 auto' }}>
        {categories.map(cat => {
          const on = cat.id === activeId
          return (
            <button key={cat.id} data-active={on ? 'true' : 'false'}
              onClick={() => onSelect(cat.id)}
              style={{ padding: '14px 15px', border: 'none', background: 'none',
                cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: on ? 600 : 400,
                color: on ? 'var(--paris-gold)' : 'var(--paris-muted)',
                borderBottom: on ? '2px solid var(--paris-gold)' : '2px solid transparent',
                transition: 'color .2s, border-color .2s', marginBottom: -1,
                letterSpacing: '.02em' }}>
              {lang === 'es' ? cat.name_es : cat.name_en}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
