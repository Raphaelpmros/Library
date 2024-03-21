const Book = require("../models/Book");

module.exports.books = async (req, res) => {
  try {
    const viewBooks = await Book.allBooks();
    return res.status(200).json({ viewBooks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.new = async (req, res) => {
  const { full_name, description, quantity, image, id_authors, id_categories } =
    req.body;

  if (
    !full_name ||
    !description ||
    !quantity ||
    !id_authors ||
    !id_categories
  ) {
    return res.status(422).json({ message: "Campo é obrigatório!" });
  }

  if (
    !/^[0-9]+$/.test(id_authors) ||
    !/^[0-9]+$/.test(id_categories) ||
    !/^[0-9]+$/.test(quantity)
  ) {
    return res.status(422).json({
      message:
        "Os campos de id e quantidade devem ser números inteiros e válidos",
    });
  }

  try {
    const existingBook = await Book.findBooks(full_name);
    if (existingBook.length >= 1) {
      return res.status(409).json({ message: "Livro já cadastrado!" });
    }

    await Book.createBooks(
      full_name,
      description,
      quantity,
      image,
      id_authors,
      id_categories
    );
    return res.status(200).json({ message: "Livro cadastrado com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.updateBook = async function (req, res) {
  const {
    full_name,
    description,
    quantity,
    image,
    id_authors,
    id_categories,
    id,
  } = req.body;

  if (
    !full_name ||
    !description ||
    !quantity ||
    !id_authors ||
    !id_categories
  ) {
    return res.status(422).json({ message: "Campo é obrigatório!" });
  }

  if (
    !/^[0-9]+$/.test(id_authors) ||
    !/^[0-9]+$/.test(id_categories) ||
    !/^[0-9]+$/.test(quantity)
  ) {
    return res.status(422).json({
      message:
        "Os campos de id e quantidade devem ser números inteiros e válidos",
    });
  }

  try {
    const result = await Book.updateBooks(
      full_name,
      description,
      quantity,
      image,
      id_authors,
      id_categories,
      id
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    return res.status(200).json({ message: "Livro atualizado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "Tente novamente" });
  }

  try {
    const booksDelete = await Book.deleteBooks(id);
    if (booksDelete.affectedRows == 0) {
      return res.status(404).json({ message: "Este livro não existe." });
    }

    return res.status(200).json({ message: "Livro apagado com sucesso!" });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};
