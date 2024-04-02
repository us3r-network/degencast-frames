/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { HAI_DI_LAO_FRAME } from "../lib/env";

export function check(c: FrameContext) {
  const fid = c.frameData?.fid!;
  return c.res({
    action: "/",
    image: `/haidilao/images/check/${fid}/image.png`,
    intents: [
      <Button action={`/`}>Back</Button>,
      <Button.Link
        href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          "I have sold 3 haidilao"
        )}&embeds[]=${
          HAI_DI_LAO_FRAME + `/images/check/${fid}/image.png`
        }&embeds[]=${HAI_DI_LAO_FRAME}`}
      >
        Share
      </Button.Link>,
    ],
  });
}
