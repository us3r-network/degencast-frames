import { ALLOWANCE_FRAME_API } from "../../lib/env";

export async function getChannelInfo(channel: string): Promise<{
  msg: string;
  code: number;
  data: {
    name: string;
    shares: {
      subjectAddress: `0x${string}`;
    }[];
  };
}> {
  const resp = await fetch(
    `${ALLOWANCE_FRAME_API}/topics/channel?id=${channel}`
  );
  const data = await resp.json();
  //   console.log("getChannelInfo", { channel, data });
  return data;
}
