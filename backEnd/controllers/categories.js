const Categorie = require("../models/Categorie")

module.exports.categories = async (req,resp) => {
    try {
        return resp.status(200).json({"message": "success categories"});
    } catch (error) {
        console.error(error)
        return resp.status(500).json({"message": "Erro interno do servidor"})
    };
};

module.exports.new = async (req, res) => {
    const {name} = req.body;

    try{
        if(!name){
            return res.status(422).json({"message": "Preencha o nome da categoria!"});
        }

        const existingCategorie = await Categorie.findCategoriesByName(name);
        if(existingCategorie.length >= 1) {
            return res.status(409).json({"message": "Categoria já cadastrada!"});
        };

        await Categorie.createCategories(name);
        return res.status(201).json({"message": "Categoria cadastrada com sucesso!"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({"message":"Erro ao criar a categoria."});
    }
}