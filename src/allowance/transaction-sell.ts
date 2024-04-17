/** @jsxImportSource frog/jsx */

import { Button, Env, TransactionContext, Frog, TextInput } from "frog";
import { BlankInput } from "hono/types";
import { shareContract } from "./lib/read-contract";

export const transactionSell = async (
  c: TransactionContext<Env, "/:channel/tx/sell", BlankInput>
) => {
  const subject = "0x07e64ba35f77011e690f66de7e831829e9217a62";
  const value = c.inputText || "1";
  const fid = c.frameData?.fid!;

  const units = BigInt(value);

  const price = await shareContract.read.getSellPriceAfterFee([subject, units]);

  console.log("rent", { fid, units, price });
  return c.contract({
    abi: shareContract.abi,
    chainId: "eip155:84532",
    functionName: "sellShares",
    args: [subject, units],
    to: shareContract.address,
    value: price,
  });
};
