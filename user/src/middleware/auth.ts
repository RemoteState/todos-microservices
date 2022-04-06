import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { SECRET_TOKEN_KEY } from "../config";

import { TokenInterface } from "../helper";

export const authenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(400).json({
      err: "invalid token",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jsonwebtoken.verify(token, SECRET_TOKEN_KEY);
    // const {_id, firstName}= (<any>decoded)
    const { _id, firstName } = decoded as TokenInterface;
    req.user = { _id, firstName };
    next();
  } catch (err: any) {
    return res.status(500).json({ err: err.message });
  }
};
