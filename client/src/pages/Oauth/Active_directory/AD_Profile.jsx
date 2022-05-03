import React, { useContext } from "react";
import { ProfileContext } from "../../../App";
const AD_Profile = () => {
  const { data } = useContext(ProfileContext);

  return (
    <div>
      <h1>Active Directory Profile</h1>
      <div>
        {data.userinfo && (
          <h1>
            {data.userinfo.name}({data.userinfo.email})
          </h1>
        )}
      </div>
    </div>
  );
};

export default AD_Profile;
