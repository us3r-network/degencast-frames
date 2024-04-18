/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { ALLOWANCE_FRAME } from "../lib/env";

export async function start(c: FrameContext<Env, "/:channel", BlankInput>) {
  const channel = c.req.param("channel");
  console.log("start", { channel });
  const { buttonValue, status, buttonIndex } = c;
  let currInvite = c.req.query("invite");
  console.log({ currInvite });
  let fidInvite = "";

  if (status === "redirect") {
    await new Promise((r) => setTimeout(r, 1000));
    fidInvite = "5678";
  }

  console.log({ fidInvite, currInvite });
  return c.res({
    action: `/${channel}?invite=${currInvite}`,
    image: `/allowance/images/${channel}/start.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy shares</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button.Redirect
        location={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Buy shares in degencast`
        )}&embeds[]=${ALLOWANCE_FRAME}/${channel}?invite=${fidInvite}`}
      >
        Share
      </Button.Redirect>,
      // <Button.Link href="https://degencast.xyz">Open App</Button.Link>,
    ],
  });
}
