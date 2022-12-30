const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
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
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /(http|https):\/\/[\da-z.-]+\.[\/a-z]*/.test(v); // eslint-disable-line
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

module.exports = mongoose.model("user", userSchema);
