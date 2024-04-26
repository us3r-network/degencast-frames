/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { ALLOWANCE_FRAME } from "../lib/env";

export const sellSuccess = (
  c: FrameContext<Env, "/:channel/sell/success", BlankInput>
) => {
  const channel = c.req.param("channel");
  const fid = c.frameData?.fid!;
  const tx = c.frameData?.transactionId;
  const castFid = c.frameData?.castId.fid;
  console.log("tx", { fid, tx, castFid });
  return c.res({
    image: `/allowance/images/success.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy shares</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button action={`/${channel}/share`}>Share & Earn</Button>,
    ],
  });
};
