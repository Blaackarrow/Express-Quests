const database = require('../../database');

const postUser = (req, res) => {
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    database
        .query("INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)", [firstname, lastname, email, city, language, hashedPassword])
        .then(([result]) => {
            res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
}
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    if (req.user.id !== id) {
        res.sendStatus(403);
    }
    const { firstname, lastname, email, city, language, hashedPassword } = req.body;
    database
        .query("UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ?, hashedPassword = ? WHERE id = ?", [firstname, lastname, email, city, language, hashedPassword, id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

// ...

const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
    const { email } = req.body;

    database
        .query("select * from users where email = ?", [email])
        .then(([users]) => {
            if (users[0] != null) {
                req.user = users[0];

                next();
            } else {
                res.sendStatus(401);
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving data from database");
        });
};


module.exports = {
    postUser,
    updateUser,
    getUserByEmailWithPasswordAndPassToNext,
};