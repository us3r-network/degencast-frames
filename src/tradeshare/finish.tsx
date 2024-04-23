/** @jsxImportSource frog/jsx */

import { Button, Env, FrameContext } from "frog";
import { BlankInput } from "hono/types";

export const finishScreen = (
  c: FrameContext<Env, "/finish/:share", BlankInput>
) => {
  const frameData = c.frameData;
  const tx = frameData?.transactionId;
  const fid = frameData?.fid!;
  console.log("tx", { fid, tx });
  return c.res({
    image: `/allowance/images/success.png`,
    intents: [
      <Button action={`/start/share`}>Buy more</Button>,
      <Button action={``}>View More</Button>,
      <Button action={`/shareearn`}>Share & Earn</Button>,
    ],
  });
};
