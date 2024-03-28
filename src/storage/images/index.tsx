import { Frog } from "frog";
import { ImageResponse, type ImageResponseOptions } from "hono-og";
import { backgroundStyles, titleStyles, warningStyles } from "../styles";
import { getUserDataByFid, getUserStorageByFid } from "../../lib/hub";

const images = new Frog();

images.hono.get("/start", async (ctx) => {
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
        }}
      >
        <span style={titleStyles}>Check Your Storage</span>
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

images.hono.get("/check/:fid", async (ctx) => {
  const fid = ctx.req.param("fid") as string;
  const [user, storage] = await Promise.all([
    getUserDataByFid(Number(fid)),
    getUserStorageByFid(Number(fid)),
  ]);
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
          <span>units: {storage.units}</span>
          <span>
            casts: {storage.casts?.used} / {storage.casts?.limit}
          </span>
          <span>
            links: {storage.links?.used} / {storage.links?.limit}
          </span>
          <span>
            reactions: {storage.reactions?.used} / {storage.reactions?.limit}
          </span>
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
