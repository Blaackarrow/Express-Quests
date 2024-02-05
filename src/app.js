const express = require("express");

const app = express();
app.use(express.json());
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const movieControllers = require("./controllers/movieControllers");
const userControllers = require("./controllers/userControllers");
const userHandlers = require("./controllers/userHandlers");
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");

//Public ROUTES:
app.get("/api/movies", movieControllers.getMovies);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", userControllers.getUsers);
app.get("/api/users/:id", userControllers.getUserById);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.post(
    "/api/login",
    userHandlers.getUserByEmailWithPasswordAndPassToNext,
    verifyPassword
);
app.use(verifyToken);

//Private ROUTES:


// app.post("/api/movies", movieControllers.postMovie);
// app.post("/api/users", validateUser, userControllers.postUser);
app.post("/api/movies", movieControllers.postMovie);



app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);
// app.put("/api/users/:id", validateUser, userControllers.updateUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);

app.delete("/api/movies/:id", movieControllers.deleteMovie);
app.delete("/api/users/:id", userControllers.deleteUser);

module.exports = app;
