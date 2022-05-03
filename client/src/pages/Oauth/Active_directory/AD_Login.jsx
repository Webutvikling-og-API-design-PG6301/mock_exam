import React, { useEffect, useContext } from "react";
import { fetchJSON } from "../../../helpers/Hooks";

import { sha256, randomString } from "../../../helpers/utils";
const AD_Login = ({ config }) => {
  const { oauth_config_ad } = config;
  useEffect(async () => {
    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);

    const { discovery_url, client_id, scope } = oauth_config_ad;
    const discoveryDocument = await fetchJSON(discovery_url);
    const { authorization_endpoint } = discoveryDocument;
    const params = {
      response_type: "code",
      response_mode: "fragment",
      scope,
      client_id,
      state,
      code_challenge: await sha256(code_verifier),
      code_challenge_method: "S256",
      redirect_uri: window.location.origin + "/ad_login/callback",
    };
    window.location.href =
      authorization_endpoint + "?" + new URLSearchParams(params);
  }, []);

  return <h1>Please wait...</h1>;
};

export default AD_Login;
