import models from "./models";
import regeneratorRuntime from "regenerator-runtime";
const express = require("express");
// const mysql = require("mysql");
// const multer = require("multer");
// const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("./middlewares/jwt");

// var connection = mysql.createConnection({
//     host     : 'localhost',
// 	user     : 'root',
// 	password : '',
// 	database : 'nodelogin'
// });

// var upload = multer();
export const app = express();
app.set("trust proxy", 1);
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
// app.use(upload.array());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: "very session secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Middleware for errors
// app.use((req, res) => {
//   res.status(404).json({
//     errors: {
//       global:
//         "Still working on it. Please try again later when we implement it.",
//     },
//   });
// });

// app.get('/', function(req, res) {
// 	res.sendFile(path.join(__dirname + '/login.html'));
// });

const authRouter = require("./routers/auth");
const classRouter = require("./routers/class");
const studentRouter = require("./routers/student");
const tutorRouter = require("./routers/tutor");
const userRouter = require("./routers/user");

// app.use(express.json());

app.use("/api", authRouter);
app.use("/api/classes", classRouter);
app.use("/api/students", studentRouter);
app.use("/api/tutors", tutorRouter);
app.use("/api/users", userRouter);

// app.post("/signin", function (req, res) {
//   const { email, password } = req.body;
//   if (email && password) {
// connection.query(
//   "SELECT * FROM accounts WHERE email = ? AND password = ?",
//   [email, password],
//   function (error, results, fields) {
//     if (results.length === 1) {
//       req.session.loggedin = true;
//       req.session.email = email;
//       res.redirect("/profile");
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

///////////////////////////////////////////////////////////////////////////

// TODO user - profile
app.get("/api/profile", jwtMiddleware, function (req, res) {
  // could be middleware
  const email = req.session.email;
  if (!email) res.status(400).send("Not logged in!");
  else {
    const user = models.user.findOne({ where: { email } });
    req.send({ user });
  }
});

app.listen(8080);
