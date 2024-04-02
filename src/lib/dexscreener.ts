export async function fetchDegenPrice() {
  const resp = await fetch(
    "https://api.dexscreener.com/latest/dex/pairs/base/0xc9034c3e7f58003e6ae0c8438e7c8f4598d5acaa"
  );

  const data = await resp.json();
  return data;
}
