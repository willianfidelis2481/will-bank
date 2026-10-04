# Will Bank — Fase 3: consultas no MongoDB

Consultas MongoDB sobre as duas entidades da Fase 1, **Cliente** e **Conta**, que viram as coleções `clientes` e `contas` do banco `willbank`.

- [`willbank.js`](willbank.js) — o script com todas as consultas, comentadas.
- [`resultado-execucao.txt`](resultado-execucao.txt) — a saída do script rodando no MongoDB 8.0 (os `ObjectId` mudam a cada execução).

## Modelagem

| Coleção | Campos da Fase 1 | Campos adicionados | Por quê |
|---------|------------------|--------------------|---------|
| `clientes` | nome, cpf, email, telefone | cidade, idade | dar suporte a `$in`, `$nin`, `$ne`, `$or`. O telefone é opcional: alguns documentos não têm o campo, o que permite testar `$exists` |
| `contas` | numeroConta, numeroAgencia, titular, saldo | tipo, cpfTitular | `tipo` (corrente, poupanca, salario) para `$eq`, `$ne`, `$nin`; `cpfTitular` liga a conta ao cliente |

Exemplo de documento de cada coleção:

```js
// clientes
{ nome: "Maria Souza", cpf: "33344455566", email: "maria@email.com", cidade: "João Pessoa", idade: 45 }

// contas
{ numeroConta: 4, numeroAgencia: 303, titular: "Maria Souza", cpfTitular: "33344455566", tipo: "salario", saldo: 4300.0 }
```

## Onde está cada operador

| # | Operador | Clientes | Contas |
|---|----------|----------|--------|
| 1 | `insertOne` | ✅ inserir um cliente | |
| 2 | `insertMany` | ✅ inserir 5 clientes | ✅ inserir 6 contas |
| 3 | `find()` | ✅ todos os clientes | ✅ todas as contas |
| 4 | `find({atributo: "valor"})` | ✅ `{ cidade: "Campina Grande" }` | ✅ `{ numeroAgencia: 202 }` |
| 5 | `updateOne` | ✅ `$set` do telefone | ✅ `$inc` no saldo (depósito) |
| 6 | `deleteOne` | ✅ excluir um cliente | ✅ encerrar uma conta |
| 7 | `$eq` | ✅ cpf igual a | ✅ tipo igual a "poupanca" |
| 8 | `$ne` | ✅ cidade diferente de | ✅ tipo diferente de "corrente" |
| 9 | `$gt` | | ✅ saldo > 4.300 |
| 10 | `$gte` | | ✅ saldo >= 4.300 |
| 11 | `$lt` | | ✅ saldo < 0 |
| 12 | `$lte` | | ✅ saldo <= 1.000 |
| 13 | `$in` | ✅ cidade em [João Pessoa, Recife] | ✅ agência em [101, 404] |
| 14 | `$nin` | ✅ cidade fora de [João Pessoa, Recife] | ✅ tipo fora de [poupanca, salario] |
| 15 | `$or` | ✅ Natal **ou** idade > 50 | ✅ saldo < 0 **ou** > 10.000 |
| 16 | `$and` | | ✅ corrente **e** saldo >= 1.000 |
| 17 | `$exists` | ✅ clientes sem telefone | |

Consultas extras:

- **`$gt` + `$lt` juntos (faixa de valores):** `db.contas.find({ saldo: { $gt: 1000, $lt: 10000 } })`
- **Entre as duas entidades:** busca o cliente pelo cpf e depois as contas dele com `{ cpfTitular: cliente.cpf }`.

## Como executar

Pré-requisito: MongoDB rodando em `localhost:27017` e o `mongosh` instalado (ou o MongoDB Compass, que já vem com o mongosh embutido).

**Pelo terminal:**

```bash
cd mongodb
mongosh --file willbank.js
```

**Pelo MongoDB Compass:** conecte em `mongodb://localhost:27017`, abra a aba **Mongosh** (na parte de baixo) e rode:

```js
load("C:/Users/Usuario/Downloads/will-bank/mongodb/willbank.js")
```

O script apaga e recria as coleções no começo, então pode ser executado quantas vezes quiser.
