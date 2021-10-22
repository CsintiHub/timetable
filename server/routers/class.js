import express from "express";
import models from "../models";

const router = express.Router();

router.get("/", (req, res) => {
  models.class.findAll().then((classes) => {
    if (classes) res.json({ success: true, classes });
    else res.status(400).json({ success: false, error: "Classes not found." });
  });
});

router.get("/:subject", (req, res) => {
  const subject = req.params.subject;
  models.class
    .findAll({ include: { tutor }, where: { subject } })
    .then((classes) => {
      if (classes) res.json({ success: true, classes });
      else
        res.status(400).json({ success: false, error: "Classes not found." });
    });
});

// router.get("/:tutorId", (req, res) => {
// 	const subject = req.params.subject
// 	models.class.findAll({ include: { tutor }, where: { tutorId } }).then(classes => {
// 		if (classes) res.json({ success: true, classes });
// 		else res.status(400).json({ success: false, error: "Classes not found." });
// 	})
// })

//TODO foglalás?

router.post("/", async (req, res) => {
  const { online, start, duration, end, accepted } = req.body;
  const claas = await models.class.create({
    online,
    start,
    duration,
    end,
    accepted,
  });
  res.json({ success: true, claas });
});

// export default router;
module.exports = router;
