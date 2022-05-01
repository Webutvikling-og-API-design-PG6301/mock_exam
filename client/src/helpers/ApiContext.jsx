import React from "react";
import { fetchJSON } from "./Hooks";

export const ApiContext = React.createContext({
  async listMovies(query) {
    return await fetchJSON("/api/movies/list?" + new URLSearchParams(query));
  },
});
