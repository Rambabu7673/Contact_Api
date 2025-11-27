import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import contactRouter from "./Routes/contact.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// .env config
dotenv.config({ path: ".env" });

// Check env values
console.log("MONGO_URL ->", process.env.MONGO_URL);
console.log("PORT ->", process.env.PORT);

// User Routes
app.use("/api/user", userRouter);
app.use("/api/contact", contactRouter);

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "This is Home Route and testing route" });
});

// Mongoose Connect
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Rambabu",
  })
  .then(() => console.log("MongoDB is Connected...!"))
  .catch((err) => console.log(err));

// Server Start
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is Runing on port = ${port}`));
