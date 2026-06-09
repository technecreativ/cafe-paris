export interface Category {
  id: string
  name_es: string
  name_en: string
  sort_order: number
}

export interface Product {
  id: number
  category_id: string
  name_es: string
  name_en: string
  desc_es: string
  desc_en: string
  price: number // CLP
  image: string
  is_promo: boolean
  is_featured: boolean
  active: boolean
  sort_order: number
}

export type Lang = 'es' | 'en'

export type ContentType = 'post' | 'story' | 'promo' | 'combo'

export interface GeneratedContent {
  es: string
  en: string
  hashtags: string[]
}
