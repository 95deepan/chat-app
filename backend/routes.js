const { Router } = require("express");
const Controller = require("./controllers");
const router = Router();

router.get("/get/rooms/:userId", Controller.getRooms);

router.post("/send/message", Controller.sendMessage);

router.get("/get/messages/:roomId", Controller.getMessages);

router.get("/get/users", Controller.getUsers);

router.post("/add/room", Controller.createRoom);

module.exports = router;
