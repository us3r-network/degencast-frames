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
import { fetchSoldDegen, fetchSoldDegenToAero } from "../../lib/events";
import { fetchDegenPrice } from "../../lib/dexscreener";
import { HAI_DI_LAO_FRAME } from "../../lib/env";

const __dirname = new URL(".", import.meta.url).pathname;

const startJPG = fs.readFileSync(__dirname + "/start.jpg");
const dialogPNG = fs.readFileSync(__dirname + "/dialog.png");
const avatarPNG = fs.readFileSync(__dirname + "/avatar.png");

const upheavttFont = fs.readFileSync(
  __dirname + "../../lib/fonts/upheaval/upheavtt.ttf"
);

const images = new Frog();

images.hono.get("/start.jpg", async (ctx) => {
  ctx.header("Content-Type", "image/jpeg");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(startJPG);
});

images.hono.get("/dialog.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(dialogPNG);
});
images.hono.get("/avatar.png", async (ctx) => {
  ctx.header("Content-Type", "image/png");
  ctx.header("Cache-Control", "public, max-age=3600");
  return ctx.body(avatarPNG);
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
  const [user, degenSold, degenSoldToAero] = await Promise.all([
    getUserDataByFid(Number(fid)),
    fetchSoldDegen({ address: ethAddress }),
    fetchSoldDegenToAero({ address: ethAddress }),
  ]);
  const degenPriceData = await fetchDegenPrice();
  const degenPrice = degenPriceData.pair.priceUsd;

  const transfers = degenSold.result.transfers;
  const transfersToAero = degenSoldToAero.result.transfers;
  //   console.log(transfers);
  const txs = [...transfers, ...transfersToAero];
  let amount = 0;
  for (let i = 0; i < txs.length; i++) {
    amount += txs[i].value;
  }
  const total = amount * Number(degenPrice || 0);
  //   console.log({ amount });
  const image = (
    <div
      style={{
        ...backgroundStyles,
        padding: 40,
        backgroundColor: "#D92622",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 20,
      }}
    >
      <div
        style={{
          ...backgroundStyles,
          position: "relative",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "720px",
          height: "200px",
          padding: "0px",
          gap: "10px",
          backgroundColor: "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundImage: `url(${HAI_DI_LAO_FRAME}/images/dialog.png)`,
        }}
      >
        <div
          style={{
            ...backgroundStyles,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: 24,
            height: "55px",
            padding: "25px 20px 0 20px",
            gap: "0px",
            backgroundColor: "none",
            // border: "2px solid rgba(15, 36, 56, 0.1)",
            fontFamily: "upheaval",
          }}
        >
          <span>{user.display}</span>
          <span>{`@${user.username}:`}</span>
        </div>
        <div
          style={{
            ...backgroundStyles,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontSize: 32,
            padding: "0px 20px 25px 20px",
            height: "auto",
            backgroundColor: "none",
            // border: "2px solid rgba(15, 36, 56, 0.1)",
          }}
        >
          I sold {amount.toLocaleString().split(".")[0]} $degen for $
          {total.toLocaleString().split(".")[0]}, if i held them today i can
          have...
        </div>
      </div>

      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          gap: 40,
          with: "100%",
          height: "auto",
          // fontSize: "50px",
          backgroundColor: "none",
          fontFamily: "inter",
          position: "relative",
        }}
      >
        <div
          style={{
            ...backgroundStyles,
            position: "relative",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "160px",
            height: "160px",
            padding: "9px",
            gap: "0px",
            backgroundColor: "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundImage: `url(${HAI_DI_LAO_FRAME}/images/avatar.png)`,
          }}
        >
          <img
            src={user.pfp}
            alt=""
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontSize: 60,
            // flexGrow: 1,
            // border: "2px solid rgba(15, 36, 56, 0.1)",
            height: "180px",
            width: "500px",
            padding: "0px",
            margin: "0px",
          }}
        >
          <div
            style={{
              color: "#F9D818",
            }}
          >
            {(total / 50).toLocaleString()}
          </div>
          <div>time haidilao hot pot!!!!!</div>
        </div>
      </div>
    </div>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
    width: 800,
    height: 480,
    fonts: [
      {
        data: upheavttFont,
        name: "upheaval",
      },
    ],
  });
});

images.hono.get("/check/:fid/imagev2.png", async (ctx) => {
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
  const total = amount * Number(degenPrice || 0);
  //   console.log({ amount });
  const image = (
    <div
      style={{
        ...backgroundStyles,
        padding: 40,
        backgroundColor: "#D92622",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 20,
      }}
    >
      <div
        style={{
          ...backgroundStyles,
          position: "relative",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: "720px",
          height: "200px",
          padding: "0px",
          gap: "10px",
          backgroundColor: "none",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundImage: `url(${HAI_DI_LAO_FRAME}/images/dialog.png)`,
        }}
      >
        <div
          style={{
            ...backgroundStyles,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            fontSize: 24,
            height: "55px",
            padding: "25px 20px 0 20px",
            gap: "0px",
            backgroundColor: "none",
            // border: "2px solid rgba(15, 36, 56, 0.1)",
            fontFamily: "upheaval",
          }}
        >
          <span>{user.display}</span>
          <span>{`@${user.username}:`}</span>
        </div>
        <div
          style={{
            ...backgroundStyles,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontSize: 32,
            padding: "0px 20px 25px 20px",
            height: "auto",
            backgroundColor: "none",
            // border: "2px solid rgba(15, 36, 56, 0.1)",
          }}
        >
          I paper handed {amount.toLocaleString().split(".")[0]} $degen now
          worth ${total.toLocaleString().split(".")[0]}, if i held them today i
          can have...
        </div>
      </div>

      <div
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          display: "flex",
          gap: 40,
          with: "100%",
          height: "auto",
          // fontSize: "50px",
          backgroundColor: "none",
          fontFamily: "inter",
          position: "relative",
        }}
      >
        <div
          style={{
            ...backgroundStyles,
            position: "relative",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "160px",
            height: "160px",
            padding: "9px",
            gap: "0px",
            backgroundColor: "none",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            backgroundImage: `url(${HAI_DI_LAO_FRAME}/images/avatar.png)`,
          }}
        >
          <img
            src={user.pfp}
            alt=""
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            fontSize: 60,
            // flexGrow: 1,
            // border: "2px solid rgba(15, 36, 56, 0.1)",
            height: "180px",
            width: "500px",
            padding: "0px",
            margin: "0px",
          }}
        >
          <div
            style={{
              color: "#F9D818",
            }}
          >
            {(total / 50).toLocaleString()}
          </div>
          <div>time haidilao hot pot!!!!!</div>
        </div>
      </div>
    </div>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
    width: 800,
    height: 480,
    fonts: [
      {
        data: upheavttFont,
        name: "upheaval",
      },
    ],
  });
});

export default images;
