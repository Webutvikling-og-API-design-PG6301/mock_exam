import React from "react";

const AD_Profile = ({ user }) => {
  const { userinfo } = user;

  if (!userinfo) {
    return <h1>Whoops, you are not logged in</h1>;
  }
  return (
    <div>
      <h1>Active Directory Profile</h1>
      <div>
        {userinfo && (
          <h1>
            {userinfo.name}({userinfo.email})
          </h1>
        )}
      </div>
    </div>
  );
};

export default AD_Profile;
