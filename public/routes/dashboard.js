const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/compose", (req, res) => {
  console.log("Creating message");
  const { sender, reciever, subject, type, content } = req.body;

  const newMessage = new Message({
    sender: sender,
    reciever: reciever,
    subject: subject,
    type: type,
    content: content,
    isRead: false,
  });

  newMessage.save().then((message) => {
    console.log("Message Saved");
  }).catch((err) => console.log(err));

  req.flash(
    "sent_msg",
    'Your message is sent..'
  );
  res.redirect('/dashboard')
});

module.exports = router;
