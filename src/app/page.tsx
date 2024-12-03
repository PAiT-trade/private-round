"use client";
import { NavSection } from "@/components/navbar";
import styled from "styled-components";

export default function Home() {
  return (
    <HeaderWrapper>
      <NavSection />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 1rem 3rem;
`;

const HeadingSection = styled.div``;
const HeaderCardSection = styled.div``;

const PageHeader = styled.h1``;
const headerSpanPait = styled.span``;
const headerSpanText = styled.span``;
