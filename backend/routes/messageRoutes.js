const { addMessage, getMessages } = require( "../controllers/messageController.js");
const app = require( "express");

const router = app.Router();

router.post("/addmsg/", async (req, res, next) => {
  const data = await addMessage(req.body, next);
  res.json(data);
});
router.post("/getmsg/",  async (req, res, next) => {
  const data = await getMessages(req.body, next);
  res.json(data);
});

module.exports = router;
