import { ALLOWANCE_FRAME_API } from "./env";

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

export async function getAllowanceInfo(
  channel: string,
  fid: number
): Promise<{
  msg: string;
  code: number;
  data: {
    tipsKeyword: string;
    holding: number;
    rank: number;
    allowance: number;
    remaining: number;
    tipsReceived: number;
    shares: number;
  };
}> {
  const allowanceDataUrl = `${ALLOWANCE_FRAME_API}/topics/tip-allowance?fid=${fid}&channelId=${channel}`;
  // console.log({ allowanceDataUrl });
  const resp = await fetch(allowanceDataUrl);
  const data = await resp.json();
  // console.log("getAllowanceInfo", { channel, data });
  return data;
}
