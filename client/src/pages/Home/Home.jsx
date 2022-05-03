import React, { useContext } from "react";
import { ProfileContext } from "../../App";
const Home = () => {
  const { Gdata, data } = useContext(ProfileContext);
  return (
    <div>
      <h1>Web Api Exam 2022</h1>
      {Gdata.userinfo ? (
        <div>
          <h2>Welcome to google {Gdata.userinfo.name}</h2>
          <p>
            You can now add movies to the list and you can visit your profile{" "}
            <a href="/g_profile">here</a>
          </p>
        </div>
      ) : (
        <div>
          <h2>
            Welcome you are.. Please do sign in to either one of the oauth
            providers. It's located easly up in the top right corner, you see..
            Cheers lad!
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
