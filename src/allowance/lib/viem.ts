import { createPublicClient, http } from "viem";
import { base, baseSepolia, degen } from "viem/chains";

export const baseGoerliClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

export const baseClient = createPublicClient({
  chain: base,
  transport: http(),
});

export const degenClient = createPublicClient({
  chain: degen,
  transport: http(),
});
