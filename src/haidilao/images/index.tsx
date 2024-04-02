import { Frog } from "frog";
import * as fs from "node:fs";
import { URL } from "node:url";
import { ImageResponse, type ImageResponseOptions } from "hono-og";
import {
  getAddressFromFid,
  getUserDataByFid,
  getUserStorageByFid,
} from "../../lib/hub";
import { backgroundStyles, titleStyles, warningStyles } from "../styles";
import { fetchSoldDegen } from "../../lib/events";
import {} from "viem";
import { fetchDegenPrice } from "../../lib/dexscreener";

const __dirname = new URL(".", import.meta.url).pathname;

const startJPG = fs.readFileSync(__dirname + "/start.jpg");

const images = new Frog();

images.hono.get("/start.jpg", async (ctx) => {
  ctx.header("Content-Type", "image/jpeg");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(startJPG);
});

images.hono.get("/check/:fid/image.png", async (ctx) => {
  const fid = ctx.req.param("fid");
  if (fid === "0") {
    const errorImg = (
      <div
        style={{ ...backgroundStyles, padding: 64, backgroundColor: "#6944BA" }}
      >
        {fid}
      </div>
    );
    return new ImageResponse(errorImg, {
      format: "png",
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
  const { ethAddress } = (await getAddressFromFid(Number(fid))) as {
    ethAddress: `0x${string}`;
  };
  if (!ethAddress) {
    const errorImg = (
      <div
        style={{ ...backgroundStyles, padding: 64, backgroundColor: "#6944BA" }}
      >
        There is no wallet address associated with this account.
      </div>
    );
    return new ImageResponse(errorImg, {
      format: "png",
      headers: {
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
  const [user, degenSold] = await Promise.all([
    getUserDataByFid(Number(fid)),
    fetchSoldDegen({ address: ethAddress }),
  ]);
  const degenPriceData = await fetchDegenPrice();
  const degenPrice = degenPriceData.pair.priceUsd;

  const transfers = degenSold.result.transfers;
  //   console.log(transfers);

  let amount = 0;
  for (let i = 0; i < transfers.length; i++) {
    amount += transfers[i].value;
  }
  //   console.log({ amount });
  const image = (
    <div
      style={{ ...backgroundStyles, padding: 64, backgroundColor: "#6944BA" }}
    >
      <div
        style={{
          ...backgroundStyles,
          position: "relative",
          border: "2px solid rgba(15, 36, 56, 0.1)",
          borderRadius: 32,
          gap: 12,
          alignItems: "flex-start",
          justifyContent: "flex-start",
          overflow: "hidden",
          padding: "50px 50px 20px 50px",
        }}
      >
        <div
          style={{
            ...backgroundStyles,
            position: "relative",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            height: "auto",
            padding: "20px 10px",
            gap: "20px",
          }}
        >
          <img
            src={user.pfp}
            alt=""
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "10px",
            }}
          />
          <div
            style={{
              color: "rgb(56, 189, 248)",
              fontSize: "50px",
            }}
          >
            {user.display}
          </div>
        </div>
        <div
          style={{
            ...backgroundStyles,
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "0px",
            fontSize: 45,
            gap: 10,
          }}
        >
          {amount.toLocaleString()} sold. now degen price {degenPrice}
        </div>
      </div>
    </div>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
});

export default images;
