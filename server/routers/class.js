import express from "express";
// import models from "../models";

const { Class } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  await Class.findAll().then((classes) => {
    if (classes) res.json({ success: true, classes });
    else res.status(400).json({ success: false, error: "Classes not found." });
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Class.findByPk(id).then((claas) => res.send({ claas }));
});

//TODO foglalás?

router.post("/", async (req, res) => {
  const { online, start, duration, end, accepted } = req.body;
  const claas = await Class.create({
    online,
    start,
    duration,
    end,
    accepted,
  });
  res.send({ claas });
});

router.put("/:id", async (req, res) => {
  const { online, start, duration, end, accepted } = req.body;
  const claas = await Class.findByPk(req.params.id);
  await claas.update({ online, start, duration, end, accepted });
  res.send({ claas });
});

module.exports = router;
