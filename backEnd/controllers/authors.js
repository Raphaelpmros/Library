const Author = require("../models/Author");

module.exports.authors = async (req, res) => {
    try {
        return res.status(200).json({ "message": "success" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Erro interno do servidor" });
    }
};

module.exports.new = async (req, res) => {
    const { full_name, nationality } = req.body;

    try {
        if (!full_name || !nationality) {
            return res.status(422).json({ "message": "Preencha os campos corretamente!" });
        }

        const existingAuthor = await Author.findAuthorByName(full_name)
        if (existingAuthor.length >= 1) {
            return res.status(409).json({ "message": "O autor já está cadastrado!" });
        }

        await Author.createAuthor(full_name, nationality);
        return res.status(201).json({ "message": "Autor cadastrado com sucesso!" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Erro interno do servidor" });
    }
};
