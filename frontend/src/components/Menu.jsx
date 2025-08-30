import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Filter } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Menu = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    // Verificar se há categoria na URL
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      setCategories(['Todos', ...response.data])
    } catch (error) {
      console.error('Erro ao buscar categorias:', error)
    }
  }

  const filterProducts = () => {
    if (selectedCategory === 'Todos') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory))
    }
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    // Feedback visual (opcional)
    console.log(`${product.name} adicionado ao carrinho!`)
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Doce':
        return 'bg-pink-100 text-pink-800'
      case 'Salgado':
        return 'bg-orange-100 text-orange-800'
      case 'Fit':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl text-gray-600">Carregando cardápio...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Nosso Cardápio</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore nossa deliciosa seleção de cupcakes artesanais. Cada um feito com ingredientes frescos e muito amor.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filtrar por:</span>
        </div>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-pink-600 hover:bg-pink-700" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              {/* Product Image Placeholder */}
              <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg h-48 mb-4 flex items-center justify-center">
                <div className="text-6xl">🧁</div>
              </div>
              
              {/* Product Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  <Badge className={getCategoryColor(product.category)}>
                    {product.category}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-pink-600 hover:bg-pink-700 text-white"
                    size="sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🧁</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600">
            Não encontramos cupcakes nesta categoria. Tente filtrar por outra categoria.
          </p>
        </div>
      )}
    </div>
  )
}

export default Menu

