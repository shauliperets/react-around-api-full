const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
    default: "Jacques Cousteau",
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: {
      validator(v) {
        const regex = /^[A-Za-z1-9]+@[A-Za-z1-9]+.[A-Za-z1-9]+$/;
        return regex.test(v);
      },
    },
  },
  password: {
    type: String,
    minlength: 2,
    //maxlength: 30,
    //required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    //required: true,
  },
  avatar: {
    type: String,
    required: true,
    default: "https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return /(http|https):\/\/[\da-z.-]+\.[\/a-z]*/.test(v); // eslint-disable-line
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).then((user) => {
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }

    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
