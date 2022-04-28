import express, { Router } from "express";

export const Movies = express.Router();

Movies.get("/list", (req, res) => {
  res.json([
    {
      title: "Movie 1",
    },
  ]);
});
