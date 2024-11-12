import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js"
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";

// creates the App through express
const app = express();

// app config
dotenv.config();

// create port
const port = process.env.PORT || 4000;

// app connect with mongodb Database
connectDB();
// app connect with cloudinary for file and image uploading 
connectCloudinary();


// middlewares
app.use(express.json());
app.use(cors()); // using cors - frontend connect with backend

// api admin end-points
app.use('/api/admin', adminRouter)
// localhost:8000/api/admin/add-doctor

// api doctor end-points
app.use('/api/doctor', doctorRouter)

// api user end-points 
app.use('/api/user', userRouter)

// server listen
app.listen(port, () => {
  console.log(`server is listening on port: ${port}`);
});
  