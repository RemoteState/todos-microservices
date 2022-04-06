import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

import mongoose from "mongoose";
import { PORT, MONGO_DB } from "./config";
import { userDetail } from "./middleware/user";
import { TodoRouter } from "./routes/";

const app: Express = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(userDetail);
app.use("/todos", TodoRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    url: `wrong url ${req.url}`,
    message: "page not found",
  });
});

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    return res.status(500).json({
      url: `${req.url}`,
      message: `Internal Server Error $ {err.message}`,
    });
  }
);

const server = async () => {
  // db connection
  await mongoose.connect(MONGO_DB);
  app.listen(PORT, () => {
    console.log(`todos is listening at port ${PORT}`);
  });
};

server().catch((err) => console.log(err));

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  console.log("Database Disconnected");
  // console.log(TodoModel.find({}));
  process.exit(0);
});
