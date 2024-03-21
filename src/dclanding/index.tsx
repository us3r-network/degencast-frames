import { FrameContext, Frog, TransactionContext } from "frog";
// import { pinata } from "frog/hubs";

import { start } from "./start";

import { learnMore } from "./learn-more";
import { getNotify } from "./get-notify";
import images from "./images";

export const app = new Frog({
  //   browserLocation: "https://degencast.xyz/landing",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/", start);
app.frame("/learn-more", learnMore);
app.frame("/get-notify", getNotify);

app.route("/images", images);

export default app;
