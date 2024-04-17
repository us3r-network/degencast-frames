/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export const finishScreen = (
  c: FrameContext<Env, "/:channel/finish", BlankInput>
) => {
  const channel = c.req.param("channel");
  return c.res({
    image: `/allowance/images/success.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy more</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button.Link href="https://degencast.xyz">share</Button.Link>,
      // <Button.Link href="https://degencast.xyz">Leaderboard</Button.Link>,
    ],
  });
};
