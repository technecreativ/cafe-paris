import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../../types'

interface ExperienceSectionProps {
  lang: Lang
}

const copy = {
  es: {
    eyebrow: 'Lo que nos define',
    statement: ['El café no es', 'solo una bebida.'],
    sub: 'Es un ritual, un momento propio, una pausa necesaria en el día.',
    pillars: [
      {
        num: '01',
        title: 'Origen',
        desc: 'Granos de fincas de alta montaña, con trazabilidad completa desde la cosecha.',
      },
      {
        num: '02',
        title: 'Tostado',
        desc: 'Perfiles de tueste propios, desarrollados y refinados durante años de oficio.',
      },
      {
        num: '03',
        title: 'Extracción',
        desc: 'Cada preparación calibrada al gramo, al segundo y a la temperatura exacta.',
      },
      {
        num: '04',
        title: 'Momento',
        desc: 'Un ambiente que convierte una taza en un recuerdo que vale la pena guardar.',
      },
    ],
  },
  en: {
    eyebrow: 'What defines us',
    statement: ['Coffee is not', 'just a drink.'],
    sub: 'It is a ritual, a moment of your own, a necessary pause in the day.',
    pillars: [
      {
        num: '01',
        title: 'Origin',
        desc: 'Beans from high-altitude farms, with full traceability from harvest to cup.',
      },
      {
        num: '02',
        title: 'Roasting',
        desc: 'Proprietary roast profiles, developed and refined over years of craft.',
      },
      {
        num: '03',
        title: 'Extraction',
        desc: 'Every preparation calibrated to the gram, the second and the exact temperature.',
      },
      {
        num: '04',
        title: 'Moment',
        desc: 'An atmosphere that turns a cup into a memory worth keeping.',
      },
    ],
  },
}

export function ExperienceSection({ lang }: ExperienceSectionProps) {
  const t = copy[lang]
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--paris-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Línea separadora dorada top */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--paris-gold), transparent)' }} />

      {/* Fondo decorativo sutil */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(212,175,55,0.05) 0%, transparent 65%)',
      }} />

      {/* Statement central */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '80px 48px 64px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        position: 'relative',
      }}>
        {/* Eyebrow */}
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--paris-gold)',
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 32,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          <span style={{ width: 32, height: 1, background: 'var(--paris-gold)', opacity: 0.6 }} />
          {t.eyebrow}
          <span style={{ width: 32, height: 1, background: 'var(--paris-gold)', opacity: 0.6 }} />
        </span>

        {/* Statement grande */}
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 800,
          fontSize: 'clamp(44px, 6vw, 80px)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          margin: '0 0 20px',
          color: 'var(--paris-cream)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
        }}>
          {t.statement.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {i === 1
                ? <em style={{ fontStyle: 'italic', color: 'var(--paris-gold)' }}>{line}</em>
                : line}
            </span>
          ))}
        </h2>

        {/* Subtítulo */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: 'var(--paris-muted)',
          maxWidth: 480,
          lineHeight: 1.7,
          margin: 0,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 0.25s',
        }}>
          {t.sub}
        </p>
      </div>

      {/* Separador ornamental */}
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 48px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--paris-border)' }} />
        <span style={{ color: 'var(--paris-gold)', fontSize: 14, opacity: 0.5, letterSpacing: 6 }}>✦ ✦ ✦</span>
        <div style={{ flex: 1, height: 1, background: 'var(--paris-border)' }} />
      </div>

      {/* Pilares */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '56px 48px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 1,
        background: 'var(--paris-border)',
      }}
        className="exp-grid"
      >
        {t.pillars.map((p, i) => (
          <div
            key={i}
            style={{
              background: 'var(--paris-dark)',
              padding: '36px 32px',
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
            }}
          >
            {/* Número decorativo */}
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1,
              color: 'var(--paris-gold)',
              opacity: 0.12,
              position: 'absolute',
              top: 20, right: 24,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}>
              {p.num}
            </div>

            {/* Número activo pequeño */}
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--paris-gold)',
              display: 'block',
              marginBottom: 16,
            }}>
              {p.num}
            </span>

            {/* Línea dorada */}
            <div style={{
              width: 28, height: 1,
              background: 'var(--paris-gold)',
              marginBottom: 16,
              opacity: 0.6,
            }} />

            {/* Título */}
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--paris-cream)',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}>
              {p.title}
            </h3>

            {/* Descripción */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13.5,
              lineHeight: 1.7,
              color: 'var(--paris-muted)',
              margin: 0,
            }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Línea separadora dorada bottom */}
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--paris-gold), transparent)' }} />

      <style>{`
        @media (max-width: 900px) {
          .exp-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
