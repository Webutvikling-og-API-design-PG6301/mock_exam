import express, { query, Router } from "express";
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
    const query = {
      year: { $gte: 2000 },
    };
    const { country } = req.query;
    if (country) {
      query.countries = { $in: [country] };
    }
    const movies = await moviesDB
      .collection("movies")
      .find(query)
      .sort({
        metacritic: -1,
      })
      .limit(150)
      .toArray();

    res.json(movies);
  });

  Movies.post("/", (req, res) => {
    const { title, country, year, plot } = req.body;
    const countries = [country];
    moviesDB.collection("movies").insertOne({ title, countries, year, plot });
    res.sendStatus(200);
  });
});
