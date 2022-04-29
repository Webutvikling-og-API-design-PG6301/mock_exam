import React, { useContext, useState, useEffect } from "react";
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
import ListMovies from "./pages/ListMovies";
// Active diractory oAuth

export const ProfileContext = React.createContext({
  userinfo: undefined,
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  useEffect(loadLoginInfo, []);

  async function loadLoginInfo() {
    setLoading(true);
    setData(await fetchJSON("/api/oauth/google"));
    setLoading(false);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContext.Provider value={data}>
      <Nav reload={loadLoginInfo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/list" element={<ListMovies />} />
        <Route
          path="/movies/add"
          element={<h1>add new movie to the database</h1>}
        />
        <Route path="/g_login" element={<G_Login />} />
        <Route
          path="/g_login/callback"
          element={<G_Callback reload={loadLoginInfo} />}
        />
        <Route path="/g_profile" element={<G_Profile />} />
        <Route path="/chat" element={<h1>Use websockets here</h1>} />
      </Routes>
    </ProfileContext.Provider>
  );
};

export default App;
