import React, { useEffect, useState } from "react";
import { fetchJSON } from "../../../helpers/Hooks";

const G_Login = () => {
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
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(parameters);
  }, []);

  return <h1>Please wait...</h1>;
};

export default G_Login;
