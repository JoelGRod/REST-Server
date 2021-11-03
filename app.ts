// Environment
require("dotenv").config();
// Server
import Server from "./infrastructure/Server";

// Server init
const server = Server.getInstance;

// Server Up
server.startServer();