/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";

import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../lib/hub";
import { BlankInput } from "hono/types";

export async function buy(
  c: FrameContext<Env, "/:channel/buy/share", BlankInput>
) {
  const fid = c.frameData?.fid!;
  const channel = c.req.param("channel");
  const { ethAddress } = (await getAddressFromFid(Number(fid))) as {
    ethAddress: `0x${string}`;
  };
  const inviteCode = Math.random().toString(36).substring(2, 8);

  return c.res({
    action: `/${channel}/finish`,
    image: `/allowance/images/${channel}/share/${fid}/image.png`,
    intents: [
      <TextInput placeholder="Quantity of shares..." />,
      <Button.Transaction target={`/${channel}/tx/buy?address=${ethAddress}`}>
        Buy
      </Button.Transaction>,
      <Button.Transaction target={`/${channel}/tx/sell?address=${ethAddress}`}>
        Sell
      </Button.Transaction>,
      <Button action={`/${channel}/check/allowance`}>Allowance</Button>,
      <Button.Link
        href={`https://dev.degencast.xyz/trade/shares?invite=${inviteCode}`}
      >
        Share & Earn
      </Button.Link>,
    ],
  });
}
