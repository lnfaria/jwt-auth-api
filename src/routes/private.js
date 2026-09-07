import express from "express";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/listar-usuarios", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } }); //user.findMany() é usado para buscar todos os usuários no banco de dados.
    res.status(200).json({ message: "Usuários listados com sucesso", users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
});

export default router;
