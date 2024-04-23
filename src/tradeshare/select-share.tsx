/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";

export async function selectShare(
  c: FrameContext<Env, "/select/:page", BlankInput>
) {
  const page = Number(c.req.param("page")) || 1;
  const { initialPath } = c;
  const fid = c.frameData?.fid!;
  return c.res({
    image: `/tradeshare/images/${page}/page.png`,
    intents: [
      (page > 1 && <Button action={`/select/${page - 1}`}>Back</Button>) || (
        <Button action={`${initialPath.replace("/tradeshare", "")}`}>
          Back
        </Button>
      ),
      <Button action={`/trade/degen`}>Degen</Button>,
      <Button action={`/trade/higher`}>Higher</Button>,
      <Button action={`/select/${page + 1}`}>Next</Button>,
    ],
  });
}
