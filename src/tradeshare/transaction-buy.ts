/** @jsxImportSource frog/jsx */

import { Button, Env, TransactionContext, Frog, TextInput } from "frog";

import { BlankInput } from "hono/types";
import { getChannelInfo } from "../lib/api";
import { shareContract } from "../lib/share-contract";
// import { shareContract } from "../../lib/read-contract";
// import { degenShareContract } from "./lib/degen-share-contract";
// import { getChannelInfo } from "./lib/api";

export const transactionBuy = async (
  c: TransactionContext<Env, "/tx/buy/:channel", BlankInput>
) => {
  const value = c.inputText || "1";
  const channel = c.req.param("channel");

  const channelInfo = await getChannelInfo(channel);
  console.log({ channelInfo });
  const subject = channelInfo.data.shares[0].subjectAddress;
  // const subject = "0x07E64Ba35F77011e690f66De7e831829e9217A62";
  const fid = c.frameData?.fid!;

  const units = BigInt(value);

  const price = await shareContract.read.getBuyPriceAfterFee([subject, units]);

  console.log("rent", { fid, units, price });
  return c.contract({
    abi: shareContract.abi,
    chainId: "eip155:84532",
    functionName: "buyShares",
    args: [subject, units],
    to: shareContract.address,
    value: price,
  });
};
