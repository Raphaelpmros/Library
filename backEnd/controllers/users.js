const LocalStrategy = require("passport-local").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secreteKey = process.env.JWT_KEY;

module.exports.valid = function (user, done) {
  done(null, user);
};

module.exports.users = async (req, res) => {
  try {
    const viewUsers = await User.allUsers();
    return res.status(200).json({ viewUsers });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.new = async (req, res) => {
  const {
    full_name,
    email,
    cpf,
    full_address,
    additional_address_details,
    phone,
    password,
  } = req.body;

  let image;

  if (req.file && req.file.path) {
    image = req.file.path;
  } else {
    image = process.env.DEFAULT_BOOK_IMAGE;
  }

  try {
    if (!full_name || !email || !cpf || !full_address || !phone || !password) {
      return res
        .status(422)
        .json({ message: "Preencha todos os dados obrigatórios" });
    }

    const existingUser = await User.login(email);
    if (existingUser.length >= 1) {
      return res.status(409).json({ message: "E-mail já cadastrado" });
    }

    await User.createUser(
      full_name,
      image,
      email,
      cpf,
      full_address,
      additional_address_details,
      phone,
      password
    );

    return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    console.log(password);
    return res.status(500).json({ message: "Erro ao criar o usuário" });
  }
};

module.exports.update = async (req, res) => {
  const {
    id,
    full_name,
    image,
    full_address,
    additional_address_details,
    phone,
    password,
  } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Informações incorretas" });
    }

    const result = await User.updateUser(
      id,
      full_name,
      image,
      full_address,
      additional_address_details,
      phone,
      password
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário alterado com sucesso" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro ao editar o usuário" });
  }
};

module.exports.tokenValid = new JWTstrategy(
  {
    secretOrKey: secreteKey,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token);
    } catch (error) {
      console.error("Erro in validation token:", error);
      return done(error);
    }
  }
);
module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: "Tente novamente" });
    }

    const userDelete = await User.deleteUser(id);
    if (userDelete.affectedRows === 0) {
      return res.status(404).json({ message: "Este usuário não existe!" });
    }

    return res.status(200).json({ message: "Usuário excluido com sucesso!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao tentar excluir!" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login = await User.login(email);
    const crypt = await bcrypt.compare(password, login[0].password);
    if (!crypt) {
      return res.status(500).json({ message: "Senha errada" });
    }
    const dateUser = await User.oneUser(login[0].id);
    const body = { id: login[0].id, email: login[0].email };
    const token = jwt.sign({ user: body }, secreteKey, { expiresIn: 3600 });
    return res.json({ dateUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro ao tentar excluir!" });
  }
};
