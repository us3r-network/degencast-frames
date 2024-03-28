import { FrameContext, Frog, TransactionContext } from "frog";
// import { pinata } from "frog/hubs";

import { start } from "./start";
import { check } from "./check";
import { rent } from "./rent";
import { finish } from "./finish";

import images from "./images";

export const app = new Frog({
  //   browserLocation: "https://degencast.xyz/landing",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/", start);
app.frame("/check", check);
app.transaction("/rent", rent);
app.frame("/finish", finish);

app.route("/images", images);

export default app;
