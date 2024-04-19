/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { ALLOWANCE_FRAME } from "../lib/env";

export const shareScreen = (
  c: FrameContext<Env, "/:channel/share", BlankInput>
) => {
  const channel = c.req.param("channel");
  const fid = c.frameData?.fid!;
  const inviteCode = Math.random().toString(36).substring(2, 8);
  return c.res({
    image: `/allowance/images/share-more.png`,
    intents: [
      <Button action={`/${channel}/buy/share`}>Buy more</Button>,
      <Button.Link
        href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Buy shares in degencast`
        )}&embeds[]=${ALLOWANCE_FRAME}/${channel}/fid/${fid}?invite=${inviteCode}`}
      >
        Share To Earn
      </Button.Link>,
      // <Button.Link href="https://degencast.xyz">Leaderboard</Button.Link>,
    ],
  });
};
