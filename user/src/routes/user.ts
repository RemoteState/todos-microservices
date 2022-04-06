import express from "express";
import { authenticatedMiddleware } from "../middleware/auth";
import { User } from "../controllers";
const router = express.Router();

router.route("/register").post(User.register);
router.route("/login").post(User.login);
router.route("/profile").get(authenticatedMiddleware, User.userDetail);

export { router };
