import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
const Nav = ({ reload, reloadAd, user, user2 }) => {
  console.log(user);
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
          width: "350px",
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
        {!user.userinfo ? (
          <div>
            <Link data-testid={"google"} to="/g_login">
              Google
            </Link>
          </div>
        ) : (
          <div>
            <Link to="" onClick={handleGoogleLogout}>
              Logout
            </Link>
          </div>
        )}

        {!user2.userinfo ? (
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
