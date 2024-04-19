/** @jsxImportSource frog/jsx */

import { Button, Env, TransactionContext, Frog, TextInput } from "frog";

import { BlankInput } from "hono/types";
// import { shareContract } from "./lib/read-contract";
import { degenShareContract } from "./lib/degen-share-contract";
import { getChannelInfo } from "./lib/api";

export const transactionBuy = async (
  c: TransactionContext<Env, "/:channel/tx/buy", BlankInput>
) => {
  const value = c.inputText || "1";
  const channel = c.req.param("channel");

  const channelInfo = await getChannelInfo(channel);

  // const subject = channelInfo.data.shares[0].subjectAddress;
  const subject = "0x07E64Ba35F77011e690f66De7e831829e9217A62";
  const fid = c.frameData?.fid!;

  const units = BigInt(value);

  const price = await degenShareContract.read.getBuyPriceAfterFee([
    subject,
    units,
  ]);

  console.log("rent", { fid, units, price });
  return c.contract({
    abi: degenShareContract.abi,
    chainId: "eip155:666666666" as any,
    functionName: "buyShares",
    args: [subject, units],
    to: degenShareContract.address,
    value: price,
  });
};
