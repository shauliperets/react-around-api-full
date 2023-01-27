const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");

const { login, createUser } = require("./controllers/users");

const auth = require("./middleware/auth");

const { PORT = 3200 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use("/signin", login);
app.use("/signup", createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);
app.use((request, response) => {
  response.status(constants.errorStatus.e404).send({ message: constants.errorMessage.e404 });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
