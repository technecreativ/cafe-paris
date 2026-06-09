import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../../types'

interface AboutSectionProps {
  lang: Lang
}

const copy = {
  es: {
    tag: 'Nuestra historia',
    title: 'Café Paris',
    subtitle: 'Donde cada taza cuenta una historia',
    p1: 'Nacimos del amor irremediable por el café y por los rincones íntimos donde el tiempo se detiene. Café Paris es ese lugar que siempre quisiste encontrar al doblar una esquina de Montmartre: luz cálida, aroma persistente, silencio que invita.',
    p2: 'Cada grano que tostamos llega de origen único. Cada preparación es un rito. Cada visita, una pequeña fuga del mundo. Aquí el café no se pide: se descubre.',
    stats: [
      { num: '+40', label: 'Variedades de café' },
      { num: '100%', label: 'Granos de origen' },
      { num: '3', label: 'Baristas certificados' },
      { num: '∞', label: 'Momentos por vivir' },
    ],
    quote: '"El buen café es como el buen arte: necesita tiempo, atención y un poco de silencio."',
    author: '— Jean-Michel, fundador',
    cta: 'Hacer un pedido',
  },
  en: {
    tag: 'Our story',
    title: 'Café Paris',
    subtitle: 'Where every cup tells a story',
    p1: 'We were born from an irremediable love for coffee and intimate corners where time stands still. Café Paris is that place you always wished to find around the corner of a Montmartre street: warm light, lingering aroma, silence that invites.',
    p2: 'Every bean we roast comes from a single origin. Every preparation is a ritual. Every visit, a small escape from the world. Here coffee is not ordered: it is discovered.',
    stats: [
      { num: '40+', label: 'Coffee varieties' },
      { num: '100%', label: 'Single-origin beans' },
      { num: '3', label: 'Certified baristas' },
      { num: '∞', label: 'Moments to live' },
    ],
    quote: '"Good coffee is like good art: it needs time, attention and a little silence."',
    author: '— Jean-Michel, founder',
    cta: 'Place an order',
  },
}

const IMAGES = [
  '/uploads/Cafeterias-768x432.webp',
  '/uploads/OrigenTostadores_cafelab.pe_-1024x683.jpg',
  '/uploads/1699991858126-1024x576.jpg',
]

export function AboutSection({ lang }: AboutSectionProps) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => setImgIdx(i => (i + 1) % IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [])

  const goToWhatsApp = () => {
    window.open('https://wa.me/56965174454', '_blank')
  }

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--paris-surface)',
        position: 'relative',
        overflow: 'hidden',
        padding: '0',
      }}
    >
      {/* Fondo decorativo top */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 65% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        minHeight: 560,
      }}
        className="about-grid"
      >
        {/* Panel izquierdo — imágenes */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: 420 }}>
          {IMAGES.map((src, i) => (
            <div
              key={src}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'opacity 1.2s ease',
                opacity: i === imgIdx ? 1 : 0,
              }}
            />
          ))}
          {/* Overlay degradado lateral */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 55%, var(--paris-surface) 100%)',
          }} />
          {/* Overlay oscuro base */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(8,8,8,0.28)',
          }} />
          {/* Indicadores de imagen */}
          <div style={{
            position: 'absolute', bottom: 20, left: 20,
            display: 'flex', gap: 6,
          }}>
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                style={{
                  width: i === imgIdx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === imgIdx ? 'var(--paris-gold)' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Panel derecho — contenido */}
        <div style={{
          padding: '72px 60px 72px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(32px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>
          {/* Tag */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--paris-gold)',
            marginBottom: 16,
          }}>
            <span style={{
              display: 'inline-block',
              width: 24, height: 1,
              background: 'var(--paris-gold)',
              opacity: 0.7,
            }} />
            {t.tag}
          </span>

          {/* Título */}
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(36px, 4vw, 52px)',
            fontWeight: 700,
            color: 'var(--paris-cream)',
            lineHeight: 1.1,
            margin: '0 0 8px',
            letterSpacing: '-0.01em',
          }}>
            {t.title}
          </h2>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: 'var(--paris-gold)',
            fontStyle: 'italic',
            margin: '0 0 28px',
          }}>
            {t.subtitle}
          </p>

          {/* Separador ornamental */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28,
          }}>
            <div style={{ flex: 1, height: 1, background: 'var(--paris-border)' }} />
            <span style={{ color: 'var(--paris-gold)', fontSize: 16, opacity: 0.6 }}>✦</span>
            <div style={{ flex: 1, height: 1, background: 'var(--paris-border)' }} />
          </div>

          {/* Texto */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--paris-muted)',
            margin: '0 0 16px',
            maxWidth: 440,
          }}>
            {t.p1}
          </p>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            lineHeight: 1.75,
            color: 'var(--paris-muted)',
            margin: '0 0 36px',
            maxWidth: 440,
          }}>
            {t.p2}
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 36,
          }}>
            {t.stats.map((s, i) => (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.6s ease ${0.2 + i * 0.08}s, transform 0.6s ease ${0.2 + i * 0.08}s`,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(22px, 2.5vw, 28px)',
                  fontWeight: 700,
                  color: 'var(--paris-gold)',
                  lineHeight: 1,
                  marginBottom: 6,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'var(--paris-muted)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.3,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Cita */}
          <blockquote style={{
            margin: '0 0 36px',
            padding: '16px 20px',
            borderLeft: '2px solid var(--paris-gold)',
            background: 'rgba(212,175,55,0.04)',
            borderRadius: '0 6px 6px 0',
          }}>
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'var(--paris-cream)',
              opacity: 0.8,
              margin: '0 0 6px',
              lineHeight: 1.6,
            }}>
              {t.quote}
            </p>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: 'var(--paris-gold)',
              letterSpacing: '0.04em',
            }}>
              {t.author}
            </span>
          </blockquote>

          {/* CTA */}
          <div>
            <button
              onClick={goToWhatsApp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--paris-dark)',
                background: 'var(--paris-gold)',
                border: 'none',
                borderRadius: 2,
                padding: '13px 28px',
                cursor: 'pointer',
                transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.opacity = '1'
                ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
              }}
            >
              {t.cta}
              <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive: stack en móvil */}
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div:first-child {
            min-height: 280px !important;
          }
          .about-grid > div:last-child {
            padding: 48px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
