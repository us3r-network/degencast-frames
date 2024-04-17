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
