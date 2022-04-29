import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import ListMovies from "./pages/ListMovies";

// Google oAuth
import G_Login from "./pages/Oauth/Google/G_Login";
import G_Profile from "./pages/Oauth/Google/G_Profile";
import G_Callback from "./pages/Oauth/Google/G_Callback";
// Active diractory oAuth

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
        <Route path="/g_login" element={<G_Login />} />
        <Route path="/g_login/callback" element={<G_Callback />} />
        <Route path="/g_profile" element={<G_Profile />} />
        <Route path="/chat" element={<h1>Use websockets here</h1>} />
      </Routes>
    </>
  );
};

export default App;
