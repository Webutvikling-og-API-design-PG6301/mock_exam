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
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/login/callback">Login callback</Link>
      </div>
      <div>
        <Link to="/chat">Here goes websockets</Link>
      </div>
    </div>
  );
};

export default Nav;
