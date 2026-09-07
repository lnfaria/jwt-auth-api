//iniciar servidor

import express from "express";
import publicRoutes from "./src/routes/public.js";
import privateRoutes from "./src/routes/private.js";
import auth from "./middlewares/auth.js";

const app = express();
app.use(express.json());

app.use("/", publicRoutes);
//adicionando o middleware de autenticação para proteger as rotas privadas. O middleware auth é chamado antes das rotas privadas, garantindo que apenas usuários autenticados possam acessá-las.
app.use("/", auth, privateRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
