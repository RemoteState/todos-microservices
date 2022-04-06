import express, { Router } from "express";

import { Todos } from "../controller";

const router: Router = express.Router();

// router.get('/search_by_date', todo.filterTodoByDate)
router.route("/").get(Todos.getAll).post(Todos.create);
router
  .route("/:id")
  .get(Todos.getOneById)
  .patch(Todos.findOneAndUpdate)
  .delete(Todos.findOneAndDelete);

export { router };
