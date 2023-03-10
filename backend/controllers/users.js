const User = require("../models/user");
const constants = require("../constants/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.getUser = (request, response) => {
  User.findById(request.user._id)
    .orFail()
    .then((user) => {
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

  bcrypt.genSalt(10, function (error, salt) {
    if (error) {
      response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      return;
    }
    bcrypt.hash(password, salt, function (error, hash) {
      if (error) {
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
    .then((user) => {
      return response.send({ data: user });
    })
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

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV, { expiresIn: "7d" });

      response.send({ data: token });
    })
    .catch((error) => {
      console.log("error", error);
      response.status(401).send({ message: error.message });
    });
};
