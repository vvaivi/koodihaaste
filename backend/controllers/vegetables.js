const router = require("express").Router();

const Vegetable = require("../models/vegetable");

router.get("/", async (request, response) => {
  const vegetables = await Vegetable.find({});
  response.json(vegetables);
});

router.post("/", async (request, response) => {
  const vegetable = new Vegetable({ ...request.body });
  const savedVegetable = await vegetable.save();
  response.status(201).json(savedVegetable);
});

router.get("/:id", async (request, response) => {
  const vegetable = await Vegetable.findById(request.params.id);
  response.json(vegetable);
});

router.put("/:id", async (request, response) => {
  const veggie = request.body;

  const updatedVeggie = await Vegetable.findByIdAndUpdate(request.params.id, veggie, {
    new: true,
    context: "query",
  });

  response.json(updatedVeggie);
});

module.exports = router;
