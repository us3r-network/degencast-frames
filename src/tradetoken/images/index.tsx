import { Frog } from "frog";
import * as fs from "node:fs";
import { URL } from "node:url";
import { ImageResponse, type ImageResponseOptions } from "hono-og";
import { formatEther, pad } from "viem";
import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../../lib/hub";
import { Box, Heading, VStack, Text, Image, HStack } from "../ui";
import { TRADE_TOKEN_FRAME } from "../../lib/env";

const __dirname = new URL(".", import.meta.url).pathname;

const pixelFont = fs.readFileSync(
  __dirname + "../../lib/fonts/minecraft/Minecraft.ttf"
);

const bgPNG = fs.readFileSync(__dirname + "/bg.png");
const shareMorePNG = fs.readFileSync(__dirname + "/share-more.png");
const selectDialogPNG = fs.readFileSync(__dirname + "/select-dialog.png");
const swapDialogPNG = fs.readFileSync(__dirname + "/swap-dialog.png");
const successPNG = fs.readFileSync(__dirname + "/success.png");

const images = new Frog();

images.hono.get("/bg.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(bgPNG);
});

images.hono.get("/share-more.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(shareMorePNG);
});
images.hono.get("/select-dialog.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(selectDialogPNG);
});
images.hono.get("/swap-dialog.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(swapDialogPNG);
});

images.hono.get("/start.png", async (ctx) => {
  const image = (
    <Box
      grow
      height={"100%"}
      width={"100%"}
      alignVertical="top"
      backgroundColor="background"
      backgroundImage={`url(${TRADE_TOKEN_FRAME}/images/bg.png)`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          paddingTop: "50px",
          fontSize: "60px",
          fontWeight: "700",
        }}
      >
        {"TOP 3 TOKENS"}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <StarItem title="degen" value={1} />
        <StarItem title="degen" value={1} />
        <StarItem title="degen" value={1} />
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

images.hono.get("/:page/page.png", async (ctx) => {
  const page = ctx.req.param("page");

  const image = (
    <Box
      grow
      height={"100%"}
      width={"100%"}
      alignVertical="top"
      backgroundColor="background"
      backgroundImage={`url(${TRADE_TOKEN_FRAME}/images/bg.png)`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          paddingTop: "60px",
          gap: "18px",
          fontSize: "60px",
          fontWeight: "700",
        }}
      >
        {"Swap tokens".toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          padding: "20px 80px",
        }}
      >
        <SwapItem title="degen" value={1} />
        <SwapItem title="degen" value={1} />
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

images.hono.get("/swap/:token/page.png", async (ctx) => {
  const token = ctx.req.param("token");
  const image = (
    <Box
      grow
      height={"100%"}
      width={"100%"}
      alignVertical="top"
      backgroundColor="background"
      backgroundImage={`url(${TRADE_TOKEN_FRAME}/images/bg.png)`}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          paddingTop: "100px",
          gap: "18px",
          fontSize: "60px",
          fontWeight: "700",
        }}
      >
        {`Swap ${token}`.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "60px",
          padding: "40px 80px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid #fff",
          }}
        >
          {/* 
          <Image
            src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
          />*/}
        </div>
        <div
          style={{
            display: "flex",
            backgroundImage: `url(${TRADE_TOKEN_FRAME}/images/swap-dialog.png)`,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "482px",
            flexDirection: "column",
            height: "176px",
            padding: "35px 30px",
            gap: "15px",
          }}
        >
          <SelectDialogItem title="Token" value={"DEGEN"} />
          <SelectDialogItem title="Market cap" value="$2229.3M" />
          <SelectDialogItem title="Price" value="$0.028282" />
          <SelectDialogItem title="Buy/Sell(24H)" value="13.1313" />
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

function StarItem({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "8px",
        fontSize: "12px",
        // border: "1px solid #fff",
        marginTop: "10px",
        padding: "0px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "18px",
          fontSize: "22px",
          padding: "10px 10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "1px solid #fff",
          }}
        >
          {/* 
          <Image
            src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
          />*/}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // border: "1px solid #fff",
              paddingTop: "6px",
            }}
          >
            DEGEN
          </div>
          <div
            style={{
              display: "flex",
              gap: "18px",
              paddingTop: "16px",
            }}
          >
            <div
              style={{
                color: "#A36EFE",
                display: "flex",
              }}
            >
              {"Market Cap".toUpperCase()}
            </div>

            <div
              style={{
                color: "white",
                display: "flex",
              }}
            >
              {"2229M"}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: "#F41F4C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        -32.32%
      </div>
    </div>
  );
}

function SwapItem() {
  return (
    <div
      style={{
        width: "305px",
        height: "286px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "28px",
        fontSize: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid #fff",
        }}
      >
        {/* 
          <Image
            src={`https://ipfs.decentralized-content.com/ipfs/bafkreieudzvadtjy36j7x2i73isqw2jmgbwtum3p3eaahn4mnztuzl7y7e`}
          />*/}
      </div>
      <div
        style={{
          display: "flex",
          backgroundImage: `url(${TRADE_TOKEN_FRAME}/images/select-dialog.png)`,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "100%",
          flexDirection: "column",
          height: "176px",
          padding: "35px 30px",
          gap: "15px",
        }}
      >
        <SelectDialogItem title="Token" value={"DEGEN"} />
        <SelectDialogItem title="Market cap" value="$2229.3M" />
        <SelectDialogItem title="Price" value="$0.028282" />
        <SelectDialogItem title="Buy/Sell(24H)" value="13.1313" />
      </div>
    </div>
  );
}

function SelectDialogItem({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "0px",
        fontSize: "16px",
      }}
    >
      <div style={{ display: "flex", color: "#A36EFE" }}>{title}</div>
      <div style={{ display: "flex", flexGrow: 1 }}></div>
      <div
        style={{
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </div>
    </div>
  );
}
