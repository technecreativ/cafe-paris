import type { Category, Product } from '../../types'

interface ProductListPanelProps {
  categories: Category[]
  products: Product[]
  selectedId: number | null
  onSelect: (id: number) => void
}

export function ProductListPanel({ categories, products, selectedId, onSelect }: ProductListPanelProps) {
  const groups = categories
    .map(cat => ({ ...cat, prods: products.filter(p => p.category_id === cat.id) }))
    .filter(g => g.prods.length > 0)

  return (
    <div style={{ width: 300, flexShrink: 0, borderRight: '1px solid var(--paris-border)',
      display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--paris-border)', flexShrink: 0 }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600,
          color: 'var(--paris-cream)' }}>Mis Productos</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--paris-muted)', marginTop: 3 }}>
          {products.length} productos · Selecciona para generar
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 10px' }} className="cp-no-scroll">
        {groups.map(group => (
          <div key={group.id} style={{ marginBottom: 14 }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9.5, fontWeight: 700,
              color: 'var(--paris-muted)', letterSpacing: '.12em', textTransform: 'uppercase',
              padding: '4px 8px 5px', marginBottom: 2 }}>
              {group.name_es}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {group.prods.map(p => {
                const sel = p.id === selectedId
                return (
                  <button key={p.id} onClick={() => onSelect(p.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10,
                      padding: '7px 9px', borderRadius: 7, border: 'none', width: '100%',
                      background: sel ? 'rgba(200,134,60,.14)' : 'none',
                      outline: sel ? '1px solid rgba(200,134,60,.32)' : 'none',
                      cursor: 'pointer', textAlign: 'left', transition: 'background .15s' }}
                    onMouseEnter={e => { if (!sel) e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
                    onMouseLeave={e => { if (!sel) e.currentTarget.style.background = 'none' }}>
                    <img src={p.image} alt={p.name_es}
                      style={{ width: 34, height: 34, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 500,
                        color: sel ? 'var(--paris-gold)' : 'var(--paris-cream)',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.name_es}
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--paris-muted)' }}>
                        ${p.price.toLocaleString('es-CL')}
                      </p>
                    </div>
                    {p.is_promo && (
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 8, fontWeight: 700,
                        background: 'var(--paris-gold)', color: '#1C0F08',
                        padding: '2px 6px', borderRadius: 999, letterSpacing: '.08em', flexShrink: 0 }}>✦</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
