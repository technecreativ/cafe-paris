import { useState } from 'react'
import type { Category, Product } from '../../types'
import { AdminSidebar } from './AdminSidebar'
import { ProductListPanel } from './ProductListPanel'
import { AIGeneratorPanel } from './AIGeneratorPanel'

type AdminSection = 'products' | 'generator'

interface AdminDashboardProps {
  categories: Category[]
  products: Product[]
  onGoMenu: () => void
}

export function AdminDashboard({ categories, products, onGoMenu }: AdminDashboardProps) {
  const [activeSection,     setActiveSection]     = useState<AdminSection>('products')
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null)

  const selectedProduct = products.find(p => p.id === selectedProductId) ?? null

  const handleSelectProduct = (id: number) => {
    setSelectedProductId(id)
    setActiveSection('generator')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--paris-dark)' }}>
      <AdminSidebar active={activeSection} onNavigate={setActiveSection} onGoMenu={onGoMenu} />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {activeSection === 'products' && (
          <ProductListPanel
            categories={categories}
            products={products}
            selectedId={selectedProductId}
            onSelect={handleSelectProduct}
          />
        )}
        <AIGeneratorPanel product={selectedProduct} />
      </div>
    </div>
  )
}
