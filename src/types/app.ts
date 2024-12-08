import { User } from "@prisma/client";
import { ExposureData } from "./wallet_exposure";

export interface AppState {
  allocation: {
    total: number;
    remaining: number;
  };
  remainingTime: string;

  allowReferral: boolean;
  symbol: string;
  inputValue: string;
  user: User | null;
  amountInUsd: string;
  mininumAmount: string;
  maximumAmount: string;
  amountInPait: string;
  endDateTime: string;
  priceOfPait: string;
  paymentMethod: string;
  referralCode: string;
  exposure: ExposureData | null;
  isInValid: boolean;
}
