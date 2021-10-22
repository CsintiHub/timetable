import models from "./models";
const express = require("express");
// const mysql = require("mysql");
// const multer = require("multer");
// const path = require("path");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("./middlewares/jwt");

// var connection = mysql.createConnection({
//     host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	database : 'nodelogin'
// });

// var upload = multer();
const app = express();
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(upload.array());
// app.use(cookieParser());

// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

// app.get('/', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/login.html'));
// });

const classRouter = require("./routers/class");
const studentRouter = require("./routers/student");
const tutorRouter = require("./routers/tutor");
// const authRouter = require("./routers/auth");

// app.use(express.json());

app.use("/claas", classRouter);
app.use("/student", studentRouter);
app.use("/tutor", tutorRouter);
// app.use("/auth", authRouter);

// app.post("/signin", function (req, res) {
//   const { email, password } = req.body;
//   if (email && password) {
// connection.query(
//   "SELECT * FROM accounts WHERE email = ? AND password = ?",
//   [email, password],
//   function (error, results, fields) {
//     if (results.length > 0) {
//       req.session.loggedin = true;
//       req.session.email = email;
//       res.redirect("/home");
//     } else {
//       res.send("Incorrect Username and/or Password!");
//     }
//     res.end();
//   }
// );
//   } else {
//     res.send("Please enter Email and Password!");
//     res.end();
//   }
// });

app.get("/home", function (req, res) {
  if (req.session.loggedin) {
    res.send("Welcome back, " + req.session.email + "!");
  } else {
    res.send("Please login to view this page!");
  }
  res.end();
});

/////////////////////////////////////////////////////////////////////////// TODO choose

app.post("/signup", async function (req, res) {
  // TODO check credentials on client side?
  const { email, name, tutor, subject, address, password } = req.body;
  if (!email || !name || !tutor || !subject || !address || !password) {
    res.status("400");
    res.send("Invalid details!");
  } else {
    // TODO check if already exists
    const user = await models.user.findOne({ where: { email } });
    if (!user) {
      req.session.email = email;
      // res.redirect("/profile");
      await models.user.create({
        email,
        name,
        tutor,
        subject,
        address,
        password,
      });
      res.send("Successfully signed up");
    } else {
      res.send({ message: "Email already in use" });
    }
  }
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please enter both email and password");
  } else {
    const user = models.user.findOne({ where: email, password });
    if (user !== null) {
      res.status(400).send("Invalid login credentials");
    } else {
      const token = jwt.sign({ email }, "secret");
      req.session.email = email;
      // res.redirect("/profile");
      return res.send({ token, user });
    }
  }
});

app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.redirect("/login");
});

// TODO user - profile
app.get("/profile", jwtMiddleware, function (req, res) {
  // could be middleware
  // const email = req.session.email;
  // if (!email) res.status(400).send("Not logged in!");
  // else {
  const user = models.user.findOne({ where: { email } });
  req.send({ user });
  // }
});

app.listen(3000);
