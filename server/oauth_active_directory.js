import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();
export const Active = express.Router();

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Error fetching ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

const oauth_config_ad = {
  discovery_url:
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration",
  client_id: process.env.CLIENT_ID_ACTIVE_DIRECTORY,
  scope: "openid email profile",
};

/* const discovery_endpoint =
  "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration";
const client_id = process.env.CLIENT_ID_ACTIVE_DIRECTORY; */

/* Active.get("/config", (req, res) => {
  res.json({
    response_type: "code",
    client_id,
    discovery_endpoint,
    scope: "openid profile email",
  });
}); */

Active.delete("/ad", (req, res) => {
  res.clearCookie("access_token");
  res.sendStatus(200);
});

Active.get("/ad", async (req, res) => {
  const { access_token } = req.signedCookies;
  const discoveryDocument = await fetchJSON(oauth_config_ad.discovery_url);
  const { userinfo_endpoint } = discoveryDocument;
  let userinfo = undefined;
  try {
    userinfo = await fetchJSON(userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  } catch (error) {
    console.error({ error });
  }
  res.json({ userinfo, oauth_config_ad }).status(200);
});

Active.post("/ad", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(200);
});
