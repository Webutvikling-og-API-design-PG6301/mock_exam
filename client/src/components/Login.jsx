import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../App";
import { useLoading, fetchJSON } from "../helpers/Hooks";
const Login = ({ reload }) => {
  const { Gdata } = useContext(ProfileContext);
  async function handleLogout() {
    await fetch("/api/oauth/google", { method: "delete" });
    reload();
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div>
          <Link to="/g_login">Login With google</Link>
        </div>

        <div>
          <Link to="/ad_login">Login with Active directory</Link>
        </div>
        <div>
          <Link to="/ad_profile">Profile for Active directory</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
