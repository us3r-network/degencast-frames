/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { ALLOWANCE_FRAME } from "../lib/env";

export function startWithFid(
  c: FrameContext<Env, "/:channel/fid/:fid", BlankInput>
) {
  const channel = c.req.param("channel");
  const fid = c.req.param("fid");
  console.log("start", { channel, fid });

  return c.res({
    action: "/",
    image: `/allowance/images/${channel}/allowance/${fid}/image.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy shares</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button action={`/${channel}/share`}>Share & Earn</Button>,
      // <Button.Link
      //   href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
      //     `Buy shares in degencast`
      //   )}&embeds[]=${ALLOWANCE_FRAME}/${channel}`}
      // >
      //   Share
      // </Button.Link>,
      //   <Button.Link href="https://degencast.xyz">Open App</Button.Link>,
    ],
  });
}
