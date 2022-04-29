import express, { Router } from "express";
import * as path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

import { Movies } from "./movies.js";
import { Oauth } from "./oauth.js";

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/movies", Movies);
app.use("/api/oauth", Oauth);

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
