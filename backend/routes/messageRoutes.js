const { addMessage, getMessages } = require( "../controllers/messageController.js");
const app = require( "express");

const router = app.Router();

router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
