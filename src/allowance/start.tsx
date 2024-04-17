/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export function start(c: FrameContext<Env, "/:channel", BlankInput>) {
  const channel = c.req.param("channel");
  console.log("start", { channel });

  return c.res({
    action: "/",
    image: `/allowance/images/${channel}/start.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy shares</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button.Link href="https://degencast.xyz">Share</Button.Link>,
      // <Button.Link href="https://degencast.xyz">Open App</Button.Link>,
    ],
  });
}