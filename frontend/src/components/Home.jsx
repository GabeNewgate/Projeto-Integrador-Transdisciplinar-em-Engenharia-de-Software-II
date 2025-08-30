import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Cake, Heart, Star, Clock } from 'lucide-react'

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Deliciosos <span className="text-pink-600">Cupcakes</span> 
            <br />Feitos com Amor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra nossa seleção especial de cupcakes artesanais, desde os clássicos doces até opções salgadas e fit. 
            Cada mordida é uma experiência única!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg">
                Ver Cardápio
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Meu Carrinho
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Por que escolher nossos cupcakes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Feitos com Amor</h3>
                <p className="text-gray-600">
                  Cada cupcake é preparado artesanalmente com ingredientes selecionados e muito carinho.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Qualidade Premium</h3>
                <p className="text-gray-600">
                  Utilizamos apenas ingredientes de primeira qualidade para garantir o melhor sabor.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sempre Frescos</h3>
                <p className="text-gray-600">
                  Nossos cupcakes são preparados diariamente para garantir frescor e sabor únicos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-white rounded-lg shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nossas Categorias
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-pink-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Cake className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-pink-600 mb-3">Doces</h3>
                <p className="text-gray-600 mb-4">
                  Cupcakes tradicionais com sabores irresistíveis como chocolate, baunilha, red velvet e morango.
                </p>
                <Link to="/menu?category=Doce">
                  <Button variant="outline" className="w-full">
                    Ver Doces
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Cake className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-orange-600 mb-3">Salgados</h3>
                <p className="text-gray-600 mb-4">
                  Opções salgadas deliciosas com frango, queijo, presunto e muito mais para quem prefere sabores únicos.
                </p>
                <Link to="/menu?category=Salgado">
                  <Button variant="outline" className="w-full">
                    Ver Salgados
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-green-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Cake className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-3">Fit</h3>
                <p className="text-gray-600 mb-4">
                  Cupcakes saudáveis com ingredientes integrais, sem açúcar e opções sem glúten para cuidar da sua saúde.
                </p>
                <Link to="/menu?category=Fit">
                  <Button variant="outline" className="w-full">
                    Ver Fit
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

