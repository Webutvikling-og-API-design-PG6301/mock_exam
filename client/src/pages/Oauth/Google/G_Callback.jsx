import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const G_Callback = () => {
  const navigate = useNavigate();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );

    await fetch("/api/oauth/google", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    });
    navigate("/");
    console.log(access_token);
  }, []);
  return <div>please wait...</div>;
};

export default G_Callback;
