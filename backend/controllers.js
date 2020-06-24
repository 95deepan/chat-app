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
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports.createRoom = (req, res) => {
  try {
    const { userOne, userTwo } = req.body;
    let newRoom = new Room({
      userOne,
      userTwo,
    });
    newRoom.save().then((saved) => {
      res.status(200).json({
        success: true,
        data: saved.populate(["userOne", "userTwo"]),
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports.getRooms = (req, res) => {
  try {
    const { userId } = req.params;
    Room.find({ $or: [{ userOne: userId }, { userTwo: userId }] })
      .populate(["userOne", "userTwo"])
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
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
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
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};

module.exports.getMessages = (req, res) => {
  try {
    const { roomId } = req.params;
    Message.find({ roomId })
      .then((msgs) => {
        res.status(200).json({
          success: true,
          data: msgs,
          message: "Messages fetched",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err,
        });
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    });
  }
};
