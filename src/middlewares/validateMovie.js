const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;
    const errors = [];

    if (title == null) {
        errors.push({ field: "title", message: "Title is required" });
    } else if (title.length >= 255) {
        errors.push({ field: "title", message: "Title is too long" });
    } if (director == null) {
        errors.push({ field: "director", message: "Director is required" });
    } if (year == null || year.length === 0) {
        console.log('year.length', year.length);
        errors.push({ field: "year", message: "Year is required" });
    } if (color == null) {
        errors.push({ field: "color", message: "color is required" });
    } if (duration == null) {
        errors.push({ field: "duration", message: "duration is required" });
    }

    if (errors.length) {
        res.status(422).json({ validationErrors: errors });
    }
    else {
        next();
    }
};

module.exports = validateMovie;