/** @jsxImportSource frog/jsx */

import { Button, TextInput } from "frog";
import { Address, parseAbi } from "viem";

import { backgroundStyles, warningStyles, titleStyles } from "./styles";
import { CustomFrameContext } from ".";
import { baseClient, optimismClient } from "../lib/viem";
import { assets } from "./token-selection";

export const selectedToken = async (c: CustomFrameContext) => {
  const network = "base";
  const { frameData } = c;
  const { inputText } = frameData!;

  let numberSelect = Number(inputText);
  if (isNaN(numberSelect) || numberSelect < 0 || numberSelect > assets.length) {
    numberSelect = 0;
  }

  const token = assets[numberSelect].address;

  console.log("token address", token);

  const symbol = await baseClient.readContract({
    address: token as `0x`,
    abi: parseAbi(["function symbol() view returns (string)"]),
    functionName: "symbol",
  });

  return c.res({
    action: "/finish",
    image: `/swapsv2/images/selected-token/${symbol}`,
    intents: [
      <TextInput placeholder="ETH amount (default 0.01)" />,
      <Button.Transaction target={`/tx?network=${network}&token=${token}`}>
        Buy
      </Button.Transaction>,
      <Button action="/token-selection">Back</Button>,
    ],
  });
};
