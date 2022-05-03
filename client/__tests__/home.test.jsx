import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Home from "../src/pages/Home/Home";

describe("Home", () => {
  it("should show snapshot", () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(container.innerHTML).toMatchSnapshot();
  });
});
