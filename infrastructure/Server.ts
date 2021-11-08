// External Packages
import express from "express";
import cors from "cors";
// Interfaces
import { Request, Response } from "express";
// Db
import dbConnection from "./db/db.config";
// Domain Routers
import testRouter from "../domains/test/router";
import userRouter from "../domains/user/router";
import authRouter from "../domains/auth/router";

class Server {
  // Singleton
  private static _instance: Server;

  // Express App
  private _app: express.Application;
  private _port: string | undefined;

  private constructor() {
    this._app = express();
    this._port = process.env.PORT;

    // Db connection
    dbConnection();
    // Middlewares
    this.defineInitMiddlewares();
    // Main routes
    this.defineRoutes();
    // Public folder
    this.definePublic();
    // Extra routes
    this.defineExtraRoutes();
  }

  public static get getInstance(): Server {
    if (this._instance === undefined) this._instance = new Server();
    return this._instance;
  }

  // Main routes
  private defineRoutes(): void {
    this._app.use("/api/test", testRouter);
    this._app.use("/api/user", userRouter);
    this._app.use("/api/auth", authRouter);
  }

  // Middlewares
  private defineInitMiddlewares(): void {
    // Cors
    this._app.use(cors());
    // Bodyparser
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  private definePublic(): void {
    this._app.use(express.static("public"));
  }

  // Extra routes
  private defineExtraRoutes(): void {
    this._app.get("*", (req: Request, res: Response) => {
      res.send("<h1>404 - Bad Request</h1>");
    });
  }

  public startServer(): void {
    this._app.listen(this._port, () => {
      console.log(`Server stated at port: ${this._port}`);
    });
  }
}

export default Server;
