import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../App";
import { useLoading, fetchJSON } from "../helpers/Hooks";
const Nav = ({ reload }) => {
  const { Gdata } = useContext(ProfileContext);
  const { data, error, loading } = useLoading(async () => {
    await fetchJSON("/api/oauth/ad");
  });
  async function handleGoogleLogout() {
    await fetch("/api/oauth/google", { method: "delete" });
    reload();
  }
  async function handleActiveLogout() {
    await fetch("/api/oauth/ad", { method: "delete" });
    reload();
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
          width: "600px",
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
        {!Gdata.userinfo ? (
          <div>
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div>
            <Link
              to=""
              onClick={() => {
                handleActiveLogout();
                handleGoogleLogout();
              }}
            >
              Logout
            </Link>
            <div>
              <Link to="/g_profile">Google profile</Link>
            </div>
          </div>
        )}
      </div>
      {!Gdata.userinfo && (
        <div>
          <p>Sign in</p>
        </div>
      )}
      {Gdata.userinfo && (
        <div>
          <p>welcome {Gdata.userinfo.name}</p>
        </div>
      )}
    </div>
  );
};

export default Nav;
