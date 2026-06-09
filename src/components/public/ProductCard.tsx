import { useState } from 'react'
import type { Product, Lang } from '../../types'

interface ProductCardProps {
  product: Product
  lang: Lang
}

export function ProductCard({ product, lang }: ProductCardProps) {
  const [hov, setHov] = useState(false)
  const name = lang === 'es' ? product.name_es : product.name_en
  const desc = lang === 'es' ? product.desc_es : product.desc_en

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: 'var(--paris-surface)',
        border: `1px solid ${hov ? 'rgba(200,134,60,.42)' : 'var(--paris-border)'}`,
        borderRadius: 10, overflow: 'hidden',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? '0 16px 50px rgba(0,0,0,.5)' : '0 2px 10px rgba(0,0,0,.3)',
        transition: 'transform .25s ease, box-shadow .25s ease, border-color .25s ease',
        display: 'flex', flexDirection: 'column', position: 'relative' }}>

      {product.is_promo && (
        <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2,
          background: 'var(--paris-gold)', color: '#1C0F08',
          fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 700,
          padding: '3px 9px', borderRadius: 999, letterSpacing: '.12em',
          textTransform: 'uppercase' }}>
          {lang === 'es' ? 'Promo' : 'Special'}
        </div>
      )}

      <div style={{ aspectRatio: '4/3', overflow: 'hidden', flexShrink: 0 }}>
        <img src={product.image} alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            transform: hov ? 'scale(1.07)' : 'scale(1)', transition: 'transform .42s ease' }} />
      </div>

      <div style={{ padding: '15px 16px 18px', flex: 1,
        display: 'flex', flexDirection: 'column', gap: 7 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500,
          color: hov ? 'var(--paris-gold)' : 'var(--paris-cream)',
          lineHeight: 1.3, transition: 'color .2s' }}>
          {name}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, lineHeight: 1.58,
          color: 'var(--paris-muted)', flex: 1,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden' }}>
          {desc}
        </p>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 600,
          color: 'var(--paris-gold)', marginTop: 6, letterSpacing: '-.01em' }}>
          ${product.price.toLocaleString('es-CL')}
        </span>
      </div>
    </article>
  )
}
