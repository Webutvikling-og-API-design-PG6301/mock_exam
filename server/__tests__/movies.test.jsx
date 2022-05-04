import request from "supertest";
import express from "express";
import { MongoClient } from "mongodb";
import { Movies } from "../movies.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());
const mongoClient = new MongoClient(
  "mongodb+srv://Stianoek:Networkelamela1@clustertest.m9rhm.mongodb.net/test"
);
beforeAll(async () => {
  await mongoClient.connect();
  const database = mongoClient.db("test_database");
  await database.collection("movies").deleteMany({});
  app.use("/api/movies", Movies(database));
});
afterAll(() => {
  mongoClient.close();
});

describe("movies api", () => {
  it("adds a new movie", async () => {
    const country = "Some Country";
    const title = "My Test Movie";
    await request(app)
      .post("/api/movies/list")
      .send({ title, country, year: 2020 })
      .expect(200);
    expect(
      (
        await request(app)
          .get("/api/movies/list")
          .query({ country })
          .expect(200)
      ).body.map(({ title }) => title)
    ).toContain(title);
  });
});
