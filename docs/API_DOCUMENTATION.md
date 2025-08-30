# 📡 Documentação da API - Cupcake Store

Esta documentação descreve todos os endpoints disponíveis na API REST da Cupcake Store, incluindo parâmetros, respostas e exemplos de uso.

## 🔗 Base URL

```
http://localhost:5000/api
```

## 📋 Índice

1. [Produtos](#produtos)
2. [Pedidos](#pedidos)
3. [Autenticação](#autenticação)
4. [Códigos de Status](#códigos-de-status)
5. [Exemplos de Uso](#exemplos-de-uso)

## 🧁 Produtos

### Listar Todos os Produtos

**Endpoint:** `GET /products`

**Descrição:** Retorna todos os produtos disponíveis no cardápio.

**Parâmetros de Query:**
- `category` (opcional): Filtra produtos por categoria (Doce, Salgado, Fit)

**Resposta de Sucesso:**
```json
[
  {
    "id": 1,
    "name": "Cupcake de Chocolate",
    "description": "Delicioso cupcake de chocolate com cobertura cremosa",
    "price": 8.5,
    "category": "Doce",
    "image_url": "/static/images/chocolate.jpg",
    "available": true
  }
]
```

**Exemplo de Requisição:**
```bash
curl -X GET "http://localhost:5000/api/products"
curl -X GET "http://localhost:5000/api/products?category=Doce"
```

### Buscar Produto por ID

**Endpoint:** `GET /products/{id}`

**Descrição:** Retorna um produto específico pelo seu ID.

**Parâmetros de Path:**
- `id` (obrigatório): ID do produto

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "name": "Cupcake de Chocolate",
  "description": "Delicioso cupcake de chocolate com cobertura cremosa",
  "price": 8.5,
  "category": "Doce",
  "image_url": "/static/images/chocolate.jpg",
  "available": true
}
```

**Resposta de Erro (404):**
```json
{
  "error": "Produto não encontrado"
}
```

### Listar Categorias

**Endpoint:** `GET /categories`

**Descrição:** Retorna todas as categorias de produtos disponíveis.

**Resposta de Sucesso:**
```json
["Doce", "Salgado", "Fit"]
```

## 🛒 Pedidos

### Criar Novo Pedido

**Endpoint:** `POST /orders`

**Descrição:** Cria um novo pedido com os itens especificados.

**Corpo da Requisição:**
```json
{
  "customer_name": "João Silva",
  "customer_email": "joao@email.com",
  "customer_phone": "(11) 99999-9999",
  "items": [
    {
      "product_id": 1,
      "quantity": 2
    },
    {
      "product_id": 3,
      "quantity": 1
    }
  ]
}
```

**Resposta de Sucesso (201):**
```json
{
  "id": 1,
  "customer_name": "João Silva",
  "customer_email": "joao@email.com",
  "customer_phone": "(11) 99999-9999",
  "total_amount": 26.0,
  "status": "Pendente",
  "created_at": "2025-08-30T20:16:37.123456",
  "items": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "Cupcake de Chocolate",
      "quantity": 2,
      "unit_price": 8.5,
      "subtotal": 17.0
    },
    {
      "id": 2,
      "product_id": 3,
      "product_name": "Cupcake Red Velvet",
      "quantity": 1,
      "unit_price": 9.0,
      "subtotal": 9.0
    }
  ]
}
```

**Resposta de Erro (400):**
```json
{
  "error": "Campo obrigatório: customer_name"
}
```

### Listar Todos os Pedidos (Admin)

**Endpoint:** `GET /orders`

**Descrição:** Retorna todos os pedidos do sistema. Requer autenticação de administrador.

**Resposta de Sucesso:**
```json
[
  {
    "id": 1,
    "customer_name": "João Silva",
    "customer_email": "joao@email.com",
    "customer_phone": "(11) 99999-9999",
    "total_amount": 26.0,
    "status": "Pendente",
    "created_at": "2025-08-30T20:16:37.123456",
    "items": [...]
  }
]
```

### Buscar Pedido por ID

**Endpoint:** `GET /orders/{id}`

**Descrição:** Retorna um pedido específico pelo seu ID.

**Parâmetros de Path:**
- `id` (obrigatório): ID do pedido

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "customer_name": "João Silva",
  "customer_email": "joao@email.com",
  "customer_phone": "(11) 99999-9999",
  "total_amount": 26.0,
  "status": "Pendente",
  "created_at": "2025-08-30T20:16:37.123456",
  "items": [...]
}
```

### Atualizar Status do Pedido (Admin)

**Endpoint:** `PUT /orders/{id}/status`

**Descrição:** Atualiza o status de um pedido. Requer autenticação de administrador.

**Parâmetros de Path:**
- `id` (obrigatório): ID do pedido

**Corpo da Requisição:**
```json
{
  "status": "Confirmado"
}
```

**Status Válidos:**
- `Pendente`
- `Confirmado`
- `Em Preparo`
- `Pronto`
- `Entregue`

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "customer_name": "João Silva",
  "customer_email": "joao@email.com",
  "customer_phone": "(11) 99999-9999",
  "total_amount": 26.0,
  "status": "Confirmado",
  "created_at": "2025-08-30T20:16:37.123456",
  "items": [...]
}
```

## 🔐 Autenticação

### Login do Administrador

**Endpoint:** `POST /admin/login`

**Descrição:** Autentica um administrador e cria uma sessão.

**Corpo da Requisição:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Login realizado com sucesso",
  "admin": {
    "id": 1,
    "username": "admin"
  }
}
```

**Resposta de Erro (401):**
```json
{
  "error": "Credenciais inválidas"
}
```

### Logout do Administrador

**Endpoint:** `POST /admin/logout`

**Descrição:** Encerra a sessão do administrador.

**Resposta de Sucesso:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### Verificar Sessão

**Endpoint:** `GET /admin/check`

**Descrição:** Verifica se existe uma sessão ativa de administrador.

**Resposta de Sucesso (Logado):**
```json
{
  "logged_in": true,
  "admin": {
    "id": 1,
    "username": "admin"
  }
}
```

**Resposta de Sucesso (Não Logado):**
```json
{
  "logged_in": false
}
```

## 📊 Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado com sucesso |
| 400 | Bad Request - Dados inválidos ou ausentes |
| 401 | Unauthorized - Credenciais inválidas |
| 403 | Forbidden - Acesso negado |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error - Erro interno do servidor |

## 🔧 Exemplos de Uso

### Fluxo Completo de Pedido

1. **Listar produtos disponíveis:**
```bash
curl -X GET "http://localhost:5000/api/products"
```

2. **Criar um pedido:**
```bash
curl -X POST "http://localhost:5000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Maria Santos",
    "customer_email": "maria@email.com",
    "customer_phone": "(11) 88888-8888",
    "items": [
      {"product_id": 1, "quantity": 2},
      {"product_id": 5, "quantity": 1}
    ]
  }'
```

### Fluxo de Administração

1. **Fazer login:**
```bash
curl -X POST "http://localhost:5000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }' \
  -c cookies.txt
```

2. **Listar pedidos:**
```bash
curl -X GET "http://localhost:5000/api/orders" \
  -b cookies.txt
```

3. **Atualizar status do pedido:**
```bash
curl -X PUT "http://localhost:5000/api/orders/1/status" \
  -H "Content-Type: application/json" \
  -d '{"status": "Em Preparo"}' \
  -b cookies.txt
```

## 🛡️ Segurança

### Autenticação
- Sistema baseado em sessões Flask
- Cookies seguros para manter estado de login
- Verificação de permissões para endpoints administrativos

### Validação
- Validação de dados de entrada em todos os endpoints
- Sanitização de parâmetros de query
- Verificação de tipos de dados

### CORS
- Configurado para permitir requisições do frontend
- Headers apropriados para desenvolvimento e produção

## 🐛 Tratamento de Erros

### Estrutura de Erro Padrão
```json
{
  "error": "Descrição do erro em português"
}
```

### Erros Comuns

**Produto não encontrado:**
```json
{
  "error": "Produto não encontrado: 999"
}
```

**Produto indisponível:**
```json
{
  "error": "Produto não disponível: Cupcake de Chocolate"
}
```

**Campo obrigatório ausente:**
```json
{
  "error": "Campo obrigatório: customer_email"
}
```

**Status inválido:**
```json
{
  "error": "Status inválido"
}
```

## 📝 Notas de Desenvolvimento

### Banco de Dados
- SQLite para desenvolvimento
- Migrações automáticas na inicialização
- Dados de exemplo pré-carregados

### Configuração
- Debug mode ativo em desenvolvimento
- CORS habilitado para localhost
- Sessões configuradas com chave secreta

### Performance
- Consultas otimizadas com relacionamentos
- Índices automáticos em chaves primárias
- Lazy loading para relacionamentos

---

**Esta documentação é mantida atualizada com cada versão da API.**

