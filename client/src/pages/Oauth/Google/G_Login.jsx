import React, { useEffect, useContext, createContext } from "react";
import { fetchJSON } from "../../../helpers/Hooks";
import { ProfileContext } from "../../../App";
const G_Login = () => {
  const { data } = useContext(ProfileContext);
  console.log(data.oauth_config);

  useEffect(async () => {
    const { discovery_url, client_id, scope } = data.oauth_config;
    const discoveryDocument = await fetchJSON(discovery_url);
    const { authorization_endpoint } = discoveryDocument;
    const params = {
      response_type: "token",
      response_mode: "fragment",
      scope,
      client_id,
      redirect_uri: window.location.origin + "/g_login/callback",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }, []);

  return <h1>Please wait...</h1>;
};

export default G_Login;
