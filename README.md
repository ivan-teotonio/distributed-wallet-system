# 💰 Distributed Wallet System

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue)
![Architecture](https://img.shields.io/badge/Architecture-Microservices-orange)
![Auth](https://img.shields.io/badge/Auth-JWT-green)

Sistema de carteira digital de alta disponibilidade projetado para a cadeira de **Sistemas Distribuídos**. A aplicação utiliza uma arquitetura descentralizada com múltiplos serviços especializados e um ponto único de entrada via API Gateway.

---

## 🏗️ Arquitetura do Sistema

O projeto implementa o padrão de **API Gateway** para abstração de rede e **Database-per-Service** para isolamento de domínio.

### Fluxo de Comunicação:
1. **Client (React)** ➔ Requisição HTTP (Porta 3000)
2. **API Gateway** ➔ Proxy Reverso e Roteamento de Camada 7
3. **Microserviços** ➔ Processamento Independente (Portas 3001 e 3002)


---

## 🛠️ Stack Tecnológica

| Componente | Tecnologia | Responsabilidade |
|:--- |:--- |:--- |
| **Frontend** | React.js | Interface reativa e consumo de APIs |
| **Gateway** | Node.js / Express | Roteamento e Proxy Reverso |
| **Accounts** | Node.js / JWT | Gestão de Identidade e Auth Stateless |
| **Transactions** | Node.js / SQL | Lógica de negócio e persistência |

---

## 🔐 Segurança: Autenticação Stateless (JWT)

Diferente de sistemas monolíticos que usam sessões (stateful), este sistema utiliza **JSON Web Tokens**.
* **Escalabilidade**: Os microserviços não precisam consultar um banco de dados central para validar o usuário.
* **Descentralização**: O `Transaction Service` valida a assinatura do token de forma autônoma.
* **Payload**: O token carrega o `user_id` de forma segura no cabeçalho das requisições.

---

## 🚀 Como Executar

### 1. Clonar e Instalar
```bash
git clone [https://github.com/ivan-teotonio/distributed-wallet-system.git](https://github.com/ivan-teotonio/distributed-wallet-system.git)

# Gateway (Porta 3000)
cd api-gateway && npm install && node index.js

# Accounts Service (Porta 3001)
cd accounts-service && npm install && node index.js

# Transaction Service (Porta 3002)
cd transaction-service && npm install && node index.js

cd frontend-wallet && npm install && npm run dev

📊 Funcionalidades
[x] Gateway Pattern: Roteamento centralizado.

[x] Auth JWT: Login seguro com expiração de token.

[x] Isolamento: Serviços operam em processos distintos.

[x] UI Responsiva: Dashboard adaptável para Mobile/Desktop.