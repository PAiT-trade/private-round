"use client";
import { BuyCard } from "@/components/Cards/Buy";
import PreSale from "@/components/Cards/PreSale";
import { NavSection } from "@/components/navbar";
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
    <HeaderWrapper>
      <NavSection />
      <FlexContainer>
        <PreSale />
        <BuyCard state={state} />
      </FlexContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-image: "/header-cover.png";
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
