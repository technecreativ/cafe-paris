import type { Lang } from '../../types'

interface PublicFooterProps {
  lang: Lang
  onGoAdmin: () => void
}

export function PublicFooter({ lang, onGoAdmin }: PublicFooterProps) {
  const linkBase: React.CSSProperties = {
    color: 'var(--paris-muted)', textDecoration: 'none',
    transition: 'color .2s', display: 'flex', alignItems: 'center',
  }

  return (
    <footer style={{ borderTop: '1px solid var(--paris-border)',
      padding: '48px 0 40px', marginTop: 64,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>

      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, fontWeight: 600,
        color: 'var(--paris-cream)' }}>Café Paris</h2>
      <p style={{ fontFamily: 'var(--font-script)', fontSize: 20,
        color: 'var(--paris-gold)', opacity: .85 }}>
        {lang === 'es' ? 'Cada taza tiene su historia' : 'Every cup has its story'}
      </p>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--paris-muted)' }}>
        Av. Libertador Bernardo O'Higgins 632, Rancagua · {lang === 'es' ? 'Desde' : 'Since'} 1987
      </p>

      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 8 }}>
        <a href="https://wa.me/56972341865" target="_blank" rel="noopener noreferrer"
          style={{ ...linkBase, gap: 7 }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--paris-gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--paris-muted)')}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a7.33 7.33 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.556 4.116 1.528 5.848L.17 23.527l5.835-1.53A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.956a9.948 9.948 0 01-5.067-1.384l-.364-.216-3.768.99 1.008-3.674-.237-.378A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          +56 9 7234 1865
        </a>
        <a href="#" style={linkBase}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--paris-gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--paris-muted)')}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a href="#" style={linkBase}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--paris-gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--paris-muted)')}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 10, alignItems: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(139,107,82,.38)' }}>
          © 2026 Café Paris · <a href="https://technecreativ.com" target="_blank" rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}>Techne Creativ</a>
        </p>
        <span style={{ color: 'rgba(139,107,82,.2)', fontSize: 10 }}>·</span>
        <button onClick={onGoAdmin} style={{ background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: 11, color: 'rgba(139,107,82,.3)',
          padding: 0, transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--paris-muted)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(139,107,82,.3)')}>
          Panel Admin
        </button>
      </div>
    </footer>
  )
}
