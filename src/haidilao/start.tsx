/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { HAI_DI_LAO_FRAME } from "../lib/env";

export function start(c: FrameContext) {
  return c.res({
    action: "/",
    image: "/haidilao/images/start.jpg",
    intents: [
      <Button action={`/check`}>Check</Button>,
      <Button.Link
        href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          "check your haidilao"
        )}&embeds[]=${HAI_DI_LAO_FRAME}`}
      >
        Share
      </Button.Link>,
    ],
  });
}
