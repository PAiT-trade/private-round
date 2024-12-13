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
  multiInjectedProviderDiscovery: true,
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
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        color:  #070B15 !important;
    }

    .dynamic-widget-inline-controls__network-picker, .typography.account-control__name {
      color: #070B15 !important;
    }

    .account-control__container.account-control__container--multiwallet-disabled.dynamic-widget-inline-controls__account-control > svg {
      color: #070B15 !important;
      font-size: 16px !important;
    }
    .icon--size-small, .wallet-icon-with-network__container {
        width: 12px !important;
        height: 12px !important;
    }
    .dynamic-widget__container {
        width: 100% !important;
        height: 100% !important;
    }
    .dynamic-shadow-dom-content {
        width: 100% !important;
        height: 100% !important;
    }
    .connect-button{
        width:100% !important;
        height: 55px !important;
        border:none;  
        border-radius: 4px !important;   
        z-index: 1 !important; 
        background-color: #8cd2cf !important; 
        display: flex !important;
        align-items: center !important;
        span {
            font-size: 16px !important;
            font-family: 'Mona Sans', sans-serif !important;
            width: 100% !important;
            color: #070B15 !important;
            font-weight: normal !important;
            display: flex !important;
            justify-content: center !important;
            

            div {
                display: flex !important;
                align-items: center !important;
                gap: 4px;
            }
            svg {
                width: 13px !important;
                height: 13px !important;
                align-self: flex-start;
            }
        } 
    }

  .wallet-list__search-container {
      padding: 0 1.5rem .5rem !important;
  }
  .scroll-section {
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    --light-scrollbar-color: #adb0be69;
    --dark-scrollbar-color: #7f829433;
  }
  .list-tile {
      background-color: #24272e;
      color: #fff;
      display: flex;
      align-items: center;
      padding:.75rem;
      gap: .625rem;
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 .0625rem .125rem rgba(24, 39, 75, .04);
      transition-property: all;
      transition-duration: .15s;
      transition-timing-function: ease-out;
  }

  .modal {
    max-width: 370px !important; 
    width: 100% !important;
    position: fixed;
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    box-sizing: border-box; 
  }

  @media (max-width: 640px) {
    .modal {
      bottom: auto;
      left: 50% !important; 
      max-width: 80% !important;
    }
  }

  .wallet-list__container {
   min-height: 23.5rem !important;
  }
  .wallet-list__scroll-container {
    min-height: 23rem !important;
   }

  .vertical-accordion__container {
  }

   .accordion-item.accordion-item--full-height {
    height: 100% !important;
   }
  .modal-card.modal-card--sharp-mobile-bottom-radius.modal-card--radius-default {
  }

  .dynamic-footer.dynamic-footer__top-border  a span{
    font-size: 14px !important;
  }

  .dynamic-footer.dynamic-footer__top-border a svg {
  width: 20px !important; /* Change to your desired width */
  height: auto !important; /* Maintain aspect ratio */
}
  .wallet-list__scroll-container button {
    padding: 12px 12px !important;
  }
  .list-tile__children  span  {
    font-size: 14px !important;
    font-family: 'Mona Sans', sans-serif !important;
    letter-spacing: 0 !important;
    font-weight: 300 !important;
    line-height: 28px !important;
  }

  p.typography--body-small  {
    font-size: 11px !important;
  }
`;
