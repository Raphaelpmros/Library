const Book = require("../models/Book");

module.exports.books = async (req, res) => {
    try{
        const viewBooks = await Book.allBooks();
        return res.status(200).json({viewBooks});
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Erro interno do servidor"})
    }
}

