"use client";
import styled from "styled-components";
import React from "react";
import { AppState } from "@/types/app";
import { ProgressBar } from "../PogressBar";
import { MoveUpRightIcon } from "lucide-react";
import { sizes } from "@/utils/media";
interface BuyCardProps {
  $state: AppState;
  $setPaits?: () => void;
}
export const BuyCard: React.FC<BuyCardProps> = ({ $state }) => {
  return (
    <Card>
      <Header>
        Buy <PrimaryColor>$PAiT</PrimaryColor> token
      </Header>
      <SubHeader>The PAiT Private Round is live! Join</SubHeader>
      <SubHeader>now and earn referral rewards!</SubHeader>

      <BuyCardHeaderAllocationWrapper>
        <BuyCardHeaderAllocationHeader>
          <BuyCardHeaderAllocationLabel>
            <BText>Remaining allocation:</BText>
          </BuyCardHeaderAllocationLabel>
          <BuyCardHeaderAllocationValue>
            <BText>
              {$state.allocation.remaining + " "}
              updated every 24h
            </BText>
          </BuyCardHeaderAllocationValue>
        </BuyCardHeaderAllocationHeader>

        <ProgressBar
          $progress={
            ($state.allocation.remaining / $state.allocation.total) * 100
          }
        />

        <BText color="#4daa90">1 $PAiT = {0.16} USDC</BText>

        <FormWrapper>
          <FromGroup>
            <FromLabel>Pay with $USDC</FromLabel>
            <FromControl>
              <FromControlInput placeholder="Enter amount" />
              <FromControlIcon src="/pait_icon.svg" />
            </FromControl>
          </FromGroup>
          <FromGroup>
            <FromLabel>$PAiT you receive</FromLabel>
            <FromControl>
              <FromControlInput placeholder="Result" />
              <FromControlIcon src="/usdc.png" />
            </FromControl>
          </FromGroup>
        </FormWrapper>
      </BuyCardHeaderAllocationWrapper>

      <BuyNow>
        <BuyNowWallet>
          <span>Connect Wallet</span>
          <MoveUpRightIcon size={12} />
        </BuyNowWallet>
      </BuyNow>
    </Card>
  );
};

interface BuyCardsTextProps {
  color?: string;
}

export const BText = styled.div<BuyCardsTextProps>`
  color: ${({ color }) => (color ? color : "#fff")};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    /* width: 80%; */
  }
`;

const Card = styled.div`
  /* min-width: 519px; */
  color: #fff;
  /* width: 100%; */
  padding: 2rem 1.5rem;
  background-color: #dde1e514;
  backdrop-filter: blur(8%);
  -webkit-backdrop-filter: blur(8%);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.8rem;
  border-radius: 0.4rem;

  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    max-width: 100%;
    width: 100%;
    padding: 2rem 0.2rem;
  }
`;

const Header = styled.h2`
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  font-weight: 600;
  line-height: 28px;
`;
const SubHeader = styled.h4`
  color: #ffffffb2;
  font-size: 16px;
  font-family: "Mona Sans";
  font-weight: 400;
  line-height: 28px;
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
  gap: 8px;
  justify-content: space-between;
  width: 100%;
`;
const BuyCardHeaderAllocationLabel = styled.div``;
const BuyCardHeaderAllocationValue = styled.span`
  font-size: 14px;

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
  }
`;
const FromGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding-top: 0.5rem;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
const FromLabel = styled.div`
  font-size: 14px;
`;
const FromControl = styled.div`
  height: 56px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem;
  border-radius: 4px;
  gap: 0.4rem;
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
const FromControlInput = styled.input`
  width: 100%;
  padding: 0.4rem;
  border: none;
  color: #070b154d;
  font-size: 14px;
  outline-width: 0;
`;
const FromControlIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const BuyNow = styled.button`
  height: 55px;
  width: 100%;
  background-color: #8cd2cf;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;

const BuyNowWallet = styled.span`
  display: flex;
  gap: 0.3rem;

  span {
    font-size: 16px;
  }
`;
const BuyNowAction = styled.span`
  display: flex;
  gap: 0.5rem;
`;
