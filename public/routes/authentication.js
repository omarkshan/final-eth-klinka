const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");
const { uuid } = require("uuidv4");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => { 
  res.render("login", {title: "Klinka :: Login"})
});
// Register Page
router.get("/register", (req, res) => res.render("register", {title: "Klinka :: Register"}));
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
    if (!errors) {
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
          const alias = firstName.substring(1,2) + lastName.substring(1,2) + PID.substring(1,8)
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
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/auth/login');
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
      firstName,
      lastName,
      email,
      password,
      password2,
      dob,
      employedSince,
      gender,
      speciality,
    } = req.body;
    if (!errors) {
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
          const alias = firstName.substring(1,2) + lastName.substring(1,2) + PID.substring(1,8)
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
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error(err);

              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  req.flash(
                    'success_msg',
                    'You are now registered and can log in'
                  );
                  res.redirect('/auth/login');
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
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/auth/login');
});

module.exports = router;
