import { FrameContext, Frog, Button, TransactionContext } from "frog";

export const app = new Frog({
  //   browserLocation: "https://degencast.xyz/landing",
  headers: {
    "Cache-Control": "public, max-age=3600",
  },
  //   hub: pinata(),
});

app.frame("/", async (c) => {
  const { buttonValue, status, buttonIndex, previousState } = c;
  // console.log({ buttonValue, status, buttonIndex, previousState });
  let invite = c.req.query("invite");
  // console.log({ invite });

  if (status === "redirect") {
    console.log({ previousState });
    await new Promise((r) => setTimeout(r, 1000));
    invite = "redirected";
  }
  return c.res({
    image: (
      <div style={{ color: "black", display: "flex", fontSize: 60 }}>
        {status === "initial"
          ? "Select your fruit!"
          : `Selected: ${buttonValue}`}
      </div>
    ),
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button.Redirect
        location={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `hah`
        )}&invite=${invite}`}
      >
        Mango
      </Button.Redirect>,
      <Button.Link
        href={`https://warpcast.com/~/compose?text=${encodeURIComponent(
          `Damn, I would never eat haidilao hot pot again !!!` +
            `

` +
            `join /haidilao and keep updates`
        )}`}
      >
        Share
      </Button.Link>,
    ],
  });
});

export default app;
