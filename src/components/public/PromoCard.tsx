import { useState } from 'react'
import type { Product, Lang } from '../../types'

interface PromoCardProps {
  product: Product
  lang: Lang
}

export function PromoCard({ product, lang }: PromoCardProps) {
  const [hov, setHov] = useState(false)
  const name = lang === 'es' ? product.name_es : product.name_en
  const desc = lang === 'es' ? product.desc_es : product.desc_en

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ gridColumn: '1 / -1',
        background: 'var(--paris-surface)',
        border: `1px solid ${hov ? 'rgba(200,134,60,.5)' : 'rgba(200,134,60,.2)'}`,
        borderRadius: 10, overflow: 'hidden',
        display: 'flex', flexDirection: 'row',
        boxShadow: hov ? '0 20px 64px rgba(0,0,0,.55)' : '0 4px 20px rgba(0,0,0,.3)',
        transition: 'border-color .25s, box-shadow .25s' }}>

      <div style={{ width: '42%', minHeight: 220, flexShrink: 0, overflow: 'hidden' }}>
        <img src={product.image} alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover',
            transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'transform .42s ease' }} />
      </div>

      <div style={{ flex: 1, padding: '28px 32px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, width: 'fit-content',
          background: 'rgba(200,134,60,.12)', border: '1px solid rgba(200,134,60,.28)',
          borderRadius: 999, padding: '4px 14px',
          fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
          color: 'var(--paris-gold)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
          ✦ {lang === 'es' ? 'Oferta Especial' : 'Special Offer'}
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600,
          color: 'var(--paris-cream)', lineHeight: 1.2 }}>
          {name}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.65,
          color: 'var(--paris-muted)', maxWidth: 480 }}>
          {desc}
        </p>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 32, fontWeight: 700,
          color: 'var(--paris-gold)', letterSpacing: '-.02em' }}>
          ${product.price.toLocaleString('es-CL')}
        </span>
      </div>
    </article>
  )
}
