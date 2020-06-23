const { Schema, model } = require("mongoose");

module.exports = model(
  "message",
  Schema({
    sender: { type: Schema.Types.ObjectId, ref: "user" },
    roomId: { type: Schema.Types.ObjectId, ref: "room" },
    message: { type: String },
  })
);
