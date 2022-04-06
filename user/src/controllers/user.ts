import { Request, Response } from "express";
import { user } from "../models";
import jwt from "jsonwebtoken";
import { SECRET_TOKEN_KEY, EXPIRY } from "../config";

export class User {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const userData = await user.findOne({ email });
      if (!userData || !(await userData.comparePassword(password))) {
        return res.status(401).json({
          msg: "Invalid Credentials",
        });
      }

      const token = await jwt.sign(
        {
          _id: userData._id,
          firstName: userData.firstName,
        },
        SECRET_TOKEN_KEY,
        {
          expiresIn: EXPIRY,
        }
      );

      res.status(200).json({
        msg: "You are logged in!",
        token,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const userData = await user.create(req.body);
      res.status(201).json({
        msg: `userData created`,
        data: userData,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async userDetail(req: Request, res: Response) {
    try {
      const userData = await user.findOne({ _id: req.user._id });
      return res.status(200).json({ data: userData });
    } catch (err: any) {
      return res.status(500).json({ err });
    }
  }
}
