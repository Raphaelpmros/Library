const Author = require("../models/Author");

module.exports.authors = async (req, res) => {
  try {
    const viewAuthors = await Author.allAuthors();
    return res.status(200).json( {viewAuthors} );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error!" });
  }
};

module.exports.findAuthor = async (req, res) => {
  const {id} = req.params
  try {
    const findAuthor = await User.findAuthor(id);
    return res.status(200).json(findAuthor);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server Error!" });
  }
};

module.exports.new = async (req, res) => {
  const { full_name, nationality } = req.body;

  try {
    if (!full_name || !nationality) {
      return res
        .status(422)
        .json({ message: "Fill all the information!" });
    }

    const existingAuthor = await Author.findAuthor(id);
    if (existingAuthor.length >= 1) {
      return res.status(409).json({ message: "Author already exist!" });
    }

    await Author.createAuthor(full_name, nationality);
    return res.status(201).json({ message: "Author created!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server Error!" });
  }
};

module.exports.update = async (req, res) => {
  const { id, newName, newNationality } = req.body;
  try {
    if (!id || (!newName && !newNationality)) {
      return res.status(400).json({ message: "Invalid fields" });
    }

    const result = await Author.updateAuthor(id, newName, newNationality);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json({ message: "Author updated" });
  } catch {
    return res.status(500).json({ message: "Internal server Error!" });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(404).json({ message: "Try again" });
    }

    const authorDelete = await Author.deleteAuthor(id);
    if (authorDelete.affectedRows === 0) {
      return res.status(404).json({ message: "Author not found." });
    }

    return res.status(200).json({ message: "Deleted!" });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal server Error!" });
  }
};
