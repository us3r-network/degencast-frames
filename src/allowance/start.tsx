/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function start(c: FrameContext<Env, "/:channel", BlankInput>) {
  const channel = c.req.param("channel");
  return c.res({
    image: `/allowance/images/${channel}/start.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy shares</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button action={`/${channel}/share`}>Share & Earn</Button>,
    ],
  });
}
