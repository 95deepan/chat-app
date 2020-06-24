const User = require("./models/user");
const Room = require("./models/room");
const Message = require("./models/message");

var messages = [];

module.exports.getUsers = (req, res) => {
  try {
    User.find({})
      .then((users) => {
        res.status(200).json({
          success: true,
          data: users,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json(failedRes(500, "Internal server error " + error));
  }
};

module.exports.createRoom = (req, res) => {
  try {
    const {} = req.body;
  } catch (error) {
    res.status(500).json(failedRes(500, "Internal server error " + error));
  }
};

module.exports.getRooms = (req, res) => {
  try {
    Room.find({})
      .then((rooms) => {
        res.status(200).json({
          success: true,
          data: rooms,
        });
      })
      .catch((err) => {
        res.json({
          success: false,
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json(failedRes(500, "Internal server error " + error));
  }
};

module.exports.sendMessage = (req, res) => {
  try {
    const { roomId, message, sender } = req.body;
    if (roomId && message && sender) {
      let newMessage = new Message({
        roomId,
        message,
        sender,
      });
      newMessage.save().then((saved) => {
        res.status(201).json({
          success: true,
          data: saved,
          message: "Message sent",
        });
      });
    } else {
      res.json({
        success: false,
        error: "roomId, message, sender are required",
      });
    }
  } catch (error) {
    res.status(500).json(failedRes(500, "Internal server error " + error));
  }
};

module.exports.getMessages = (req, res) => {
  try {
    // By Long polling
  } catch (error) {
    res.status(500).json(failedRes(500, "Internal server error " + error));
  }
};
