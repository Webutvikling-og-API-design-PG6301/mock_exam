import React from "react";
const Home = ({ user, user2 }) => {
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
      {user.userinfo && (
        <div>
          <h2>Welcome to google {user.userinfo.name}</h2>
          <p>
            You can now add movies to the list and you can visit your profile{" "}
            <a href="/g_profile">here</a>
          </p>
        </div>
      )}

      {user2.userinfo && (
        <div>
          <h2>Welcome to Active directory {user2.userinfo.name}</h2>
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
