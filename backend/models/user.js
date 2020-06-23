const { Schema, model } = require("mongoose");

module.exports = model(
  "user",
  Schema({
    userOne: { type: String },
  })
);
