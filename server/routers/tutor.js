import express from "express";
import models from "../models";
const { User } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  await User.findAll({
    where: { tutor: 1 },
    attributes: ["id", "name", "subject"],
  })
    .then((tutors) => res.send({ tutors }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Create new tutor
 */
router.post("/", (req, res) => {
  const { name, email, subject, address, password } = req.body;
  models.tutor
    .create({ name, email, subject, address, password })
    .then((tutor) => res.json({ success: true, tutor }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Get all tutors of given subject
 * TODO restrict information
 */
router.get("/search/:subject", (req, res) => {
  const subject = req.params.subject;
  models.tutor.findAll({ where: { subject } }).then((tutors) => {
    if (tutors) res.json({ success: true, tutors });
    else res.status(400).json({ success: false, error: "Tutors not found." });
  });
});

/**
 * Get tutor by id
 * TODO restrict information
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id, { attributes: ["name", "subject", "address"] }).then(
    (tutor) => {
      if (tutor) res.json({ success: true, tutor });
      else res.status(400).json({ success: false, error: "Tutor not found." });
    }
  );
});

/**
 * Get all classes of a tutor
 * TODO security?
 */
router.get("/:id/classes", (req, res) => {
  const id = req.params.id;
  if (req.session.loggedin && req.session.id === id) {
    models.class
      .findAll({ include: { tutor, student }, where: { tutorId: id } })
      .then((classes) => {
        if (classes) res.json({ success: true, classes });
        else
          res.status(400).json({ success: false, error: "Classes not found." });
      });
  } else res.status(400).send("Wrong calendar");
});

/**
 * Get all classes for a given student of a tutor
 * TODO security?
 */
router.get("/:id/classes/:studentId", (req, res) => {
  const { id, studentId } = req.params;
  if (req.session.loggedin && req.session.id === id) {
    models.class
      .findAll({
        include: { tutor, student },
        where: { teahcerId: id, studentId },
      })
      .then((classes) => {
        if (classes) res.json({ success: true, classes });
        else
          res.status(400).json({ success: false, error: "Classes not found." });
      });
  } else res.status(400).send("Wrong calendar");
});

/**
 * Accept/Deny class
 * TODO security?
 */
router.put("/:id/classes/:classId", (req, res) => {
  const { id, classId } = req.params;
  const { accepted } = req.body;
  if (req.session.loggedin && req.session.id === id) {
    models.class
      .update({ accepted }, { where: { id: classId } })
      .then(() => res.json({ success: true }))
      .catch((err) =>
        res.status(400).json({ success: false, errors: { globals: err } })
      );
  } else res.status(400).send("Wrong calendar");
});

// router.get("/:id/rating", (req, res) => {
//   const id = req.params;
//   // if (req.session.loggedin && req.session.id === id) {
//   models.rating
//     .findAll({
//       where: { tutorId: id },
//     })
//     .then((ratings) => {
//       const sum = 0;
//       const total = 0;
//       ratings.map((rate) => {
//         sum += rate.rating;
//         ++total;
//       });
//       const rating = sum / total;
//       res.json({ rating });
//     })
//     .catch((error) =>
//       res.status(400).json({ success: false, errors: { globals: error } })
//     );
//   // } else res.status(400).send("Wrong calendar");
// });

/**
 * @description Update tutor by id
 * @param {integer} id - tutor id
 */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, subject, address, password } = req.body;
  models.tutor
    .update({ name, email, subject, address, password }, { where: { id } })
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Delete tutor by id
 */
// router.delete('/:id', (req, res) => {
// 	const id = req.params.id
// 	models.tutor
// 		.destroy({ where: { id } })
// 		.then(() => res.json({ success: true }))
// 		.catch(err => res.status(400).json({ success: false, errors: { globals: err } }));
// });

//TODO foglalás?

// export default router;
module.exports = router;
