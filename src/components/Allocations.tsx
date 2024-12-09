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
  font-size: 16px;
  color: #ffffffb3;
  font-weight: normal;
  display: flex;
  flex-wrap: wrap; /* Enable wrapping */
  justify-content: space-between;
  gap: 1.5rem;
  width: 100% !important;
`;

const Card = styled.div`
  background-color: #070b15;
  border: 1px solid #454546;
  border-radius: 8px;
  padding: 24px 12px;
  max-width: 500px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;

  /* For larger screens */
  flex: 1 1 calc(50% - 0.75rem);

  /* For smaller screens */
  @media (max-width: 768px) {
    flex: 1 1 100%; /* Full width on small screens */
  }
`;
const CardImg = styled.img`
  width: 80px;
  height: 80px;
`;
const CardTitle = styled.h3`
  padding-bottom: 8px;
  font-size: 20px;
`;
const CardContent = styled.div`
  width: 100%;
`;
const CardContentParagraph = styled.p`
  color: #7d8893;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
