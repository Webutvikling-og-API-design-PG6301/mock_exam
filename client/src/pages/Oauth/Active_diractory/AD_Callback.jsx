import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AD_Callback = ({ reload }) => {
  const [error, setError] = useState();

  const navigate = useNavigate();
  useEffect(async () => {
    const { code } = Object.fromEntries(
      new URLSearchParams(window.location.hash.substring(1))
    );
    const res = await fetch("/api/oauth/ad", {
      method: "post",
      body: new URLSearchParams({ code }),
    });
    if (res.ok) {
      reload();
      navigate("/");
    } else {
      setError(`Failed to POST /api/oauth/ad: ${res.status} ${res.statusText}`);
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
