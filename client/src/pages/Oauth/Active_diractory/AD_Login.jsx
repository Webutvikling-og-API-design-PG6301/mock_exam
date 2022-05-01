import React, { useEffect, useContext } from "react";
import { fetchJSON } from "../../../helpers/Hooks";
import { ProfileContext } from "../../../App";

async function sha256(string) {
  const binaryHash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder("utf-8").encode(string)
  );
  return btoa(String.fromCharCode.apply(null, new Uint8Array(binaryHash)))
    .split("=")[0]
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function randomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  console.log(result);
  return result;
}

const AD_Login = () => {
  const { adData } = useContext(ProfileContext);

  useEffect(async () => {
    const state = randomString(50);
    window.sessionStorage.setItem("expected_state", state);
    const code_verifier = randomString(50);
    window.sessionStorage.setItem("code_verifier", code_verifier);

    const { discovery_url, client_id, scope } = adData.oauth_config_ad;
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
