const Vegetable = require("../models/vegetable");
const Battle = require("../models/battle");

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

const battlesInDb = async () => {
    const battles = await Battle.find({});
    return battles.map((b) => b.toJSON());
  };

module.exports = {
  initialVeggies,
  vegetablesInDb,
  battlesInDb,
};
