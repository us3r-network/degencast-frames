/** @jsxImportSource frog/jsx */

import { Button, Env, TransactionContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { getChannelInfo } from "../lib/api";
import { shareContract } from "../lib/share-contract";

export const transactionSell = async (
  c: TransactionContext<Env, "/:channel/tx/sell", BlankInput>
) => {
  const value = c.inputText || "1";
  const fid = c.frameData?.fid!;
  const channel = c.req.param("channel");

  const channelInfo = await getChannelInfo(channel);

  const subject = channelInfo.data.shares[0].subjectAddress;

  const units = BigInt(value);

  // console.log("rent", { fid, units, price });
  return c.contract({
    abi: shareContract.abi,
    chainId: "eip155:84532",
    functionName: "sellShares",
    args: [subject, units],
    to: shareContract.address,
  });
};
