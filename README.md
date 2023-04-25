# RF - Requisitos Funcionais

- [x] O usuário deve poder criar uma nova transação;
- [ ] O usuário deve poder obter um resumo da sua conta;
- [x] O usuário deve poder listar todas as transações que já ocorreram;
- [x] O usuário deve poder visualizar uma transação única;


# RN - Regras de Negócios

- [x] A transação pode ser do tipo crédito que somará ao valor total ou do
      tipo débito, que subtrairá do total;
- [ ] Deve ser possível identificar o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações o qual ele criou;


# RNF - Requisitos Não Funcionais

- 


# Testes
// Unitários: unidade da sua aplicação (exemplo, testar uma função)
// Integração: comunicação entre duas ou mais unidades
// e2e: ponta a ponta: simulam um usuário operando na nossa aplicação

// front-end: abre a página de login, digite o texto no campo ID email, clique no botão...
// back-end: chamadas HTTP, WebSockets

// Pirâmide de testes: E2E (não dependem de nenhuma tecnologia, não dependem de arquitetura)
// 
// Jestjs 
// Vitest (nossa escolha)
