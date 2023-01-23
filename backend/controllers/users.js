const User = require("../models/user");
const constants = require("../constants/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

//delete it
module.exports.getUsers = (request, response) => {
  User.find({})
    .then((users) => response.send({ data: users }))
    .catch((error) => {
      response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
    });
};

module.exports.getUser = (request, response) => {
  console.log("--- reuest user -- >", request.user);

  User.findById(request.params.userId)
    .orFail()
    .then((user) => {
      console.log(user);
      response.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        response.status(constants.errorStatus.e400).send({ message: constants.errorMessage.e400ID });
      } else if (error.name === "DocumentNotFoundError") {
        response.status(constants.errorStatus.e404).send({ message: constants.errorMessage.e404 });
      } else {
        response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      }
    });
};

module.exports.createUser = (request, response) => {
  const { name, about, avatar, email, password } = request.body;

  /*bcrypt.hash(password, process.env.JWT_SECRET).then((hash) => {
    console.log("hase pass => ", hash);
  });*/

  bcrypt.genSalt(10, function (error, salt) {
    if (error) {
      console.log("Salt error", error);
      response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      return;
    }
    bcrypt.hash(password, salt, function (error, hash) {
      if (error) {
        console.log("Hash error", error);
        response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
        return;
      }
      User.create({ name, about, avatar, email, password: hash })
        .then((user) => response.send({ data: user }))
        .catch((error) => {
          console.log(error);
          if (error.name === "ValidationError") {
            response.status(constants.errorStatus.e400).send({ message: constants.errorMessage.e400 });
          } else if (error.message.includes("E11000 duplicate key error collection")) {
            console.log("User already exists");
            response.status(constants.errorStatus.e400).send({ message: "User name already exists" });
          } else {
            console.log("error name", error.name);
            console.log("--------------------------");
            console.log("error message", error.message);
            console.log("--------------------------");
            response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
          }
        });
    });
  });
};

module.exports.updateProfile = (request, response) => {
  const { name, about } = request.body;

  User.findByIdAndUpdate(
    request.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => response.send({ data: user }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        response.status(constants.errorStatus.e400).send({ message: constants.responses.e400 });
        console.log(error);
      } else if (error.name === "DocumentNotFoundError") {
        response.status(constants.errorStatus.e404).send({ message: constants.errorMessage.e404 });
      } else {
        response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      }
    });
};

module.exports.updateAvatar = (request, response) => {
  const { avatar } = request.body;

  User.findByIdAndUpdate(
    request.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => response.send({ data: user }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        response.status(constants.errorStatus.e400).send({ message: constants.errorMessage.e400 });
        console.log(error);
      } else if (error.name === "DocumentNotFoundError") {
        response.status(constants.errorStatus.e404).send({ message: constants.errorMessage.e404 });
      } else {
        response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      }
    });
};

module.exports.login = (request, response) => {
  const { email, password } = request.body;

  console.log("login ----->", password, email);

  return User.findUserByCredentials(email, password)
    .then((user) => {
      console.log("login user response => ", user);
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV, { expiresIn: "7d" });

      //console.log("key =>", process.env.NODE_ENV);

      response.send({ data: token });
    })
    .catch((error) => {
      console.log("error", error);
      response.status(401).send({ message: error.message });
    });
};
