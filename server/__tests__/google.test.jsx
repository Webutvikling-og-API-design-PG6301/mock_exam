import express from "express";
import bodyParser from "body-parser";
import request from "supertest";
import cookieParser from "cookie-parser";
import { Google } from "../oauth_google.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser("test secret"));
app.use("/api/oauth", Google);

describe("test server", () => {
  it("should test", async () => {
    await request(app).get("/api/ouath/google").expect(404);
  });
});
