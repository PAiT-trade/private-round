"use client";
import { useEffect, useState } from "react";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import styled from "styled-components";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import { useLoading } from "@/context/loading-context";
import React from "react";
import { NotAuthorized } from "@/components/NotAuthorized";
import { toast } from "react-hot-toast";
import {
  MenuConnectButton,
  PagesWrapper,
  PageTitle,
  SectionWrapper,
  Wrapping,
} from "@/styles/app-common-styled";
import { NavSection } from "@/components/navbar";

export default function KYC() {
  const { connected, publicKey } = useAnalyzedWallet();

  const { setIsLoading } = useLoading();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(0);
  useEffect(() => {
    if (connected && publicKey) {
      // allowed address to access the users wallets
      const authorizedKeys = [
        "HifcJVRc6RRVFWDZd5HzrXtX92LBEMFXsejByNfuSw56",
        "ASVhQSuRrB9CqyR347kSJJihGZgWeqA1W5JmTBGmrPFw",
        "8FpZzzM6r4N4gXDfNMGAB49zMJDpgwK2PNwGtMGiYVYS",
        "ERgpvPPvSYnqTNay5uFRvcCiHYF48g9VkqXw8NroFepx",
      ];

      if (
        authorizedKeys
          .map((item) => item.toLowerCase())
          .includes(publicKey.toLowerCase())
      ) {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    }
  }, [connected, publicKey, isAuthorized]);

  const updateAllocation = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-allocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remaining }),
      });
      const result = await response.json();
      console.log("RESPONSE: ", result);
      toast.success(result.message);
    } catch (error) {
      toast.error("Error updating allocations");
    }

    setIsLoading(false);
  };

  return (
    <SectionWrapper>
      <Wrapping>
        <NavSection />
        <PagesWrapper style={{ padding: "30px !important" }}>
          {connected ? (
            <div style={{ padding: "1rem" }}>
              {isAuthorized ? (
                <>
                  <Container>
                    <PageTitle>PAiT Allocations </PageTitle>

                    <WrapController>
                      <WrapLabel>New Remaining</WrapLabel>
                      <WrapInput
                        value={remaining}
                        onChange={(e) => {
                          setRemaining(Number(e.target.value));
                        }}
                      />
                      <Button onClick={() => updateAllocation()}>Submit</Button>
                    </WrapController>
                  </Container>
                </>
              ) : (
                <NotAuthorized />
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
              }}
            >
              <DynamicWidget
                innerButtonComponent={
                  <MenuConnectButton>Connect Wallet</MenuConnectButton>
                }
              />
            </div>
          )}
        </PagesWrapper>
      </Wrapping>
    </SectionWrapper>
  );
}

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WrapController = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;
const WrapLabel = styled.label`
  align-self: flex-start;
  margin-bottom: 10px;
`;
const WrapInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  margin-bottom: 10px;
  outline-width: 0;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #343e56;
  color: #fff;
  border: none;
  width: 100%;
  cursor: pointer;
`;
