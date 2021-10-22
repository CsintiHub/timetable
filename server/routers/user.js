import express from "express";
import models from "../models";

const router = express.Router();

/**
 * Create new user
 */
// router.post("/", (req, res) => {
//   const { name, email, subject, address, password } = req.body;
//   models.user
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
  models.user.findByPk(id).then((user) => {
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
  models.user
    .update(
      { name, email, tutor, subject, address, password },
      { where: { id } }
    )
    .then(() => res.json({ success: true }))
    .catch((err) =>
      res.status(400).json({ success: false, errors: { globals: err } })
    );
});

/**
 * Get all classes of a user
 * TODO find user
 */
router.get("/:id/classes", (req, res) => {
  const id = req.params.id;
  const tutor = models.user.findByPk(id).get("tutor");
  const email = models.user.findByPk(id).get("email");
  if (tutor)
    models.classes
      .findAll({ include: { tutor, student }, where: { userId: id } })
      .then((classes) => {
        if (classes) res.json({ success: true, classes });
        else
          res.status(400).json({ success: false, error: "Classes not found." });
      });
  else if (req.session.loggedin && req.session.email === email) {
    models.classes
      .findAll({ include: { tutor, student }, where: { userId: id } })
      .then((classes) => {
        if (classes) res.json({ success: true, classes });
        else
          res.status(400).json({ success: false, error: "Classes not found." });
      });
  } else res.status(400).send("Wrong calendar");
});

router.post("/:id/classes", async (req, res) => {
  const { id } = req.params;
  const { online, start, duration } = req.body;
  const user = models.tutor.findByPk(id);
  //const duration
  if (!user.tutor) {
    const student = models.user.findOne({
      where: { email: req.session.email },
    });
    const claas = await models.class.create({
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
  const email = models.user.findByPk(id).get("email");
  if (req.session.loggedin && req.session.email === email) {
    models.classes
      .findAll({
        include: { tutor, user },
        where: { userId: id, tutorId },
      })
      .then((classes) => {
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
// 	models.user
// 		.destroy({ where: { id } })
// 		.then(() => res.json({ success: true }))
// 		.catch(err => res.status(400).json({ success: false, errors: { globals: err } }));
// });

//TODO foglalás?

// export default router;
module.exports = router;
