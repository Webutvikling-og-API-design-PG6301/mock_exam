import React, { useContext, useState, useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchJSON, useLoading } from "./helpers/Hooks";

// component
import Nav from "./components/Nav";

// Google oAuth
import G_Login from "./pages/Oauth/Google/G_Login";
import G_Profile from "./pages/Oauth/Google/G_Profile";
import G_Callback from "./pages/Oauth/Google/G_Callback";

// pages
import Home from "./pages/Home/Home";
import ListMovies from "./pages/Movies/ListMovies";

// Active diractory oAuth
import AD_Login from "./pages/Oauth/Active_diractory/AD_Login";
import AD_Callback from "./pages/Oauth/Active_diractory/AD_Callback";

export const ProfileContext = React.createContext({
  userinfo: undefined,
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [adData, setAdData] = useState();
  useEffect(() => {
    loadAdInfo();
    loadLoginInfo();
  }, []);
  console.log(data);
  async function loadLoginInfo() {
    setLoading(true);
    setData(await fetchJSON("/api/oauth/google"));
    setLoading(false);
  }
  async function loadAdInfo() {
    setLoading(true);
    setAdData(await fetchJSON("/api/oauth/ad"));
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  oauthData = {
    data,
    adData,
  };

  console.log(oauthData);

  return (
    <ProfileContext.Provider value={oauthData}>
      <Nav reload={loadLoginInfo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/list" element={<ListMovies />} />
        <Route
          path="/movies/add"
          element={<h1>add new movie to the database</h1>}
        />
        <Route path="/g_login" element={<G_Login />} />
        <Route path="/ad_login" element={<AD_Login />} />
        <Route
          path="/g_login/callback"
          element={<G_Callback reload={loadLoginInfo} />}
        />
        <Route
          path="/ad_login/callback"
          element={<AD_Callback reload={loadAdInfo} />}
        />
        <Route path="/g_profile" element={<G_Profile />} />
        <Route path="/chat" element={<h1>Use websockets here</h1>} />
      </Routes>
    </ProfileContext.Provider>
  );
};

export default App;
