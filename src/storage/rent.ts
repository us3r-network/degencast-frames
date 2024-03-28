import { storageRegistry } from "../lib/rent-contract";

export const rent = async (c: any) => {
  const value = c.inputText || "1";
  const fid = c.frameData?.fid || 0;

  const units = BigInt(value);

  console.log("rent", { fid, units });

  const price = await storageRegistry.read.price([units]);

  // Construct transaction
  return c.contract({
    abi: storageRegistry.abi,
    chainId: "eip155:10",
    functionName: "rent",
    args: [BigInt(fid), units],
    to: storageRegistry.address,
    value: price,
  });
};
