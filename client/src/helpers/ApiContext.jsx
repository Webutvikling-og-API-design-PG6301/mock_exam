import React from "react";
import { fetchJSON, postJSON } from "./Hooks";

export const ApiContext = React.createContext({
  async listMovies(query) {
    return await fetchJSON("/api/movies/list?" + new URLSearchParams(query));
  },

  async createMovie(movie) {
    return await postJSON("/api/movies/list", movie);
  },

  async provideGoogle(google) {
    return await fetchJSON("/api/oauth/google", google);
  },

  async provideActiveDirectory(AD) {
    return await fetchJSON("/api/oauth/ad", AD);
  },
});
