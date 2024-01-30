const validateUser = (req, res, next) => {
    const { firstname, lastname, email } = req.body;
    const errors = [];
    const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

    if (firstname == null) {
        errors.push({ field: "firstname", message: "firstname is required" });
    } else if (firstname.length >= 255) {
        errors.push({ field: "firstname", message: "firstname is too long" });
    } if (lastname == null) {
        errors.push({ field: "lastname", message: "lastname is required" });
    } else if (lastname.length >= 255) {
        errors.push({ field: "lastname", message: "lastname is too long" });
    } if (!emailRegex.test(email)) {
        errors.push({ field: "email", message: "Invalid email" });
    } else if (email.length >= 255) {
        errors.push({ field: "email", message: "email is too long" });
    } if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    } else {
        next();
    }
};

module.exports = validateUser;