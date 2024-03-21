/** @jsxImportSource frog/jsx */

import { Button, FrameContext } from "frog";

export function learnMore(c: FrameContext) {
  return c.res({
    action: "/",
    image: "/dclanding/images/features.jpg",
    intents: [
      <Button action={`/`}>Back</Button>,
      <Button action={`/get-notify`}>Get notified</Button>,
    ],
  });
}
