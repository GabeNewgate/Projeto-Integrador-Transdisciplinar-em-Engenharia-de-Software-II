import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        ...formData,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      }

      const response = await axios.post('/api/orders', orderData)
      setOrderId(response.data.id)
      setOrderComplete(true)
      clearCart()
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      alert('Erro ao finalizar pedido. Tente novamente.')
    } finally {
      setLoading(false)
    }
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

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="text-6xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Carrinho vazio</h2>
          <p className="text-lg text-gray-600 mb-8">
            Adicione alguns cupcakes ao seu carrinho antes de finalizar o pedido.
          </p>
          <Button onClick={() => navigate('/menu')} className="bg-pink-600 hover:bg-pink-700">
            Ver Cardápio
          </Button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center p-8">
          <CardContent className="space-y-6">
            <div className="text-green-600">
              <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Pedido Realizado!</h2>
            <p className="text-lg text-gray-600">
              Seu pedido #{orderId} foi recebido com sucesso. Entraremos em contato em breve para confirmar os detalhes.
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate('/menu')} className="bg-pink-600 hover:bg-pink-700 mr-4">
                Fazer Novo Pedido
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Voltar ao Início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => navigate('/cart')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Carrinho
        </Button>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Finalizar Pedido</h1>
          <p className="text-lg text-gray-600">Preencha seus dados para concluir a compra</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Form */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customer_name">Nome Completo *</Label>
                <Input
                  id="customer_name"
                  name="customer_name"
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={handleInputChange}
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="customer_email">E-mail *</Label>
                <Input
                  id="customer_email"
                  name="customer_email"
                  type="email"
                  required
                  value={formData.customer_email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="customer_phone">Telefone *</Label>
                <Input
                  id="customer_phone"
                  name="customer_phone"
                  type="tel"
                  required
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                size="lg"
              >
                {loading ? 'Processando...' : 'Confirmar Pedido'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-gradient-to-br from-pink-100 to-orange-100 rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="text-lg">🧁</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
                      <Badge className={getCategoryColor(item.category)} variant="secondary">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Qtd: {item.quantity}</span>
                      <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-200" />

            {/* Total */}
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-pink-600">R$ {getTotalPrice().toFixed(2)}</span>
            </div>

            {/* Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Informações importantes:</strong><br />
                • Entraremos em contato para confirmar o pedido<br />
                • Prazo de preparo: 2-4 horas<br />
                • Formas de pagamento: Dinheiro, PIX ou Cartão
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Checkout

