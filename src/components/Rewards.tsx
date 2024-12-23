"use client";
import styled from "styled-components";

export const Rewards = () => {
  return (
    <Container>
      <Card>
        <CardImg src="/direct-referral.svg" />
        <CardTitle>Direct referrals.</CardTitle>
        <CardContent>
          <CardContentParagraph>
            Receive 5% cashback in USDC and 2.5% in PAiT tokens for each person
            you directly refer.
          </CardContentParagraph>
        </CardContent>
      </Card>
      <Card>
        <CardImg src="/secondary-referral.svg" />
        <CardTitle>Secondary referrals.</CardTitle>
        <CardContent>
          <CardContentParagraph>
            Earn an additional 2.5% in PAiT tokens from referrals made by your
            direct referrals.
          </CardContentParagraph>
        </CardContent>
      </Card>
      <Card>
        <CardImg src="/daily-referral.svg" />
        <CardTitle>Daily cashback.</CardTitle>
        <CardContent>
          <CardContentParagraph>
            Cashback rewards are distributed daily between 6PM and 9PM UTC the
            following day.
          </CardContentParagraph>
        </CardContent>
      </Card>
      <Card>
        <CardImg src="/unlock-referral.svg" />
        <CardTitle>Token unlocking.</CardTitle>
        <CardContent>
          <CardContentParagraph>
            All referral tokens will be unlocked during the Token Generation
            Event (TGE).
          </CardContentParagraph>
        </CardContent>
      </Card>
    </Container>
  );
};
const Container = styled.div`
  padding: 6.25rem 0;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: ${({ theme }) => "#0c0f18"};
  border: 1px solid #ffffff1a;
  border-radius: 8px;
  padding: 24px;
  /* width: 302px; */
  flex: 1 1 calc(20% - 1rem);

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 2rem);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;
const CardImg = styled.img`
  width: 80px;
  height: 80px;
`;
const CardTitle = styled.h3`
  padding-top: 2.8rem;
  padding-bottom: 8px;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
  color: ${({ theme }) => theme.colors.text.white};
  letter-spacing: 0%;
`;
const CardContent = styled.div`
  width: 100%;
`;
const CardContentParagraph = styled.p`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.normal};
  line-height: 32px;
  font-weight: ${({ theme }) => theme.fonts.weights.normal};
`;
