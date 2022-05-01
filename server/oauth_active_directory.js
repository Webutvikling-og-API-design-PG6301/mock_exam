import express from "express";
import dotenv from "dotenv";
import { fetchJSON } from "./fetchJSON.js";
dotenv.config();
export const AD = express.Router();

const oauth_config_ad = {
  discovery_url:
    "https://login.microsoftonline.com/organizations/v2.0/.well-known/openid-configuration",
  client_id: process.env.CLIENT_ID_ACTIVE_DIRECTORY,
  scope: "openid",
};

AD.get("/ad", async (req, res) => {
  const { access_token } = req.signedCookies;
  const discoveryDocument = await fetchJSON(oauth_config_ad.discovery_url);
  const { userinfo_endpoint, token_endpoint } = discoveryDocument;

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

AD.post("/ad", (req, res) => {
  const { access_token } = req.body;
  res.cookie("access_token", access_token, { signed: true });
  res.sendStatus(200);
});
