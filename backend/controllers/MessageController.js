const Messages = require( "../models/messageModel.js");

const getMessages = (body, next) => {
  try {
    const { from, to } = body;

    const messages = Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    return projectedMessages;
  } catch (ex) {
    next(ex);
  }
};

const addMessage = (body, next) => {
  try {
    const { from, to, message } = body;
    const data = Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return { msg: "Message added successfully." };
    else throw new Error("Failed to add message in database");
  } catch (ex) {
    next(ex);
  }
};

module.exports = {
    addMessage,
    getMessages
}
