const mongoose = require("mongoose");

const schema = mongoose.Schema({
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vegetable",
  },
  player2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vegetable",
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Battle", schema);
