import type { VercelRequest, VercelResponse } from '@vercel/node'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface Product {
  name_es: string
  name_en: string
  desc_es: string
  desc_en: string
  price: number
  is_promo: boolean
}

type ContentType = 'post' | 'story' | 'promo' | 'combo'

const typeLabels: Record<ContentType, { es: string; en: string }> = {
  post:  { es: 'post para redes sociales',      en: 'social media post' },
  story: { es: 'historia de Instagram',          en: 'Instagram story caption' },
  promo: { es: 'texto de promoción del día',     en: 'daily promotion text' },
  combo: { es: 'texto de combo o descuento',     en: 'combo or discount offer text' },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { product, contentType } = req.body as { product: Product; contentType: ContentType }

  if (!product || !contentType) {
    return res.status(400).json({ error: 'Missing product or contentType' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Eres el community manager de Café Paris, una cafetería elegante de estilo parisino.
Genera un ${typeLabels[contentType].es} para el producto "${product.name_es}" (${product.name_en}).

Descripción: ${product.desc_es}
Precio: $${product.price.toLocaleString('es-CL')} CLP
${product.is_promo ? 'Es una promoción especial.' : ''}

Responde ÚNICAMENTE con un JSON válido con este formato exacto, sin markdown ni texto adicional:
{
  "es": "texto en español (máx 5 líneas, tono poético y cálido, con algún emoji)",
  "en": "texto en inglés equivalente",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4", "#Tag5", "#Tag6"]
}

Reglas:
- Tono: cálido, poético, invitando a vivirlo.
- No usar más de 6 hashtags.
- Los hashtags siempre incluir #CaféParis.
- El texto en español e inglés deben ser equivalentes pero no traducción literal.`

    const result = await model.generateContent(prompt)
    const text   = result.response.text().trim()

    // Limpiar posible markdown de código
    const clean = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    const parsed = JSON.parse(clean) as { es: string; en: string; hashtags: string[] }

    return res.status(200).json(parsed)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Gemini error:', msg)
    return res.status(500).json({ error: 'Failed to generate content', detail: msg })
  }
}
