const Author = require("../models/Author");

module.exports.authors = async (req, res) => {
  try {
    const viewAuthors = await Author.allAuthors();
    return res.status(200).json( viewAuthors );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.new = async (req, res) => {
  const { full_name, nationality } = req.body;

  try {
    if (!full_name || !nationality) {
      return res
        .status(422)
        .json({ message: "Preencha os campos corretamente!" });
    }

    const existingAuthor = await Author.findAuthorByName(full_name);
    if (existingAuthor.length >= 1) {
      return res.status(409).json({ message: "O autor já está cadastrado!" });
    }

    await Author.createAuthor(full_name, nationality);
    return res.status(201).json({ message: "Autor cadastrado com sucesso!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.update = async (req, res) => {
  const { id, newName, newNationality } = req.body;
  try {
    if (!id || (!newName && !newNationality)) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    const result = await Author.updateAuthor(id, newName, newNationality);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    return res.status(200).json({ message: "Autor alterado com sucesso" });
  } catch {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: "Tente novamente" });
    }

    const authorDelete = await Author.deleteAuthor(id);
    if (authorDelete.affectedRows === 0) {
      return res.status(404).json({ message: "Este autor não existe." });
    }

    return res.status(200).json({ message: "Apagado com sucesso!" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
