// =====================================================================
// Will Bank — Fase 3: consultas no MongoDB
// Entidades da Fase 1: Cliente e Conta (viram as coleções "clientes" e "contas")
//
// Como rodar (com o MongoDB ligado):
//   mongosh --file willbank.js
// ou, dentro do mongosh / aba "Mongosh" do Compass:
//   load("C:/caminho/para/willbank.js")
//
// O script começa apagando as coleções, então pode rodar quantas vezes quiser.
// =====================================================================

db = db.getSiblingDB("willbank"); // usa (ou cria) o banco "willbank"

// Função só para deixar a saída organizada
function titulo(texto) {
  print("\n==================================================");
  print(texto);
  print("==================================================");
}

// Começa do zero
db.clientes.drop();
db.contas.drop();

// ---------------------------------------------------------------------
// MODELAGEM
// Cliente: mesmos campos da Fase 1 (nome, cpf, email, telefone)
//          + cidade e idade, para dar suporte aos operadores de comparação.
//          O telefone continua opcional: alguns documentos não têm o campo
//          (é isso que o $exists testa).
// Conta:   mesmos campos da Fase 1 (numeroConta, numeroAgencia, titular, saldo)
//          + tipo (corrente, poupanca, salario) e cpfTitular, que liga a
//          conta ao cliente (o "relacionamento" entre as duas entidades).
// ---------------------------------------------------------------------

// =====================================================================
// PARTE 1 — CLIENTES
// =====================================================================

// 1. insertOne — insere UM documento
titulo("1. insertOne — inserir um cliente");
printjson(
  db.clientes.insertOne({
    nome: "Willian Fernando Charro Fidelis",
    cpf: "11122233344",
    email: "willian@email.com",
    telefone: "(83) 99999-0001",
    cidade: "Campina Grande",
    idade: 34,
  })
);

// 2. insertMany — insere VÁRIOS documentos de uma vez
titulo("2. insertMany — inserir vários clientes");
printjson(
  db.clientes.insertMany([
    { nome: "Joshe Lucas Morais Soares", cpf: "22233344455", email: "joshe@email.com", telefone: "(83) 99999-0002", cidade: "Campina Grande", idade: 22 },
    { nome: "Maria Souza", cpf: "33344455566", email: "maria@email.com", cidade: "João Pessoa", idade: 45 }, // sem telefone
    { nome: "Carlos Lima", cpf: "44455566677", email: "carlos@email.com", telefone: "(81) 98888-0003", cidade: "Recife", idade: 29 },
    { nome: "Ana Paula Costa", cpf: "55566677788", email: "ana@email.com", cidade: "Natal", idade: 19 }, // sem telefone
    { nome: "Pedro Henrique", cpf: "66677788899", email: "pedro@email.com", telefone: "(83) 97777-0004", cidade: "João Pessoa", idade: 52 },
  ])
);

// 3. find() — lista TODOS os documentos
titulo("3. find() — todos os clientes");
db.clientes.find().forEach(printjson);

// 4. find({atributo: "valor"}) — filtra por um campo
titulo('4. find({ cidade: "Campina Grande" }) — clientes de Campina Grande');
db.clientes.find({ cidade: "Campina Grande" }).forEach(printjson);

// 7. $eq — igual a
titulo('7. $eq — cliente com cpf igual a "33344455566"');
db.clientes.find({ cpf: { $eq: "33344455566" } }).forEach(printjson);

// 8. $ne — diferente de
titulo('8. $ne — clientes que NÃO são de Campina Grande');
db.clientes.find({ cidade: { $ne: "Campina Grande" } }, { _id: 0, nome: 1, cidade: 1 }).forEach(printjson);

// 13. $in — o valor está NA lista
titulo('13. $in — clientes de João Pessoa ou Recife');
db.clientes.find({ cidade: { $in: ["João Pessoa", "Recife"] } }, { _id: 0, nome: 1, cidade: 1 }).forEach(printjson);

// 14. $nin — o valor NÃO está na lista
titulo('14. $nin — clientes que não são de João Pessoa nem de Recife');
db.clientes.find({ cidade: { $nin: ["João Pessoa", "Recife"] } }, { _id: 0, nome: 1, cidade: 1 }).forEach(printjson);

// 17. $exists — o campo existe (ou não) no documento
titulo("17. $exists — clientes SEM telefone cadastrado");
db.clientes.find({ telefone: { $exists: false } }, { _id: 0, nome: 1, email: 1 }).forEach(printjson);

// 15. $or — pelo menos UMA das condições é verdadeira
titulo('15. $or — clientes de Natal OU com mais de 50 anos');
db.clientes.find(
  { $or: [{ cidade: "Natal" }, { idade: { $gt: 50 } }] },
  { _id: 0, nome: 1, cidade: 1, idade: 1 }
).forEach(printjson);

// 5. updateOne — atualiza UM documento
titulo('5. updateOne — cadastrar o telefone da Maria Souza');
printjson(
  db.clientes.updateOne(
    { cpf: "33344455566" },                 // filtro: qual documento
    { $set: { telefone: "(83) 96666-0005" } } // o que mudar
  )
);
print("Depois do update:");
printjson(db.clientes.findOne({ cpf: "33344455566" }, { _id: 0, nome: 1, telefone: 1 }));

// 6. deleteOne — apaga UM documento
titulo('6. deleteOne — excluir o cliente Pedro Henrique');
printjson(db.clientes.deleteOne({ cpf: "66677788899" }));
print("Clientes restantes: " + db.clientes.countDocuments());

// =====================================================================
// PARTE 2 — CONTAS
// =====================================================================

// 2. insertMany — contas (cpfTitular liga a conta ao cliente)
titulo("2. insertMany — inserir as contas");
printjson(
  db.contas.insertMany([
    { numeroConta: 1, numeroAgencia: 101, titular: "Willian Fernando Charro Fidelis", cpfTitular: "11122233344", tipo: "corrente", saldo: 2500.0 },
    { numeroConta: 2, numeroAgencia: 101, titular: "Willian Fernando Charro Fidelis", cpfTitular: "11122233344", tipo: "poupanca", saldo: 12000.0 },
    { numeroConta: 3, numeroAgencia: 202, titular: "Joshe Lucas Morais Soares", cpfTitular: "22233344455", tipo: "corrente", saldo: 850.5 },
    { numeroConta: 4, numeroAgencia: 303, titular: "Maria Souza", cpfTitular: "33344455566", tipo: "salario", saldo: 4300.0 },
    { numeroConta: 5, numeroAgencia: 202, titular: "Carlos Lima", cpfTitular: "44455566677", tipo: "corrente", saldo: -150.0 },
    { numeroConta: 6, numeroAgencia: 404, titular: "Ana Paula Costa", cpfTitular: "55566677788", tipo: "poupanca", saldo: 1000.0 },
  ])
);

// 3. find() — todas as contas
titulo("3. find() — todas as contas");
db.contas.find({}, { _id: 0 }).forEach(printjson);

// 4. find({atributo: "valor"}) — contas de uma agência
titulo("4. find({ numeroAgencia: 202 }) — contas da agência 202");
db.contas.find({ numeroAgencia: 202 }, { _id: 0 }).forEach(printjson);

// 7. $eq — igual a
titulo('7. $eq — contas do tipo "poupanca"');
db.contas.find({ tipo: { $eq: "poupanca" } }, { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }).forEach(printjson);

// 8. $ne — diferente de
titulo('8. $ne — contas que NÃO são corrente');
db.contas.find({ tipo: { $ne: "corrente" } }, { _id: 0, numeroConta: 1, tipo: 1 }).forEach(printjson);

// 9. $gt — maior que
titulo("9. $gt — contas com saldo MAIOR que R$ 4.300");
db.contas.find({ saldo: { $gt: 4300 } }, { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }).forEach(printjson);

// 10. $gte — maior OU igual
titulo("10. $gte — contas com saldo MAIOR OU IGUAL a R$ 4.300");
db.contas.find({ saldo: { $gte: 4300 } }, { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }).forEach(printjson);

// 11. $lt — menor que
titulo("11. $lt — contas com saldo negativo (MENOR que 0)");
db.contas.find({ saldo: { $lt: 0 } }, { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }).forEach(printjson);

// 12. $lte — menor OU igual
titulo("12. $lte — contas com saldo MENOR OU IGUAL a R$ 1.000");
db.contas.find({ saldo: { $lte: 1000 } }, { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }).forEach(printjson);

// 9 + 11. $gt e $lt juntos — uma FAIXA de valores
titulo("9 + 11. $gt e $lt juntos — saldo entre R$ 1.000 e R$ 10.000 (exclusive)");
db.contas.find({ saldo: { $gt: 1000, $lt: 10000 } }, { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }).forEach(printjson);

// 13. $in — está na lista
titulo("13. $in — contas das agências 101 e 404");
db.contas.find({ numeroAgencia: { $in: [101, 404] } }, { _id: 0, numeroConta: 1, numeroAgencia: 1 }).forEach(printjson);

// 14. $nin — não está na lista
titulo('14. $nin — contas que não são poupança nem salário');
db.contas.find({ tipo: { $nin: ["poupanca", "salario"] } }, { _id: 0, numeroConta: 1, tipo: 1 }).forEach(printjson);

// 16. $and — TODAS as condições precisam ser verdadeiras
titulo("16. $and — contas correntes com saldo de pelo menos R$ 1.000");
db.contas.find(
  { $and: [{ tipo: "corrente" }, { saldo: { $gte: 1000 } }] },
  { _id: 0, numeroConta: 1, titular: 1, tipo: 1, saldo: 1 }
).forEach(printjson);

// 15. $or — pelo menos uma condição
titulo("15. $or — contas com saldo negativo OU acima de R$ 10.000");
db.contas.find(
  { $or: [{ saldo: { $lt: 0 } }, { saldo: { $gt: 10000 } }] },
  { _id: 0, numeroConta: 1, titular: 1, saldo: 1 }
).forEach(printjson);

// Consulta "entre as duas entidades": contas de um cliente, pelo cpf
titulo("Relacionamento — contas do cliente de cpf 11122233344");
const cliente = db.clientes.findOne({ cpf: "11122233344" });
print("Cliente: " + cliente.nome);
db.contas.find({ cpfTitular: cliente.cpf }, { _id: 0, numeroConta: 1, tipo: 1, saldo: 1 }).forEach(printjson);

// 5. updateOne — depósito de R$ 200 na conta 5 ($inc soma ao valor atual)
titulo("5. updateOne — depósito de R$ 200 na conta 5");
printjson(db.contas.updateOne({ numeroConta: 5 }, { $inc: { saldo: 200 } }));
printjson(db.contas.findOne({ numeroConta: 5 }, { _id: 0, numeroConta: 1, saldo: 1 }));

// 6. deleteOne — encerrar a conta 6
titulo("6. deleteOne — encerrar a conta 6");
printjson(db.contas.deleteOne({ numeroConta: 6 }));
print("Contas restantes: " + db.contas.countDocuments());

titulo("Fim — todos os 17 itens executados");
