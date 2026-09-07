import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // chave secreta para geração do token JWT

const auth = (req, res, next) => {
  //verifica se o token JWT está presente no cabeçalho da requisição. O token é enviado pelo cliente na requisição HTTP, no cabeçalho "Authorization".
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET); //verifica se o token é válido usando a chave secreta definida na variável de ambiente JWT_SECRET. Se o token for válido, ele é decodificado e armazenado na variável decoded.
    console.log(decoded);
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }

  //next() é chamado para passar o controle para a próxima função de middleware ou rota. Se o token for válido, a requisição continua normalmente e o usuário pode acessar as rotas privadas.
  next();
};

export default auth;
