const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;
const User = require("../models/User");
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
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.findUser = async (req, res) => {
  const {id} = req.params
  try {
    const findUser = await User.findUser(id);
    return res.status(200).json(findUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
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
    image = process.env.DEFAULT_USER_IMAGE;
  }

  try {
    if (!full_name || !email || !cpf || !full_address || !phone || !password) {
      return res
        .status(422)
        .json({ message: "All the filds must be complete" });
    }

    const existingUser = await User.login(email);
    if (existingUser.length >= 1) {
      return res.status(409).json({ message: "E-mail already exists" });
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

    return res.status(201).json({ message: "User created!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Fail to create user!" });
  }
};

module.exports.update = async (req, res) => {
  const {
    full_name,
    full_address,
    additional_address_details,
    phone,
    password,
  } = req.body;
  const{id} = req.params

  if (req.file && req.file.path) {
    image = req.file.path;
  } else {
    image = process.env.DEFAULT_USER_IMAGE;
  }

  try {
    if (!id) {
      return res.status(400).json({ message: "Incorrect info!" });
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
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User successifully updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error updating user" });
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
      return res.status(404).json({ message: "Error, try again" });
    }

    const userDelete = await User.deleteUser(id);
    if (userDelete.affectedRows === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error deleting user!" });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login = await User.login(email);
    const crypt = await bcrypt.compare(password, login[0].password);
    if (!crypt) {
      return res.status(500).json({ message: "Wrong user or password" });
    }
    const dateUser = await User.findUser(login[0].id);
    const body = { id: login[0].id, email: login[0].email };
    const token = jwt.sign({ user: body }, secreteKey, { expiresIn: 3600 });
    return res.json({ dateUser, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Wrong user or password" });
  }
};
