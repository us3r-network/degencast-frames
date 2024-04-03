/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { HAI_DI_LAO_FRAME } from "../lib/env";

export function start(c: FrameContext) {
  return c.res({
    action: "/",
    image: "/haidilao/images/start.jpg",
    intents: [<Button action={`/check`}>Check Me</Button>],
  });
}
