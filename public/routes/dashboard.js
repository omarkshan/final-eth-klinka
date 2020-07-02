const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/updatePatient", (req, res) => {
  const user_key = req.body.user_key;
  const email = req.body.email;
  const effort = req.body.effort;
  User.findOneAndUpdate(
    { user_key: user_key },
    { $set: { email: email, effort: effort } }
  );
});

module.exports = router;
