const mongoose = require("mongoose");

const flipCardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  optionYes: { type: String, default: "Yes" }, // Explicitly storing options
  optionNo: { type: String, default: "No" },
  explanationYes: { type: String, required: true }, // Explanation for Yes
  explanationNo: { type: String, required: true }, // Explanation for No
});

module.exports = mongoose.model("FlipCard", flipCardSchema);

