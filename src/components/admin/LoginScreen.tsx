import { useState } from 'react'
import { supabase } from '../../lib/supabase'

interface LoginScreenProps {
  onLogin: () => void
  onBack: () => void
}

export function LoginScreen({ onLogin, onBack }: LoginScreenProps) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      setLoading(false)
    } else {
      onLogin()
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    background: 'rgba(28,15,8,.65)', border: '1px solid var(--paris-border)',
    borderRadius: 8, color: 'var(--paris-cream)',
    fontFamily: 'var(--font-sans)', fontSize: 14, outline: 'none',
    transition: 'border-color .2s',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      <img src="/uploads/smooth61.jpg" alt="" style={{ position: 'absolute', inset: 0,
        width: '100%', height: '100%', objectFit: 'cover',
        filter: 'brightness(.22) saturate(1.3)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,15,8,.65)' }} />

      <div style={{ position: 'relative', zIndex: 1,
        background: 'rgba(44,26,16,.94)', backdropFilter: 'blur(20px)',
        border: '1px solid var(--paris-border)', borderRadius: 16,
        padding: '48px 40px', width: '100%', maxWidth: 420,
        boxShadow: '0 32px 80px rgba(0,0,0,.65)',
        animation: 'cpFadeIn .5s ease both' }}>

        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 14,
            color: 'var(--paris-gold)', marginBottom: 4 }}>Bienvenido al</div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 600,
            color: 'var(--paris-cream)' }}>Café Paris</h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12,
            color: 'var(--paris-muted)', marginTop: 6, letterSpacing: '.03em' }}>
            Panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 10,
              fontWeight: 600, color: 'var(--paris-muted)', marginBottom: 6,
              letterSpacing: '.1em', textTransform: 'uppercase' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="admin@cafeparis.com" required style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--paris-gold)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--paris-border)')} />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-sans)', fontSize: 10,
              fontWeight: 600, color: 'var(--paris-muted)', marginBottom: 6,
              letterSpacing: '.1em', textTransform: 'uppercase' }}>Contraseña</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--paris-gold)')}
              onBlur={e  => (e.target.style.borderColor = 'var(--paris-border)')} />
          </div>

          {error && (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12,
              color: '#E07070', background: 'rgba(200,80,80,.1)',
              border: '1px solid rgba(200,80,80,.2)', borderRadius: 7,
              padding: '8px 12px', lineHeight: 1.5 }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            style={{ padding: 14, marginTop: 4, borderRadius: 8, border: 'none',
              background: loading ? 'rgba(200,134,60,.45)' : 'var(--paris-gold)',
              color: '#1C0F08', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
              cursor: loading ? 'wait' : 'pointer', letterSpacing: '.04em',
              transition: 'background .2s' }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#D9973F' }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'var(--paris-gold)' }}>
            {loading
              ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <span style={{ animation: 'cpSpin 1s linear infinite', display: 'inline-block' }}>✦</span>
                  Iniciando sesión...
                </span>
              : 'Iniciar sesión'}
          </button>
        </form>

        <button onClick={onBack} style={{ display: 'block', width: '100%', marginTop: 20,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--paris-muted)',
          textAlign: 'center', transition: 'color .2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--paris-cream)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--paris-muted)')}>
          ← Volver al menú
        </button>
      </div>
    </div>
  )
}
