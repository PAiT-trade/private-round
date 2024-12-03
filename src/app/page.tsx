"use client";
import { BuyCard } from "@/components/Cards/Buy";
import PreSale from "@/components/Cards/PreSale";
import HeadingWithBar from "@/components/HeadingWIthLeftBar";
import { HowToBuy } from "@/components/HowToBuy";
import { NavSection } from "@/components/navbar";
import { SectionWrapper } from "@/styles/app-common-styled";
import { AppState } from "@/types/app";
import { useState } from "react";
import styled from "styled-components";

export default function Home() {
  const [state, setState] = useState<AppState>({
    allocation: {
      remaining: 1946000,
      total: 2000000,
    },
    paitPrice: "0.16",
  });
  return (
    <>
      <HeaderWrapper>
        <NavSection />
        <FlexContainer>
          <PreSale />
          <BuyCard $state={state} />
        </FlexContainer>
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

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12.5rem 0;
  gap: 4rem;
`;
