/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { backgroundStyles, titleStyles } from "./styles";
import { assets } from "./token-selection";

export function start(c: any) {
  return c.res({
    action: "/",
    image: "/swapsv2/images/start",
    intents: [<Button action={`/token-selection`}>Get Started</Button>],
  });
}
