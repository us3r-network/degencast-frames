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

  return c.res({
    action: `/${channel}/finish`,
    image: `/allowance/images/${channel}/share/${fid}/image.png`,
    intents: [
      <TextInput placeholder="Quantity of shares..." />,
      <Button.Transaction target={`/${channel}/tx/buy`}>
        Buy
      </Button.Transaction>,
      <Button.Transaction target={`/${channel}/tx/sell`}>
        Sell
      </Button.Transaction>,
      <Button action={`/${channel}/check/allowance`}>
        Check my allowance
      </Button>,
      <Button.Link href="https://degencast.xyz">More shares</Button.Link>,
    ],
  });
}
