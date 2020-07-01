const express = require("express");
const { ensureAuthenticated } = require("../config/auth");
const router = express.Router();

var myCss = []

myCss.push({
    uri: '../css/index.css'
})
router.get('/', (req, res) => res.render('index', {
    styles: myCss,
    title: "Klinka :: Home"
}))


// Routes Paths
router.get("/404", (req, res) =>
  res.render("404", { title: "Klinka :: Error" })
);
router.get("/maintenance", (req, res) =>
  res.render("maintenance", { title: "Klinka :: Maintenance" })
);
router.get("/terms-and-conditions", (req, res) =>
  res.render("terms-and-conditions", {
    title: "Klinka :: Terms and Conditions",
  })
);
router.get("/privacy-policy", (req, res) =>
  res.render("privacy-policy", { title: "Klinka :: Privacy Policy" })
);
router.get("/documentation", (req, res) =>
  res.render("documentation", { title: "Klinka :: Documentation" })
);


router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", { 
    title: "Klinka :: Dashboard", user: req.user
  })
);

module.exports = router;
