//criando o arquivo public.js para definir rotas públicas da API, como cadastro de usuários, login, etc. Essas rotas não exigem autenticação e podem ser acessadas por qualquer pessoa.

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();
const router = express.Router(); // express.Router() é usado para criar um novo roteador que pode ser usado para definir rotas separadas do aplicativo principal. Isso é útil para modularizar o código e organizar melhor as rotas.

const jwtSecret = process.env.JWT_SECRET; // chave secreta para geração do token JWT

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
//rota login, que recebe o email e a senha do usuário e verifica se eles correspondem a um registro existente no banco de dados.
router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;
    //await prisma.user.findUnique() é usado para buscar um usuário no banco de dados com base no email fornecido.
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    //verifica se o usuário existe no banco de dados.
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    //await bcrypt.compare() é usado para comparar a senha fornecida com a senha criptografada armazenada no banco de dados.
    const isMatch = await bcrypt.compare(userInfo.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // gerar o token JWT
    const token = jwt.sign({ id: user.id }, jwtSecret, {
      expiresIn: "1h", // expira em 1 hora
    });

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

export default router;
