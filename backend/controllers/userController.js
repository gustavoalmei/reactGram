const user = require("../models/User.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const mongoose = require("mongoose");

const jwtSecrect = process.env.JWT_SECRET; // chave secreta para autenticar

// generate user tokn
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecrect, {
    expiresIn: "7d", // tempo para expirar o token
  });
};

// register user and sign in
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exist
  const user = await User.findOne({ email }); // irá buscar por um usuario através do e-mail

  if (user) {
    // se ja exister um usuario cadastrado com o e-mail
    res.status(422).json({
      errors: ["E-mail já cadastrado."],
    });
    return;
  }

  // Generate password hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt); // ir;a encriptar a senha

  // Create new user
  const createUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // if user was created successfully, return token
  if (!createUser) {
    // casp ocorra um erro no lado da aplicação, irá retornar o seguinte erro
    return res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
  }
  res.status(201).json({
    // caso não de nenhum erro, será retornado o token e o id do usuário com sucesso
    _id: createUser._id,
    token: generateToken(createUser._id),
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // check if users exists
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }

  // check if password matches
  if (!(await bcrypt.compare(password, user.password))) {
    // irá comparar a senha que está salva com a que foi digitada
    res.status(422).json({ errors: ["Senha inválida."] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage, // retorna a imagem de perfil caso tenha
    token: generateToken(user._id),
  });
};

// Get current logged in user
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

const update = async (req, res) => {
  const { name, bio, password } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;

  const user = await User.findById(
    new mongoose.Types.ObjectId(reqUser._id)
  ).select("-password");

  if (name) {
    user.name = name;
  }

  if (password) {
    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt); // ira encriptar a senha

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();
  res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      "-password"
    );
    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado."] });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ errors: ["Usuário não encontrado."] });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
