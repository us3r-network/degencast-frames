/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { backgroundStyles, titleStyles } from "./styles";

export function start(c: any) {
  return c.res({
    action: "/",
    image: "/storage/images/start",
    intents: [<Button action="/check">Get Started</Button>],
  });
}
