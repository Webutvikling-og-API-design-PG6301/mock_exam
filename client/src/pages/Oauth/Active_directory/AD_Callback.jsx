import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "../../../helpers/Hooks";

const AD_Callback = ({ reload, config }) => {
  const [error, setError] = useState();
  console.log(config);
  const navigate = useNavigate();
  useEffect(async () => {
    const expectedState = window.sessionStorage.getItem("expected_state");
    const { access_token, error, error_description, state, code } =
      Object.fromEntries(
        new URLSearchParams(window.location.hash.substring(1))
      );

    let accessToken = access_token;

    if (expectedState !== state) {
      setError("Unexpected redirect (state mismatch)");
      return;
    }

    if (error || error_description) {
      setError(`Error: ${error} ${error_description}`);
      return;
    }
    //const { discovery_url, client_id, scope } = data.oauth_config_ad;

    if (code) {
      const { token_endpoint } = await fetchJSON(
        "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration"
      );
      const code_verifier = window.sessionStorage.getItem("code_verifier");
      console.log(token_endpoint);
      const tokenResponse = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id: "8efa99d6-1400-42d4-a8e2-a7dcd030bb12",
          code_verifier,
          redirect_uri: window.location.origin + "/ad_login/callback",
        }),
      });
      if (tokenResponse.ok) {
        const { access_token } = await tokenResponse.json();

        accessToken = access_token;
      } else {
        setError(`token response ${await tokenResponse.text()}`);
        return;
      }
    }
    console.log(accessToken);
    if (!accessToken) {
      setError("Missing access token");
      return;
    }

    const res = await fetch("/api/oauth/ad", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token: accessToken }),
    });
    if (res.ok) {
      navigate("/");
      reload();
    } else {
      setError(`Failed POST /api/login: ${res.status} ${res.statusText}`);
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return <div>please wait...</div>;
};

export default AD_Callback;
