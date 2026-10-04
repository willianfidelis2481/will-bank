# Will Bank

Projeto da disciplina **Integrar Interfaces Web e Serviços Web** — Análise e Desenvolvimento de Sistemas.

- **Fase 1 – Back-end:** API REST em Spring Boot (pasta [`backend`](backend))
- **Fase 2 – Front-end:** aplicação Angular que consome a API (pasta [`frontend`](frontend))
- **Fase 3 – MongoDB:** consultas com os 17 operadores pedidos sobre Cliente e Conta (pasta [`mongodb`](mongodb))

## Integrantes

| Nome | Matrícula |
|------|-----------|
| Willian Fernando Charro Fidelis | 2525050022 |
| Joshe Lucas Morais Soares | 2525050006 |

## Fase 3 — MongoDB

O script [`mongodb/willbank.js`](mongodb/willbank.js) cria as coleções `clientes` e `contas` e executa `insertOne`, `insertMany`, `find()`, `find({atributo: "valor"})`, `updateOne`, `deleteOne`, `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`, `$nin`, `$or`, `$and` e `$exists`. A tabela de qual operador está em qual coleção e as instruções para rodar estão no [README da pasta](mongodb/README.md).

## O que o front-end faz

O Angular consome os dois recursos da API (Cliente e Conta) usando os quatro métodos pedidos:

| Método | Onde aparece na tela | Endpoint chamado |
|--------|----------------------|------------------|
| **GET ALL** | Lista de clientes / contas (tabela) | `GET /cliente` · `GET /conta` |
| **POST** | Formulário "Novo cliente" / "Nova conta" | `POST /cliente` · `POST /conta` |
| **PUT** | Botão "Editar" → formulário preenchido | `PUT /cliente/{id}` · `PUT /conta/{numeroConta}` |
| **DELETE** | Botão "Excluir" (com confirmação) | `DELETE /cliente/{id}` · `DELETE /conta/{numeroConta}` |

A tela de edição também usa `GET /cliente/{id}` e `GET /conta/{numeroConta}` para carregar os dados no formulário.

## Estrutura de pastas do front-end

```
frontend/src/
├── environments/                 # URL da API (http://localhost:8080)
└── app/
    ├── models/                   # interfaces com o formato do JSON
    │   ├── cliente.model.ts
    │   └── conta.model.ts
    ├── services/                 # chamadas HTTP (HttpClient) para a API
    │   ├── cliente.service.ts
    │   └── conta.service.ts
    ├── components/
    │   └── navbar/               # menu superior (aparece em todas as páginas)
    ├── pages/                    # uma pasta por tela (cada uma ligada a uma rota)
    │   ├── home/
    │   ├── cliente/
    │   │   ├── cliente-lista/    # GET ALL + DELETE
    │   │   └── cliente-form/     # POST + PUT (formulário reativo)
    │   └── conta/
    │       ├── conta-lista/      # GET ALL + DELETE
    │       └── conta-form/       # POST + PUT (formulário reativo)
    ├── app.routes.ts             # rotas
    ├── app.config.ts             # HttpClient, rotas, locale pt-BR
    └── app.ts / app.html         # layout principal (navbar + <router-outlet>)
```

## Rotas

| Rota | Tela |
|------|------|
| `/` | Início |
| `/clientes` | Lista de clientes |
| `/clientes/novo` | Cadastro de cliente |
| `/clientes/editar/:id` | Edição de cliente |
| `/contas` | Lista de contas |
| `/contas/novo` | Abertura de conta |
| `/contas/editar/:id` | Edição de conta |

## Formulários

Formulários reativos (`ReactiveFormsModule`) com as mesmas regras das entidades do back-end:

- **Cliente:** nome obrigatório (até 100), CPF obrigatório com 11 números, e-mail obrigatório e válido, telefone opcional.
- **Conta:** titular obrigatório (até 50), agência obrigatória, saldo obrigatório.

## Alterações no back-end para a Fase 2

- `config/CorsConfig.java`: libera o Angular (`http://localhost:4200`) a chamar a API — sem isso o navegador bloqueia as requisições.
- `PUT` passou a receber o id na URL (`PUT /cliente/{id}` e `PUT /conta/{numeroConta}`), como já estava documentado no README da Fase 1, e retorna 404 se o registro não existir.

## Como executar

**Pré-requisitos:** Java 21, Node.js 20.19+ (ou 22 LTS) e npm.

### 1. Back-end (porta 8080)

```bash
cd backend
./mvnw spring-boot:run        # no Windows: mvnw.cmd spring-boot:run
```

Ou abra a pasta `backend` no IntelliJ e rode a classe `WillbankApplication`.

### 2. Front-end (porta 4200)

```bash
cd frontend
npm install
npm start                     # mesmo que: ng serve
```

Acesse **http://localhost:4200**.

## Tecnologias

- **Back-end:** Java 21, Spring Boot, Spring Web, Spring Data JPA, H2, Lombok, Maven
- **Banco NoSQL:** MongoDB 8 (mongosh)
- **Front-end:** Angular 21 (componentes standalone, signals, Reactive Forms, HttpClient, Router), TypeScript, CSS
