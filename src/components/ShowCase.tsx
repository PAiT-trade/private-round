"use client";
import React, { useEffect, useState } from "react";
import { Paragraph } from "@/styles/app-common-styled";
import styled from "styled-components";
import { CirclePlayIcon, MoveUpRightIcon } from "lucide-react";

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
`;

const ShowCaseImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 40%;
`;
const ShowCaseImg = styled.img`
  align-self: center;
`;

const Wrapper = styled.div`
  background-color: #070b15;
  /* min-width: 46.0625rem; */
  width: 60%;
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
  font-size: 14px;
  height: 3.4375rem;
`;

const ButtonSection = styled.span`
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #070b15;
`;

interface ShowCaseProps {}

const ShowCase: React.FC<ShowCaseProps> = () => {
  return (
    <ContentWrap>
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
              PAiT is a multi-functional DeFi platform offering secure,
              one-click investing through
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
      <ShowCaseImgWrapper>
        <ShowCaseImg src="/pait-app.png" />
      </ShowCaseImgWrapper>
    </ContentWrap>
  );
};

export default ShowCase;
