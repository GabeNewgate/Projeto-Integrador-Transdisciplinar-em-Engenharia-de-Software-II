# 🧁 Cupcake Store - Loja Virtual de Cupcakes

Uma loja virtual completa e moderna para vendas de cupcakes artesanais, desenvolvida com React e Flask. O sistema oferece uma experiência de compra intuitiva para clientes e um painel administrativo robusto para gerenciamento de pedidos.

## 🌟 Características Principais

### Para Clientes
- **Cardápio Categorizado**: Navegue pelos cupcakes organizados em categorias (Doce, Salgado, Fit)
- **Carrinho de Compras**: Adicione, remova e ajuste quantidades facilmente
- **Processo de Checkout**: Finalização de pedidos simples e segura
- **Design Responsivo**: Interface otimizada para desktop e mobile

### Para Administradores
- **Painel Administrativo**: Dashboard completo para gerenciamento
- **Gestão de Pedidos**: Visualize e atualize status dos pedidos em tempo real
- **Autenticação Segura**: Sistema de login protegido para área administrativa
- **Estatísticas**: Acompanhe métricas importantes do negócio

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Biblioteca para interfaces de usuário
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de interface modernos
- **Lucide React** - Ícones elegantes
- **Axios** - Cliente HTTP para comunicação com API
- **React Router DOM** - Roteamento do lado do cliente

### Backend
- **Flask 3.1.1** - Framework web Python
- **SQLAlchemy** - ORM para banco de dados
- **Flask-CORS** - Suporte a Cross-Origin Resource Sharing
- **SQLite** - Banco de dados leve e eficiente
- **Werkzeug** - Utilitários para aplicações WSGI

## 📋 Funcionalidades Detalhadas

### Sistema de Produtos
- Catálogo completo com 10 cupcakes pré-cadastrados
- Três categorias distintas: Doce, Salgado e Fit
- Informações detalhadas: nome, descrição, preço e categoria
- Sistema de disponibilidade para controle de estoque

### Carrinho de Compras
- Adicionar produtos com um clique
- Ajustar quantidades diretamente no carrinho
- Remover itens individuais ou limpar carrinho completo
- Cálculo automático de totais e subtotais
- Persistência durante a sessão de navegação

### Sistema de Pedidos
- Formulário de checkout com validação
- Campos obrigatórios: nome, e-mail e telefone
- Criação automática de pedidos no banco de dados
- Confirmação visual após finalização
- Numeração sequencial de pedidos

### Painel Administrativo
- Login seguro com credenciais protegidas
- Dashboard com estatísticas em tempo real
- Lista completa de pedidos com filtros
- Atualização de status dos pedidos
- Informações detalhadas de clientes e itens

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Python 3.11+
- Node.js 20+
- pnpm (gerenciador de pacotes)

### Configuração do Backend

1. **Navegue para o diretório do backend:**
   ```bash
   cd backend
   ```

2. **Ative o ambiente virtual:**
   ```bash
   source venv/bin/activate
   ```

3. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Execute o servidor Flask:**
   ```bash
   python src/main.py
   ```

O backend estará disponível em `http://localhost:5000`

### Configuração do Frontend

1. **Navegue para o diretório do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   pnpm install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   pnpm run dev --host
   ```

O frontend estará disponível em `http://localhost:5173`

## 🗄️ Estrutura do Banco de Dados

### Tabela: products
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| name | String(100) | Nome do produto |
| description | Text | Descrição detalhada |
| price | Float | Preço unitário |
| category | String(50) | Categoria (Doce/Salgado/Fit) |
| image_url | String(200) | URL da imagem |
| available | Boolean | Disponibilidade |

### Tabela: orders
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| customer_name | String(100) | Nome do cliente |
| customer_email | String(120) | E-mail do cliente |
| customer_phone | String(20) | Telefone do cliente |
| total_amount | Float | Valor total do pedido |
| status | String(50) | Status do pedido |
| created_at | DateTime | Data de criação |

### Tabela: order_items
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| order_id | Integer | Referência ao pedido |
| product_id | Integer | Referência ao produto |
| quantity | Integer | Quantidade |
| unit_price | Float | Preço unitário |

### Tabela: admin
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Chave primária |
| username | String(80) | Nome de usuário |
| password_hash | String(120) | Senha criptografada |

## 🔐 Credenciais de Acesso

### Administrador Padrão
- **Usuário:** admin
- **Senha:** admin123

*Nota: Altere essas credenciais em ambiente de produção*

## 📡 API Endpoints

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products?category={categoria}` - Filtra por categoria
- `GET /api/products/{id}` - Busca produto específico
- `GET /api/categories` - Lista categorias disponíveis

### Pedidos
- `POST /api/orders` - Cria novo pedido
- `GET /api/orders` - Lista todos os pedidos (admin)
- `GET /api/orders/{id}` - Busca pedido específico
- `PUT /api/orders/{id}/status` - Atualiza status do pedido

### Autenticação
- `POST /api/admin/login` - Login do administrador
- `POST /api/admin/logout` - Logout do administrador
- `GET /api/admin/check` - Verifica sessão ativa

## 🎨 Design e UX

### Paleta de Cores
- **Primária:** Rosa (#EC4899) - Elementos principais e CTAs
- **Secundária:** Laranja (#F97316) - Destaques e categorias
- **Terciária:** Verde (#10B981) - Confirmações e sucessos
- **Neutras:** Cinzas variados para textos e backgrounds

### Tipografia
- **Fonte Principal:** Sistema padrão (sans-serif)
- **Hierarquia:** Títulos grandes, subtítulos médios, corpo legível
- **Peso:** Variações de regular a bold para criar contraste

### Componentes de Interface
- **Cards:** Design limpo com sombras suaves
- **Botões:** Estados hover e active bem definidos
- **Formulários:** Campos com validação visual
- **Navegação:** Menu responsivo e intuitivo

## 🔧 Configurações de Desenvolvimento

### Proxy Configuration (Vite)
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    }
  }
}
```

### CORS Configuration (Flask)
```python
from flask_cors import CORS
CORS(app)  # Permite requisições de qualquer origem
```

### Environment Variables
- `FLASK_ENV=development` - Modo de desenvolvimento
- `FLASK_DEBUG=True` - Debug ativo
- `SECRET_KEY` - Chave secreta para sessões

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

### Adaptações Mobile
- Menu hambúrguer para navegação
- Cards em coluna única
- Botões com área de toque adequada
- Formulários otimizados para teclado virtual

## 🧪 Testes Realizados

### Testes de Funcionalidade
✅ Navegação entre páginas  
✅ Carregamento do cardápio  
✅ Adição de itens ao carrinho  
✅ Processo de checkout completo  
✅ Login administrativo  
✅ Visualização de pedidos no painel  
✅ Atualização de status de pedidos  

### Testes de Integração
✅ Comunicação frontend-backend  
✅ Persistência de dados no banco  
✅ Autenticação e autorização  
✅ Validação de formulários  

## 🚀 Deploy e Produção

### Preparação para Deploy
1. **Atualizar requirements.txt:**
   ```bash
   pip freeze > requirements.txt
   ```

2. **Build do frontend:**
   ```bash
   pnpm run build
   ```

3. **Configurar variáveis de ambiente**
4. **Configurar banco de dados de produção**
5. **Implementar HTTPS**
6. **Configurar domínio personalizado**

### Considerações de Segurança
- Alterar credenciais padrão do admin
- Implementar rate limiting
- Validar todas as entradas do usuário
- Usar HTTPS em produção
- Configurar CORS adequadamente

## 🤝 Contribuição

### Como Contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código
- **Python:** Seguir PEP 8
- **JavaScript:** Usar ESLint e Prettier
- **Commits:** Mensagens descritivas em português
- **Documentação:** Manter README atualizado

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Gabriel dos Santos Gomes** - Desenvolvimento completo do sistema

## 🙏 Agradecimentos

- Comunidade React pela excelente documentação
- Equipe do Flask pelo framework robusto
- Criadores do Tailwind CSS pelo design system
- Contribuidores do shadcn/ui pelos componentes

---

**Desenvolvido com ❤️ para tornar a venda de cupcakes mais doce e eficiente!**

