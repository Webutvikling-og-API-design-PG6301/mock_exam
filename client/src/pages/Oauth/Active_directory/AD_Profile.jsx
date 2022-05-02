import React, { useContext } from "react";
import { fetchJSON } from "../../../helpers/Hooks";
import { useLoading } from "../../../helpers/Hooks";
import { ProfileContext } from "../../../App";
const AD_Profile = () => {
  const { data } = useContext(ProfileContext);
  const { userinfo } = data;

  return (
    <div>
      <h1>Active Directory Profile</h1>
      <div>
        <h1>
          {userinfo.name}({userinfo.email})
        </h1>
      </div>
    </div>
  );
};

export default AD_Profile;
