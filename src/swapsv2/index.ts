import { FrameContext, Frog, TransactionContext } from "frog";

import { start } from "./start";
import { getFont } from "../lib/fonts";
import { transaction } from "./transaction";
import { finishScreen } from "./finish";
import { tokenSelectionScreen } from "./token-selection";
import { selectedToken } from "./selected-token";

import images from "./image";

type FrogOptions = {
  Bindings: {
    API_KEY_0X_API_KEY: string;
  };
};

export type CustomFrameContext = FrameContext<FrogOptions>;
export type CustomTransactionContext = TransactionContext<FrogOptions>;

export const app = new Frog<FrogOptions>({
  // browserLocation: "/swaps",
  imageOptions: async () => {
    const gilroy = await getFont("gilroy");
    const inter = await getFont("inter");
    return { fonts: [gilroy, inter] };
  },
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
});

app.route("/images", images);

app.frame("/", start);
app.frame("/token-selection", tokenSelectionScreen);
app.frame("/selected-token", selectedToken);
app.frame("/finish", finishScreen);
app.transaction("/tx", transaction);

export default app;
