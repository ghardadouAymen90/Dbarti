const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");
const path = require("path");

const app = express();

// require some inputed environment variable
require("dotenv").config();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;
const db_atlas = require("./config/keys").MONGO_ATLAS_URI;

// Connect to MongoDB
mongoose
  .connect(db_atlas || db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/recipes", recipes);

//in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("Client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
  });
}
app.use(express.static("public"));

app.use("*/uploads", express.static("uploads")); //make uploads folder accessible

//Server Listening
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
