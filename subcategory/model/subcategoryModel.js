const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Subcategory", SubCategorySchema);
