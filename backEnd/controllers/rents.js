const Rent = require("../models/Rent")

module.exports.rents = async (req, res) => {
    try {
        const viewRents = await Rent.allRents();
        return res.status(200).json({viewRents})
    } catch (err) {
        return res.status(500).json({message: "Erro interno do servidor!"})
    }
}