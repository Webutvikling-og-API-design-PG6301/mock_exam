import express, { Router } from "express";
import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
export const Movies = express.Router();
const client = new MongoClient(process.env.MONGODB_URL);

client.connect().then(async () => {
  console.log("connected to mongodb");
  const database = await client.db().admin().listDatabases();
  console.log(database);

  const moviesDB = client.db("sample_mflix");
  console.log(moviesDB);

  Movies.get("/list", async (req, res) => {
    const movies = await moviesDB
      .collection("movies")
      .find()
      .limit(150)
      .toArray();

    res.json(movies);
  });
});
