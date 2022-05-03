import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { ApiContext } from "../src/helpers/ApiContext";
import { MemoryRouter } from "react-router-dom";
import AddMovies from "../src/pages/Movies/AddMovies";
describe("add movie component", () => {
  it("shows movies form", () => {
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddMovies />
      </MemoryRouter>,
      element
    );
    expect(element.innerHTML).toMatchSnapshot();
    expect(
      Array.from(element.querySelectorAll("form label strong")).map(
        (e) => e.innerHTML
      )
    ).toEqual(["Title:", "Year:", "Country:", "Plot:"]);
  });

  it("adds movie on submit", () => {
    const createMovie = jest.fn();
    const title = "Test movie";
    const element = document.createElement("div");
    ReactDOM.render(
      <ApiContext.Provider value={{ createMovie }}>
        <MemoryRouter>
          <AddMovies />
        </MemoryRouter>
      </ApiContext.Provider>,
      element
    );
    Simulate.change(element.querySelector(".form-input input"), {
      target: { value: title },
    });
    Simulate.change(element.querySelector(".form-input:nth-of-type(2) input"), {
      target: { value: "2022" },
    });
    Simulate.submit(element.querySelector("form"));
    expect(createMovie).toBeCalledWith({
      title,
      country: "",
      year: 2022,
      plot: "",
    });
  });
});
