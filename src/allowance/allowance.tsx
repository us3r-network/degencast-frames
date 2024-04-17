/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";

import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../lib/hub";
import { BlankInput } from "hono/types";

export async function checkAllowance(
  c: FrameContext<Env, "/:channel/check/allowance", BlankInput>
) {
  const fid = c.frameData?.fid!;
  const channel = c.req.param("channel");
  console.log("checkAllowance", { channel, fid });
  const { ethAddress } = (await getAddressFromFid(Number(fid))) as {
    ethAddress: `0x${string}`;
  };

  return c.res({
    action: "/",
    image: `/allowance/images/${channel}/allowance/${fid}/image.png`,
    intents: [
      <Button action={`/${channel}/check/allowance`}>Refresh</Button>,
      <Button>Buy shares</Button>,
      <Button.Link href="https://degencast.xyz">share</Button.Link>,
      // <Button.Link href="https://degencast.xyz">Leaderboard</Button.Link>,
    ],
  });
}
