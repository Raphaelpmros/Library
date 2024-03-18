const Author = require ("../models/Author")

const allAuthors = new Promise((resolve, reject) => {
    con.query("SELECT * FROM authors", function (err, result) {
        if(err) {
            reject(err);
        } else {
            resolve(result);
        };
    });
});

module.exports.authors = async (req, res) => {
    const authors =  await allAuthors;
    res.json({message: "success", data: authors})
};

module.exports.new = async (req, res) => {
    const {fullName, nationality} = req.body

    if (!fullName || !nationality){
        return res.status(422).json({"mensagem": "Preencha os campos corretamente!"});
    }

    try{
        const existingAuthor = await Author.findAuthorByName({fullName})
        if(existingAuthor) {
            return res.status(409).json({"mensagem": "O autor já está cadastrado!"});
        }

        await Author.createAuthor(fullName, nationality);
        return res.status(200).json({"message": "Autor cadastrado com sucesso!"});
        
    } catch {
        return res.status(500).json({"message": "Erro interno do servidor"})
    }    
};