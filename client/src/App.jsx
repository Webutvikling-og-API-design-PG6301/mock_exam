import React, { useContext, useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchJSON, useLoading } from "./helpers/Hooks";

// component
import Nav from "./components/Nav";

// Google oAuth
import G_Login from "./pages/Oauth/Google/G_Login";
import G_Profile from "./pages/Oauth/Google/G_Profile";
import G_Callback from "./pages/Oauth/Google/G_Callback";

// Home
import Home from "./pages/Home/Home";

// Active directory oAuth
import AD_Login from "./pages/Oauth/Active_directory/AD_Login";
import AD_Callback from "./pages/Oauth/Active_directory/AD_Callback";

// Movies
import AddMovies from "./pages/Movies/AddMovies";
import ListMovies from "./pages/Movies/ListMovies";
import AD_Profile from "./pages/Oauth/Active_directory/AD_Profile";
import Login from "./components/Login";

export const ProfileContext = React.createContext();

const App = () => {
  const { loading, error, data, reload } = useLoading(() =>
    fetchJSON("/api/oauth/ad")
  );

  const {
    loading: Gload,
    error: Gerror,
    data: Gdata,
    reload: Greload,
  } = useLoading(() => fetchJSON("/api/oauth/google"));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContext.Provider value={{ data, Gdata }}>
      <Nav reload={Greload} reloadAd={reload} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/list" element={<ListMovies />} />
        <Route path="/movies/add" element={<AddMovies />} />
        <Route path="/ad_login" element={<AD_Login />} />
        <Route path="/ad_profile" element={<AD_Profile />} />
        <Route
          path="/ad_login/callback"
          element={<AD_Callback reload={reload} />}
        />
        <Route
          path="/g_login/callback"
          element={<G_Callback reload={Greload} />}
        />
        <Route path="/g_login" element={<G_Login />} />
        <Route path="/g_profile" element={<G_Profile />} />
        <Route path="/chat" element={<h1>Use websockets here</h1>} />
      </Routes>
    </ProfileContext.Provider>
  );
};

export default App;
