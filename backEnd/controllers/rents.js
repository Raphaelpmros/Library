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

module.exports.update = async (req, res) => {
  const { id } = req.body;

  try {
    const rent = await Rent.updateRents(id);

    if (!rent || rent.error) {
      if (rent.error) {
        return res.status(400).json({ message: rent.error });
      } else {
        return res.status(404).json({ message: "Aluguel não encontrado." });
      }
    }

    const today = moment().startOf('day');
    const returnDate = moment(rent.returns_date, 'YYYY-MM-DD').startOf('day');

    if (returnDate.isSameOrBefore(today, 'day')) {
      return res.status(400).json({ message: "Não é possível renovar o aluguel, pois a data limite de devolução já passou." });
    }

    const newReturnDate = today.clone().add(7, 'days').format('YYYY-MM-DD');

    await Rent.updateRents(id, newReturnDate, true);

    return res.status(200).json({ message: "Aluguel renovado com sucesso!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};