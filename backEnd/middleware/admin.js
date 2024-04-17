const User = require("../models/User")

module.exports = async (req, res, next) => {
    const { id } = req.body;
    try {
        const user = await User.findUser(id); 
        if (!user || user.length === 0 || user[0].admin !== '1') { 
            return res.status(401).json({ message: "Área restrita para administradores" });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}
