import type { Lang } from '../../types'

interface HeroProps {
  lang: Lang
  onToggleLang: () => void
  onScrollDown: () => void
}

export function Hero({ lang, onToggleLang, onScrollDown }: HeroProps) {
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <video autoPlay muted loop playsInline preload="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0 }}
        poster="/uploads/hero.jpg">
        <source src="/uploads/hero.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(160deg, rgba(28,15,8,.68) 0%, rgba(20,10,4,.35) 45%, rgba(28,15,8,.78) 100%)' }} />

      {/* Toggle idioma */}
      <button onClick={onToggleLang}
        style={{ position: 'absolute', top: 26, right: 30, zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(28,15,8,.55)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(200,134,60,.38)', borderRadius: 999,
          padding: '7px 18px', cursor: 'pointer',
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500,
          letterSpacing: '.12em', color: 'var(--paris-cream)' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,134,60,.22)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(28,15,8,.55)')}>
        <span style={{ opacity: lang === 'es' ? 1 : .38, transition: 'opacity .3s' }}>ES</span>
        <span style={{ color: 'var(--paris-gold)', fontSize: 9, opacity: .6 }}>│</span>
        <span style={{ opacity: lang === 'en' ? 1 : .38, transition: 'opacity .3s' }}>EN</span>
      </button>

      {/* Contenido central */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px',
        animation: 'cpFadeIn .9s ease both' }}>
        <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(18px,2.4vw,26px)',
          color: 'var(--paris-gold)', marginBottom: 4, opacity: .9 }}>
          {lang === 'es' ? 'Bienvenidos a' : 'Welcome to'}
        </p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 700,
          fontSize: 'clamp(58px,11vw,130px)', color: 'var(--paris-cream)',
          lineHeight: 1, textShadow: '0 4px 60px rgba(0,0,0,.6)', letterSpacing: '-.02em' }}>
          Café Paris
        </h1>
        <p style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(20px,3.2vw,40px)',
          color: 'var(--paris-gold)', marginTop: 14, textShadow: '0 2px 20px rgba(0,0,0,.4)' }}>
          {lang === 'es' ? 'Cada taza tiene su historia' : 'Every cup has its story'}
        </p>
      </div>

      {/* Scroll indicator */}
      <div onClick={onScrollDown} style={{ position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)', zIndex: 2, cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        animation: 'cpBounce 2.2s ease-in-out infinite' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 9, fontWeight: 500,
          letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(245,237,216,.55)' }}>
          {lang === 'es' ? 'ver menú' : 'view menu'}
        </span>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="var(--paris-gold)" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
