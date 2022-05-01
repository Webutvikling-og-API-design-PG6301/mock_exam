import React from "react";

const SingleMovie = ({ movie }) => {
  return (
    <div key={movie.title}>
      <h1>{movie.title}</h1>
      <p>{movie.plot}</p>
      {movie.poster && (
        <img src={movie.poster} width={120} alt="poster of the film" />
      )}
    </div>
  );
};

export default SingleMovie;
