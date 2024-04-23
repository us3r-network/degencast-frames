/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function start(c: FrameContext<Env, "/", BlankInput>) {
  //   const channel = c.req.param("channel");
  return c.res({
    image: `/tradetoken/images/start.png`,
    intents: [
      <Button action={`/select/1`}>Go Swap</Button>,
      <Button.Link href="https://dev.degencast.xyz">Leaderboard</Button.Link>,
      <Button action={`/share`}>{"Share & Earn"}</Button>,
    ],
  });
}
