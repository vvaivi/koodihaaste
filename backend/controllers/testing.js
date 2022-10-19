const router = require("express").Router();
const Vegetable = require("../models/vegetable");

router.post("/reset", async (request, response) => {
  await Vegetable.deleteMany({});

  response.status(204).end();
});

module.exports = router;
