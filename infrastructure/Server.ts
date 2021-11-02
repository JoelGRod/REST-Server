// External Packages
import express from "express";
// Interfaces
import { Request, Response } from "express";

class Server {
  // Singleton
  private static _instance: Server;

  // Express App
  private app: express.Application;
  private port: string | undefined;

  private constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Middlewares
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
    this.app.get("/api", (req: Request, res: Response) => {
      res.send("<h1>Hello World</h1>");
    });
  }

  // Middlewares
  private defineInitMiddlewares(): void {
      // TODO CORS
      // TODO BODYPARSER
  }

  private definePublic(): void {
    this.app.use(express.static("public"));
  }

  // Extra routes
  private defineExtraRoutes(): void {
    this.app.get("*", (req: Request, res: Response) => {
      res.send("<h1>404 - Bad Request</h1>");
    });
  }

  public startServer(): void {
    this.app.listen(this.port, () => {
      console.log(`Server stated at port: ${this.port}`);
    });
  }
}

export default Server;
