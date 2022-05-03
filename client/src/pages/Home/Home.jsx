import React, { useContext } from "react";
import { ProfileContext } from "../../App";
const Home = () => {
  const { Gdata, data } = useContext(ProfileContext);
  return (
    <div>
      <h1>Web Api Exam 2022</h1>

      <div>
        <h2>
          Welcome you are.. Please be patience! This application is under
          development. Bugs and unexpected crashes can occur
        </h2>
        <p>Whitout further ado, feel free to explore </p>
      </div>
      {Gdata.userinfo && (
        <div>
          <h2>Welcome to google {Gdata.userinfo.name}</h2>
          <p>
            You can now add movies to the list and you can visit your profile{" "}
            <a href="/g_profile">here</a>
          </p>
        </div>
      )}

      {data.userinfo && (
        <div>
          <h2>Welcome to Active directory {data.userinfo.name}</h2>
          <p>
            You can now add movies to the list and you can visit your profile{" "}
            <a href="/ad_profile">here</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
