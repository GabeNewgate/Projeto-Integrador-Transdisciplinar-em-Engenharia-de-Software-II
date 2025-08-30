# 🎨 Guia do Frontend - Cupcake Store

Este guia fornece uma visão abrangente da arquitetura, componentes e funcionalidades do frontend da Cupcake Store, desenvolvido com React e tecnologias modernas.

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios

```
frontend/
├── public/                 # Arquivos estáticos
│   ├── favicon.ico        # Ícone da aplicação
│   └── vite.svg          # Logo do Vite
├── src/                   # Código fonte
│   ├── assets/           # Recursos estáticos (imagens, etc.)
│   ├── components/       # Componentes React
│   │   ├── ui/          # Componentes de interface (shadcn/ui)
│   │   ├── Header.jsx   # Cabeçalho da aplicação
│   │   ├── Home.jsx     # Página inicial
│   │   ├── Menu.jsx     # Cardápio de produtos
│   │   ├── Cart.jsx     # Carrinho de compras
│   │   ├── Checkout.jsx # Finalização de pedidos
│   │   ├── AdminLogin.jsx    # Login administrativo
│   │   └── AdminDashboard.jsx # Painel administrativo
│   ├── contexts/         # Contextos React
│   │   └── CartContext.jsx   # Gerenciamento do carrinho
│   ├── hooks/           # Hooks customizados
│   ├── lib/             # Utilitários e bibliotecas
│   ├── App.css          # Estilos da aplicação
│   ├── App.jsx          # Componente principal
│   ├── index.css        # Estilos globais
│   └── main.jsx         # Ponto de entrada
├── components.json       # Configuração shadcn/ui
├── eslint.config.js     # Configuração ESLint
├── index.html           # Template HTML
├── package.json         # Dependências e scripts
├── pnpm-lock.yaml      # Lock file das dependências
└── vite.config.js      # Configuração Vite
```

## 🧩 Componentes Principais

### App.jsx - Componente Raiz

O componente principal que configura o roteamento e o contexto global da aplicação.

**Funcionalidades:**
- Configuração do React Router
- Provedor do contexto do carrinho
- Layout base com gradiente de fundo
- Roteamento entre páginas

**Rotas Configuradas:**
- `/` - Página inicial (Home)
- `/menu` - Cardápio de produtos (Menu)
- `/cart` - Carrinho de compras (Cart)
- `/checkout` - Finalização de pedidos (Checkout)
- `/admin/login` - Login administrativo (AdminLogin)
- `/admin/dashboard` - Painel administrativo (AdminDashboard)

### Header.jsx - Cabeçalho

Componente de navegação principal presente em todas as páginas.

**Funcionalidades:**
- Logo da marca com link para home
- Menu de navegação responsivo
- Indicador do carrinho com contador de itens
- Link para área administrativa
- Destaque visual da página atual

**Estados Visuais:**
- Links ativos com cor diferenciada
- Contador de itens no carrinho
- Menu mobile colapsável

### Home.jsx - Página Inicial

Landing page atrativa que apresenta a marca e produtos.

**Seções:**
1. **Hero Section**: Título principal e call-to-actions
2. **Features Section**: Benefícios dos produtos
3. **Categories Preview**: Prévia das categorias com links diretos

**Elementos de Design:**
- Gradientes e cores vibrantes
- Cards com hover effects
- Botões com estados interativos
- Layout responsivo

### Menu.jsx - Cardápio

Página principal de produtos com sistema de filtros e adição ao carrinho.

**Funcionalidades:**
- Carregamento de produtos via API
- Filtros por categoria (Todos, Doce, Salgado, Fit)
- Grid responsivo de produtos
- Botões de adicionar ao carrinho
- Estados de loading e erro
- Badges coloridas por categoria

**Integração com API:**
- `GET /api/products` - Lista produtos
- `GET /api/categories` - Lista categorias
- Tratamento de erros de rede

### Cart.jsx - Carrinho de Compras

Interface completa para gerenciamento do carrinho.

**Funcionalidades:**
- Lista de itens com detalhes
- Controles de quantidade (+/-)
- Remoção de itens individuais
- Botão para limpar carrinho
- Cálculo automático de totais
- Resumo do pedido
- Links para continuar comprando ou finalizar

**Estados:**
- Carrinho vazio com call-to-action
- Carrinho com itens e controles
- Atualização em tempo real

### Checkout.jsx - Finalização

Processo de checkout com formulário e confirmação.

**Etapas:**
1. **Formulário de dados**: Nome, e-mail, telefone
2. **Resumo do pedido**: Itens e total
3. **Confirmação**: Sucesso com número do pedido

**Validações:**
- Campos obrigatórios
- Formato de e-mail
- Feedback visual de erros
- Estados de loading durante envio

**Integração:**
- `POST /api/orders` - Criação do pedido
- Limpeza automática do carrinho após sucesso

### AdminLogin.jsx - Login Administrativo

Interface de autenticação para administradores.

**Funcionalidades:**
- Formulário de login seguro
- Validação de credenciais
- Redirecionamento automático se já logado
- Credenciais de demonstração visíveis
- Tratamento de erros de autenticação

**Segurança:**
- Campos de senha mascarados
- Verificação de sessão ativa
- Redirecionamento após login

### AdminDashboard.jsx - Painel Administrativo

Dashboard completo para gerenciamento de pedidos.

**Funcionalidades:**
- Estatísticas em tempo real
- Lista de pedidos com detalhes
- Atualização de status de pedidos
- Informações de clientes
- Sistema de logout
- Filtros e ordenação

**Métricas Exibidas:**
- Total de pedidos
- Pedidos pendentes
- Pedidos em preparo
- Pedidos entregues

## 🎯 Contextos e Estado

### CartContext.jsx - Gerenciamento do Carrinho

Context API para gerenciamento global do estado do carrinho.

**Estado:**
```javascript
{
  items: [
    {
      id: 1,
      name: "Cupcake de Chocolate",
      price: 8.5,
      category: "Doce",
      quantity: 2
    }
  ]
}
```

**Ações Disponíveis:**
- `addToCart(product)` - Adiciona produto
- `removeFromCart(productId)` - Remove produto
- `updateQuantity(productId, quantity)` - Atualiza quantidade
- `clearCart()` - Limpa carrinho
- `getTotalPrice()` - Calcula total
- `getTotalItems()` - Conta itens

**Reducer Logic:**
- Incremento automático se produto já existe
- Remoção quando quantidade chega a zero
- Cálculos automáticos de totais

## 🎨 Sistema de Design

### Paleta de Cores

```css
/* Cores Principais */
--pink-600: #EC4899;     /* Primária - CTAs e destaques */
--orange-600: #F97316;   /* Secundária - Categorias salgadas */
--green-600: #10B981;    /* Terciária - Categorias fit e sucessos */

/* Cores de Categoria */
--doce: #EC4899;         /* Rosa para doces */
--salgado: #F97316;      /* Laranja para salgados */
--fit: #10B981;          /* Verde para fit */

/* Neutras */
--gray-50: #F9FAFB;      /* Background claro */
--gray-600: #4B5563;     /* Textos secundários */
--gray-800: #1F2937;     /* Textos principais */
```

### Tipografia

**Hierarquia:**
- `text-5xl` (48px) - Títulos principais
- `text-3xl` (30px) - Títulos de seção
- `text-xl` (20px) - Subtítulos
- `text-lg` (18px) - Texto de destaque
- `text-base` (16px) - Texto padrão
- `text-sm` (14px) - Texto secundário

**Pesos:**
- `font-bold` - Títulos e destaques
- `font-semibold` - Subtítulos
- `font-medium` - Texto de destaque
- `font-normal` - Texto padrão

### Componentes de Interface

**Botões:**
```css
/* Primário */
.btn-primary {
  @apply bg-pink-600 hover:bg-pink-700 text-white;
}

/* Secundário */
.btn-secondary {
  @apply border border-gray-300 hover:bg-gray-50;
}

/* Outline */
.btn-outline {
  @apply border border-pink-600 text-pink-600 hover:bg-pink-50;
}
```

**Cards:**
```css
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200;
}

.card-hover {
  @apply hover:shadow-xl transition-all duration-300;
}
```

**Badges:**
```css
.badge-doce {
  @apply bg-pink-100 text-pink-800;
}

.badge-salgado {
  @apply bg-orange-100 text-orange-800;
}

.badge-fit {
  @apply bg-green-100 text-green-800;
}
```

## 📱 Responsividade

### Breakpoints Tailwind

```css
/* Mobile First */
sm: 640px   /* Tablet pequeno */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop pequeno */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

### Adaptações por Dispositivo

**Mobile (< 768px):**
- Menu de navegação colapsado
- Cards em coluna única
- Botões com área de toque adequada
- Formulários otimizados
- Texto redimensionado

**Tablet (768px - 1024px):**
- Grid de 2 colunas para produtos
- Menu horizontal visível
- Sidebar do carrinho adaptada

**Desktop (> 1024px):**
- Grid de 3 colunas para produtos
- Layout de duas colunas no checkout
- Hover effects completos
- Espaçamentos maiores

### Classes Responsivas Utilizadas

```css
/* Grid Responsivo */
.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Texto Responsivo */
.text-responsive {
  @apply text-4xl md:text-5xl lg:text-6xl;
}

/* Espaçamento Responsivo */
.spacing-responsive {
  @apply px-4 md:px-6 lg:px-8;
}
```

## 🔧 Configurações e Build

### Vite Configuration

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

**Funcionalidades:**
- Hot Module Replacement (HMR)
- Proxy para API do backend
- Alias para imports absolutos
- Build otimizado para produção

### ESLint Configuration

```javascript
export default [
  js.configs.recommended,
  ...fixupConfigRules(reactHooks.configs.recommended),
  ...fixupConfigRules(reactRefresh.configs.recommended),
  {
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]
```

### Tailwind Configuration

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores customizadas do projeto
      }
    },
  },
  plugins: [],
}
```

## 🚀 Performance e Otimizações

### Code Splitting

- Roteamento com lazy loading
- Componentes carregados sob demanda
- Chunks separados por rota

### Otimizações de Bundle

- Tree shaking automático
- Minificação de CSS e JS
- Compressão de assets
- Cache busting com hashes

### Otimizações de Runtime

- Memoização de componentes pesados
- Debounce em campos de busca
- Lazy loading de imagens
- Virtualization para listas grandes

## 🧪 Testes e Debugging

### Ferramentas de Desenvolvimento

- React Developer Tools
- Vite DevTools
- Network tab para API calls
- Console logging estruturado

### Debugging Comum

**Problemas de CORS:**
```javascript
// Verificar configuração do proxy no vite.config.js
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

**Estado do Carrinho:**
```javascript
// Debug do contexto do carrinho
console.log('Cart items:', items);
console.log('Total price:', getTotalPrice());
```

**Problemas de Roteamento:**
```javascript
// Verificar se BrowserRouter está configurado
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

## 📦 Dependências Principais

### Produção

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.1.1",
  "axios": "^1.11.0",
  "@radix-ui/react-*": "^1.x.x",
  "lucide-react": "^0.x.x",
  "tailwindcss": "^3.x.x"
}
```

### Desenvolvimento

```json
{
  "@vitejs/plugin-react": "^4.x.x",
  "vite": "^6.x.x",
  "eslint": "^9.x.x",
  "prettier": "^3.x.x"
}
```

## 🔄 Fluxos de Usuário

### Fluxo de Compra

1. **Entrada**: Usuário acessa a home
2. **Navegação**: Clica em "Ver Cardápio"
3. **Seleção**: Escolhe produtos e adiciona ao carrinho
4. **Revisão**: Acessa carrinho e revisa itens
5. **Checkout**: Preenche dados pessoais
6. **Confirmação**: Recebe confirmação do pedido

### Fluxo Administrativo

1. **Acesso**: Admin clica em "Admin" no header
2. **Login**: Insere credenciais na tela de login
3. **Dashboard**: Visualiza estatísticas e pedidos
4. **Gestão**: Atualiza status dos pedidos
5. **Logout**: Encerra sessão com segurança

## 🎯 Próximas Melhorias

### Funcionalidades Planejadas

- Sistema de favoritos
- Histórico de pedidos para clientes
- Notificações em tempo real
- Chat de suporte
- Sistema de avaliações

### Melhorias Técnicas

- Implementação de testes unitários
- Storybook para componentes
- PWA (Progressive Web App)
- Internacionalização (i18n)
- Análise de performance

---

**Este guia serve como referência completa para desenvolvimento e manutenção do frontend da Cupcake Store.**

