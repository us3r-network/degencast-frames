import { createPublicClient, http } from "viem";
import { base, optimism, baseSepolia } from "viem/chains";

export const baseClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const optimismClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

export const baseGoerliClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
