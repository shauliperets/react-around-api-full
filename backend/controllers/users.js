const User = require("../models/user");
const constants = require("../constants/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.getUsers = (request, response) => {
  User.find({})
    .then((users) => response.send({ data: users }))
    .catch((error) => {
      response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
    });
};

module.exports.getUser = (request, response) => {
  User.findById(request.params.userId)
    .orFail()
    .then((user) => response.send({ data: user }))
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

  User.create({ name, about, avatar, email, password })
    .then((user) => response.send({ data: user }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        response.status(constants.errorStatus.e400).send({ message: constants.errorMessage.e400 });
        console.log(error);
      } else {
        response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      }
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

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV, { expiresIn: "7d" });

      console.log("key =>", process.env.NODE_ENV);

      response.send({ token });
    })
    .catch((error) => {
      response.status(401).send({ message: error.message });
    });
};
