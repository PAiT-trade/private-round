"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ExposureData } from "@/types/wallet_exposure";
import {
  useDynamicContext,
  useIsLoggedIn,
  useUserWallets,
  useWalletConnectorEvent,
} from "@dynamic-labs/sdk-react-core";
import { isSolanaWallet } from "@dynamic-labs/solana";

interface ConnectWalletContextData {
  connected: boolean;
  publicKey: string | null;
  isValidWallet: boolean;
  exposure: ExposureData | null;
  disconnect: () => void;
  setConnected: (connected: boolean) => void;
}

const ConnectWalletContext = createContext<ConnectWalletContextData | null>(
  null
);

interface AnalyzeConnectWalletProviderProps {
  children: React.ReactNode;
}
const WALLET = "wallet";
const IS_VALID_WALLET = "is_valid_wallet";

export const AnalyzeConnectWalletProvider: React.FC<
  AnalyzeConnectWalletProviderProps
> = ({ children }) => {
  const [isConnected, setConnected] = useState<boolean>(false);

  const [validWallet, setValidWallet] = useState<boolean>(false);

  const [exposure, setExposure] = useState<ExposureData | null>(null);
  const isLoggedIn = useIsLoggedIn();
  const { sdkHasLoaded, primaryWallet, user } = useDynamicContext();
  const wallets = useUserWallets();

  useEffect(() => {
    if (sdkHasLoaded && isLoggedIn && primaryWallet) {
      if (isSolanaWallet(primaryWallet)) {
        setConnected(true);
        console.log("Primary wallet:", primaryWallet);
      }
    }
  }, [sdkHasLoaded, isLoggedIn, primaryWallet, isConnected, wallets]);

  const walletsConnectors = wallets.map(({ connector }) => connector);
  useWalletConnectorEvent(walletsConnectors, "disconnect", (connector) => {
    setConnected(false);
    console.log(`Connector ${connector} disconnected`);
  });

  useEffect(() => {
    console.log(`
      Connected: ${isConnected}
      Address: ${primaryWallet?.address} 
      Wallet: ${localStorage.getItem(WALLET)}
    `);

    if (!primaryWallet?.address) {
      setConnected(false);
    }
    if (primaryWallet?.address && isConnected) {
      console.log("Public key:", primaryWallet?.address);

      analyzeWallet(primaryWallet?.address)
        .then((res) => {
          console.log("Exposure:", res);
          if (res.status === "success") {
            console.log("Setting in context");
            setValidWallet(true);
            localStorage.setItem(WALLET, primaryWallet.address);
            localStorage.setItem(IS_VALID_WALLET, "true");
            setExposure(res.exposure);
          } else {
            setValidWallet(false);
            setExposure(null);
            localStorage.setItem(WALLET, primaryWallet.address);
            localStorage.setItem(IS_VALID_WALLET, "false");
          }

          console.log("Setting in context", validWallet);
        })
        .catch((error) => {
          // console.log("Analyze -> Error:", error);
        });
    }
  }, [isConnected, primaryWallet, validWallet]);

  const analyzeWallet = async (wallet: string) => {
    try {
      const response = await fetch(`/api/wallet-analyze/${wallet}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Wallet data:", data);

      return data;
    } catch (error) {
      console.log("Error:", error);
      throw new Error("Error fetching data");
    }
  };

  useEffect(() => {
    const isValid = localStorage.getItem(IS_VALID_WALLET);
    if (isValid) {
      setValidWallet(isValid === "true");
    }
  }, []);

  return (
    <ConnectWalletContext.Provider
      value={{
        connected: isConnected,
        publicKey: `${primaryWallet?.address!}`,
        disconnect: () => {},
        setConnected,
        exposure,
        isValidWallet: validWallet,
      }}
    >
      {children}
    </ConnectWalletContext.Provider>
  );
};

export const useAnalyzedWallet = () => {
  const context = useContext(ConnectWalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
