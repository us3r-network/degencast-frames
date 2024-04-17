import { createPublicClient, http } from "viem";
import { base, baseSepolia } from "viem/chains";

export const baseGoerliClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const optimismClient = createPublicClient({
  chain: base,
  transport: http(),
});
