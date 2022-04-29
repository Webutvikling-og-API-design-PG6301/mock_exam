import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const G_Callback = ({ reload }) => {
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
      reload();
      navigate("/");
    }
  }, []);
  return <div>please wait...</div>;
};

export default G_Callback;
