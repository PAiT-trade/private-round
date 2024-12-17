"use client";
import styled from "styled-components";
import React from "react";
import { AppState } from "@/types/app";
import { ProgressBar } from "../PogressBar";
import {
  MessageCircleQuestion,
  MoveUpRightIcon,
  ShoppingBagIcon,
} from "lucide-react";
import { sizes } from "@/utils/media";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { ConnectWalletButtonLabel, WalletConnect } from "../navbar";
import toast from "react-hot-toast";
import { formatNumber } from "@/styles";
import { useRouter } from "next/navigation";
interface BuyCardProps {
  $state: AppState;
  $amounts: {
    min: string;
    max: string;
  };
  $setState: React.Dispatch<React.SetStateAction<AppState>>;
  $isConnected: boolean;
  $buyPait: () => Promise<void>;
  $calculateAmountInPait: () => void;
}
export const BuyCard: React.FC<BuyCardProps> = ({
  $state,
  $buyPait,
  $amounts,
  $isConnected,
  $setState,
  $calculateAmountInPait,
}) => {
  const router = useRouter();
  return (
    <Card>
      <Header>
        Buy <PrimaryColor>$PAiT</PrimaryColor> token
      </Header>
      <HeaderSubTitle>
        <SubHeader>The PAiT Private Round is live! Join</SubHeader>
        <SubHeader>now and earn referral rewards!</SubHeader>
      </HeaderSubTitle>

      <BuyCardHeaderAllocationWrapper>
        <BuyCardHeaderAllocationHeader>
          <BuyCardHeaderAllocationLabel>
            <BText>Remaining allocation:</BText>
          </BuyCardHeaderAllocationLabel>
          <BuyCardHeaderAllocationValue>
            <BTextAllocation>
              <p>
                {formatNumber(Number($state.allocation.remaining))
                  .toString()
                  .split(".")[0] + " "}
                updated every 24h
                {/* <MessageCircleQuestion size={16} /> */}
              </p>{" "}
              {/* <ToolTip>Use USDC on Solana for payment.</ToolTip> */}
            </BTextAllocation>
          </BuyCardHeaderAllocationValue>
        </BuyCardHeaderAllocationHeader>

        <ProgressBar
          $progress={
            ($state.allocation.remaining / $state.allocation.total) * 100
          }
        />

        <BText
          color="#FFFFFF80"
          style={{
            paddingBottom: "14px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#FFFFFF80 !important",
              fontWeight: "bold",
              letterSpacing: "-1%",
              fontSize: "14px",
              fontFamily: "Mona Sans",
            }}
          >
            1 $PAiT = {$state.priceOfPait} USDC
          </span>
        </BText>

        <FormWrapper>
          <FromGroup>
            <FromLabel>
              <span>Pay with $USDC</span>
              {/* <img src="/contact_support.svg" /> */}
            </FromLabel>
            <FromControl>
              <FromControlInput
                placeholder="Enter amount"
                type="number"
                step={"0.0000000001"}
                value={$state.amountInUsd}
                onKeyUp={(e) => {
                  if (e.key === "e" || e.key === ".") {
                    e.preventDefault();
                  }
                  $calculateAmountInPait();
                }}
                onChange={(e) => {
                  $setState((prevState) => ({
                    ...prevState,
                    amountInUsd: e.target.value,
                  }));
                  const paits =
                    Number(e.target.value) / Number($state.priceOfPait);

                  $setState((prevState) => ({
                    ...prevState,
                    amountInPait: (Math.round(paits * 100) / 100).toString(),
                  }));
                  $calculateAmountInPait();
                }}
              />
              <FromControlIcon src="/USDC.svg" />
            </FromControl>
          </FromGroup>
          <FromGroup>
            <FromLabel>$PAiT you receive</FromLabel>
            <FromControl>
              <FromControlInput
                placeholder="Result"
                disabled={true}
                value={$state.amountInPait}
                type="number"
                step={"0.0000000001"}
              />
              <FromControlIcon src="/PAIT_COIN.svg" />
            </FromControl>
          </FromGroup>
        </FormWrapper>
      </BuyCardHeaderAllocationWrapper>
      {$isConnected ? (
        <BuyNow
          onClick={async () => {
            console.log(`isConnected: ${$isConnected}`);
            console.log(`user: ${$state.user}`);
            console.log(
              `Amounts: ${$state.amountInPait} ${$state.amountInUsd}`
            );
            console.log(
              `user.is_approved: ${
                $state.user ? $state.user.is_approved : "No user"
              }`
            );

            if (!$isConnected) {
              console.log("Wallet NOT CONNECTED.");
              return;
            }

            if (!$state.user) {
              console.log("USER not found.");
              return;
            }
            // TODO:  to uncomment them
            // if (
            //   !$state.user.is_approved &&
            //   process.env.NODE_ENV !== "development"
            // ) {
            //   toast.error("Please perform KYC verification to proceed.");
            //   router.push("/kyc");
            //   return;
            // }

            if (!$state.user.is_approved) {
              toast.error("Please perform KYC verification to proceed.");
              router.push("/kyc");
              return;
            }

            if ($state.isInValid) {
              toast.error(
                `The minimum amount is : ${formatNumber(
                  Number($state.mininumAmount)
                )} & maximum amount is: ${formatNumber(
                  Number($state.maximumAmount)
                )}. Please change to continue!!!`
              );
              return;
            }

            console.log("Calling buyPait...");
            await $buyPait();
          }}
        >
          <BuyNowWallet>
            <span>Buy PAiT</span>
            <ShoppingBagIcon size={15} />
          </BuyNowWallet>
        </BuyNow>
      ) : (
        <BuyNow>
          <DynamicWidget
            innerButtonComponent={
              <WalletConnect>
                <ConnectWalletButtonLabel>
                  Connect Wallet
                </ConnectWalletButtonLabel>
                <MoveUpRightIcon size={8} />
              </WalletConnect>
            }
          />
        </BuyNow>
      )}
    </Card>
  );
};

interface BuyCardsTextProps {
  color?: string;
}

export const BText = styled.div<BuyCardsTextProps>`
  color: ${({ color }) => (color ? color : "#fff")};
  font-weight: 600;
  line-height: 1.5;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  margin: 0;
  display: flex;
  font-weight: 600;
  flex-wrap: wrap;
  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 82px;
  }
`;

const BTextAllocation = styled.div<BuyCardsTextProps>`
  color: ${({ color }) => (color ? color : "#fff")};
  position: relative;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  gap: 0.4rem;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    align-items: flex-end;

    @media (max-width: ${sizes.tablet + "px"}) {
      width: 126px;
    }
  }

  img {
    width: 14.17px;
    height: 16.67px;

    &:hover {
      visibility: visible;
      opacity: 1;
    }
  }

  img:hover b {
    visibility: visible;
    opacity: 1;
  }
`;

const ToolTip = styled.b`
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
`;

const Card = styled.div`
  min-width: 519px;
  color: #fff;
  padding: 32px 12px 12px 12px;
  background-color: #1e1e1e;
  backdrop-filter: blur(8%);
  -webkit-backdrop-filter: blur(8%);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;

  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    max-width: 100% !important;
    width: 100% !important;
    min-width: 100%;
    height: 100%;
    gap: 0px;
    margin-bottom: 48px;
  }
`;

const Header = styled.h2`
  color: #fff;
  font-size: 40px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.less_10};
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  line-height: 28px;
  margin-bottom: 1.2rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
    font-size: 26px;
    line-height: 32px;
    margin-bottom: 16px !important;
  }
`;

const HeaderSubTitle = styled.div`
  width: 100%;
`;
const SubHeader = styled.h4`
  font-size: 16px;
  letter-spacing: 0%;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.normal};

  @media (max-width: ${sizes.tablet + "px"}) {
    line-height: 28px;
    letter-spacing: 0%;
  }
`;
const PrimaryColor = styled.span`
  color: #8cd2cf;
`;

const BuyCardHeaderAllocationWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
`;
const BuyCardHeaderAllocationHeader = styled.div`
  display: flex;
  /* gap: 8px; */
  justify-content: space-between;
  width: 100%;
`;
const BuyCardHeaderAllocationLabel = styled.div`
  width: 100%;
`;
const BuyCardHeaderAllocationValue = styled.span`
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
  align-self: flex-end;

  &:last-child {
    display: flex;
    align-items: flex-start;
    align-self: flex-end;
  }
`;
const FormWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column;
    width: 100%;
    gap: 20px;
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;
const FromGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.5rem;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
const FromLabel = styled.div`
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0%;
  font-family: ${({ theme }) => theme.fonts.family.main};
  display: flex;
  gap: 0.4rem;
  align-items: center;
  margin-bottom: 8px;
  span {
    font-weight: 700;
    line-height: 0;
    font-size: 14px;
    letter-spacing: 0%;
    display: flex;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.family.main};
  }
  img {
    width: 13.46px;
    height: 15.83px;
  }
`;
const FromControl = styled.div`
  height: 56px;
  background-color: #fff;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 0.2rem;
  border-radius: 4px;
  gap: 0.4rem;
  width: 100%;
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
const FromControlInput = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: none;
  color: #0e0d0d;
  font-size: 14px;
  background-color: #fff;
  outline-width: 0;
`;
const FromControlIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const BuyNow = styled.button`
  background-color: #8cd2cf !important;
  height: 55px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  div#dynamic-widget {
    width: 100%;
    height: 100%;
  }
`;

const BuyNowWallet = styled.span`
  display: flex;
  gap: 0.6rem;
  font-family: ${({ theme }) => theme.fonts.family.main};
  font-weight: 600;

  span {
    font-size: 16px;
  }
`;
const BuyNowAction = styled.span`
  display: flex;
  gap: 0.5rem;
`;
