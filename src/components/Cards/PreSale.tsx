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
  padding: 32px 12px 32px 12px;

  p {
    width: 450px;
    @media (max-width: ${sizes.desktop + "px"}) {
      width: 100%;
    }
  }

  @media (min-width: 768px) and (max-width: 1090px) {
    min-width: 375px !important;
    padding-left: 10px !important;
  }
  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    max-width: 100%;
    padding: 0 !important;
    width: 100%;
    padding: 10px !important;
    margin-bottom: 48px !important;
  }
`;

const LiveBadge = styled.div`
  color: #8cd2cf;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  span {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }

  @media (max-width: ${sizes.tablet + "px"}) {
    margin-bottom: 12px !important;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  font-family: "Mona Sans", sans-serif;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  letter-spacing: -5%;
  line-height: 1.1;
  color: #fff;
  gap: 0;
  text-align: left;
  margin: 0 !important;
  padding: 0 !important;
  span {
    color: #8cd2cf;
  }
  b {
    color: #87939e;
    margin: 0 !important;
    padding: 0 !important;
    &:first-child {
      color: #fff;
    }
  }

  @media (max-width: ${"1300px"}) {
    font-size: 40px;
    text-align: left;
    font-family: ${({ theme }) => theme.fonts.family.main};
    font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  }
  @media (max-width: ${sizes.tablet + "px"}) {
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -0.05em;
    margin-bottom: 16px !important;
  }
`;
const Subtitle = styled.h4`
  font-size: 16px;
  /* margin: 1rem 0 2rem; */
  line-height: 28px;
  letter-spacing: 0;
  color: #bbb;

  text-align: left;
  font-family: ${({ theme }) => theme.fonts.family.main};

  @media (max-width: ${sizes.tablet + "px"}) {
    margin: 0;
    padding: 0 !important;
    margin-bottom: 32px !important;
    p {
      font-weight: 400;
      font-size: 16px;
      color: ${({ theme }) => theme.colors.text.normal + " !important"};
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;

  a {
    &:first-child {
      width: 142px;
      height: 55px;
    }
    &:last-child {
      width: 185px;
      height: 60px;
    }
  }
  @media (max-width: ${sizes.tablet + "px"}) {
    margin: 0;
    align-content: center;
    justify-content: space-between;
    margin-bottom: 32px !important;
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
    width: 164px;

    &:last-child {
      width: 158px;
    }
  }
`;

const ButtonWallet = styled.span`
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
  align-items: center;
  color: #000;
  line-height: normal;
  & > * {
    font-size: 16px;
    font-weight: 400;
    font-family: ${({ theme }) => theme.fonts.family.main};
  }
`;
const ButtonAction = styled.span`
  display: flex;
  gap: 0.5rem;
`;

const Countdown = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  margin-top: 2rem;
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  & > span {
    color: #87939e;
    font-size: 14px;
    font-weight: 700;
  }
  div {
    display: flex;
    gap: 1rem;
    span {
      font-size: 24px;
      font-weight: bold;
      color: #fff;

      @media (max-width: ${sizes.tablet + "px"}) {
        font-size: 20px;
      }
    }
  }
  @media (max-width: ${sizes.tablet + "px"}) {
    margin-top: -32px !important;
    padding: 0 !important;
  }
`;

// pass Date time in numbers
const getTimeRemaining = (
  targetTime: number
): {
  days: string;
  hours: string;
  minutes: string;
} => {
  const now = new Date().getTime();
  const difference = targetTime - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return {
    days: days > 0 ? (days < 10 ? `0${days}` : `${days}`) : "0",
    hours: hours > 0 ? `${hours}` : "0",
    minutes: minutes > 0 ? `${minutes}` : "0",
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
          to <span>$PAiT</span> private round
        </b>
      </Title>
      <Subtitle style={{ paddingBottom: "40px" }}>
        <Paragraph>
          Join the PAiT Private Round to secure exclusive tokens and earn
          rewards. Act fast—only 1,000,000 tokens are available with a
          structured unlock schedule!
        </Paragraph>
      </Subtitle>
      <ButtonContainer style={{ paddingBottom: "48px" }}>
        <Button
          href="mailto:info@paitprivateround.fi"
          target="_blank"
          $bgcolor="#7F7BBE"
        >
          <ButtonWallet>
            <span>Contact</span>
            <MoveUpRightIcon size={12} />
          </ButtonWallet>
        </Button>

        <Button $bgcolor="#fff" href="#how-to-buy">
          <ButtonWallet>
            <CirclePlayIcon size={20} />
            <span>How to buy?</span>
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
