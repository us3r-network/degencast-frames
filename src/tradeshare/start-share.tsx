/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function startShare(c: FrameContext<Env, "/", BlankInput>) {
  //   const channel = c.req.param("channel");
  return c.res({
    image: `/tradeshare/images/startshare.png`,
    intents: [
      <Button action={`/select/1?from=top`}>Buy Shares</Button>,
      <Button.Link href="https://dev.degencast.xyz">Leaderboard</Button.Link>,
      <Button action={`/share`}>{"Share & Earn"}</Button>,
    ],
  });
}
