"use client";
import { BuyCard } from "@/components/Cards/Buy";
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
      <BuyCard state={state} />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem 12rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const HeadingSection = styled.div``;
const HeaderCardSection = styled.div``;

const PageHeader = styled.h1``;
const headerSpanPait = styled.span``;
const headerSpanText = styled.span``;
