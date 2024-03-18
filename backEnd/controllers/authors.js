const author = require ("../models/Authors")

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
