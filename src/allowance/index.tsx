import { FrameContext, Frog, TransactionContext } from "frog";

import images from "./images";
import { start } from "./start";
import { buy } from "./buy";
import { checkAllowance } from "./allowance";
import { startWithFid } from "./startfid";
import { transactionBuy } from "./transaction-buy";
import { transactionSell } from "./transaction-sell";
import { finishScreen } from "./finish";
import { shareScreen } from "./share";
import { buySuccess } from "./buy-success";
import { sellSuccess } from "./sell-success";

export const app = new Frog({
  browserLocation: "https://dev.degencast.xyz",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/:channel", start);
app.frame("/:channel/share", shareScreen);
app.frame("/:channel/fid/:fid", startWithFid);
app.frame("/:channel/buy/share", buy);
app.frame("/:channel/check/allowance", checkAllowance);

app.frame("/:channel/finish", finishScreen);
app.transaction("/:channel/tx/buy", transactionBuy);
app.transaction("/:channel/tx/sell", transactionSell);

app.frame("/:channel/buy/success", buySuccess);
app.frame("/:channel/sell/success", sellSuccess);

app.route("/images", images);

export default app;
