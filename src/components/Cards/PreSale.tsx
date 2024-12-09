"use client";
import React, { useEffect, useState } from "react";
import { Paragraph } from "@/styles/app-common-styled";
import styled from "styled-components";
import { CirclePlayIcon, MoveUpRightIcon } from "lucide-react";
import { sizes } from "@/utils/media";
import { LeftBar } from "../HeadingWIthLeftBar";

const Wrapper = styled.div`
  max-width: 737px;
  backdrop-filter: blur(60%);
  -webkit-backdrop-filter: blur(60%);
  color: #fff;
  text-align: center;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  p {
    width: 450px;
    @media (max-width: ${sizes.tablet + "px"}) {
      width: 100%;
    }
  }
  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    max-width: 100%;
    width: 100%;
    align-self: center;
  }
`;

const LiveBadge = styled.div`
  color: #8cd2cf;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  span {
    font-weight: bold;
  }
`;

const Title = styled.h1`
  font-size: 40px;
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
  align-items: center;

  @media (max-width: ${sizes.tablet + "px"}) {
    align-content: center;
    justify-content: space-between;
    width: 100%;
  }
`;
const Button = styled.a<{ $bgcolor?: string }>`
  background-color: #8cd2cf;
  background-color: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : "##8cd2cf")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.7rem 1.6rem;
  cursor: pointer;
  border-radius: 4px;
  height: 55px;
  font-size: 14px;

  @media (max-width: ${sizes.tablet + "px"}) {
    height: 60px;
    width: 100%;
  }
`;

const ButtonWallet = styled.span`
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 16px;
  font-weight: 400;
`;
const ButtonAction = styled.span`
  display: flex;
  gap: 0.5rem;
`;

const Countdown = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 2rem;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  span {
    color: #87939e;
    font-size: 16px;
  }
  div {
    display: flex;
    gap: 1rem;
    span {
      font-size: 20px;
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

interface PreSaleProps {
  $remainingtime: string;
}

const PreSale: React.FC<PreSaleProps> = ({ $remainingtime }) => {
  const targetTime = new Date($remainingtime).getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetTime));
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval
  }, [targetTime]);

  return (
    <Wrapper>
      <LiveBadge>
        <LeftBar $color="#8cd2cf" />
        <span>LIVE</span>
      </LiveBadge>
      {/* <HeadingWithBar $title="LIVE" $color="#8cd2cf" $subtitlewidth="0.3rem" /> */}
      <Title>
        <b>Exclusive Access</b>
        <b>
          to <span>$PAiT</span> pre-sale
        </b>
      </Title>
      <Subtitle>
        <Paragraph>
          Join the PAiT Private Round to secure exclusive tokens and earn
          rewards.Act fast—only 2,000,000 tokens are available with a structured
          unlock schedule!
        </Paragraph>
      </Subtitle>
      <ButtonContainer>
        <Button $bgcolor="#7F7BBE" href="#">
          <ButtonWallet>
            <span>Contact</span>
            <MoveUpRightIcon size={12} />
          </ButtonWallet>
        </Button>

        <Button style={{ height: "60px" }} $bgcolor="#fff" href="#how-to-buy">
          <ButtonWallet>
            <CirclePlayIcon size={16} />
            <span>How to buy ?</span>
          </ButtonWallet>
        </Button>
      </ButtonContainer>
      <Countdown>
        <span>First stage ending soon.</span>
        <div>
          <span>
            {" "}
            <strong>{timeLeft.days}</strong> Days
          </span>
          <span>
            {" "}
            <strong>{timeLeft.hours}</strong> Hours
          </span>
          <span>
            {" "}
            <strong>{timeLeft.minutes}</strong> Minutes
          </span>
        </div>
      </Countdown>
    </Wrapper>
  );
};

export default PreSale;
