/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";

export function start(c: FrameContext) {
  return c.res({
    action: "/",
    image: "/dclanding/images/home.jpg",
    intents: [
      <Button action={`/learn-more`}>Learn More</Button>,
      <Button action={`/get-notify`}>Get notified</Button>,
    ],
  });
}
