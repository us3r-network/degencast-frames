import { FrameContext, Frog, TransactionContext } from "frog";

import images from "./images";
import { startShare } from "./start-share";
import { selectShare } from "./select-share";
import { tradeShare } from "./trade-share";
import { buyToken } from "./buy-token";
import { sellToken } from "./sell-token";
import { transactionBuy } from "./transaction-buy";
import { transactionSell } from "./transaction-sell";
import { finishScreen } from "./finish";
import { shareScreen } from "./share";

// import { finishScreen } from "./finish";
// import { shareScreen } from "./share";

export const app = new Frog({
  //   browserLocation: "https://dev.degencast.xyz",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/start/share", startShare);
app.frame("/select/:page", selectShare);
app.frame("/trade/:share", tradeShare);

app.transaction("/tx/buy/:share", transactionBuy);
app.transaction("/tx/sell/:share", transactionSell);
app.frame("/finish/:share", finishScreen);
app.frame("/shareearn", shareScreen);
app.route("/images", images);

export default app;
