const Rent = require("../models/Rent");
const moment = require("moment")

module.exports.rents = async (req, res) => {
  try {
    const viewRents = await Rent.allRents();
    return res.status(200).json({ viewRents });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};


module.exports.new = async (req, res) => {
  const { id_books, id_user } = req.body;

  if (!id_books || !id_user) {
    return res.status(422).json({ message: "Preencha todos os campos!" });
  }

  if (!/^[0-9]+$/.test(id_books) || !/^[0-9]+$/.test(id_user)) {
    return res.status(422).json({
      message: "Os campos de id devem ser números inteiros e válidos!",
    });
  }

  const pickUpDate = moment().startOf("day").format('YYYY-MM-DD');

  const returnDate = moment(pickUpDate).add(7, 'days').format('YYYY-MM-DD');

  try {
    await Rent.createRents(id_books, id_user, pickUpDate, returnDate);
    return res.status(200).json({ message: "Aluguel realizado com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};



// module.exports.update = async (req, res) => {
//   const {pick_up_date, returns_date, id} = req.body;

//   if (!pick_up_date || !returns_date) {
//     return res.status(422).json({ message: "Preencha todos os campos!" });
//   }
// }