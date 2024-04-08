import { ALCHEMY_API_KEY } from "./env";

export async function fetchSoldDegen({ address }: { address: `0x${string}` }) {
  const res = await fetch(
    `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            withMetadata: true,
            excludeZeroValue: true,
            toAddress: "0xc9034c3e7f58003e6ae0c8438e7c8f4598d5acaa",
            maxCount: "0x3e8",
            category: ["erc20"],
            fromAddress: address,
            contractAddresses: ["0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed"],
          },
        ],
      }),
    }
  );
  const data = await res.json();
  return data;
}

export async function fetchSoldDegenToAero({
  address,
}: {
  address: `0x${string}`;
}) {
  const res = await fetch(
    `https://base-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        jsonrpc: "2.0",
        method: "alchemy_getAssetTransfers",
        params: [
          {
            fromBlock: "0x0",
            toBlock: "latest",
            withMetadata: true,
            excludeZeroValue: true,
            toAddress: "0x2C4909355b0C036840819484c3A882A95659aBf3",
            maxCount: "0x3e8",
            category: ["erc20"],
            fromAddress: address,
            contractAddresses: ["0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed"],
          },
        ],
      }),
    }
  );
  const data = await res.json();
  return data;
}
