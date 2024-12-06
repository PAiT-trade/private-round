"use client";
import styled from "styled-components";

export const Allocations = () => {
  return (
    <Container>
      <Card>
        <CardImg src="/limited.png" />
        <CardContent>
          <CardTitle>Direct referrals.</CardTitle>
          <CardContentParagraph>
            Receive 5% cashback in USDC and 2.5% in PAiT tokens for each person
            you directly refer.
          </CardContentParagraph>
        </CardContent>
      </Card>
      <Card>
        <CardImg src="/unlock.png" />
        <CardContent>
          <CardTitle>Secondary referrals.</CardTitle>
          <CardContentParagraph>
            Earn an additional 2.5% in PAiT tokens from referrals made by your
            direct referrals.
          </CardContentParagraph>
        </CardContent>
      </Card>
    </Container>
  );
};
const Container = styled.div`
  padding: 6.25rem 0;
  font-size: 1.2rem;
  color: #fff;
  font-weight: normal;
  justify-content: space-between;
  display: flex;
  width: 100% !important;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: #070b15;
  border: 1px solid #454546;
  border-radius: 8px;
  padding: 24px 12px;
  max-width: 627px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex: 1 1 calc(33.33% - 1rem);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;
const CardImg = styled.img`
  width: 5rem;
  height: 5rem;
`;
const CardTitle = styled.h3`
  padding-bottom: 8px;
  font-size: 16px;
`;
const CardContent = styled.div`
  width: 100%;
`;
const CardContentParagraph = styled.p`
  color: #7d8893;
  font-size: 14px;
`;
