# Will_bank

API REST desenvolvida em Spring Boot para a disciplina de **Integrar Interfaces Web e Serviços Web**, do curso de Análise e Desenvolvimento de Sistemas.

## Integrantes

- Willian Fernando Charro Fidelis — matrícula 2525050022
- Joshe Lucas Morais Soares — matrícula 2525050006

## Tecnologias utilizadas

- Java 17+
- Spring Boot
- Spring Web
- Spring Data JPA
- Lombok
- H2 Database
- Maven

## Estrutura do projeto

O projeto segue o modelo técnico de organização (uma pasta por camada):

```
src/main/java/br/com/willianfidelis/willbank/
├── controller/
│   ├── ContaController.java
│   └── ClienteController.java
├── service/
│   ├── ContaService.java
│   └── ClienteService.java
├── repository/
│   ├── ContaRepository.java
│   └── ClienteRepository.java
└── entity/
    ├── Conta.java
    └── Cliente.java
```

## Endpoints

### Conta (`/conta`)

| Método | Endpoint          | Descrição                  |
|--------|-------------------|-----------------------------|
| GET    | /conta             | Lista todas as contas       |
| GET    | /conta/{numeroConta} | Busca uma conta por ID    |
| POST   | /conta             | Cria uma nova conta         |
| PUT    | /conta/{numeroConta} | Atualiza uma conta        |
| DELETE | /conta/{numeroConta} | Remove uma conta          |

### Cliente (`/cliente`)

| Método | Endpoint       | Descrição                   |
|--------|----------------|-------------------------------|
| GET    | /cliente        | Lista todos os clientes       |
| GET    | /cliente/{id}   | Busca um cliente por ID       |
| POST   | /cliente        | Cria um novo cliente          |
| PUT    | /cliente/{id}   | Atualiza um cliente           |
| DELETE | /cliente/{id}   | Remove um cliente             |

## Como executar

1. Clone ou baixe o projeto.
2. Abra no IntelliJ IDEA.
3. Rode a aplicação pela classe principal (`WillbankApplication`) ou pelo terminal com `mvnw.cmd spring-boot:run`.
4. A API estará disponível em `http://localhost:8080`.

## Banco de dados

O projeto usa H2 (banco de dados em arquivo). O console do H2 pode ser acessado em:

`http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:file:./testdb`
- Usuário: `sa`
- Senha: (em branco)
