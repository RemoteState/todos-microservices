import axios from "axios";
import { Request, Response, NextFunction } from "express";
export const userDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await axios.get("http://localhost:3001/user/profile", {
      headers: { authorization: req.headers.authorization } as any,
    });
    req.user = user.data.data;
    next();
  } catch (err: any) {
    console.log(err.response, err);
    if (err.response)
      return res
        .status(err.response.status)
        .json({ err: err.response.data.err });
    return res.status(400).json({ err: err.message });
  }
};
