import { Frog } from "frog";
import { ImageResponse, type ImageResponseOptions } from "hono-og";
import {} from "frog";
import { backgroundStyles, titleStyles, warningStyles } from "../styles";
import { assets } from "../token-selection";

const images = new Frog();

images.hono.get("/start", async (ctx) => {
  const startImage = (
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
        }}
      >
        <div style={{ display: "flex", gap: -16 }}>
          {assets.map((asset, i) => (
            <img
              src={asset.image}
              width={54}
              height={54}
              style={{ borderRadius: 99 }}
            />
          ))}
        </div>

        <span style={titleStyles}>Frame Swap</span>

        <span style={{ color: "#5E6773", fontSize: 48 }}>
          Easily trade ERC20 tokens
        </span>
      </div>
    </div>
  );

  return new ImageResponse(startImage, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
});

images.hono.get("/token-selection", async (ctx) => {
  const img = (
    <div style={backgroundStyles}>
      <div
        style={{
          display: "flex",
          gap: 36,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {assets.map((asset, i) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(15, 36, 56, 0.1)",
              backgroundColor: "#FFFFFF",
              borderRadius: 32,
              gap: 16,
              padding: "32px 48px",
              width: "241px",
              position: "relative",
            }}
          >
            <span
              style={{
                left: 0,
                top: 0,
                position: "absolute",
              }}
            >
              {`${i}`}
            </span>
            <img
              src={asset.image}
              width={54}
              height={54}
              style={{ borderRadius: 9999 }}
            />
            <span style={{ color: "#5E6773", fontSize: "26px" }}>
              {asset.name}
            </span>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          bottom: "20px",
          left: "20px",
          fontSize: "30px",
        }}
      >
        0 will be default if the number not exist
      </div>
    </div>
  );

  return new ImageResponse(img, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
});

images.hono.get("/selected-token/:symbol", async (ctx) => {
  const symbol = ctx.req.param("symbol") as string;
  const image = (
    <div style={backgroundStyles}>
      <span style={titleStyles}>Buy ${symbol}</span>

      <span style={warningStyles}>
        This is experimental. Swap at your own risk.
      </span>
    </div>
  );
  return new ImageResponse(image, {
    format: "png",
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
});

images.hono.get("/finish", async (ctx) => {
  const image = (
    <div style={backgroundStyles}>
      <span style={titleStyles}>Thanks for Playing</span>

      <span style={{ ...warningStyles, width: "75%" }}>
        Your transaction is being processed. This frame doesn't check for a
        successful execution
      </span>
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
