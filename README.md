💰 Wallet Distributed System
Este projeto é uma simulação de uma carteira digital baseada em uma Arquitetura de Microserviços. O sistema permite o cadastro de usuários, login autenticado via JWT, realização de transferências e visualização de extrato em tempo real.

🏗️ Arquitetura do Sistema
O projeto é dividido em três partes principais que se comunicam de forma distribuída:

Frontend (React): Interface do usuário que consome a API através de um Gateway.

API Gateway (Porta 3000): Ponto central de entrada. Ele recebe as requisições do React e as redireciona para o microserviço correto.

Accounts Service (Porta 3001): Responsável pelo gerenciamento de usuários, cadastro e autenticação (Login).

Transaction Service (Porta 3002): Responsável por processar transferências e recuperar o histórico de transações do banco de dados.

🛠️ Tecnologias Utilizadas
Frontend: React.js, Axios, JWT-Decode, CSS3 (Flexbox/Responsive).

Backend: Node.js, Express.

Segurança: JSON Web Token (JWT) para autenticação stateless.

Banco de Dados: PostgreSQL / MySQL (armazenando usuários e transações).

🔐 Segurança e Autenticação
O sistema utiliza JWT (JSON Web Token) para garantir que as comunicações sejam seguras:

Ao fazer login, o Accounts Service gera um token assinado.

O Frontend armazena esse token no localStorage.

O sistema descriptografa o payload do token no cliente (via jwt-decode) para identificar o usuário logado e filtrar suas transações de forma privada.

🚀 Como Executar o Projeto
Pré-requisitos
Node.js instalado.

Banco de Dados configurado e rodando.

Passo 1: Configurar os Microserviços
Em cada pasta de serviço (Gateway, Accounts, Transactions), execute:

Bash

npm install
node index.js
Passo 2: Executar o Frontend
Na pasta do projeto React:

Bash

npm install
npm run dev
📊 Funcionalidades Implementadas
[x] Cadastro de novos usuários.

[x] Autenticação com geração de Token JWT.

[x] Painel de Saldo Total (calculado dinamicamente).

[x] Envio de transferências entre usuários.

[x] Extrato de transações filtrado por usuário logado.

[x] Interface responsiva e moderna.