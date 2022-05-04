import express from "express";

export function Movies(DB) {
  const Movies = express.Router();

  Movies.get("/list", async (req, res) => {
    const query = {
      year: { $gte: 2010 },
    };
    const { country } = req.query;
    if (country) {
      query.countries = { $in: [country] };
    }
    const movies = await DB.collection("movies")
      .find(query)
      .sort({
        metacritic: -1,
      })
      .map(({ title, year, plot, genre, poster }) => ({
        title,
        year,
        plot,
        genre,
        poster,
      }))
      .limit(150)
      .toArray();

    res.json(movies);
  });

  Movies.post("/list", (req, res) => {
    const { title, country, year, plot } = req.body;
    console.log({ title, country, year, plot });
    const countries = [country];
    DB.collection("movies").insertOne({ title, countries, year, plot });
    res.sendStatus(200);
  });

  return Movies;
}
