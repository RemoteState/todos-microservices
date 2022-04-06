import express, { Express } from "express";
import { PORT, MONGO_DB } from "./config";
import mongoose from "mongoose";
import { userDetail } from "./middleware/user";
import { router } from "./routes/todo";
const app: Express = express();

app.use(express.json());
app.use(userDetail);
app.use("/todos", router);
const server = async () => {
  // db connection
  await mongoose.connect(MONGO_DB);
  app.listen(PORT, () => {
    console.log(`todos is listening at port ${PORT}`);
  });
};

server().catch((err) => console.log(err));
