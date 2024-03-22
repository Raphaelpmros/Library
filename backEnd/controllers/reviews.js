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
