import express from "express";
import models from "../models";

const router = express.Router();

/**
 * Create new student
 */
router.post("/", (req, res) => {
  const { name, email, subject, address, password } = req.body;
  models.student
    .create({ name, email, subject, address, password })
    .then((student) => res.json({ success: true, student }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Get student by id
 * TODO restrict information
 */
router.get("/:id", (req, res) => {
  const id = req.params.id;
  models.student.find({ where: { id } }).then((student) => {
    if (student) res.json({ success: true, student });
    else res.status(400).json({ success: false, error: "student not found." });
  });
});

/**
 * Get all classes of a sudent
 * TODO security?
 */
router.get("/:id/classes", (req, res) => {
  const id = req.params.id;
  if (req.session.loggedin || req.session.id === id) {
    models.classes
      .findAll({ include: { tutor, student }, where: { studentId: id } })
      .then((classes) => {
        if (classes) res.json({ success: true, classes });
        else
          res.status(400).json({ success: false, error: "Classes not found." });
      });
  } else res.status(400).send("Wrong calendar");
});

/**
 * Get all classes of a tudent from a given tutor
 * TODO security?
 */
router.get("/:id/classes/:tutorId", (req, res) => {
  const { id, tutorId } = req.params;
  if (req.session.loggedin || req.session.id === id) {
    models.classes
      .findAll({
        include: { tutor, student },
        where: { studentId: id, tutorId },
      })
      .then((classes) => {
        if (classes) res.json({ success: true, classes });
        else
          res.status(400).json({ success: false, error: "Classes not found." });
      });
  } else res.status(400).send("Wrong calendar");
});

/**
 * Update student by id
 */
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, address, password } = req.body;
  models.student
    .update({ name, email, address, password }, { where: { id } })
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Delete student by id
 */
// router.delete('/:id', (req, res) => {
// 	const id = req.params.id;
// 	models.student
// 		.destroy({ where: { id } })
// 		.then(() => res.json({ success: true }))
// 		.catch(err => res.status(400).json({ success: false, errors: { globals: err } }));
// });

//TODO foglalás?

// export default router;
module.exports = router;
