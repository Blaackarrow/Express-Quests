const database = require("../../database");


const getUsers = (req, res) => {
    let sql = "select * from users";
    const sqlValues = [];

    if (req.query.language != null) {
        sql += " where language = ?";
        sqlValues.push(req.query.language);
        if (req.query.city != null) {
            sql += " and city = ?";
            sqlValues.push(req.query.city);
        }
    } else if (req.query.city != null) {
        sql += " where city = ?";
        sqlValues.push(req.query.city);
    }

    database
        .query(sql, sqlValues)
        .then(([users]) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error retrieving users from database");
        });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    database
        .query("select * from users where id = ?", [id])
        .then(([users]) => {
            if (users[0] != null) {
                res.json(users[0]);
            } else {
                res.sendStatus(404);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
    database
        .query("INSERT INTO users (firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)", [firstname, lastname, email, city, language])
        .then(([result]) => {
            res.status(201).send({ id: result.insertId });
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
    database
        .query(
            "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
            [firstname, lastname, email, city, language, id]
        )
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    if (req.user.id !== id) {
        res.sendStatus(403);
    }
    database
        .query("DELETE FROM users WHERE id = ?", [id])
        .then(([result]) => {
            if (result.affectedRows === 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
};