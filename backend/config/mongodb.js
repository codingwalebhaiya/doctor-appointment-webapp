import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () =>
    console.log("Mongodb Database Connected Successfully!")
  );
  await mongoose.connect(`${process.env.MONGODB_URI}/doctor-appointment`);
};

export default connectDB;
         