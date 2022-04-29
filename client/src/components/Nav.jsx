import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../App";

const Nav = ({ reload }) => {
  const { userinfo } = useContext(ProfileContext);

  async function handleLogout() {
    await fetch("/api/oauth/google", { method: "delete" });
    reload();
  }
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/movies/list">List movies</Link>
      </div>
      <div>
        <Link to="/movies/add">Add movies</Link>
      </div>
      {!userinfo ? (
        <div>
          <Link to="/g_login">Login With google</Link>
        </div>
      ) : (
        <div>
          <Link to="" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      )}
      {userinfo && (
        <div>
          <Link to="/g_profile">Google profile</Link>
        </div>
      )}

      <div>
        <Link to="/chat">Here goes websockets</Link>
      </div>
    </div>
  );
};

export default Nav;
