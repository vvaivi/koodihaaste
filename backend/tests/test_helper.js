const Vegetable = require("../models/vegetable");

const initialVeggies = [
  {
    name: "Porkkana",
    energy: 100,
    carbs: 50,
    protein: 20,
    fat: 30,
  },
  {
    name: "Paprika",
    energy: 50,
    carbs: 25,
    protein: 10,
    fat: 15,
  },
];

const vegetablesInDb = async () => {
  const veggies = await Vegetable.find({});
  return veggies.map((v) => v.toJSON());
};

module.exports = {
  initialVeggies,
  nonExistingId,
  vegetablesInDb,
};
