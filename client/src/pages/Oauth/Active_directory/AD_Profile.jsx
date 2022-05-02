import React, { useContext } from "react";
import { fetchJSON } from "../../../helpers/Hooks";
import { useLoading } from "../../../helpers/Hooks";
const AD_Profile = () => {
  const { loading, data, error } = useLoading(async () => {
    return await fetchJSON("/api/oauth/ad");
  });
  console.log(data);
  if (loading) {
    return <div>Please wait...</div>;
  }
  if (error) {
    return <div>Error! {error.toString()}</div>;
  }
  return (
    <div>
      <h1>Active Directory Profile</h1>
      <div>
        <h1>{data.name}({data.email})</h1>
        <img src={data.picture} alt=""/>
      </div>
    </div>
  );
};

export default AD_Profile;
