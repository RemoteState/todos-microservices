import express, { Express } from "express";
import { PORT, MONGO_DB } from "./config";
import mongoose from "mongoose";
import { userRouter } from "./routes";

const app: Express = express();
app.use(express.json());

// app.use('/', async (req, res, next)=>{
//
//     return res.status(200).json({mgs: "Hello User"})
// })
app.use("/user", userRouter);
const server = async () => {
  // db connection
  await mongoose.connect(MONGO_DB);
  app.listen(PORT, () => {
    console.log(`User is listening at port ${PORT}`);
  });
};
server().catch((err) => console.log(err));
