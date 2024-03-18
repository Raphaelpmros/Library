const con = require ("../database/db");

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

module.exports.createAuthor = async (req, res) => {
    
}