import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../App";
import { useLoading, fetchJSON } from "../helpers/Hooks";
const Nav = ({ reload, reloadAd }) => {
  const { Gdata, data } = useContext(ProfileContext);

  async function handleGoogleLogout() {
    await fetch("/api/oauth/google", { method: "delete" });
    reload();
  }
  async function handleActiveLogout() {
    await fetch("/api/oauth/ad", { method: "delete" });
    reloadAd();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "400px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/movies/list">List movies</Link>
        </div>
        <div>
          <Link to="/movies/add">Add movies</Link>
        </div>
        <div>
          <Link to="/chat">Here goes websockets</Link>
        </div>
      </div>

      <div>
        {!Gdata.userinfo ? (
          <div>
            <Link to="/g_login">Google</Link>
          </div>
        ) : (
          <div>
            <Link to="" onClick={handleGoogleLogout}>
              Logout
            </Link>
          </div>
        )}

        {!data.userinfo ? (
          <div>
            <Link to="/ad_login">Active Directory</Link>
          </div>
        ) : (
          <div>
            <Link to="" onClick={handleActiveLogout}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
