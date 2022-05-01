import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJSON } from "../../../helpers/Hooks";
//import { ProfileContext } from "../../../App";
const AD_Callback = ({ reload }) => {
  const [error, setError] = useState();
  //const { adData } = useContext(ProfileContext);
  const navigate = useNavigate();
  useEffect(async () => {
    // const { discovery_url, client_id, scope } = adData.oauth_config_ad;
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

    if (code) {
      const { token_endpoint } = await fetchJSON(
        "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration"
      );
      const code_verifier = window.sessionStorage.getItem("code_verifier");

      const tokenResponse = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id: "926d67d3-38c4-472d-ae6a-b31dfb1667c8",
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
    } else {
      setError(`Failed POST /api/oauth/ad: ${res.status} ${res.statusText}`);
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
