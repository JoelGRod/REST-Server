import { Request, Response } from "express";

export const getRequest = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      ok: true,
      msg: "get response",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Contact administrator",
    });
  }
};

export const postRequest = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      ok: true,
      msg: "post response",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Contact administrator",
    });
  }
};

export const putRequest = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      ok: true,
      msg: "put response",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Contact administrator",
    });
  }
};

export const deleteRequest = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      ok: true,
      msg: "delete response",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Contact administrator",
    });
  }
};
