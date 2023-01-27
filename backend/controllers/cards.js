const constants = require("../constants/index");

const Card = require("../models/card");

module.exports.getCards = (request, response) => {
  Card.find({})
    .then((cards) => response.send({ data: cards }))
    .catch((error) => {
      response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      console.log(error);
    });
};

module.exports.createCard = (request, response) => {
  const { name, link } = request.body;
  const userId = request.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => {
      console.log("--- card result -->", card);
      console.log("--- card.owner result -->", card.owner);
      return response.send({ data: card });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        response.status(constants.errorStatus.e400).send({ message: constants.errorMessage.e400 });
      } else {
        response.status(constants.errorStatus.e500).send({ message: constants.errorMessage.e500 });
      }
    });
};

module.exports.deleteCard = (request, response) => {
  const { cardId, user } = request.params;

  Card.findByIdAndRemove({ _id: cardId })
    .orFail()
    .then((card) => {
      response.send({ data: card });
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

module.exports.likeCard = (request, response) => {
  Card.findByIdAndUpdate(
    request.params.cardId,
    { $addToSet: { likes: request.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((card) => response.send({ data: card }))
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

module.exports.dislikeCard = (request, response) => {
  Card.findByIdAndUpdate(
    request.params.cardId,
    { $pull: { likes: request.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((card) => response.send({ data: card }))
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
