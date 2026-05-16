const dotenv = require("dotenv");
const connectDB = require("./config/db");
const seedData = require("./utils/seedData");

dotenv.config();

connectDB().then(() => {
  seedData();
});