import express, { Router } from "express";
import * as path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { Movies } from "./movies.js";
import { Login } from "./login.js";

dotenv.config();

cookieParser(process.env.COOKE_SECRET);
const app = express();

app.use("/api/movies", Movies);
app.use("/api/login", Login);

app.use(express.static("../client/dist/"));

app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.resolve("../client/dist/index.html"));
  } else {
    next();
  }
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(
    "Server is running on: http://localhost:" + server.address().port
  );
});
