const Categorie = require("../models/Categorie");

module.exports.categories = async (req, res) => {
  try {
    const viewCategories = await Categorie.allCategories();
    return res.status(200).json({ viewCategories });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.new = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(422).json({ message: "Preencha o nome da categoria!" });
    }

    const existingCategorie = await Categorie.findCategoriesByName(name);
    if (existingCategorie.length >= 1) {
      return res.status(409).json({ message: "Categoria já cadastrada!" });
    }

    await Categorie.createCategories(name);
    return res
      .status(201)
      .json({ message: "Categoria cadastrada com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro ao criar a categoria." });
  }
};

module.exports.update = async (req, res) => {
  const { id, newName } = req.body;

  try {
    if (!id || !newName) {
      return res.status(400).json({ message: "Parâmetros inválidos!" });
    }

    const result = await Categorie.updateCategorieName(id, newName);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Categoria não encontrada!" });
    }

    return res.status(200).json({ message: "Nome alterado com sucesso!" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Erro ao tentar mudar o nome, tente novamente!" });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: "Tente novamente" });
    }

    const categoryDelete = await Categorie.deleteCategorie(id);
    if (categoryDelete.affectedRows === 0) {
      return res.status(404).json({ message: "Esta categoria não existe!" });
    }

    return res
      .status(200)
      .json({ message: "Apagado com Sucesso!", data: category });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Erro ao tentar deletar a categoria." });
  }
};
