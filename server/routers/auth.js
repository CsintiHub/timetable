import express from "express";
// import models from "../models";
const { User } = require("../models");

const router = express.Router();

router.get("/signup", function (req, res) {
  res.send("signing up...");
});

router.post("/signup", async function (req, res) {
  console.log(req.body);
  const { email, name, tutor, subject, address, password } = req.body;
  if (!email || !name || (tutor && !subject) || !address || !password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    const user = await User.findOne({ where: { email } });
    if (user === null) {
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
      // res.send("Successfully signed up");
      // res.redirect("/classes");
      res.statusCode(200).send(created);
    } else {
      res.send({ message: "Email already in use" });
    }
  }
});

router.get("/login", function (req, res) {
  res.send("logging in...");
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please enter both email and password");
  } else {
    const user = User.findOne({ where: email, password });
    if (user !== null) {
      res.status(400).send("Invalid login credentials");
    } else {
      const token = jwt.sign({ email }, "secret");
      req.session.email = email;
      res.redirect("/profile");
      res.send({ token, user }); //return
    }
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.redirect("/");
});

module.exports = router;
