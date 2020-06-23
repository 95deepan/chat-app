const { Schema, model } = require("mongoose");

module.exports = model(
  "room",
  Schema({
    userOne: { type: Schema.Types.ObjectId, ref: "user" },
    userTwo: { type: Schema.Types.ObjectId, ref: "user" },
  })
);
