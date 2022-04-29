import React, { useEffect, useState } from "react";
import { fetchJSON } from "../../../helpers/Hooks";

const G_Login = () => {
  const [redirectUrl, setRedirectUrl] = useState();

  useEffect(async () => {
    const { authorization_endpoint } = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
    );

    const parameters = {
      response_type: "token",
      client_id:
        "675880555285-bdvhf1t27kgfjf0ce7lak5kq4hjntaiu.apps.googleusercontent.com",
      scope: "email profile",
      redirect_uri: window.location.origin + "/g_login/callback",
    };
    setRedirectUrl(
      authorization_endpoint + "?" + new URLSearchParams(parameters)
    );
  }, []);

  return (
    <div>
      <h1>Welcome to Googles Login page</h1>
      <a href={redirectUrl}>Login</a>
      <div>{redirectUrl}</div>
    </div>
  );
};

export default G_Login;
