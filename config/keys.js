module.exports = {
  mongoURI: "mongodb://localhost/27017",
  secretOrKey: "dbarti.tn_app" || process.env.SECRET,
  MONGO_ATLAS_URI:
    "mongodb://aymen:gh242462@dbarti-shard-00-00-7cvrp.mongodb.net:27017,dbarti-shard-00-01-7cvrp.mongodb.net:27017,dbarti-shard-00-02-7cvrp.mongodb.net:27017/test?ssl=true&replicaSet=Dbarti-shard-0&authSource=admin&retryWrites=true"
};
