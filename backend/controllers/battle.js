const router = require("express").Router();

const Battle = require("../models/battle");

router.get("/", async (request, response) => {
  const battle = await Battle.find({});
  response.json(battle);
});

module.exports = router;
