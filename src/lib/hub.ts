// const BASE_URL = "https://api.hub.wevm.dev";
const BASE_URL = "https://hub.pinata.cloud";

// const options: RequestInit<RequestInitCfProperties> = {
//   cf: {
//     cacheTtl: 3600,
//     // Relevant for fetching a user's pfp
//     // Must have transformations enabled for the Cloudflare zone: https://developers.cloudflare.com/images/get-started/#enable-transformations
//     image: {
//       width: 512,
//       height: 512,
//       fit: 'cover',
//     },
//   },
// }

export async function getFidFromUsername(username: string) {
  const res = await fetch(
    `${BASE_URL}/v1/userNameProofByName?name=${username}`
  );

  const data = (await res.json()) as {
    timestamp: number;
    name: string;
    owner: string;
    signature: string;
    fid: number;
    type: string;
  };

  return data.fid;
}

export async function getAddressFromFid(fid: number) {
  const res = await fetch(`${BASE_URL}/v1/verificationsByFid?fid=${fid}`);

  const data = (await res.json()) as {
    messages: Array<{
      data: {
        type: string;
        fid: number;
        timestamp: number;
        network: string;
        verificationAddAddressBody: {
          address: string;
          claimSignature: string;
          blockHash: string;
          verificationType: number;
          chainId: number;
          protocol: "PROTOCOL_SOLANA" | "PROTOCOL_ETHEREUM";
          ethSignature: string;
        };
      };
    }>;
  };

  const ethAddresses = data.messages.filter(
    (message) =>
      message.data.verificationAddAddressBody.protocol === "PROTOCOL_ETHEREUM"
  );

  const solAddresses = data.messages.filter(
    (message) =>
      message.data.verificationAddAddressBody.protocol === "PROTOCOL_SOLANA"
  );

  return {
    ethAddress: ethAddresses[0].data.verificationAddAddressBody.address,
    solAddress: solAddresses[0].data.verificationAddAddressBody.address,
  };
}

export async function getFollowedFromFidToTargetFid(
  fid: number,
  targetFid: number
) {
  const res = await fetch(
    `${BASE_URL}/v1/linkById?fid=${fid}&target_fid=${targetFid}&link_type=follow`
  );
  const data = (await res.json()) as {
    data?: {
      type: string;
      fid: number;
      timestamp: number;
      network: string;
      linkBody?: {
        type: "follow";
        targetFid: number;
      };
    };
    hash: string;
    hashScheme: string;
    signature: string;
    signatureScheme: string;
    signer: string;
  };

  return data.data?.linkBody?.type === "follow";
}

export async function getUserDataByFid(fid: number, type: number) {
  const res = await fetch(
    `${BASE_URL}/v1/userDataByFid?fid=${fid}&user_data_type=${type}`
  );

  const data = (await res.json()) as {
    data: {
      type: string;
      fid: number;
      timestamp: number;
      network: string;
      userDataBody: {
        type: string;
        value: string;
      };
    };
    hash: string;
    hashScheme: string;
    signature: string;
    signatureScheme: string;
    signer: string;
  };

  return data.data.userDataBody.value;
}
