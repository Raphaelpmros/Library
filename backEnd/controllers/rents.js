const Rent = require("../models/Rent");
const moment = require("moment");

module.exports.rents = async (req, res) => {
  try {
    const viewRents = await Rent.allRents();
    return res.status(200).json({ viewRents });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.findRents = async (req, res) => {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id)) {
    res
      .status(400)
      .json({ message: "Invalid Id!" });
    return;
  }

  try {
    const findRents = await Rent.findRents(id);
    return res.status(200).json( findRents );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.new = async (req, res) => {
  const { id_user, id_books } = req.body;
  // const {  } = req.params

  if (!id_books || !id_user) {
    return res.status(422).json({ message: "Fill all fields!" });
  }

  if (!/^[0-9]+$/.test(id_books) || !/^[0-9]+$/.test(id_user)) {
    return res.status(422).json({
      message: "Id must be valid!",
    });
  }

  const pickUpDate = moment().startOf("day").format("YYYY-MM-DD");

  const returnDate = moment(pickUpDate).add(7, "days").format("YYYY-MM-DD");

  try {
    await Rent.createRents(id_books, id_user, pickUpDate, returnDate);
    return res.status(200).json({ message: "Successifully rented!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const rent = await Rent.updateRents(id);

    if (!rent || rent.error) {
      if (rent.error) {
        return res.status(400).json({ message: rent.error });
      } else {
        return res.status(404).json({ message: "Rent not found!" });
      }
    }

    const today = moment().startOf("day");
    const returnDate = moment(rent.returns_date, "YYYY-MM-DD").startOf("day");

    if (returnDate.isSameOrBefore(today, "day")) {
      return res.status(400).json({
        message:
          "It is not possible to renew the rental as the return deadline has passed.",
      });
    }

    const newReturnDate = today.clone().add(7, "days").format("YYYY-MM-DD");

    await Rent.updateRents(id, newReturnDate, true);

    return res.status(200).json({ message: "Rent renewed with success!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const { id_books } = req.body;

  try {
    const rentsDelete = await Rent.deleteRents(id, id_books);

    if (rentsDelete.affectedRows === 0) {
      return res.status(404).json({ message: "Rent not found." });
    }

    res.status(200).json({ message: "Successfully returned rent!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
