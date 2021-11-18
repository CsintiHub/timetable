import express from "express";
import models from "../models";
const { Class, User } = require("../models");

const router = express.Router();

/**
 * Create new user
 */
// router.post("/", (req, res) => {
//   const { name, email, subject, address, password } = req.body;
//   User
//     .create({ name, email, subject, address, password })
//     .then((user) => res.json({ success: true, user }))
//     .catch((err) =>
//       res.status(400).json({ success: false, errors: { globals: err } })
//     );
// });

/**
 * Get user by id
 * TODO restrict information
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    if (user) res.json({ success: true, user });
    else res.status(400).json({ success: false, error: "user not found." });
  });
});

/**
 * Update user by id
 */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, tutor, subject, address, password } = req.body;
  User.update(
    { name, email, tutor, subject, address, password },
    { where: { id } }
  )
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Get all classes of a student
 */
// TODO tutor filter
router.get("/:id/classes", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (user.tutor) {
    await Class.findAll({
      where: { tutorId: id },
      include: { model: User, as: "Student" },
    });
    res.send({ classes });
    // else res.send({ classes: [] });
  } /*if (req.session.user.id === id)*/ else {
    const classes = await Class.findAll({
      where: { studentId: id },
      include: "Tutor",
    });
    res.send({ classes });
    // else res.send({ classes: [] });
  } //else res.status(400).send("Wrong classes");
});

router.post("/:id/classes", async (req, res) => {
  const { id } = req.params;
  const { online, start, duration } = req.body;
  const user = User.findByPk(id);
  //const duration
  if (!user.tutor) {
    const student = await User.findOne({
      where: { email: req.session.user.email },
    });
    const claas = await Class.create({
      online,
      start,
      duration,
      accepted: false,
    });
    claas.setStudent(student);
    claas.setTutor(user);
    res.json({ success: true });
  } else if (req.session.loggedin && req.session.email === user.email) {
    // TODO accept - "/:id/classes/:classId"?
  }
});

/**
 * Get all classes of a tudent from a given tutor
 * TODO find user
 */
router.get("/:id/classes/:tutorId", (req, res) => {
  const { id, tutorId } = req.params;
  const email = User.findByPk(id).get("email");
  if (req.session.loggedin && req.session.email === email) {
    Class.findAll({
      include: { tutor, user },
      where: { userId: id, tutorId },
    }).then((classes) => {
      if (classes) res.json({ success: true, classes });
      else
        res.status(400).json({ success: false, error: "Classes not found." });
    });
  } else res.status(400).send("Wrong calendar");
});

router.get("/:id/rating", (req, res) => {
  const id = req.params;
  // if (req.session.loggedin && req.session.id === id) {
  models.rating
    .findAll({
      where: { tutorId: id },
    })
    .then((ratings) => {
      var sum = 0;
      var total = 0;
      ratings.map((rate) => {
        sum += rate.rating;
        ++total;
      });
      const rating = sum / total;
      res.json({ rating });
    })
    .catch((error) =>
      res.status(400).json({ success: false, errors: { globals: error } })
    );
  // } else res.status(400).send("Wrong calendar");
});

router.post("/:id/rating", (req, res) => {
  const id = req.params;
  const { rating, comment } = req.body;
  if (req.session.loggedin) {
    models.rating
      .create({ rating, comment })
      .setTutor(id)
      .setStudent(req.session.id)
      .then(() => {
        res.json({ success: true });
      })
      .catch((error) =>
        res.status(400).json({ success: false, errors: { globals: error } })
      );
  } else res.status(400).send("Not logged in to rate");
});

/**
 * Delete user by id
 */
// router.delete('/:id', (req, res) => {
// 	const id = req.params.id;
// 	User
// 		.destroy({ where: { id } })
// 		.then(() => res.json({ success: true }))
// 		.catch(err => res.status(400).json({ success: false, errors: { globals: err } }));
// });

//TODO foglalás?

// export default router;
module.exports = router;
