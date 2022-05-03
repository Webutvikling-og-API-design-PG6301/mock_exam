import React from "react";
import ReactDOM from "react-dom";
import { Simulate } from "react-dom/test-utils";
import { ApiContext } from "../src/helpers/ApiContext";
import { MemoryRouter } from "react-router-dom";
import AddMovies from "../src/pages/Movies/AddMovies";
describe("add movie component", () => {
  it("shows movies form", () => {
    const userinfo = jest.fn();
    const element = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddMovies googleUser={userinfo} ADUser={userinfo} />
      </MemoryRouter>,
      element
    );

    expect(element.querySelector("h1").innerHTML).toEqual(
      "Whoooaa. not so fast! sign in please"
    );
  });
});
