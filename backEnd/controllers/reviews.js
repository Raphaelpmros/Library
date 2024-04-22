const Review = require("../models/Review");

module.exports.reviews = async (req, res) => {
  const { id_books } = req.params;
  try {
    const viewReviews = await Review.allReviews(id_books);
    return res.status(200).json(viewReviews);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.new = async (req, res) => {
  const { comment, rating, id_user } = req.body;
  const { id_books } = req.params;

  if (!id_user) {
    return res.status(422).json({ message: "All fields must be completed!" });
  }

  if (!/^[1-9]\d*$/.test(id_books)) {
    res.status(400).json({
      mensagem: "The 'id' must be a valid number!",
    });
    return;
  }

  try {
    await Review.createReviews(comment, rating, id_user, id_books);
    return res.status(200).json({ message: "Review posted!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  if (!/^[1-9]\d*$/.test(id)) {
    res.status(400).json({
      mensagem: "The 'id' must be a valid number!",
    });
    return;
  }

  try {
    await Review.deleteReview(id);
    return res.status(200).json({ message: "Review deleted!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
