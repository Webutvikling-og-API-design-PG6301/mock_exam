import express from "express";
import fetch from 'node-fetch'

export const Oauth = express.Router();

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Failed ${res.status}`);
  }
  return await res.json();
}

Oauth.get("/google", async (req, res) => {
  const {access_token} = req.signedCookies;

  const {userinfo_endpoint} = await fetchJSON(
      "https://accounts.google.com/.well-known/openid-configuration"
  );
  let userinfo = undefined;
  try {
    userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.json(userinfo);

});


Oauth.post("/google", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.send(200);
});
