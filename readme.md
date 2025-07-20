# Sistema de Pedidos B2B | Portobello

![Screenshot](screenshot.png)

#### [Vídeo da aplicação funcionando](https://www.loom.com/share/c23732a4879c407f9d968340b15f68c7?sid=16435b7c-942a-46c9-9dd5-aa972ade7301)

## Backend

Este projeto é um microsserviço de pedidos B2B, desenvolvido como parte de um desafio técnico para a Portobello. Ele permite **criar, listar, editar e deletar pedidos por ID**, com persistência em MongoDB e documentação automática com Swagger.

---

### Tecnologias Utilizadas

- Java 17
- Spring Boot
- Spring Data MongoDB
- JUnit + Mockito
- Swagger
- Docker para MongoDB
- Lombok

---

### Endpoints REST

| Método | Rota            | Descrição               |
| ------ | --------------- | ----------------------- |
| POST   | `/pedidos`      | Criar um novo pedido    |
| GET    | `/pedidos`      | Listar todos os pedidos |
| GET    | `/pedidos/{id}` | Buscar pedido por ID    |
| PUT    | `/pedidos/{id}` | Editar um pedido        |
| DELETE | `/pedidos/{id}` | Deletar um pedido       |

📄 Swagger disponível em: [`http://localhost:8080/swagger-ui.html`](http://localhost:8080/swagger-ui.html)

---

### Exemplo de Payload – POST /pedidos

```json
{
  "nome": "Cuba Semi Encaixe Quadrada 410x410x145",
  "preco": 250,
  "tipoProduto": "Cuba Semi Encaixe Quadrada 410x410x145",
  "ambiente": "Banheiro",
  "codigo": "OPNK5B",
  "dataCriacao": "2025-07-17T20:33:53.984",
  "dataAtualizacao": null,
  "criadoPor": "Ana Lucia de Souza",
  "status": "ENTREGUE"
}
```

---

### Testes

Testes unitários implementados com JUnit 5 e Mockito.

```bash
mvn test
```

---

### Diferenciais

- Estrutura limpa e escalável
- Testes unitários com cobertura de regras de negócio
- Docker e Swagger integrados

---

### Melhorias Futuras

- Autenticação e autorização com JWT
- Paginação nos endpoints
- Logs

---

<br>
<br>

## Frontend

### Arquivos e Pastas

#### `pages/`

Contém as páginas principais da aplicação:

- **routes.tsx**: Define as rotas da aplicação usando React Router.
- **home/**: Página inicial, lista todos os pedidos, permite busca e exclusão.
- **createOrder/**: Página para cadastro de novos pedidos.
- **editOrder/**: Página para edição de pedidos existentes.
- **detailedOrder/**: Página de detalhes de um pedido específico.

---

#### `services/`

Serviços de integração com a API:

- **OrderService.ts**: Serviço principal para CRUD de pedidos, utilizando o `HttpClient`.
- **mappers/OrderMapper.ts**: Faz a conversão entre o modelo da API (persistência) e o modelo de domínio usado no frontend.
- **utils/HttpClient.ts**: Cliente HTTP genérico para requisições REST, com tratamento de erros.

---

#### `utils/`

Funções utilitárias globais:

- **formatCurrency.ts**: Funções para formatação, entrada e parsing de valores monetários.
- **toast.ts**: Funções e tipos para exibir notificações (toasts) na aplicação.

---

#### `errors/APIError.ts`

Classe utilitária para padronizar erros de requisições HTTP, encapsulando o objeto `Response` e o corpo retornado.

---

#### `hooks/useError.tsx`

Hook customizado para gerenciamento de erros de formulário. Permite adicionar, remover e buscar mensagens de erro por campo.

---

#### `lib/EventManager.ts`

Classe utilitária para gerenciamento de eventos customizados (pub/sub), usada principalmente pelo sistema de Toasts.

---

### Fluxo Básico

1. **Listagem de Pedidos**: Página inicial (`pages/home`) consome `OrderService` para buscar e exibir pedidos.
2. **Cadastro/Edição**: Formulários usam hooks de erro e funções utilitárias para validação e formatação.
3. **Detalhamento**: Página de detalhes exibe informações completas do pedido.
4. **Deleção**: Pedidos podem ser deletados ao confimar no modal de deleção (aberto por ícone na listagem da home)
5. **Notificações**: Toasts são disparados via `utils/toast.ts` e exibidos globalmente.

---

### Tecnologias

- React 18 + TypeScript
- React Router
- SCSS Modules
- Vite
- Integração com backend Java via REST
