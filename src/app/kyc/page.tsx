"use client";
import { useEffect } from "react";
import { VerifyKYC } from "@/components/kyc/VerifyKYC";
import styled from "styled-components";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import {
  ConnectWalletButtonExtends,
  PagesWrapper,
  PageTitle,
} from "@/styles/app-common-styled";

export default function KYC() {
  const { connected, publicKey, isValidWallet, disconnect } =
    useAnalyzedWallet();

  useEffect(() => {
    if (connected && publicKey) {
      if (isValidWallet) {
        console.log("Connected to wallet", publicKey);
      } else {
        // toast.error(
        //   "This wallet is not valid. It might be a compromised wallet, please use another one"
        // );
      }
    }
  }, [connected, publicKey, isValidWallet]);

  return (
    <PagesWrapper>
      {connected ? (
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PageTitle>Purchase have not started yet</PageTitle>
          <PageTitle>
            You will be able to start your purchase only after completing the
            KYC verification.
          </PageTitle>

          <KycContent>
            <VerifyKYC wallet={publicKey!} />
          </KycContent>
        </div>
      ) : (
        <DynamicWidget
          innerButtonComponent={
            <ConnectWalletButtonExtends>
              Connect Wallet
            </ConnectWalletButtonExtends>
          }
        />
      )}
    </PagesWrapper>
  );
}

const KycContent = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
`;

const BText = styled.p``;
