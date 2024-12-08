"use client";
import React from "react";
import {
  DynamicContextProvider,
  SortWallets,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});
const queryClient = new QueryClient();

export const DynamicProviderWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <DynamicContextProvider
      settings={{
        cssOverrides: customCSS,
        environmentId:
          process.env.NODE_ENV === "development"
            ? "3a0a4f65-5711-4f3a-a094-001ab35775e9"
            : "3d8d3d8e-82e5-46c7-b462-44b4b95b7d88",
        walletConnectors: [SolanaWalletConnectors],
        detectNewWalletsForLinking: true,
        recommendedWallets: [
          { walletKey: "phantomevm", label: "Popular" },
          { walletKey: "coinbasesolana" },
          { walletKey: "soflare" },
          { walletKey: "okxsolana" },
        ],
        walletsFilter: SortWallets([
          "phantomevm",
          "coinbasesolana",
          "soflare",
          "okxsolana",
        ]),
        appName: "PAiT",
        appLogoUrl: "https://pait-interface-prod.vercel.app/logo.svg",
        initialAuthenticationMode: "connect-and-sign",
      }}
      theme="dark"
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
};
const customCSS = `
    .typography--body-small,.account-control__name{
        font-size:  16px;
    }
    .typography--button-primary{
        font-size: 16px;
    }
    .dynamic-widget-inline-controls{
        width:  100% !important;
        height:  55px !important;
        max-height:  55px !important;
        background-color: #8cd2cf !important; 
    }
    .dynamic-widget__container {
        width: 100% !important;
        height: 100% !important;
    }
    .dynamic-shadow-dom-content {
        width: 100% !important;
        height: 100% !important;
        background-color: #8cd2cf !important; 
    }
    .connect-button{
        width:100% !important;
        height: 55px !important;
        background-color: #8cd2cf !important;        
        span {
            font-size: 16px !important;
            font-family: 'Mona Sans', sans-serif !important;
            width: 100% !important;
            color: #070B15 !important;
            font-weight: normal !important;

            div {
                display: flex !important;
                justify-content: space-around !important;
                gap: 4px;
            }
            svg {
                width: 16px !important;
                height: 16px !important;
                align-self: flex-start;
            }
        } 
    }
    .modal {
        width: 20% !important;
        max-width: 20% !important;
    }
    @media (max-width: 768px) {
        .modal {
            width: 80% !important;
            max-width: 80% !important;
        }
    }
    .wallet-list__search-container {
        height: 100% !important;
    }

    .search__input {
        height: 55px !important;
    }
`;