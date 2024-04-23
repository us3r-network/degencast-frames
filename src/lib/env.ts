// import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();

export const ORIGIN = process.env.ORIGIN;

export const FEE_RECIPIENT_WALLET_ADDRESS =
  process.env.FEE_RECIPIENT_WALLET_ADDRESS;
export const BUY_TOKEN_PERCENTAGE_FEE = process.env.BUY_TOKEN_PERCENTAGE_FEE;

export const API_KEY_0X_API_KEY = process.env.API_KEY_0X_API_KEY;

export const HAI_DI_LAO_FRAME = process.env.HAI_DI_LAO_FRAME || "";
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

export const ALLOWANCE_FRAME = process.env.ALLOWANCE_FRAME || "";
export const ALLOWANCE_FRAME_API = process.env.ALLOWANCE_FRAME_API || "";
export const ALLOWANCE_MORE_SHARES_HOST =
  process.env.ALLOWANCE_MORE_SHARES_HOST || "";

export const TRADE_TOKEN_FRAME = process.env.TRADE_TOKEN_FRAME || "";
