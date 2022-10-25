const router = require("express").Router();

const Battle = require("../models/battle");

router.get("/", async (request, response) => {
  const battles = await Battle.find({});
  response.json(battles);
});

router.get("/:id", async (request, response) => {
    const battle = await Battle.findById(request.params.id);
    response.json(battle);
  });

router.post("/", async (request, response) => {
    const battle = new Battle({ ...request.body });
    const savedBattle = await battle.save();
    response.status(201).json(savedBattle);
});

module.exports = router;
