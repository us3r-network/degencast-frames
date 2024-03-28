/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from "frog";
import { backgroundStyles, titleStyles, warningStyles } from "./styles";
import { getUserDataByFid, getUserStorageByFid } from "../lib/hub";

export async function check(c: any) {
  const { buttonValue, status } = c;
  const { frameData } = c;

  const { fid } = frameData || { fid: 0 };

  // console.log("user", user, storage);
  return c.res({
    action: "/finish",
    image: `/storage/images/check/${fid}`,
    intents: [
      <TextInput placeholder="amount of unit, default 1" />,
      <Button action="/">Back</Button>,
      <Button.Transaction target="/rent">Buy More</Button.Transaction>,
    ],
  });
}
