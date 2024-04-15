/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";

import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../lib/hub";

export async function buy(c: FrameContext) {
  const fid = c.frameData?.fid!;
  const { ethAddress } = (await getAddressFromFid(Number(fid))) as {
    ethAddress: `0x${string}`;
  };

  return c.res({
    action: "/",
    image: `/allowance/images/share/${fid}/image.png`,
    intents: [
      <Button.Link href="https://haidilao.degencast.xyz">
        Check my rank
      </Button.Link>,
    ],
  });
}
