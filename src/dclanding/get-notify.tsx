/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";

export function getNotify(c: FrameContext) {
  return c.res({
    action: "/",
    image: "/dclanding/images/notify.jpg",
    intents: [
      <Button.Link href="https://warpcast.com/liang">View @liang</Button.Link>,
      <Button.Link href="https://warpcast.com/~/channel/degencast">
        View /degencast
      </Button.Link>,
    ],
  });
}
