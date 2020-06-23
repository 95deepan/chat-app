const { Router } = require("express");
const Controller = require("./controllers");
const router = Router();

router.get("/get/rooms", Controller.getRooms);

router.post("/send/message", Controller.sendMessage);

router.get("/get/messages/:room", Controller.getMessages);

router.get("/get/users", Controller.getUsers);

module.exports = router;
