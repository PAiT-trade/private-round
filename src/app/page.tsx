"use client";
import styled from "styled-components";
import { Allocations } from "@/components/Allocations";
import { BuyCard } from "@/components/Cards/Buy";
import PreSale from "@/components/Cards/PreSale";
import { FAQSection } from "@/components/FAQSection";
import HeadingWithBar from "@/components/HeadingWIthLeftBar";
import { HowToBuy } from "@/components/HowToBuy";
import { NavSection } from "@/components/navbar";
import { Rewards } from "@/components/Rewards";
import ShowCase from "@/components/ShowCase";
import { Footer } from "@/components/Footer";
import { MinWrapp, SectionWrapper, Wrapping } from "@/styles/app-common-styled";
import { AppState } from "@/types/app";
import { useCallback, useEffect, useRef, useState } from "react";
import { media, sizes } from "@/utils/media";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";
import { useLoading } from "@/context/loading-context";
import toast from "react-hot-toast";
import { isSolanaWallet } from "@dynamic-labs/solana";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  getAccount,
  createAssociatedTokenAccountInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { BackgroundImage } from "@/components/BackgroundImage";

export default function Home() {
  const { connected, publicKey } = useAnalyzedWallet();
  const { primaryWallet } = useDynamicContext();
  const { setIsLoading, isLoading } = useLoading();
  const [minAmounts, setMinAmounts] = useState({
    min: "1000",
    max: "20000",
  });
  const router = useRouter();

  const isFetched = useRef(false);
  const isCreatedUser = useRef(false);

  const [state, setState] = useState<AppState>({
    allocation: {
      remaining: 1946000,
      total: 2000000,
    },
    priceOfPait: "0.16",
    remainingTime: "2024-12-31",
    allowReferral: false,
    symbol: "USDC",
    inputValue: "",
    user: null,
    amountInUsd: "1000",
    mininumAmount: "1000",
    maximumAmount: "20000",
    amountInPait: "1",
    endDateTime: "2025-02-25T00:00:00",
    paymentMethod: "usdc",
    referralCode: "",
    exposure: null,
    isInValid: false,
  });

  const getAllocation = async () => {
    try {
      const response = await fetch("/api/get-allocations", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      console.log("RESPONSE: ", result.allocation);
      setState((prevState) => ({
        ...prevState,
        allocation: {
          remaining: result.allocation ? result.allocation.remaining : 0,
          total: 2000000,
        },
      }));
    } catch (error) {}
  };

  const fetchData = useCallback(async () => {
    fetchUserInfo();
    console.log("Show Referral: ", state.user?.show_referral!);
    setState((prevState) => ({
      ...prevState,
      allowReferral: state.user?.show_referral!,
    }));
  }, [publicKey]);

  function calculateAmountInPait() {
    let isInvalid = false;

    if (!state.amountInUsd || isNaN(Number(state.amountInUsd))) {
      isInvalid = true;
    }

    let amounts = {
      min: Number(minAmounts.min),
      max: Number(minAmounts.max),
      amountInUSD: Number(state.amountInUsd ? state.amountInUsd : 0),
    };

    if (
      Number(amounts.amountInUSD) < Number(amounts.min) ||
      Number(amounts.amountInUSD) > Number(amounts.max)
    ) {
      isInvalid = true;
    }
    const paits = Number(state.amountInUsd) / Number(state.priceOfPait);

    setState((prevState) => ({
      ...prevState,
      isInValid: isInvalid,
      amountInPait: (Math.round(paits * 100) / 100).toString(),
    }));
  }

  useEffect(() => {
    const fetchDataIfNeeded = async () => {
      if (!isFetched.current && state.user) {
        await fetchData();
        isFetched.current = true; // Mark as fetched
      }
    };
    calculateAmountInPait();
    fetchDataIfNeeded();

    const intervalId = setInterval(() => {
      if (isFetched.current && state.user) {
        fetchData();
      }
    }, 20000);

    return () => clearInterval(intervalId);
  }, [fetchData, state.mininumAmount, state.maximumAmount]);

  useEffect(() => {
    const setAllocations = async () => {
      await getAllocation();
    };
    setAllocations();
  }, [state.allocation.remaining]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    let referral = urlParams.get("referral");
    let localReferral = localStorage.getItem("referral");
    if (referral) {
      if (localReferral) {
        if (localReferral !== referral) {
          localStorage.setItem("referral", referral);
        }
      } else {
        localStorage.setItem("referral", referral);
      }
    } else {
      if (localReferral) {
        referral = localReferral;
      }
    }

    if (referral) {
      setState((prevState) => ({ ...prevState, referralCode: referral }));
    }
  }, []);

  const createNewUser = useCallback(async () => {
    if (publicKey) {
      try {
        const response = await fetch("/api/create-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ wallet: publicKey }),
        });
        const result = await response.json();
        if (result.status === "success") {
          setState((prevState) => ({ ...prevState, user: result.user }));
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }

      fetchData();
    }
  }, [publicKey]);

  useEffect(() => {
    const handleUserSideEffects = async () => {
      if (primaryWallet && publicKey && !isCreatedUser.current) {
        await createNewUser();
        await fetchUserInfo();
        await fetchData();
        isCreatedUser.current = true;
      }
    };

    if (primaryWallet && publicKey) {
      handleUserSideEffects();
      fetchData();
    }
  }, [primaryWallet, publicKey, createNewUser]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/get-user/${publicKey}`);
      const result = await response.json();
      if (result.status === "success" && result.user) {
        setState((prevState) => ({ ...prevState, user: result.user }));
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, [publicKey]);

  const content = [
    {
      title: "Limited Supply",
      description: "2,000,000 PAiT Tokens available in the Private Round",
    },
    {
      title: "Unlock Schedule",
      description: "10% at TGE, 3 months cliff, linear vesting 18 months",
    },
  ];

  const createNewPurchase = async (data: {
    user_id: number;
    pait_tokens: number;
    usdc_amount: number;
    usedReferral?: string;
  }) => {
    try {
      const response = await fetch("/api/create-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Return status and message directly from the server response if available
      return {
        status: result?.status || "error",
        message: result?.message || "Failed to create purchase",
        purchase: result?.status === "success" ? result.purchase : null,
      };
    } catch (error) {
      console.error("Error creating purchase:", error);
      return {
        status: "error",
        message: "Failed to create purchase due to a network or server issue",
        purchase: null,
      };
    }
  };

  const sendUSDC = useCallback(async () => {
    let amount = Number(state.amountInUsd);
    console.log("Sending USDC...");

    setIsLoading(true);
    console.log(
      `Amounts  X: ${Number(state.amountInPait)} ${Number(state.amountInUsd)}`
    );

    if ((!connected || !publicKey) && publicKey == "undefined") {
      toast.error("Wallet is not connected or signTransaction is unavailable.");
      return;
    }
    if (!primaryWallet || !isSolanaWallet(primaryWallet)) {
      toast.error("Please connect a Solana wallet");
      return;
    }
    if (!state.user) {
      console.log("USER not found.");
      setIsLoading(false);
      toast.error("Connect wallet to continue");
      return;
    }
    let risk_ratio = Number(process.env.ELLIPTIC_RISK_RATIO!);
    if (Number(state.exposure?.risk_score) >= risk_ratio) {
      alert(
        `Your wallet is flagged as high risk. Please use a different wallet to continue`
      );
      setIsLoading(false);
      toast.success(
        "Your wallet is flagged as high risk. Please use a different wallet to continue"
      );
      return;
    }

    if (state.amountInUsd === "0") {
      toast.error("Please enter a valid amount");
      setIsLoading(false);
      return;
    }

    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first");
      setIsLoading(false);
      return;
    }

    const recipientPublicKey = new PublicKey(process.env.PAIT_ADDRESS!);
    // USDC address
    const mintPublicKey = new PublicKey(
      "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" // USDC address
    );
    const userPublicKey = new PublicKey(publicKey);

    const usdcTokenAccount = await getAssociatedTokenAddress(
      mintPublicKey,
      userPublicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const SOL_CONNECTION = await primaryWallet.getConnection();

    const accountInfo = await SOL_CONNECTION.getAccountInfo(usdcTokenAccount);

    if (!accountInfo) {
      setIsLoading(false);
      toast.error("You have insufficient amount of USDC!!");
      return;
    }

    // let currentSlot = 0;

    // Find the associated token account for USDC
    const tokenAccounts = await SOL_CONNECTION.getTokenAccountsByOwner(
      new PublicKey(publicKey),
      { mint: mintPublicKey }
    );

    if (tokenAccounts.value.length === 0) {
      toast.error("No USDC balance found in this wallet.");
      setIsLoading(false);
      return;
    }

    try {
      // Get balance of the first USDC account
      const usdcAccountInfo = await getAccount(
        SOL_CONNECTION,
        tokenAccounts.value[0].pubkey
      );
      const usdcBalance = usdcAccountInfo.amount;

      const walletUSDCBalance = Number(usdcBalance) / Math.pow(10, 6);

      // USDC has 6 decimal places
      console.log("USDC Balance:", walletUSDCBalance);

      if (walletUSDCBalance < amount) {
        setIsLoading(false);
        toast.error(
          `Insufficient USDC balance. Your balance is less than $${amount}`
        );
        return;
      }
    } catch (error) {
      console.log("Error sending USDC:", error);
      toast.error("Error getting Connected Wallet balance");
      throw new Error("Error fetching USDC balance");
    }

    const { blockhash } = await SOL_CONNECTION.getLatestBlockhash();

    // Get the sender's associated token address for USDC
    const senderTokenAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      userPublicKey
    );
    // Get the recipient's associated token address for USDC
    const recipientTokenAddress = await getAssociatedTokenAddress(
      mintPublicKey,
      recipientPublicKey
    );

    const transaction = new Transaction();

    // Check if the sender's token account exists
    try {
      await getAccount(SOL_CONNECTION, senderTokenAddress);
    } catch (error) {
      // console.log("Sender's token account does not exist. Creating...");
      const createAccountInstruction = createAssociatedTokenAccountInstruction(
        userPublicKey, // payer
        senderTokenAddress,
        userPublicKey, // owner
        mintPublicKey
      );
      transaction.add(createAccountInstruction);
    }

    // Check if the recipient's token account exists
    try {
      await getAccount(SOL_CONNECTION, recipientTokenAddress);
    } catch (error) {
      // console.log("Recipient's token account does not exist. Creating...");
      const createRecipientAccountInstruction =
        createAssociatedTokenAccountInstruction(
          userPublicKey, // payer
          recipientTokenAddress,
          recipientPublicKey, // owner
          mintPublicKey
        );
      transaction.add(createRecipientAccountInstruction);
    }

    // Create transfer instruction
    const transferInstruction = createTransferInstruction(
      senderTokenAddress,
      recipientTokenAddress,
      userPublicKey,
      amount * 10 ** 6 // USDC has 6 decimal places
    );

    transaction.add(transferInstruction);
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = userPublicKey;

    try {
      const signer = await primaryWallet.getSigner();

      await signer.signAndSendTransaction(transaction);
      const response = await createNewPurchase({
        user_id: state.user?.id,
        pait_tokens: Number(state.amountInPait),
        usdc_amount: Number(state.amountInUsd),
        usedReferral: state.referralCode ? state.referralCode : "",
      });

      localStorage.removeItem("referral");

      if (response.status === "success") {
        router.push(`/sign/${response?.purchase?.id}`);
        console.log("Transaction sent successfully:");
      }
      // console.log("USDC transaction sent:", txid);
    } catch (error: unknown) {
      setIsLoading(false);
      if (error instanceof Error) {
        console.error("Error during transaction:", error);
        toast.error(
          `Error buying PAiT: ${error?.message?.split("account")[0]}`
        );
      } else {
        console.error("Unexpected error:", error);
        toast.error("Failed to buy PAit token");
      }
    }
  }, [connected, publicKey, state]);

  return (
    <>
      <Wrapping>
        <HeaderWrapper>
          <MinWrapp>
            <NavSection />
            <FlexContainer>
              <PreSale $remainingtime={state.remainingTime} />
              <BuyCard
                $state={state}
                $setState={setState}
                $isConnected={connected}
                $amounts={minAmounts}
                $buyPait={sendUSDC}
                $calculateAmountInPait={calculateAmountInPait}
              />
              <ShowCaseImg src="/float-showcase.svg" />
            </FlexContainer>
          </MinWrapp>
        </HeaderWrapper>
      </Wrapping>

      {/* Instructions Section */}
      <SectionWrapper id="how-to-buy" $paddingtop="100px">
        <HeadingWithBar
          $title="INSTRUCTION"
          $color="#ADA5D1"
          $subtitlewidth="72rem"
          $subtitle="How to acquire tokens in the private round?"
        />
        <HowToBuy />
      </SectionWrapper>
      {/* Rewards */}
      <SectionWrapper>
        <HeadingWithBar
          $title="REWARDS"
          $color="#ADA5D1"
          $subtitlewidth="65rem"
          $subtitle="Share with friends, earn rewards?"
        />
        <Rewards />
      </SectionWrapper>

      <SectionWrapper $paddingtop="100px">
        <HeadingWithBar
          $title="SUPPLY & SCHEDULE"
          $color="#ADA5D1"
          $subtitlewidth="70rem"
          $subtitle="Allocations & Vesting."
        />
        <Allocations />
      </SectionWrapper>
      {/* Show case */}
      <SectionWrapper $paddingtop="100px">
        <ShowCase />
      </SectionWrapper>

      <SectionWrapper $paddingtop="100px">
        <HeadingWithBar
          $title="FAQ"
          $color="#ADA5D1"
          $subtitlewidth="45rem"
          $subtitle="Everything you need to know."
        />
        <FAQSection />
      </SectionWrapper>
    </>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 1440px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: ${sizes.desktop + "px"}) {
    padding: 0;
  }
  @media (max-width: ${sizes.tablet + "px"}) {
    /* padding: 1rem; */
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* padding: 8rem 8px; */
  /* background-color: red; */
  gap: 4rem;
  width: 100%;

  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column;
    padding: 8px 8px;
    gap: 2rem;
  }
`;

const ShowCaseImg = styled.img`
  width: 100%;
  display: none;
  /* mobile and tablet */
  @media (max-width: ${sizes.mobile + "px"}) {
    display: block;
  }
`;
