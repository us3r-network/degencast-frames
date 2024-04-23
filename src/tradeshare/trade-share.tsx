/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function tradeShare(
  c: FrameContext<Env, "/trade/:share", BlankInput>
) {
  const share = c.req.param("share");
  const fid = c.frameData?.fid!;

  // TODO: Get share info

  return c.res({
    action: `/${share}/finish`,
    image: `/tradeshare/images/trade/${share}/allowance/${fid}/page.png`,
    intents: [
      <Button action={`/select/1`}>Back</Button>,
      <Button.Transaction target={`/tx/buy/${share}`}>Buy</Button.Transaction>,
      <Button.Transaction target={`/tx/sell/${share}`}>
        Sell
      </Button.Transaction>,
      <Button.Link href="https://dev.degencast.xyz">View more</Button.Link>,
    ],
  });
}
