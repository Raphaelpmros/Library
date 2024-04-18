const Categorie = require("../models/Categorie");

module.exports.categories = async (req, res) => {
  try {
    const viewCategories = await Categorie.allCategories();
    return res.status(200).json( {viewCategories} );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports.new = async (req, res) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(422).json({ message: "Category must have a name!" });
    }

    const existingCategorie = await Categorie.findCategoriesByName(name);
    if (existingCategorie.length >= 1) {
      return res.status(409).json({ message: "Category already exist!" });
    }

    await Categorie.createCategories(name);
    return res
      .status(201)
      .json({ message: "Category created!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Fail creating category." });
  }
};

module.exports.update = async (req, res) => {
  const { id, newName } = req.body;

  try {
    if (!id || !newName) {
      return res.status(400).json({ message: "Invalid parameter!" });
    }

    const result = await Categorie.updateCategorieName(id, newName);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Not found!" });
    }

    return res.status(200).json({ message: "Updated!" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Fail to update!" });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: "Try again!" });
    }

    const categoryDelete = await Categorie.deleteCategorie(id);
    if (categoryDelete.affectedRows === 0) {
      return res.status(404).json({ message: "Category not found!" });
    }

    return res
      .status(200)
      .json({ message: "Successifully deleted!", data: category });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong." });
  }
};
