const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");

const recipe = require("../../models/Recipe");
var multer = require("multer"); //like body-parser, it will allow parsing a file from a request

//filter file type to image
const filterFile = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//method for upload : define storage and how the file shouled be named
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/recipes");
  },
  filename: function(req, file, cb) {
    cb(null, req.body.name + "_" + file.originalname);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: filterFile
});

//add a recipe
router.post("/addRecipe", upload.single("recipePhoto"), (req, res) => {
  if (isEmpty(req.body.recipe) && isEmpty(req.body.recipeTitle)) {
    return res.status(400).json({
      recipeEmpty: "Recipe post is empty",
      recipeTitleEmpty: "Recipe title is empty"
    });
  }

  if (isEmpty(req.body.recipe)) {
    return res.status(400).json({ recipeEmpty: "Recipe post is empty" });
  }
  if (isEmpty(req.body.recipeTitle)) {
    return res.status(400).json({ recipeTitleEmpty: "Recipe title is empty" });
  }

  if (req.body.ingredients.length < 4) {
    return res
      .status(400)
      .json({ ingredientsError: "You must input at least 4 ingredients" });
  }

  const NewRecipe = new recipe({
    text: req.body.recipe,
    recipeTitle: req.body.recipeTitle,
    likes: req.body.likes,
    ingredients: req.body.ingredients,
    comments: req.body.comments,
    postedBy: req.body.postedBy,
    recipePhoto: !req.file ? "" : req.file.path, // PROBLEM WITH REQ.FILE IF EMPTY
    servingNumber: req.body.servingNumber,
    preparationTime: req.body.preparationTime
  });
  recipe.findOne({_id:req.body._id}).then(recipe => {
    if (recipe) {
      return res.status(400).json({ recipe: "recipe already exists" });
    }
    NewRecipe.save().then(recipe => res.json(recipe))
    .catch(err => console.log(err));
  })

});

//get one recipe
router.get("/recipe/:recpid", (req, res) => {
  let rec = req.params.recpid;
  recipe.findOne({ _id: rec }).then(data => {
    return res.json(data);
  }).catch(err=>console.error);
});


//get recipes of a user
router.get("/:userID/recipeOfUser/", (req, res) => {
  let u = req.params.userID;
  recipe.find({postedBy:{ $eq: u }}).then(data => {
    return res.json(data);
  }).catch(err=>console.error);
});

// like recipe
router.post("/:userID/recipe/:recpid/like", (req, res) => {
  let u = req.params.userID;
  let rec = req.params.recpid;
  recipe.findOneAndUpdate({ _id: rec },{$addToSet:{likes:u}},(err,success)=>{
    if(err){console.error; res.status(400).json({like:false})}
    else{console.log(success);res.json({like:true})}
  })
})

// unlike recipe
router.post("/:userID/recipe/:recpid/unlike", (req, res) => {
  let u = req.params.userID;
  let rec = req.params.recpid;
  recipe.findOneAndUpdate({ _id: rec },{$pull:{likes:u}},(err,success)=>{
    if(err){console.error;res.status(400).json({unlike:false})}
    else{console.log(success);res.json({unlike:true})}
  })
})


//get the likes of a recipe
router.get("/:id/getLikes", (req, res) => {
  let u = req.params.id;
  recipe.findOne({ _id: u }).then(data => {
    return res.json(data.likes);
  }).catch(err=>{console.error; res.status(400).json({error:'can'+'t get likes'})});
});

module.exports = router
