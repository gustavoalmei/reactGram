const { body } = require('express-validator');

const userCreateValidation = ()=>{
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório.')
      .isLength({min: 3})
      .withMessage("O nome precisa ter no minímo 3 caracteres."),
    body('email')
      .isString()
      .withMessage('O nome é obrigatório.')
      .isEmail()
      .withMessage('O e-mail é obrigatório.'),
    body('password')
      .isString()
      .withMessage('A senha é obrigatório.')
      .isLength({min: 5})
      .withMessage("A senha precisa ter no minímo 5 caracteres."),
    body('confirmPassword')
      .isString()
      .withMessage('A confirmação da senha é obrigatório.')
      .custom((value, {req})=>{
          if(value != req.body.password){
              throw new Error('As senhas não são iguais.')
          }
          return true;
      })
  ]
}

const loginValidation = ()=>{
  return [
    body("email")
      .isString()
      .withMessage('o E-mail é obrigatório.')
      .isEmail()
      .withMessage('Insira um e-mail válido.'),
    body("password")
      .isString()
      .withMessage('A senha é obrigatório.')
  ]
}

const userUpdateValidation = ()=>{
  return[
    body("name")
      .optional()
      .isLength({min: 3})
      .withMessage('O nome precisa conter no minimo 3 caracteres.'),
    body("password")
      .optional()
      .isLength({min: 5})
      .withMessage('A senha precisa conter no minimo 5 caracteres.'),
  ]
}

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation
};