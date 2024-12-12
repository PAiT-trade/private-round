"use client";
import { sizes } from "@/utils/media";
import styled from "styled-components";

export const Allocations = () => {
  return (
    <Container>
      <Card>
        <CardImg src="/limited.png" />
        <CardContent>
          <CardTitle>Limited supply.</CardTitle>
          <CardContentParagraph>
            2,000,000 PAiT Tokens available in the Private Round.
          </CardContentParagraph>
        </CardContent>
      </Card>
      <Card>
        <CardImg src="/unlock.png" />
        <CardContent>
          <CardTitle>Unlock schedule.</CardTitle>
          <CardContentParagraph>
            10% at TGE, 3 months cliff, linear vesting 18 months
          </CardContentParagraph>
        </CardContent>
      </Card>
    </Container>
  );
};
const Container = styled.div`
  padding: 6.25rem 0;
  display: flex;
  flex-wrap: wrap; /* Allow wrapping for children */
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100% !important;

  @media (max-width: ${sizes.tablet + "px"}) {
    gap: 16px;
    z-index: 2 !important;
  }
`;

const Card = styled.div`
  background-color: rgba(8, 11, 20, 0.7);
  border: 1px solid #ffffff1a;
  border-radius: 8px;
  padding: 24px 12px;
  /* max-width: 627px; */
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 86px;

  /* For larger screens */
  flex: 1 1;

  /* For smaller screens */
  @media (max-width: ${sizes.tablet + "px"}) {
    flex: 1 1 100%;
    align-items: flex-start;
    flex-direction: column;
    gap: 32px;
    padding: 24px 24px;
  }
`;
const CardImg = styled.img`
  width: 80px;
  height: 80px;
`;
const CardTitle = styled.h3`
  color: white;
  font-family: ${({ theme }) => theme.fonts.family.main};
  font-weight: ${({ theme }) => 400};

  padding-bottom: 8px;
  font-size: 20px;
  margin-bottom: 0.6rem;
`;
const CardContent = styled.div`
  width: 100%;
`;
const CardContentParagraph = styled.p`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.normal};
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
