import React from "react";
import { Link } from "react-router-dom";
const Nav = () => {
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
      <div>
        <Link to="/g_login">Login With google</Link>
      </div>

      <div>
        <Link to="/chat">Here goes websockets</Link>
      </div>
    </div>
  );
};

export default Nav;
