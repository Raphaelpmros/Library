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

    const existingUser = await User.findUserByEmail(email);
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

module.exports.validatePassword = new LocalStrategy(function (
  email,
  password,
  done
) {
  User.login(email)
    .then((rows) => {
      if (rows.length === 0) {
        return done(null, false, { message: "Falha na autenticação" });
      }

      const user = rows[0];

      bcrypt
        .compare(password, user.password)
        .then((passwordMatch) => {
          if (passwordMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Falha na autenticação" });
          }
        })
        .catch((error) => done(error));
    })
    .catch((error) => done(error));
});

module.exports.login = async function (req, res, next) {
  passport.authenticate("login", async (err, user, info) => {
    console.log(user)
    try {
      if (err || !user) {
        const error = new Error("Ocorreu um erro!");
        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const dataUser = await User.login(user.email);
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, secreteKey, {
          expiresIn: 3600,
        });

        return res.json({ dataUser, token });
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
};

module.exports.validateToken = new JWTstrategy(
  {
    secretOrKey: secreteKey,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  },
  async (token, done) => {
    try {
      return done(null, token);
    } catch (error) {
      console.error("Erro na validação do token", error);
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
