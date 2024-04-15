/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";

export function start(c: FrameContext) {
  return c.res({
    action: "/",
    image: "/allowance/images/start.jpg",
    intents: [
      <Button action={`/buy`}>Buy channel shares</Button>,
      <Button action={`/check`}>Check my allowance</Button>,
      <Button.Link href="https://degencast.xyz">Open App</Button.Link>,
    ],
  });
}
