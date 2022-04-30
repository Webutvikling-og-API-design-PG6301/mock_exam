import React from "react";
import { fetchJSON, useLoading } from "../../helpers/Hooks";
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
          return (
            <div key={movie.title}>
              <h1>{movie.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListMovies;
