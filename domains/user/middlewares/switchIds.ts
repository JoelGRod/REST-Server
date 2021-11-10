import { NextFunction, Request, Response } from "express";

export const switchIds = (req: Request, res: Response, next: NextFunction) => {
  const { userUpdatedId } = req.body;
  req.body.uid = userUpdatedId;
  next();
};
