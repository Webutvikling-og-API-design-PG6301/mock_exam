import React, { useContext } from "react";
const G_Profile = ({ user }) => {
  const { userinfo } = user;
  if (!userinfo) {
    return <h1>Whoops, you are not logged in</h1>;
  }

  return (
    <div>
      <h1>Google profile</h1>
      <div>
        <h2>{userinfo.name}</h2>
        <p>{userinfo.email}</p>
        {userinfo.picture && (
          <img
            src={userinfo.picture}
            alt={userinfo.name + " profile picture"}
          />
        )}
      </div>
    </div>
  );
};

export default G_Profile;
