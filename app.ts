// External Packages
import express from "express";
// Interfaces
import { Request, Response } from "express";
// Environment
require("dotenv").config();

// Server init
const app = express();
const port: string | undefined = process.env.PORT;

// Main routes
app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello World</h1>");
});

// Server Up
app.listen(port, () => {
  console.log(`Server stated at port: ${port}`);
});
