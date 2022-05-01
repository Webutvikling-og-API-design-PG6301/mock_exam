import React from "react";
import { fetchJSON, useLoading } from "../../helpers/Hooks";
import SingleMovie from "./SingleMovie";
const ListMovies = () => {
  const { data, error, loading } = useLoading(async () =>
    fetchJSON("/api/movies/list")
  );
  console.log(data);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Ops! Looks like something went wrong</h2>
        <p> {error.toString()}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>List movies</h1>
      <div>
        {data.map((movie) => {
          return <SingleMovie movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default ListMovies;
