"use client";
import React, { useEffect, useState } from "react";
import { Paragraph } from "@/styles/app-common-styled";
import styled from "styled-components";
import { CirclePlayIcon, MoveUpRightIcon } from "lucide-react";

const Wrapper = styled.div`
  background-color: #070b15;
  /* min-width: 46.0625rem; */
  backdrop-filter: blur(60%);
  -webkit-backdrop-filter: blur(60%);
  color: #fff;
  padding: 2rem;
  text-align: center;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LiveBadge = styled.div`
  color: #8cd2cf;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  font-size: "Mona Sans";
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    color: #8cd2cf;
  }
  b {
    font-size: 3.5rem;
    color: #87939e;

    &:first-child {
      color: white;
      font-size: 4rem;
    }
  }
`;
const Subtitle = styled.h4`
  font-size: 1rem;
  margin: 1rem 0 2rem;
  line-height: 1.5;
  color: #bbb;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
const Button = styled.button<{ $bgcolor?: string }>`
  background-color: #8cd2cf;
  background-color: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : "##8cd2cf")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.7rem 1.6rem;
  cursor: pointer;
  border-radius: 4px;
  height: 3.4375rem;
`;

const ButtonSection = styled.span`
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
  align-items: center;
`;
const Countdown = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  span {
    color: #87939e;
    font-size: 14px;
  }
  div {
    display: flex;
    gap: 1rem;
    span {
      font-size: 1.5rem;
      font-weight: bold;
      color: #fff;
    }
  }
`;

// pass Date time in numbers
const getTimeRemaining = (targetTime: number) => {
  const now = new Date().getTime();
  const difference = targetTime - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return {
    days: days > 0 ? days : 0,
    hours: hours > 0 ? hours : 0,
    minutes: minutes > 0 ? minutes : 0,
  };
};

interface ShowCaseProps {}

const ShowCase: React.FC<ShowCaseProps> = () => {
  return (
    <Wrapper>
      <Title>
        <b>
          What is <span>PAiT</span>?
        </b>
        <b>Save & one-click investing into DeFi</b>
      </Title>
      <Subtitle>
        <Paragraph>
          <span>
            PAiT is a multi-functional DeFi platform offering secure, one-click
            investing through
          </span>
          <span>
            features like auto-investing, copy trading, and stablecoin staking
            for consistent
          </span>
          <span>
            returns. With $PAiT tokens, users can earn rewards, participate in
            governance, and{" "}
          </span>
          <span>
            access cutting-edge tools for crypto-backed loans and dollar-cost
            averaging.{" "}
          </span>
        </Paragraph>
      </Subtitle>
      <ButtonContainer>
        <Button $bgcolor="#7F7BBE">
          <ButtonSection>
            <span>Learn more</span>
            <MoveUpRightIcon size={12} />
          </ButtonSection>
        </Button>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ShowCase;
