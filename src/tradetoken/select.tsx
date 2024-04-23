/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function select(
  c: FrameContext<Env, "/select/:page", BlankInput>
) {
  const page = Number(c.req.param("page")) || 1;
  return c.res({
    image: `/tradetoken/images/${page}/page.png`,
    intents: [
      (page > 1 && <Button action={`/select/${page - 1}`}>Back</Button>) || (
        <Button action={`/start`}>Back</Button>
      ),
      <Button action={`/swap/degen`}>Degen</Button>,
      <Button action={`/swap/higher`}>Higher</Button>,
      <Button action={`/select/${page + 1}`}>Next</Button>,
    ],
  });
}
