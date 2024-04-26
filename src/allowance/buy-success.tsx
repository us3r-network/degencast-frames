/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { ALLOWANCE_FRAME } from "../lib/env";

export const buySuccess = (
  c: FrameContext<Env, "/:channel/buy/success", BlankInput>
) => {
  const channel = c.req.param("channel");
  const fid = c.frameData?.fid!;
  const tx = c.frameData?.transactionId;
  const castFid = c.frameData?.castId.fid;
  console.log("tx", { fid, tx, castFid });
  return c.res({
    image: `/allowance/images/success.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy more</Button>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button action={`/${channel}/share`}>Share & Earn</Button>,
      // <Button.Link
      //   href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
      //     `Buy shares in degencast`
      //   )}&embeds[]=${ALLOWANCE_FRAME}/${channel}/fid/${fid}`}
      // >
      //   Share
      // </Button.Link>,
      // <Button.Link href="https://degencast.xyz">Leaderboard</Button.Link>,
    ],
  });
};
