import { Paragraph } from "@/styles/app-common-styled";
import styled from "styled-components";
import { CirclePlayIcon, MoveUpRightIcon } from "lucide-react";

const Wrapper = styled.div`
  background-color: #070b15;
  color: #fff;
  padding: 2rem;
  text-align: center;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const LiveBadge = styled.div`
  color: #8cd2cf;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0.5rem 0;
  font-size: "Mona Sans";
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    color: #8cd2cf;
  }
  b {
    font-size: 3.5rem;
    color: #87939e;

    &:first-child {
      color: white;
      font-size: 4rem;
    }
  }
`;
const Subtitle = styled.p`
  font-size: 1rem;
  margin: 1rem 0 2rem;
  line-height: 1.5;
  color: #bbb;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;
const Button = styled.button<{ bgcolor?: string }>`
  background-color: #8cd2cf;
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : "##8cd2cf")};
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0.7rem 1.6rem;
  cursor: pointer;
  border-radius: 4px;
  height: 3.4375rem;
`;

const ButtonWallet = styled.span`
  display: flex;
  gap: 0.3rem;
  justify-content: space-between;
  align-items: center;
`;
const ButtonAction = styled.span`
  display: flex;
  gap: 0.5rem;
`;

const Countdown = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  span {
    font-size: 1.25rem;
    color: #bbb;
  }
`;

const PreSale = () => {
  return (
    <Wrapper>
      <LiveBadge>LIVE</LiveBadge>
      <Title>
        <b>Exclusive Access</b>
        <b>
          to <span>$PAiT</span> pre-sale
        </b>
      </Title>
      <Subtitle>
        <Paragraph>
          <span>
            Join the PAiT Private Round to secure exclusive tokens and earn{" "}
          </span>
          <span>
            rewards.Act fast—only 2,000,000 tokens are available with a
            structured{" "}
          </span>
          <span>unlock schedule! </span>
        </Paragraph>
      </Subtitle>
      <ButtonContainer>
        <Button bgcolor="#7F7BBE">
          <ButtonWallet>
            <span>Contact</span>
            <MoveUpRightIcon size={12} />
          </ButtonWallet>
        </Button>

        <Button bgcolor="#fff">
          <ButtonWallet>
            <CirclePlayIcon size={16} />
            <span>How to buy ?</span>
          </ButtonWallet>
        </Button>
      </ButtonContainer>
      <Countdown>
        <span>First stage ending soon.</span>
        <span>
          02 Days <span>14 Hours</span> <span>45 Minutes</span>
        </span>
      </Countdown>
    </Wrapper>
  );
};

export default PreSale;
