"use client";
import React from "react";
import { Paragraph } from "@/styles/app-common-styled";
import styled from "styled-components";
import { MoveUpRightIcon } from "lucide-react";
import { sizes } from "@/utils/media";

const ContentWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 2rem;
  height: 100%;
  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 40px;
  }
`;

const ShowCaseImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
const ShowCaseImg = styled.img`
  align-self: center;
  width: 278px;
  height: 567px;
  border-radius: 40px;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 280px;
    padding: 1.5rem;
  }
`;

const Wrapper = styled.div`
  background-color: transparent;
  max-width: 629px;
  width: 100%;
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
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  font-size: "Mona Sans";
  display: none;
  gap: 1rem;
  flex-direction: column;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.fonts.family.main};
  font-weight: ${({ theme }) => theme.fonts.weights.normal};

  align-items: flex-start;

  span {
    color: #8cd2cf;
  }
  b {
    font-size: 80px;
    color: #87939e;
    text-align: left;
    line-height: 48px;
    display: flex;
    flex-wrap: wrap;
    &:first-child {
      color: white;
      margin-bottom: 1rem;
    }
    span {
      padding-left: 6px;
    }
  }

  @media (min-width: ${sizes.tablet + "px"}) {
    display: flex;
    b {
      font-size: 40px !important;
    }
  }
`;

const MTitle = styled(Title)`
  display: none;
  gap: 0.1rem;
  padding: 8px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  b {
    font-size: 40px !important;
    font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  }
  @media (max-width: ${sizes.tablet + "px"}) {
    display: flex;
  }

  @media (max-width: ${375 + "px"}) {
    display: flex;
  }
`;
const Subtitle = styled.h4`
  font-size: 1rem;
  margin: 1rem 0 2rem;
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: ${({ theme }) => 200};
  text-align: left;
  @media (max-width: ${sizes.tablet + "px"}) {
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
    margin: 0 !important;
  }
`;
const Button = styled.button<{ $bgcolor?: string }>`
  background-color: #8cd2cf;
  background-color: ${({ $bgcolor }) => ($bgcolor ? $bgcolor : "##8cd2cf")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 18px 32px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  width: 167px;
  height: 55px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: #070b15;
  font-weight: ${({ theme }) => 400};

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;

const ButtonSection = styled.span`
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #070b15;
`;

interface ShowCaseProps {}

const ShowCase: React.FC<ShowCaseProps> = () => {
  function learnMoreLink(_link: string) {
    window.open(_link, "_blank");
  }
  return (
    <ContentWrap>
      <Wrapper>
        <Title>
          <b>
            What is <span>PAiT</span>?
          </b>
          <b>Save & one-click</b>
          <b> investing into DeFi</b>
        </Title>
        <Subtitle>
          <Paragraph
            style={{
              fontSize: "16px !important",
              letterSpacing: "0% !important",
              lineHeight: "32px  !important",
              fontWeight: "300 !important",
            }}
          >
            PAiT is a multi-functional DeFi platform offering secure, one-click
            investing through features like auto-investing, copy trading, and
            stablecoin staking for consistent returns. With $PAiT tokens, users
            can earn rewards, participate in governance, and access cutting-edge
            tools for crypto-backed loans and dollar-cost averaging.
          </Paragraph>
        </Subtitle>
        <ButtonContainer>
          <Button
            onClick={() => learnMoreLink("https://pait.fi")}
            $bgcolor="#ADA5D1"
          >
            <ButtonSection>
              <span>Learn more</span>
              <MoveUpRightIcon size={12} />
            </ButtonSection>
          </Button>
        </ButtonContainer>
      </Wrapper>
      <ShowCaseImgWrapper>
        <ShowCaseImg src="/preview-iphone.svg" />
      </ShowCaseImgWrapper>
      <MTitle>
        <b>
          What is <span>PAiT</span>?
        </b>
        <b>Save & one-click</b>
        <b> investing into DeFi</b>
      </MTitle>
    </ContentWrap>
  );
};

export default ShowCase;
