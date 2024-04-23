import { FrameContext, Frog, TransactionContext } from "frog";

import images from "./images";
import { start } from "./start";
import { select } from "./select";
import { swapToken } from "./swap-token";
import { buyToken } from "./buy-token";
import { sellToken } from "./sell-token";

// import { finishScreen } from "./finish";
// import { shareScreen } from "./share";

export const app = new Frog({
  //   browserLocation: "https://dev.degencast.xyz",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/start", start);
app.frame("/select/:page", select);
app.frame("/swap/:token", swapToken);
app.transaction("/tx/buy/:token", buyToken);
app.transaction("/tx/sell/:token", sellToken);
// app.frame("/:channel/fid/:fid", startWithFid);
// app.frame("/:channel/buy/share", buy);
// app.frame("/:channel/check/allowance", checkAllowance);

// app.frame("/:channel/finish", finishScreen);
// app.transaction("/:channel/tx/buy", transactionBuy);
// app.transaction("/:channel/tx/sell", transactionSell);

app.route("/images", images);

export default app;
