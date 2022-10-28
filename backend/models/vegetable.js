const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  energy: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  wins: {
    type: Number,
    default: 0,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Vegetable", schema);