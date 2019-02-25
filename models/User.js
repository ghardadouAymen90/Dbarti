const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userPhoto: {
    type: String
  },
  age: {
    type: Number,
    required: true
  },
  role: {
    type: String //user or admin
  }
});
module.exports = User = mongoose.model("users", UserSchema);
