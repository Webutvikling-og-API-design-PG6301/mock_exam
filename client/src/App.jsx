import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import ListMovies from "./pages/ListMovies";
const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<h1>Landingpage</h1>} />
        <Route path="/movies/list" element={<ListMovies />} />
        <Route
          path="/movies/add"
          element={<h1>add new movie to the database</h1>}
        />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/login/callback" element={<h1>Login callback</h1>} />
        <Route path="/chat" element={<h1>Use websockets here</h1>} />
      </Routes>
    </>
  );
};

export default App;
