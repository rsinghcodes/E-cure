require("dotenv").config();

export default {
  MONGODB: process.env.MONGODB,
  SECRET_KEY: process.env.SECRET_KEY,
};
