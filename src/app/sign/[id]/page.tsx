"use client";
import SignaturePad from "@/components/SaftDocument";
import { useEffect, useState } from "react";
import { useAnalyzedWallet } from "@/context/connect-wallet-context";
import toast from "react-hot-toast";
import { ConnectWalletButtonExtends } from "@/components/common/Common";
import { PagesWrapper } from "@/components/common/Common.styled";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { NotAuthorized } from "@/components/NotAuthorized";
import { useLoading } from "@/context/loading-context";

interface QueryParams {
  params: {
    id: string;
  };
}
const Home: React.FC<QueryParams> = ({ params }) => {
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [tokens, setTokens] = useState("");
  const [usdcAmount, setUsdcAmount] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState<number>();
  const [telegram, setTelegram] = useState("");
  const [isContractYours, setIsContractYours] = useState(false);
  const { connected, publicKey, isValidWallet, disconnect } =
    useAnalyzedWallet();

  const { setIsLoading } = useLoading();

  useEffect(() => {
    if (connected && publicKey) {
      getData()
        .then(() => {})
        .catch(() => {});
      if (isValidWallet) {
        console.log("Connected to wallet", publicKey);
      } else {
        // toast.error(
        //   "This wallet is not valid. It might be a compromised wallet, please use another one"
        // );
      }
    }
  }, [connected, publicKey, isValidWallet]);

  const { id } = params;

  const submitDocument = (dataURL: any) => {};

  // getData
  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/get-purchase/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("User data:", data);
      if (data?.purchase) {
        setName(data.purchase?.user?.name);
        setEmail(data.purchase?.user?.email);
        setLink(data.purchase?.user?.referral);
        setUsdcAmount(data.purchase?.usdc_amount);
        setTokens(data.purchase?.pait_tokens);
        setUserId(data.purchase?.user?.id);

        if (Number(data.purchase?.id) === 3) {
          setIsContractYours(true);
        } else if (process.env.NODE_ENV === "development") {
          setIsContractYours(true);
        } else {
          if (
            data.purchase?.user?.wallet?.toLowerCase() ===
            publicKey?.toLowerCase()
          ) {
            setIsContractYours(true);
          }
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {connected ? (
        <>
          {isContractYours ? (
            <SignaturePad
              onSave={submitDocument}
              name={name}
              email={email}
              purchaseId={Number(id)}
              userId={Number(userId)}
              tokens={Number(tokens)}
              link={link}
              usdcAmount={Number(usdcAmount)}
              telegram={telegram}
              setTelegram={setTelegram}
              setName={setName}
              setEmail={setEmail}
              address={publicKey!}
              showSignature={true}
            />
          ) : (
            <NotAuthorized />
          )}
        </>
      ) : (
        <PagesWrapper>
          <DynamicWidget
            innerButtonComponent={
              <ConnectWalletButtonExtends>
                Connect Wallet
              </ConnectWalletButtonExtends>
            }
          />
        </PagesWrapper>
      )}
    </div>
  );
};

export default Home;
