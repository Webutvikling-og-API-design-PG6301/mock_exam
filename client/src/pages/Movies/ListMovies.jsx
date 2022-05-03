import React, { useState, useContext } from "react";
import { fetchJSON, useLoading } from "../../helpers/Hooks";
import { ApiContext } from "../../helpers/ApiContext";

import SingleMovie from "./SingleMovie";

const ListMovies = () => {
  const { listMovies } = useContext(ApiContext);
  console.log(listMovies);
  const [country, setCountry] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const { data, error, loading } = useLoading(
    async () => listMovies({ country }),
    [country]
  );
  console.log(country);

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

  function handleSubmitQuery(e) {
    e.preventDefault();
    setCountry(countryQuery);
    console.log(countryQuery);
  }

  return (
    <div>
      <h1>List movies</h1>
      <div>
        <form onSubmit={handleSubmitQuery}>
          <label>
            Country:
            <input
              id="country-query"
              value={countryQuery}
              onChange={(e) => setCountryQuery(e.target.value)}
            />
            <button>Filter</button>
          </label>
        </form>
      </div>
      <div>
        {data.map((movie) => {
          return <SingleMovie key={data.movie} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default ListMovies;
