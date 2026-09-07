# 🔐 JWT Auth API

Uma API RESTful desenvolvida para gerenciamento de usuários, autenticação e autorização via **JSON Web Tokens (JWT)**.

---

## Sobre o Projeto

Este projeto consiste em uma estrutura segura para autenticação e controle de acesso em aplicações web e mobile, seguindo as melhores práticas de mercado para emissão, validação e gerenciamento de tokens JWT e armazenamento seguro de senhas.

### Principais Funcionalidades

- **Autenticação Segura**: Login e emissão de tokens Bearer JWT.
- **Registro de Usuários**: Cadastro de novos usuários com hash de senha seguro.
- **Controle de Acesso**: Proteção de rotas com base em funções/permissões (`Rotas privadas e publicas`).
- **Validação de Tokens**: Middleware para verificação e decodificação do JWT.

---

## Tecnologias Utilizadas

- **Linguagem / Runtime**: Javascript / Node.js
- **Framework**: Express
- **Autenticação**: JWT & Bcrypt
- **Banco de Dados**: MongoDB
- **ORM**: Prisma

---

## Como Executar o Projeto

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/lnfaria/jwt-auth-api.git](https://github.com/lnfaria/jwt-auth-api.git)
   cd jwt-auth-api
