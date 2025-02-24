import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {

    mongoose.connect("mongodb+srv://dbFF:12qwaszx@cluster0.c4ngt.mongodb.net/ecommerce?retryWrites=true&w=majority")
    console.log("Mongo DB Connected");
  } catch (error) {
    console.log(error);
  }
}

