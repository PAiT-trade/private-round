"use client";
import styled from "styled-components";
import { Allocations } from "@/components/Allocations";
import { BuyCard } from "@/components/Cards/Buy";
import PreSale from "@/components/Cards/PreSale";
import { FAQSection } from "@/components/FAQSection";
import HeadingWithBar from "@/components/HeadingWIthLeftBar";
import { HowToBuy } from "@/components/HowToBuy";
import { NavSection } from "@/components/navbar";
import { Rewards } from "@/components/Rewards";
import ShowCase from "@/components/ShowCase";
import { Footer } from "@/components/Footer";
import { SectionWrapper } from "@/styles/app-common-styled";
import { AppState } from "@/types/app";
import { useState } from "react";
import { media } from "@/utils/media";

export default function Home() {
  const [state, setState] = useState<AppState>({
    allocation: {
      remaining: 1946000,
      total: 2000000,
    },
    paitPrice: "0.16",
    remainingTime: "2024-12-10",
  });
  return (
    <>
      <HeaderWrapper>
        <Wrapping>
          <NavSection />
          <FlexContainer>
            <PreSale $remainingtime={state.remainingTime} />
            <BuyCard $state={state} />
          </FlexContainer>
        </Wrapping>
      </HeaderWrapper>

      {/* Instructions Section */}
      <SectionWrapper>
        <HeadingWithBar
          $title="INSTRUCTION"
          $color="#ADA5D1"
          $subtitle="How to acquire tokens in the private round?"
        />
        <HowToBuy />
      </SectionWrapper>
      {/* Rewards */}
      <SectionWrapper>
        <HeadingWithBar
          $title="REWARDS"
          $color="#ADA5D1"
          $subtitlewidth="39rem"
          $subtitle="Share with friends, earn rewards?"
        />
        <Rewards />
      </SectionWrapper>

      <SectionWrapper>
        <HeadingWithBar
          $title="SUPPLY & SCHEDULE"
          $color="#ADA5D1"
          $subtitlewidth="39rem"
          $subtitle="Allocations & Vesting."
        />
        <Allocations />
      </SectionWrapper>
      {/* Show case */}
      <SectionWrapper>
        <ShowCase />
      </SectionWrapper>

      <SectionWrapper>
        <HeadingWithBar
          $title="FAQ"
          $color="#ADA5D1"
          $subtitlewidth="30rem"
          $subtitle="Everything you need to know."
        />
        <FAQSection />
      </SectionWrapper>
      <SectionWrapper $bg="#0a0915">
        <Footer />
      </SectionWrapper>
    </>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)),
    url("/header-cover.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 1rem 12rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Wrapping = styled.div`
  /* can be removed */
  margin: ${({ theme }) => `${theme.padding.small} auto`};

  max-width: 1512px;
  width: 100%;
  /* end of it */
  ${media.tablet(`
    width: 100%;
  `)}
  ${media.mobile(`
    width: 100%;
  `)}
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12.5rem 0;
  gap: 4rem;
  width: 100%;
`;
