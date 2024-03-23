import { Address, parseEther } from "viem";

import { CustomTransactionContext } from ".";
import { ZeroXSwapQuote } from "./types";
import {
  FEE_RECIPIENT_WALLET_ADDRESS,
  BUY_TOKEN_PERCENTAGE_FEE,
  API_KEY_0X_API_KEY,
} from "../lib/env";

export const transaction = async (c: CustomTransactionContext) => {
  const token = c.req.query("token") as Address;
  const network = c.req.query("network") as "base" | "optimism";
  const value = c.inputText || "0.01";

  // prettier-ignore
  const baseUrl = `https://${network}.api.0x.org/swap/v1/quote?`
  const eth = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

  // https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-quote#request
  const params = new URLSearchParams({
    buyToken: token,
    sellToken: eth,
    sellAmount: parseEther(value).toString(),
    feeRecipient: FEE_RECIPIENT_WALLET_ADDRESS!,
    buyTokenPercentageFee: BUY_TOKEN_PERCENTAGE_FEE!,
  }).toString();

  const res = await fetch(baseUrl + params, {
    headers: { "0x-api-key": API_KEY_0X_API_KEY! },
  });

  const order = (await res.json()) as ZeroXSwapQuote;

  return c.send({
    chainId: `eip155:${network === "base" ? "8453" : "10"}`,
    to: order.to,
    data: order.data,
    value: BigInt(order.value),
  });
};
