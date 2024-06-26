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

  fetch(`https://api-dev.u3.xyz/degencast-users/frame-actions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      buyerFid: fid,
      sharerFid: castFid,
      tx,
    }),
  })
    .then(() => {
      console.log("frame-actions success", { fid, tx, castFid });
    })
    .catch(console.error);

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
