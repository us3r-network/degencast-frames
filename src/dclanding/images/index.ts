import { Frog } from "frog";
import * as fs from "node:fs";
import { URL } from "node:url";

const __filename = new URL("", import.meta.url).pathname;
const __dirname = new URL(".", import.meta.url).pathname;

const homeJPG = fs.readFileSync(__dirname + "/home.jpg");
const notifyJPG = fs.readFileSync(__dirname + "/notify.jpg");
const featuresJPG = fs.readFileSync(__dirname + "/features.jpg");

const images = new Frog();

images.hono.get("/home.jpg", async (ctx) => {
  ctx.header("Content-Type", "image/jpeg");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(homeJPG);
});

images.hono.get("/notify.jpg", async (ctx) => {
  ctx.header("Content-Type", "image/jpeg");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(notifyJPG);
});

images.hono.get("/features.jpg", async (ctx) => {
  ctx.header("Content-Type", "image/jpeg");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(featuresJPG);
});

export default images;
