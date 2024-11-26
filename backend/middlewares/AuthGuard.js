const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authGuart = async(req, res, next)=>{
  const authHeader = req.headers['authorization']; // verifica se possui a prop authorization
  const token = authHeader && authHeader.split(' ')[1]; // ira pegar o segundo item do token splitado. Ex: Baerer kljdoiu301230jkods023

  // Check if header has token
  if(!token) return res.status(422).json({errors: ["Acesso negado."]});

  // check if token is valid
  try {
    const verified = jwt.verify(token, jwtSecret); // verifica se o token é igual a palavra secreta
    req.user = await User.findById(verified.id).select('-password'); // retorna o usuário encontrado por ID, sem a senha.

    next();
  } catch (error) {
    res.status(401).json({erros:["Token inválido"]})
  }

}

module.exports = authGuart