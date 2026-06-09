import type { Category, Product, Lang } from '../../types'
import { ProductCard } from './ProductCard'
import { PromoCard } from './PromoCard'

interface ProductSectionProps {
  categories: Category[]
  products: Product[]
  lang: Lang
  activeId: string
}

export function ProductSection({ categories, products, lang, activeId }: ProductSectionProps) {
  const filtered = products.filter(p => p.category_id === activeId)
  const cat = categories.find(c => c.id === activeId)
  if (!filtered.length || !cat) return null
  const catName = lang === 'es' ? cat.name_es : cat.name_en

  return (
    <section style={{ paddingTop: 40, animation: 'cpFadeIn .35s ease both' }}>
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 3, height: 26, background: 'var(--paris-gold)', borderRadius: 2, flexShrink: 0 }} />
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 600,
          fontSize: 'clamp(22px,3.5vw,32px)', color: 'var(--paris-cream)' }}>
          {catName}
        </h2>
        <div style={{ flex: 1, height: 1, background: 'var(--paris-border)' }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--paris-muted)',
          letterSpacing: '.05em' }}>
          {filtered.length} {lang === 'es' ? 'productos' : 'items'}
        </span>
      </div>
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 18 }}>
        {filtered.map(p =>
          p.is_featured
            ? <PromoCard key={p.id} product={p} lang={lang} />
            : <ProductCard key={p.id} product={p} lang={lang} />
        )}
      </div>
    </section>
  )
}
