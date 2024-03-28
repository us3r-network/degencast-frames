import { serve } from "@hono/node-server";
import { Button, Frog, FrogConstructorParameters, TextInput } from "frog";
// import { serveStatic } from "@hono/node-server/serve-static";

import dclandingApp from "./dclanding";
import swapsv2App from "./swapsv2";
import storageApp from "./storage";
import { ORIGIN } from "./lib/env";

const appConfig: FrogConstructorParameters = {
  basePath: "/",
  // browserLocation: "https://degencast.xyz",
  headers: {
    "Cache-Control": "max-age=0",
  },
};

if (ORIGIN) {
  appConfig.origin = ORIGIN;
}

export const app = new Frog(appConfig);

// app.use("/*", serveStatic({ root: "/public" }));

app.route("/dclanding", dclandingApp);
app.route("/swapsv2", swapsv2App);
app.route("/storage", storageApp);

app.hono.get("/hello", async (ctx) => {
  return ctx.text("Hello, world!" + ORIGIN);
});

const port = 3000;
serve({
  fetch: app.fetch,
  port,
});
console.log(`Server is running on port ${port}`);
