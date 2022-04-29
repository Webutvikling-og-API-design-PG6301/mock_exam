import React from "react";
import { useLoading, fetchJSON } from "../../../helpers/Hooks";
const G_Profile = () => {
  const { loading, data, error } = useLoading(async () => {
    return await fetchJSON("api/oauth/google");
  });

  if (loading) {
    return <h1>please wait...</h1>;
  }

  if (error) {
    return <p>Error! {error.toString()}</p>;
  }

  return (
    <div>
      <h1>Google profile</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default G_Profile;
