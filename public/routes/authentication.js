const express = require("express");
require("dotenv").config();
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");
const { uuid } = require("uuidv4");

const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.MAIL_PASS,
  },
});

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
  res.render("login", { title: "Klinka :: Login" });
});
// Register Page
router.get("/register", (req, res) =>
  res.render("register", { title: "Klinka :: Register" })
);
// Patient Registration Page
router.get("/patient-register", forwardAuthenticated, (req, res) => {
  const key = uuid();
  const PID = uuid();
  res.render("patient-register", {
    key: key,
    PID: PID,
    title: "Klinka :: Patient Registration",
  });
});
// Physician Registration Page
router.get("/physician-register", forwardAuthenticated, (req, res) => {
  const key = uuid();
  const PID = uuid();
  res.render("physician-register", {
    key: key,
    PID: PID,
    title: "Klinka :: Physician Registration",
  });
});

// Patient Registration Handler
router.post(
  "/patient",
  [
    check("user_key").isUUID().withMessage("Error can not read User Key"),
    check("PID").isUUID().withMessage("Error can not read PID"),
    check("firstName")
      .isLength({ min: 3, max: 35 })
      .withMessage("First Name should be valid!"),
    check("lastName")
      .isLength({ min: 3, max: 35 })
      .withMessage("Lirst Name should be valid!"),
    check("email")
      .isLength({ min: 6, max: 254 })
      .isEmail()
      .withMessage("Please enter a valid Email!"),
    check("password")
      .isAlphanumeric()
      .isLength({ min: 8, max: 254 })
      .withMessage(
        "Password should be alphanumeric and is at least 8 characters!"
      ),
    check("password2", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
    check("dob").isDate().notEmpty().withMessage("Please select your DOB!"),
    check("gender")
      .isString()
      .notEmpty()
      .withMessage("Please select your gender!"),
    check("effort")
      .isString()
      .notEmpty()
      .withMessage("Please select your average daily effort"),
  ],
  (req, res) => {
    var errors = validationResult(req).errors;
    const {
      user_key,
      PID,
      firstName,
      lastName,
      email,
      password,
      password2,
      dob,
      gender,
      effort,
    } = req.body;
    if (errors.length > 1) {
      res.render("patient-register", {
        title: "Klinka :: Patient Registration",
        key: uuid(),
        PID: uuid(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        password2: password2,
        dob: dob,
        errors: errors,
      });
    } else {
      // If Validation Passed
      User.findOne({ email: email }).then((user) => {
        if (user) {
          // Patient Exists
          errors.push({ msg: "Patient already registered" });
          res.render("patient-register", {
            title: "Klinka :: Patient Registration",
            key: uuid(),
            PID: uuid(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2,
            dob: dob,
            errors: errors,
          });
        } else {
          const alias =
            firstName.substring(1, 2) +
            lastName.substring(1, 2) +
            PID.substring(1, 8);
          const newUser = new User({
            user_key,
            PID,
            alias,
            email,
            password,
            dob,
            gender,
            speciality: "N/A",
            effort,
            isPhysician: false,
          });

          // Hashing Password
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error(err);

              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  var emailBody = `<img src="cid:logo"><br><h3>Registration is Successful</h3><p>Your request to create a new <strong>Patient</strong> account was completed successfully.<br>You can now log in from <a href="klinka.herokuapp.com/auth/login">Klinka Login</a> to use the platform</p>
                  <h5>Account Credentials</h5>
                  <p><strong>User Key:</strong> ${newUser.user_key} <br><strong>PID:</strong> ${newUser.PID} <br><hr><br><strong>DO NOT SHARE THE USER KEY WITH ANYONE INSIDE OR OUTSIDE THE NETWORK!</strong></p><br><hr><p><strong>Klinka&copy;</strong>&nbsp;All Copyrights reserved.`;
                  var mailOptions = {
                    from: process.env.SENDER_MAIL,
                    to: `${newUser.email}`,
                    subject: "Klinka Patient Registration",
                    attachments: [
                      {
                        filename: "Klinka logo.png",
                        path: "./public/images/Klinka logo.png",
                        cid: "logo",
                      },
                    ],
                    html: emailBody,
                  };

                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) console.log(error);
                    else console.log(`Email sent: ${info.response}`);
                  });

                  req.flash(
                    "success_msg",
                    "Please check your email inbox, You are now registered and can log in"
                  );
                  res.redirect("/auth/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  }
);

// Physician Registration Handler
router.post(
  "/physician",
  [
    check("user_key").isUUID().withMessage("Error can not read User Key"),
    check("PID").isUUID().withMessage("Error can not read PID"),
    check("firstName")
      .isLength({ min: 3, max: 35 })
      .withMessage("First Name should be valid!"),
    check("lastName")
      .isLength({ min: 3, max: 35 })
      .withMessage("Lirst Name should be valid!"),
    check("email")
      .isLength({ min: 6, max: 254 })
      .isEmail()
      .withMessage("Please enter a valid Email!"),
    check("password")
      .isAlphanumeric()
      .isLength({ min: 8, max: 254 })
      .withMessage(
        "Password should be alphanumeric and is at least 8 characters!"
      ),
    check("password2", "Passwords do not match").custom(
      (value, { req }) => value === req.body.password
    ),
    check("dob").isDate().notEmpty().withMessage("Please select your DOB!"),
    check("employedSince")
      .isDate()
      .notEmpty()
      .withMessage("Please select your Employed Since Field!"),
    check("gender")
      .isString()
      .notEmpty()
      .withMessage("Please select your gender!"),
    check("speciality")
      .isString()
      .notEmpty()
      .withMessage("Please select your speciality"),
  ],
  (req, res) => {
    var errors = validationResult(req).errors;
    const {
      user_key,
      PID,
      email,
      firstName,
      lastName,
      password,
      password2,
      dob,
      employedSince,
      gender,
      speciality,
    } = req.body;
    if (errors.length > 1) {
      console.log("Errors Found");
      res.render("physician-register", {
        title: "Klinka :: Physician Registration",
        key: uuid(),
        PID: uuid(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        password2: password2,
        dob: dob,
        employedSince: employedSince,
        errors: errors,
      });
    } else {
      // If Validation Passed
      console.log("Searching for existing Physician");
      User.findOne({ email: email }).then((user) => {
        if (user) {
          // Physician Exists
          errors.push({ msg: "Physician already registered" });
          res.render("physician-register", {
            title: "Klinka :: Physician Registration",
            key: uuid(),
            PID: uuid(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            password2: password2,
            dob: dob,
            employedSince: employedSince,
            errors: errors,
          });
        } else {
          const alias =
            firstName.substring(1, 2) +
            lastName.substring(1, 2) +
            PID.substring(1, 8);
          const newUser = new User({
            user_key,
            PID,
            alias,
            email,
            password,
            dob,
            gender,
            speciality,
            effort: "N/A",
            isPhysician: true,
            employedSince,
          });

          // Hashing Password
          console.log("Checking Password");
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error(err);

              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  console.log("Physician Registered");
                  var emailBody = `<img src="cid:logo"><br><h3>Registration is Successful</h3><p>Your request to create a new <strong>Patient</strong> account was completed successfully.<br>You can now log in from <a href="klinka.herokuapp.com/auth/login">Klinka Login</a> to use the platform</p>
                  <h5>Account Credentials</h5>
                  <p><strong>User Key:</strong> ${newUser.user_key} <br><strong>PID:</strong> ${newUser.PID} <br><hr><br><strong>DO NOT SHARE THE USER KEY WITH ANYONE INSIDE OR OUTSIDE THE NETWORK!</strong></p><br><hr><p><strong>Klinka&copy;</strong>&nbsp;All Copyrights reserved.`;
                  var mailOptions = {
                    from: process.env.SENDER_MAIL,
                    to: `${newUser.email}`,
                    subject: "Klinka Patient Registration",
                    attachments: [
                      {
                        filename: "Klinka logo.png",
                        path: "./public/images/Klinka logo.png",
                        cid: "logo",
                      },
                    ],
                    html: emailBody,
                  };

                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) console.log(error);
                    else console.log(`Email sent: ${info.response}`);
                  });
                  req.flash(
                    "success_msg",
                    "Please check your email inbox, You are now registered and can log in"
                  );
                  res.redirect("/auth/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      });
    }
  }
);

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })(req, res, next);
});

// Verify Account
router.post("/verify", (req, res, next) => {
  User.findOneAndUpdate(
    {
      PID: req.body.PID,
    },
    { isVerified: true }
  ).then(function () {
    console.log('Account is now verified');
  });
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/auth/login");
});

module.exports = router;
