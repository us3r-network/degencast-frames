/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { HAI_DI_LAO_FRAME } from "../lib/env";
import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../lib/hub";

import { fetchSoldDegen } from "../lib/events";
import { fetchDegenPrice } from "../lib/dexscreener";

export async function check(c: FrameContext) {
  const fid = c.frameData?.fid!;
  const { ethAddress } = (await getAddressFromFid(Number(fid))) as {
    ethAddress: `0x${string}`;
  };
  const [degenSold] = await Promise.all([
    fetchSoldDegen({ address: ethAddress }),
  ]);
  const degenPriceData = await fetchDegenPrice();
  const resp = await fetch(
    `https://api-dev.u3.xyz/onboarding/haidilao?topNum=0&fid=${fid}`
  );

  const transfers = degenSold.result.transfers;
  //   console.log(transfers);

  let amount = 0;
  for (let i = 0; i < transfers.length; i++) {
    amount += transfers[i].value;
  }
  return c.res({
    action: "/",
    image: `/haidilao/images/check/${fid}/imagev2.png`,
    intents: [
      <Button.Link
        href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Damn, I would never eat haidilao hot pot again !!!` +
            `

` +
            `join /haidilao and keep updates`
        )}&embeds[]=${
          HAI_DI_LAO_FRAME + `/images/check/${fid}/imagev2.png`
        }&embeds[]=${HAI_DI_LAO_FRAME}`}
      >
        Cast for Haidilao
      </Button.Link>,
      <Button.Link href="https://haidilao.degencast.xyz">
        Check my rank
      </Button.Link>,
    ],
  });
}
