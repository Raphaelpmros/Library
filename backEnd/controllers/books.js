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
    return res.status(422).json({ mensagem: "Campo é obrigatório!" });
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
      return res.status(409).json({ message: "LIvro já cadastrado!" });
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
    console.log(err)
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
