import express from "express";
// import models from "../models";
const { User } = require("../models");
const db = require("../database/database.js");

const router = express.Router();

router.post("/signup", async function (req, res) {
  // console.log(req.body);
  const { email, name, tutor, subject, address, password } = req.body;
  if (!email || !name || (tutor && !subject) || !address || !password) {
    res.status(400) /*.send("Invalid details!")*/;
  } else if (password && password.length < 8)
    res.status(400) /*.send("Password needs to be at least 8 characters")*/;
  else {
    const user = await User.findOne({ where: { email } });
    if (user) res.status(400) /*.send({ message: "Email already in use" })*/;
    // req.session.email = email;
    else {
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
      // window.location.href = "/profile";
    }
    // }
  }
});

//TODO jwt token
router.post("/login", async function (req, res) {
  const sql = "select * from user where email = ?";
  const { email, password } = req.body;
  const params = [email];
  if (!email || !password) {
    res.status(400).send("Please enter both email and password");
  } else {
    // const user = await User.findOne({ where: { email } });
    db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).send({ error: err.message });
        return;
      } else if (row.password !== password) {
        res.status(400).send({ error: "wrong password" });
      }
      req.session.user = JSON.stringify(row);
      res.status(200).send(row);
    });
    // if (!user || user.password !== password) {
    //   res.status(400).send("Incorrect email or password");
    // } else {
    //   // const token = jwt.sign({ email }, "secret");
    //   req.session.user = JSON.stringify(user);
    //   res.status(200).send(user);
    // }
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.status(200).send("logged out");
});

module.exports = router;
