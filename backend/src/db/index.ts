import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_CONNECTION as string
    );
    console.log(
      `Process connected !! db host : ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Mongodb connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
