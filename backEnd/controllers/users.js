const con = require("../database/db");
const bcrypt = require("bcrypt");
const salts = 10;
const User = require("../models/User");

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

module.exports.delete = async (req, res) => {
  const { id } = req.body;

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
