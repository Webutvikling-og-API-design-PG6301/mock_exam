import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const G_Callback = ({ reload }) => {
  const [error, setError] = useState();

  const navigate = useNavigate();
  useEffect(async () => {
    const { access_token } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    const res = await fetch("/api/oauth/google", {
      method: "post",
      body: new URLSearchParams({ access_token }),
    });
    if (res.ok) {
      navigate("/");
      reload();
    } else {
      setError(
        `Failed to POST /api/oauth/google: ${res.status} ${res.statusText}`
      );
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

export default G_Callback;
