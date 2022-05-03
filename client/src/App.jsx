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

import { ApiContext } from "./helpers/ApiContext";

export const ProfileContext = React.createContext();

const App = () => {
  const { provideGoogle, provideActiveDirectory } = useContext(ApiContext);

  const {
    data: googleData,
    error: googleError,
    loading: googleLoad,
    reload: googleReload,
  } = useLoading(provideGoogle);

  const {
    data: ADData,
    error: ADError,
    loading: ADLoad,
    reload: ADReload,
  } = useLoading(provideActiveDirectory);

  if (ADLoad || googleLoad) {
    return <div>Loading...</div>;
  }

  if (ADError || googleError) {
    return <h1>Error: {ADError.toString() || googleError.toString()}</h1>;
  }

  return (
    <>
      <Nav
        reload={googleReload}
        user2={ADData}
        user={googleData}
        reloadAd={ADReload}
      />
      <Routes>
        <Route path="/" element={<Home user={googleData} user2={ADData} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies/list" element={<ListMovies />} />
        <Route
          path="/movies/add"
          element={<AddMovies googleUser={googleData} ADDUser={ADData} />}
        />
        <Route path="/ad_login" element={<AD_Login config={ADData} />} />
        <Route path="/ad_profile" element={<AD_Profile user={ADData} />} />
        <Route
          path="/ad_login/callback"
          element={<AD_Callback reload={ADReload} config={ADData} />}
        />
        <Route
          path="/g_login/callback"
          element={<G_Callback reload={googleReload} config={googleData} />}
        />
        <Route path="/g_login" element={<G_Login config={googleData} />} />
        <Route path="/g_profile" element={<G_Profile user={googleData} />} />
        <Route path="/chat" element={<h1>Use websockets here</h1>} />
      </Routes>
    </>
  );
};

export default App;
