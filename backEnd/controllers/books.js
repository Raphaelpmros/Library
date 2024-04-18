const Book = require("../models/Book");

module.exports.books = async (req, res) => {
  try {
    const viewBooks = await Book.allBooks();
    return res.status(200).json({ viewBooks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.findBooks = async (req, res) => {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id)) {
    res
      .status(400)
      .json({ message: "Invalid Id!" });
    return;
  }

  try {
    const findBooks = await Book.findBooks(id);
    return res.status(200).json( findBooks );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.new = async (req, res) => {
  const { full_name, description, quantity, id_authors, id_categories } = req.body;
    console.log(req.body)
    
    let image;
    
    if (
      !full_name ||
      !description ||
      !quantity ||
      !id_authors ||
      !id_categories
    ) {
      return res.status(422).json({ message: "Complete all fields" });
    }
    
    if (req.file && req.file.path) {
      image = req.file.path;
    } else {
      image = process.env.DEFAULT_BOOK_IMAGE;
    }
    
    if (
      !/^[0-9]+$/.test(id_authors) ||
      !/^[0-9]+$/.test(id_categories) ||
      !/^[0-9]+$/.test(quantity)
    ) {
      return res.status(422).json({
        message: "The id field and quantity must be valid numbers",
      });
    }
    
    try {
      const existingBook = await Book.findBooks(full_name);
      if (existingBook.length >= 1) {
        return res.status(409).json({ message: "Book already exist!" });
      }
      
    await Book.createBooks(
      full_name,
      description,
      quantity,
      image,
      id_authors,
      id_categories
    );
    return res.status(200).json({ message: "Success creating book!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
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
    return res.status(422).json({ message: "Complete all fields!" });
  }

  if (
    !/^[0-9]+$/.test(id_authors) ||
    !/^[0-9]+$/.test(id_categories) ||
    !/^[0-9]+$/.test(quantity)
  ) {
    return res.status(422).json({
      message: "The id field and quantity must be valid numbers",
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
      return res.status(404).json({ message: "Can't find this book" });
    }

    return res.status(200).json({ message: "Update succeded!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "Try again" });
  }

  try {
    const booksDelete = await Book.deleteBooks(id);
    if (booksDelete.affectedRows == 0) {
      return res.status(404).json({ message: "Can't find this book." });
    }

    return res.status(200).json({ message: "Book deleted!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
