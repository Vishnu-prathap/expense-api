import mongoose from "mongoose";

const connectoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
export { connectoDB };
