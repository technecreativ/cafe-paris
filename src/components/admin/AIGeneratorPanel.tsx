import { useState } from 'react'
import type { Product, ContentType, GeneratedContent } from '../../types'

const CONTENT_TYPES: { id: ContentType; icon: string; label: string }[] = [
  { id: 'post',  icon: '📱', label: 'Post para redes' },
  { id: 'story', icon: '📸', label: 'Historia Instagram' },
  { id: 'promo', icon: '🎁', label: 'Promoción del día' },
  { id: 'combo', icon: '🤝', label: 'Combo especial' },
]

interface AIGeneratorPanelProps {
  product: Product | null
}

export function AIGeneratorPanel({ product }: AIGeneratorPanelProps) {
  const [ctype,      setCtype]      = useState<ContentType>('post')
  const [generating, setGenerating] = useState(false)
  const [result,     setResult]     = useState<GeneratedContent | null>(null)
  const [copied,     setCopied]     = useState<'es' | 'en' | null>(null)
  const [apiError,   setApiError]   = useState('')

  const generate = async () => {
    if (!product) return
    setGenerating(true)
    setResult(null)
    setApiError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, contentType: ctype }),
      })
      if (!res.ok) throw new Error('Error al generar contenido')
      const data = await res.json() as GeneratedContent
      setResult(data)
    } catch {
      setApiError('No se pudo generar el contenido. Intenta de nuevo.')
    } finally {
      setGenerating(false)
    }
  }

  const copyText = (lang: 'es' | 'en') => {
    if (!result) return
    const text = (lang === 'es' ? result.es : result.en) + '\n\n' + result.hashtags.join(' ')
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    })
    setCopied(lang)
    setTimeout(() => setCopied(null), 2200)
  }

  if (!product) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 14, padding: 40 }}>
        <div style={{ fontSize: 36, opacity: .2, animation: 'cpPulse 3s ease-in-out infinite' }}>✦</div>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--paris-muted)',
          textAlign: 'center', lineHeight: 1.7 }}>
          Selecciona un producto de la lista<br />para comenzar a generar contenido con IA
        </p>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }} className="cp-no-scroll">

      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600,
          color: 'var(--paris-cream)' }}>Generar Contenido</h2>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--paris-muted)', marginTop: 3 }}>
          Crea copy para redes sociales con Gemini IA
        </p>
      </div>

      {/* Producto seleccionado */}
      <div style={{ background: 'var(--paris-surface)', border: '1px solid var(--paris-border)',
        borderRadius: 10, overflow: 'hidden', display: 'flex', marginBottom: 22 }}>
        <img src={product.image} alt={product.name_es}
          style={{ width: 96, height: 96, objectFit: 'cover', flexShrink: 0 }} />
        <div style={{ padding: '13px 16px', flex: 1 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 9.5, fontWeight: 700,
            color: 'var(--paris-gold)', letterSpacing: '.1em', textTransform: 'uppercase',
            marginBottom: 4 }}>Producto seleccionado</p>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 500,
            color: 'var(--paris-cream)' }}>{product.name_es}</h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11.5, color: 'var(--paris-muted)',
            marginTop: 4, lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.desc_es}
          </p>
        </div>
        <div style={{ padding: '13px 16px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700,
            color: 'var(--paris-gold)' }}>${product.price.toLocaleString('es-CL')}</span>
        </div>
      </div>

      {/* Tipo de contenido */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
          color: 'var(--paris-muted)', letterSpacing: '.1em', textTransform: 'uppercase',
          marginBottom: 10 }}>Tipo de contenido</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CONTENT_TYPES.map(ct => {
            const on = ct.id === ctype
            return (
              <button key={ct.id} onClick={() => setCtype(ct.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 14px', borderRadius: 999,
                  background: on ? 'rgba(200,134,60,.2)' : 'rgba(255,255,255,.04)',
                  border: `1px solid ${on ? 'var(--paris-gold)' : 'var(--paris-border)'}`,
                  color: on ? 'var(--paris-gold)' : 'var(--paris-muted)',
                  fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: on ? 600 : 400,
                  cursor: 'pointer', transition: 'all .18s' }}>
                <span style={{ fontSize: 13 }}>{ct.icon}</span>
                {ct.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Botón generar */}
      <button onClick={generate} disabled={generating}
        style={{ width: '100%', padding: '13px', borderRadius: 10, border: 'none',
          background: generating ? 'rgba(200,134,60,.4)' : 'var(--paris-gold)',
          color: '#1C0F08', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700,
          cursor: generating ? 'wait' : 'pointer', letterSpacing: '.04em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 24, transition: 'background .2s' }}
        onMouseEnter={e => { if (!generating) e.currentTarget.style.background = '#D9973F' }}
        onMouseLeave={e => { if (!generating) e.currentTarget.style.background = 'var(--paris-gold)' }}>
        <span style={{ animation: generating ? 'cpSpin 1s linear infinite' : 'none', display: 'inline-block' }}>✦</span>
        {generating ? 'Generando con Gemini IA...' : 'Generar con IA'}
      </button>

      {apiError && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#E07070',
          background: 'rgba(200,80,80,.1)', border: '1px solid rgba(200,80,80,.2)',
          borderRadius: 7, padding: '8px 12px', lineHeight: 1.5, marginBottom: 16 }}>
          {apiError}
        </p>
      )}

      {/* Resultado */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'cpFadeIn .4s ease both' }}>

          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
              color: 'var(--paris-muted)', letterSpacing: '.1em', textTransform: 'uppercase',
              marginBottom: 8 }}>Hashtags sugeridos</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {result.hashtags.map(tag => (
                <span key={tag} style={{ fontFamily: 'var(--font-sans)', fontSize: 12,
                  color: 'var(--paris-gold)', background: 'rgba(200,134,60,.1)',
                  border: '1px solid rgba(200,134,60,.22)', borderRadius: 999,
                  padding: '3px 10px' }}>{tag}</span>
              ))}
            </div>
          </div>

          {(['es', 'en'] as const).map(lang => (
            <div key={lang}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700,
                  color: 'var(--paris-muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                  Copy · {lang === 'es' ? 'Español' : 'English'}
                </p>
                <button onClick={() => copyText(lang)}
                  style={{ background: copied === lang ? 'rgba(200,134,60,.22)' : 'rgba(255,255,255,.06)',
                    border: '1px solid var(--paris-border)', borderRadius: 6,
                    color: copied === lang ? 'var(--paris-gold)' : 'var(--paris-muted)',
                    fontFamily: 'var(--font-sans)', fontSize: 11, padding: '4px 10px',
                    cursor: 'pointer', transition: 'all .2s' }}>
                  {copied === lang ? '✓ Copiado' : `Copiar ${lang.toUpperCase()}`}
                </button>
              </div>
              <div style={{ background: 'rgba(28,15,8,.65)', border: '1px solid var(--paris-border)',
                borderRadius: 8, padding: '14px 16px', fontFamily: 'var(--font-sans)',
                fontSize: 13, lineHeight: 1.75, color: 'var(--paris-cream)', whiteSpace: 'pre-line' }}>
                {lang === 'es' ? result.es : result.en}
              </div>
            </div>
          ))}

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={generate}
              style={{ flex: 1, padding: '10px', background: 'rgba(200,134,60,.1)',
                border: '1px solid rgba(200,134,60,.25)', borderRadius: 8,
                color: 'var(--paris-gold)', fontFamily: 'var(--font-sans)',
                fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'background .2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(200,134,60,.18)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(200,134,60,.1)')}>
              ↺ Regenerar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
