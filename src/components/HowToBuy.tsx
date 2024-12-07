"use client";
import styled from "styled-components";

export const HowToBuy = () => {
  return (
    <Container>
      {" "}
      <List>
        <ListItem>
          <ListContent>
            <ListContentItemHeader>Connect your wallet.</ListContentItemHeader>
            <ListContentItem>Use a SOLANA-supperted wallet</ListContentItem>
            <ListContentItem>
              <span>Avoid Boinance or Coinbase</span>
            </ListContentItem>
            <ListContentItem>
              <span>Do not use centralized exchanges wallets</span>
            </ListContentItem>
          </ListContent>
        </ListItem>
        <ListItem>
          <ListContent>
            <ListContentItemHeader>Complete KYC.</ListContentItemHeader>
            <ListContentItem>
              <span>Press Buy PAiT</span> and Click "KYC" and verify your
              identity.
            </ListContentItem>
          </ListContent>
        </ListItem>
        <ListItem>
          <ListContent>
            <ListContentItemHeader>Enter USDC amount.</ListContentItemHeader>
            <ListContentItem>
              Specify how much USDC you want to invest
              <span>from 1000 to 20000</span>
            </ListContentItem>
          </ListContent>
        </ListItem>
        <ListItem>
          <ListContent>
            <ListContentItemHeader>Confirm purchase.</ListContentItemHeader>
            <ListContentItem>Click "Confirm" to proceed</ListContentItem>
          </ListContent>
        </ListItem>
        <ListItem>
          <ListContent>
            <ListContentItemHeader>Sign SAFT agreement.</ListContentItemHeader>
            <ListContentItem>
              Digitally sign the agreement to comply with terms.
            </ListContentItem>
          </ListContent>
        </ListItem>
        <ListItem>
          <ListContent>
            <ListContentItemHeader>Claim tokens.</ListContentItemHeader>
            <ListContentItem>
              Connects to <span>StreamFlow</span> at 6PM UTC the next day to
              access your tokens.
            </ListContentItem>
          </ListContent>
        </ListItem>
      </List>
    </Container>
  );
};
const Container = styled.div`
  padding: 6.25rem 0;
  font-size: 16px;
  color: #fff;
  font-weight: normal;
`;

const List = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  list-style: none;
  counter-reset: list-counter;
`;

const ListItem = styled.li`
  flex: 1 1 calc(33.33% - 1rem);
  min-width: 200px;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  align-items: center;
  counter-increment: list-counter;
  margin-bottom: 48px;

  &::before {
    content: counter(list-counter);
    width: 50px;
    height: 50px;
    background-color: #fff;
    color: #070b15;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-self: flex-start;
    align-items: center;
    border-radius: 6px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 1rem);
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

const ListContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.3rem;
`;

const ListContentItem = styled.p`
  font-size: 14px;
  color: #7d8893;

  span {
    color: #95fce9;
    padding: 0 0.3rem;
  }
`;
const ListContentItemHeader = styled.p`
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.6rem;
  font-size: 16px;
`;