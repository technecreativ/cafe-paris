import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Category, Product } from '../types'
import { AdminDashboard } from '../components/admin/AdminDashboard'

export function AdminPanelPage() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState<Category[]>([])
  const [products,   setProducts]   = useState<Product[]>([])
  const [loading,    setLoading]    = useState(true)

  useEffect(() => {
    async function load() {
      // Verificar sesión activa
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/admin'); return }

      const [{ data: cats }, { data: prods }] = await Promise.all([
        supabase.from('cafe_categorias').select('*').order('sort_order'),
        supabase.from('cafe_productos').select('*').order('sort_order'),
      ])
      if (cats)  setCategories(cats as Category[])
      if (prods) setProducts(prods as Product[])
      setLoading(false)
    }
    void load()
  }, [navigate])

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: 'var(--paris-dark)' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--paris-muted)',
          animation: 'cpPulse 1.5s ease-in-out infinite' }}>Cargando panel...</span>
      </div>
    )
  }

  return (
    <AdminDashboard
      categories={categories}
      products={products}
      onGoMenu={() => navigate('/')}
    />
  )
}
