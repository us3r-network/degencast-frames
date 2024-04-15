import { FrameContext, Frog, TransactionContext } from "frog";

import images from "./images";
import { start } from "./start";
import { buy } from "./buy";

export const app = new Frog({
  // browserLocation: "https://haidilao.degencast.xyz",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/", start);
app.frame("/buy", buy);

app.route("/images", images);

export default app;
