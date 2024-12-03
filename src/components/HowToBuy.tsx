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
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;
const ListItem = styled.li`
  flex: 1 1 calc(60.33% - 0.5rem);
`;

const ListContent = styled.div``;
const ListContentItem = styled.p`
  font-size: 12px;
  color: #7d8893;

  span {
    color: #95fce9;
    padding: 0 0.3rem;
  }
`;
const ListContentItemHeader = styled.p``;
