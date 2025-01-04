import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "DAIRY_PRODUCT_FACTORY",
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas.");
    })
    .catch((err) => {
      console.log(`Error connecting to MongoDB Atlas: ${err}`);
    });
};