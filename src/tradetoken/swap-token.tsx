/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function swapToken(
  c: FrameContext<Env, "/swap/:token", BlankInput>
) {
  const token = c.req.param("token");
  return c.res({
    image: `/tradetoken/images/swap/${token}/page.png`,
    intents: [
      <Button action={`/start`}>Back</Button>,
      <Button.Transaction target={`/tx/buy/${token}`}>Buy</Button.Transaction>,
      <Button.Transaction target={`/tx/sell/${token}`}>
        Sell
      </Button.Transaction>,
      <Button.Link href="https://dev.degencast.xyz">View more</Button.Link>,
    ],
  });
}
