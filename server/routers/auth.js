import express from "express";
// import models from "../models";
const { User } = require("../models");

const router = express.Router();

router.post("/signup", async function (req, res) {
  console.log(req.body);
  const { email, name, tutor, subject, address, password } = req.body;
  if (!email || !name || (tutor && !subject) || !address || !password) {
    res.status(400).send("Invalid details!");
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    // req.session.email = email;
    const created = await User.create({
      email,
      name,
      tutor,
      subject,
      address,
      password,
    });
    // console.log("signed up");
    req.session.user = JSON.stringify(created);
    res.status(200).send(created);
    window.location.href = "/profile";
  } else {
    res.send({ message: "Email already in use" });
  }
  // }
});

//TODO jwt token
router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please enter both email and password");
  } else {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      res.status(400).send(null);
    } else {
      // const token = jwt.sign({ email }, "secret");
      req.session.user = JSON.stringify(user);
      res.status(200).send({ user });
    }
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.status(200).send("logged out");
});

module.exports = router;
