/** @jsxImportSource frog/jsx */

import { Button, Env, TransactionContext, Frog, TextInput } from "frog";

import { Address, parseEther } from "viem";

// import { CustomTransactionContext } from ".";

import {
  FEE_RECIPIENT_WALLET_ADDRESS,
  BUY_TOKEN_PERCENTAGE_FEE,
  API_KEY_0X_API_KEY,
} from "../lib/env";
import { BlankInput } from "hono/types";
import { shareContract } from "./lib/read-contract";

export const transactionBuy = async (
  c: TransactionContext<Env, "/:channel/tx/buy", BlankInput>
) => {
  const value = c.inputText || "1";

  // const address = c.req.query("address") as Address;
  const subject = "0x07e64ba35f77011e690f66de7e831829e9217a62";
  const fid = c.frameData?.fid || 0;

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
