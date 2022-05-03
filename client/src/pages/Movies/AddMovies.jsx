import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "./FormInput";
import { ApiContext } from "../../helpers/ApiContext";

const AddMovies = ({ googleUser, ADUser }) => {
  const navigate = useNavigate();
  const { createMovie } = useContext(ApiContext);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [country, setCountry] = useState("");
  const [plot, setPlot] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    createMovie({ title, year: parseInt(year), country, plot });
    navigate("/");
  }

  if (!googleUser.userinfo && !ADUser.userinfo) {
    return <h1>Whoooaa. not so fast! sign in please</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add new movie</h1>

      <FormInput label={"Title:"} value={title} onChangeValue={setTitle} />
      <FormInput label={"Year:"} value={year} onChangeValue={setYear} />
      <FormInput
        label={"Country:"}
        value={country}
        onChangeValue={setCountry}
      />
      <FormInput label={"Plot:"} value={plot} onChangeValue={setPlot} />
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default AddMovies;
