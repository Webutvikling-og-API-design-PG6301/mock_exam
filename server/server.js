import express from "express";
import * as path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

import { Movies } from "./movies.js";
import { Google } from "./oauth_google.js";
import { Active } from "./oauth_active_directory.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const mongoClient = new MongoClient(process.env.MONGODB_URL);
mongoClient.connect().then(async () => {
  console.log("Connected to mongodb");
  app.use("/api/movies", Movies(mongoClient.db(process.env.MONGODB_DATABASE)));
});

app.use("/api/oauth", Google);
app.use("/api/oauth", Active);

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
