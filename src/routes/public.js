//criando o arquivo public.js para definir rotas públicas da API, como cadastro de usuários, login, etc. Essas rotas não exigem autenticação e podem ser acessadas por qualquer pessoa.

import express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();
const router = express.Router(); // express.Router() é usado para criar um novo roteador que pode ser usado para definir rotas separadas do aplicativo principal. Isso é útil para modularizar o código e organizar melhor as rotas.

//cadastro
//rota cadastro, que recebe os dados do usuário (nome, email e senha) e cria um novo registro no banco de dados. Antes de salvar a senha, ela é criptografada usando bcrypt para garantir a segurança dos dados do usuário.
router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt); //hash da senha

    const userDB = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword, //criptografar a senha antes de salvar no banco de dados
      },
    });
    res.status(201).json({ message: "Usuário cadastrado com sucesso", userDB });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário" });
  }
});

//login
//rota login, que recebe o email e a senha do usuário e verifica se eles correspondem a um registro existente no banco de dados. Se a autenticação for bem-sucedida, uma mensagem de sucesso é retornada. Caso contrário, uma mensagem de erro é enviada.
router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;
    //await prisma.user.findUnique() é usado para buscar um usuário no banco de dados com base no email fornecido. Se o usuário não for encontrado, uma resposta 404 é enviada. Caso contrário, a autenticação continua.
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    //await bcrypt.compare() é usado para comparar a senha fornecida com a senha criptografada armazenada no banco de dados.
    const isMatch = await bcrypt.compare(userInfo.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Senha incorreta" });
    }
    res.status(200).json({ message: "Login realizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

export default router;
