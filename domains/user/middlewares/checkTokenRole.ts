// Interfaces
import { NextFunction, Request, Response } from "express";

export const checkTokenRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { loggedUser } = req.body;
    if (!roles.includes(loggedUser.role))
      return res.status(401).json({
        ok: false,
        msg: `You need to be ${roles} to perform this action`,
      });
    next();
  };
};
