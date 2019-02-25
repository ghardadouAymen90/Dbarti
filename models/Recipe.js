const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RecipeSchema = new Schema({

  servingNumber: { type: String },
  preparationTime: { type: String },
  recipeTitle: { type: String, required: true },
  text: { type: String, required: true },
  recipePhoto: { type: String },
  ingredients: [{ type: String }],
  likes: [{ type: mongoose.Schema.ObjectId }],
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      postedBy: { type: mongoose.Schema.ObjectId }
    }
  ],
  postedBy: { type: mongoose.Schema.ObjectId },
  created: { type: Date, default: Date.now }
  
});
module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
