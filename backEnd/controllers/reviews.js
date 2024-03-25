const Review = require("../models/Review");

module.exports.reviews = async (req, res) => {
  const { id_books } = req.params;
  try {
    const viewReviews = await Review.allReviews(id_books);
    return res.status(200).json({ viewReviews });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports.new = async (req, res) => {
  const { comment, rating, id_user } = req.body;
  const { id_books} = req.params

  if (!id_user) {
    return res.status(422).json({ message: "O campo deve ser preenchido" });
  }

  if (!/^[1-9]\d*$/.test(id_books)) {
    console.log(id_books);
    res.status(400).json({
      mensagem: "O 'id' deve ser um número válido!",
    });
    return;
  }

  try {
    await Review.createReviews(comment, rating, id_user, id_books);
    return res.status(200).json({ message: "Review inserido com sucesso!" });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
