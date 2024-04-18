import { Frog } from "frog";
import * as fs from "node:fs";
import { URL } from "node:url";
import { ImageResponse, type ImageResponseOptions } from "hono-og";
import { formatEther } from "viem";
import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../../lib/hub";
// import { backgroundStyles, titleStyles, warningStyles } from "../styles";
import { fetchSoldDegen, fetchSoldDegenToAero } from "../../lib/events";
import { fetchDegenPrice } from "../../lib/dexscreener";
import { ALLOWANCE_FRAME } from "../../lib/env";
import { Box, Heading, VStack, Text, Image, HStack } from "../ui";
import { it } from "node:test";
import { shareContract } from "../lib/read-contract";
import { getAllowanceInfo, getChannelInfo } from "../lib/api";

const __dirname = new URL(".", import.meta.url).pathname;

const startPNG = fs.readFileSync(__dirname + "/cover.png");
const bgPNG = fs.readFileSync(__dirname + "/bg.png");
const shareBgPNG = fs.readFileSync(__dirname + "/share-bg.png");
const pixelBorderPNG = fs.readFileSync(__dirname + "/pixel-border.png");
const pixelBorder2PNG = fs.readFileSync(__dirname + "/pixel-border-2.png");
const dialogBorderPNG = fs.readFileSync(__dirname + "/dialog-border.png");
const successPNG = fs.readFileSync(__dirname + "/success.png");

const pixelFont = fs.readFileSync(
  __dirname + "../../lib/fonts/pixel/Pixeled.ttf"
);

const images = new Frog();

images.hono.get("/bg.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(bgPNG);
});

images.hono.get("/share-bg.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(shareBgPNG);
});
images.hono.get("/pixel-border.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(pixelBorderPNG);
});
images.hono.get("/pixel-border-2.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(pixelBorder2PNG);
});
images.hono.get("/dialog-border.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(dialogBorderPNG);
});

images.hono.get("/start/bg.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(startPNG);
});

images.hono.get("/success.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(successPNG);
});

images.hono.get("/:channel/start.png", async (ctx) => {
  const channel = ctx.req.param("channel");
  // console.log("start image", { channel });
  const channelInfo = await getChannelInfo(channel);
  const channelName = channelInfo.data.name;

  const image = (
    <Box
      grow
      height={"100%"}
      width={"100%"}
      alignVertical="top"
      backgroundColor="background"
      backgroundImage={`url(${ALLOWANCE_FRAME}/images/start/bg.png)`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          padding: "46px 56px 0 56px",
          gap: "18px",
          fontSize: "56px",
        }}
      >
        {channelName.toUpperCase()}
      </div>
    </Box>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=1",
    },
    width: 800,
    height: 480,
    fonts: [
      {
        data: pixelFont,
        name: "upheaval",
      },
    ],
  });
});

images.hono.get("/:channel/share/:fid/image.png", async (ctx) => {
  const fid = ctx.req.param("fid");
  const channel = ctx.req.param("channel");

  const channelInfo = await getChannelInfo(channel);
  const { ethAddress } = (await getAddressFromFid(Number(fid))) as {
    ethAddress: `0x${string}`;
  };
  const subject = channelInfo.data.shares[0].subjectAddress;

  const user = await getUserDataByFid(Number(fid));
  const price = await shareContract.read.getBuyPrice([subject, BigInt("1")]);
  const shareBalance = await shareContract.read.sharesBalance([
    subject,
    ethAddress,
  ]);

  const priceString = formatEther(price);

  const image = (
    <Box
      grow
      height={"100%"}
      width={"100%"}
      alignVertical="top"
      backgroundColor="background"
      backgroundImage={`url(${ALLOWANCE_FRAME}/images/share-bg.png)`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "56px 56px 0 56px",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: `url(${ALLOWANCE_FRAME}/images/pixel-border.png)`,
            alignItems: "center",
            width: "165px",
            height: "165px",
            padding: "8px",
          }}
        >
          <Image src={`${user.pfp}`} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            width: "510px",
          }}
        >
          <div
            style={{
              color: "white",
              display: "flex",
              flexDirection: "row",
              fontSize: "16px",
            }}
          >
            <span>{user.username.toUpperCase()}</span>
            <div style={{ display: "flex", flexGrow: 1 }}></div>
            <span>{channel.toUpperCase()}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                color: "#A36EFE",
                display: "flex",
              }}
            >
              PRICE:
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}></div>
            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {priceString}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "8px",
              fontSize: "20px",
            }}
          >
            <div
              style={{
                color: "#A36EFE",
                display: "flex",
              }}
            >
              HOLDING:
            </div>
            <div style={{ display: "flex", flexGrow: 1 }}></div>
            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {shareBalance.toString()}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=1",
    },
    width: 800,
    height: 480,
    fonts: [
      {
        data: pixelFont,
        name: "upheaval",
      },
    ],
  });
});

images.hono.get("/:channel/allowance/:fid/image.png", async (ctx) => {
  const fid = ctx.req.param("fid");
  const channel = ctx.req.param("channel");

  const user = await getUserDataByFid(Number(fid));
  const allowanceInfo = await getAllowanceInfo(channel, Number(fid));
  // console.log({ allowanceInfo });

  const image = (
    <Box
      grow
      height={"100%"}
      width={"100%"}
      alignVertical="top"
      backgroundColor="background"
      backgroundImage={`url(${ALLOWANCE_FRAME}/images/bg.png)`}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          //   border: "1px solid white",
          padding: "20px 56px 0 56px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {channel.toUpperCase()}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              color: "#A36EFE",
              display: "flex",
            }}
          >
            TIPS KEYWORD:
          </div>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
          <div
            style={{
              color: "white",
              display: "flex",
            }}
          >
            {allowanceInfo.data.tipsKeyword}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            fontSize: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            {user.username.toUpperCase()}
          </div>
          <div style={{ display: "flex", flexGrow: 1 }}></div>
          <div
            style={{
              display: "flex",
              gap: "18px",
            }}
          >
            <div
              style={{
                color: "#A36EFE",
                display: "flex",
              }}
            >
              RANK
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {allowanceInfo.data.rank}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "0px 56px 56px 56px",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundImage: `url(${ALLOWANCE_FRAME}/images/pixel-border-2.png)`,
            alignItems: "center",
            width: "176px",
            height: "176px",
            padding: "8px",
          }}
        >
          <Image src={`${user.pfp}`} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            backgroundImage: `url(${ALLOWANCE_FRAME}/images/dialog-border.png)`,
            alignItems: "flex-start",
            width: "482px",
            height: "176px",
            color: "#000",
            padding: "16px 0",
            gap: "0px",
          }}
        >
          <Item title="Allowance" value={allowanceInfo.data.allowance} />
          <Item title="Remaining" value={allowanceInfo.data.remaining} />
          <Item title="Tips Received" value={allowanceInfo.data.tipsReceived} />
          <Item title="Shares" value={allowanceInfo.data.shares} />
        </div>
      </div>
    </Box>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=1",
    },
    width: 800,
    height: 480,
    fonts: [
      {
        data: pixelFont,
        name: "upheaval",
      },
    ],
  });
});

export default images;

function Item({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        gap: "8px",
        padding: "0 30px",
        fontSize: "12px",
      }}
    >
      <div
        style={{
          color: "#A36EFE",
          display: "flex",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: "#000",
          display: "flex",
        }}
      >
        {value.toLocaleString()}
      </div>
    </div>
  );
}
