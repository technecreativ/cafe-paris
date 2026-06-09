import { supabase } from '../../lib/supabase'

type AdminSection = 'products' | 'generator'

interface AdminSidebarProps {
  active: AdminSection
  onNavigate: (s: AdminSection) => void
  onGoMenu: () => void
}

export function AdminSidebar({ active, onNavigate, onGoMenu }: AdminSidebarProps) {
  const navItems: { id: AdminSection; icon: string; label: string }[] = [
    { id: 'products',  icon: '☕', label: 'Mis Productos' },
    { id: 'generator', icon: '✦', label: 'Generar Contenido' },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onGoMenu()
  }

  return (
    <aside style={{ width: 220, flexShrink: 0,
      background: 'rgba(18,8,3,.98)', borderRight: '1px solid var(--paris-border)',
      display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>

      <div style={{ padding: '22px 20px 18px', borderBottom: '1px solid var(--paris-border)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600,
          color: 'var(--paris-cream)' }}>Café Paris</h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--paris-muted)',
          marginTop: 2, letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Panel de Gestión
        </p>
      </div>

      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {navItems.map(item => {
          const on = item.id === active
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 8, border: 'none', width: '100%',
                background: on ? 'rgba(200,134,60,.15)' : 'none',
                color: on ? 'var(--paris-gold)' : 'var(--paris-muted)',
                cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: on ? 600 : 400,
                borderLeft: on ? '2px solid var(--paris-gold)' : '2px solid transparent',
                transition: 'all .18s' }}
              onMouseEnter={e => { if (!on) { e.currentTarget.style.background = 'rgba(200,134,60,.07)'; e.currentTarget.style.color = 'var(--paris-cream)' }}}
              onMouseLeave={e => { if (!on) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--paris-muted)' }}}>
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </button>
          )
        })}
      </nav>

      <div style={{ padding: '10px', borderTop: '1px solid var(--paris-border)',
        display: 'flex', flexDirection: 'column', gap: 2 }}>
        <button onClick={onGoMenu} style={{ display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', background: 'none', border: 'none', cursor: 'pointer',
          borderRadius: 8, color: 'var(--paris-muted)', fontFamily: 'var(--font-sans)',
          fontSize: 12, width: '100%', textAlign: 'left', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--paris-cream)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--paris-muted)')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          Ver menú público
        </button>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8,
          padding: '9px 12px', background: 'none', border: 'none', cursor: 'pointer',
          borderRadius: 8, color: 'rgba(200,80,80,.55)', fontFamily: 'var(--font-sans)',
          fontSize: 12, width: '100%', textAlign: 'left', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#E07070')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,80,80,.55)')}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
