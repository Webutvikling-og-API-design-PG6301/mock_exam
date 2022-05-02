import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileContext } from "../../../App";
import { fetchJSON } from "../../../helpers/Hooks";
//import { ProfileContext } from "../../../App";
const AD_Callback = () => {
  const [error, setError] = useState();
  const { data } = useContext(ProfileContext);
  const navigate = useNavigate();
  useEffect(async () => {
    console.log(data);
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
    const { discovery_endpoint, client_id, scope } = await data;
    console.log(discovery_endpoint, client_id);
    if (code) {
      const { token_endpoint } = await fetchJSON(discovery_endpoint);
      const code_verifier = window.sessionStorage.getItem("code_verifier");
      console.log(token_endpoint);
      const tokenResponse = await fetch(token_endpoint, {
        method: "POST",
        body: new URLSearchParams({
          code,
          grant_type: "authorization_code",
          client_id,
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
