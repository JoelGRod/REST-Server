import { NextFunction, Request, Response } from "express";

const switchIds = (req: Request, res: Response, next: NextFunction) => {
  const { userUpdatedId } = req.body;
  req.body.uid = userUpdatedId;
  next();
};

export default switchIds;