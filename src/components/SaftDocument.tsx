import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";
import toast from "react-hot-toast";
import { Loader2, CopyIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import CanvasDraw from "react-canvas-draw";
import { useRouter } from "next/navigation";
import { ModalSection } from "@/components/modal/Modal";
import axios from "axios";
import { useLoading } from "@/context/loading-context";
import { devices } from "@/styles/common";
import { sizes } from "@/utils/media";

interface SignaturePadProps {
  onSave?: (url: string) => void;
  name?: string;
  email?: string;
  userId?: number;
  purchaseId?: number;
  telegram?: string;
  setTelegram?: (telegram: string) => void;
  setName?: (name: string) => void;
  setEmail?: (email: string) => void;
  showSignature: boolean;
  address?: string;
  tokens?: number;
  link?: string;
  usdcAmount?: number;
}

const SignaturePad: React.FC<SignaturePadProps> = ({
  onSave,
  email,
  name,
  setName,
  purchaseId,
  userId,
  telegram,
  link,
  setTelegram,
  setEmail,
  showSignature,
  tokens,
  usdcAmount,
  address,
}) => {
  const canvasRef = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { setIsLoading, isLoading } = useLoading();
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState<{
    human: string;
    decimal: string;
  }>({
    human: "",
    decimal: "",
  });

  useEffect(() => {
    setCurrentDate({
      human: moment(new Date()).format("MMMM, D YYYY"),
      decimal: moment(new Date()).format("YYYY-MM-DD"),
    });
  }, []);

  const clear = () => {
    canvasRef.current.clear();
  };

  // Function to check if the canvas is empty
  const isCanvasEmpty = (): boolean => {
    if (canvasRef.current) {
      const canvasData = canvasRef.current.getSaveData();

      if (!canvasData) {
        return true;
      }

      const data = JSON.parse(canvasData);
      console.log("Canvas is empty: ", data);

      if (!data) {
        return true;
      }

      const lines = data.lines;

      console.log("Lines: ", lines);

      if (lines.length === 0) {
        return true;
      }
      return false;
    }
    return true;
  };

  const saveSignature = async () => {
    setIsLoading(true);

    // if (!name) {
    //   toast.error("Please provide your name!!!");
    //   setIsLoading(false);
    //   return;
    // }
    if (!email) {
      toast.error("Please provide your email to proceed");
      setIsLoading(false);
      return;
    }

    if (isCanvasEmpty()) {
      toast.error("Please sign the document before proceeding");
      setIsLoading(false);
      return;
    }

    await generatePDF()
      .then(() => {
        console.log("PDF generated successfully");
        setIsLoading(false);
      })
      .catch((_error) => {
        console.log("Error generating PDF: ", _error);
        setIsLoading(false);
        toast.error(
          "Error downloading your pdf document. Please contact PAiT team for support. Thank you!!!",
          _error
        );
      });
  };

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      console.log("Please wait as we complete your purchase process!!!");
      console.group("Generating PDF");
      const input = document.getElementById("document-section");
      if (!input) {
        throw new Error("No input found .... ");
      }

      // Constants for A4 dimensions in mm
      const A4_WIDTH_MM = 210;
      const A4_HEIGHT_MM = 297;

      // Convert mm to pixels for better compatibility across devices
      const MM_TO_PX = 3; // Conversion factor from mm to pixels (approx)
      const A4_WIDTH_PX = A4_WIDTH_MM * MM_TO_PX;
      const A4_HEIGHT_PX = A4_HEIGHT_MM * MM_TO_PX;

      // Apply A4 styles before capturing
      input.style.lineHeight = "1.65";
      input.style.letterSpacing = "1.8";
      input.style.fontSize = "24px !important";
      input.style.fontFamily = "'Open Sans', sans-serif";
      input.style.padding = "20px";
      input.style.width = `${A4_WIDTH_MM}mm`;
      input.style.maxWidth = `${A4_WIDTH_MM}mm`;
      input.style.minHeight = `${A4_HEIGHT_MM}mm`;
      input.style.boxSizing = "border-box";

      const marginTopBottom = 16.18;
      const pagePadding = 10;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [210, 297],
      });

      // Define page dimensions
      const marginAdjustment = 5; // Adjust this value as needed
      const pageHeight =
        pdf.internal.pageSize.height -
        2 * marginTopBottom -
        2 * pagePadding -
        marginAdjustment;
      const pageWidth = pdf.internal.pageSize.width - 2 * pagePadding;
      const scaleFactor = 1.5; // Reduced scaling factor to manage memory on iOS

      // Set the scaling factor for high resolution

      // Apply temporary scale transformation
      input.style.transform = `scale(${scaleFactor})`;
      input.style.transformOrigin = "top left";
      input.style.width = `${A4_WIDTH_PX * scaleFactor}px`;
      input.style.height = `${A4_HEIGHT_PX * scaleFactor}px`;

      // Capture the element using dom-to-image
      const imgData = await domtoimage.toPng(input, {
        bgcolor: "#fff",
        quality: 0.7,
        height: input.scrollHeight * scaleFactor,
        width: input.scrollWidth * scaleFactor,
        style: {
          transform: `scale(${scaleFactor})`,
        },
      });
      // Reset the transformation after capture
      input.style.transform = "none";
      // input.style.width = "";
      // input.style.height = "";
      // Create an offscreen image element to calculate dimensions
      const img = new Image();
      img.src = imgData;
      // await new Promise((resolve) => (img.onload = resolve));
      await img.decode();

      // Calculate the image height based on the PDF page width
      const imgWidth = img.width;
      const imgHeight = img.height;
      const ratio = imgWidth / pageWidth;
      const segmentHeight = pageHeight * ratio;
      // Calculate the total number of PDF pages needed

      let currentPosition = 0;
      let addedPages = false; // Track if any pages are added

      while (currentPosition < imgHeight) {
        // Calculate the segment height for the current page
        const currentSegmentHeight = Math.min(
          segmentHeight,
          imgHeight - currentPosition
        );
        const canvas = document.createElement("canvas");
        canvas.width = imgWidth;

        canvas.height = currentSegmentHeight;

        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Failed to get canvas context");
        }

        context.fillStyle = "#fff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the image segment
        context.drawImage(
          img,
          0,
          currentPosition,
          imgWidth,
          currentSegmentHeight, // Segment height
          0,
          0,
          imgWidth,
          currentSegmentHeight
        );

        const segmentImgData = canvas.toDataURL("image/png", 0.7);

        if (canvas.height > 0) {
          if (currentPosition > 0) pdf.addPage();
          pdf.addImage(
            segmentImgData,
            "PNG",
            pagePadding,
            marginTopBottom,
            pageWidth,
            (currentSegmentHeight * pageWidth) / imgWidth,
            "",
            "FAST"
          );
          addedPages = true; // Set to true if a page is added
        }
        // Move to the next segment
        currentPosition += segmentHeight;
      }

      if (addedPages) {
        const fileName = `PAiT_SAFT_AGGREEMENT_DOCUMENT-${name}-${uuidv4()}-${address}.pdf`;
        // to be removed
        const formData = new FormData();
        const pdfBlob = pdf.output("blob");
        const pdfFile = new File([pdfBlob], fileName, {
          type: "application/pdf",
        });

        formData.append("file", pdfFile);
        formData.append("file_name", fileName);
        formData.append("telegram", telegram ? telegram : "");
        formData.append("usdc_amount", usdcAmount ? usdcAmount.toString() : "");
        formData.append("pait_amount", tokens ? tokens.toString() : "");
        formData.append("userId", userId ? userId.toString() : "");

        if (email && email.includes("@")) {
          formData.append("email", email);
        } else {
          console.error("Invalid email address");
        }
        await axios.post(`/api/update-purchase/${purchaseId}`, {
          email,
          name,
        });

        fetch("/api/upload-file", {
          method: "POST",
          body: formData,
        });

        toast.success("Thank you for making the purchase.");

        setIsOpen(true);

        return formData;
      }
      return null;
    } catch (error: any) {
      setIsLoading(false);
      toast.error(`Error: ${error}`);
    }
  };

  const handleCopy = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Successfully copied the referral link");
    } catch (error) {}
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        document.body.style.overflow = ""; // Re-enable scrolling
      }

      // Cleanup on unmount or state change
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <Wrappering>
      <ModalSection
        title="Purchase Confirmation"
        setIsOpen={() => {
          setIsOpen(isOpen);
          if (isOpen) {
            setIsLoading(true);
            router.push("/");
          }
        }}
        isOpen={isOpen}
      >
        <WrapContent>
          <Wraps>
            <HeadingPage>
              {usdcAmount} USDC = {tokens} $PAiT.
            </HeadingPage>
            <WrapsSubHeader
              style={{
                textAlign: "center",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              A SAFT agreement in your mailbox!
            </WrapsSubHeader>
          </Wraps>

          <Wraps>
            <HeadingPage>Earn Rewards by Sharing</HeadingPage>
            <WrapsSubHeader>
              <Label>
                Referral link:{" "}
                {`https://privateround.pait.fi/?referral=${link}`}
              </Label>
              <WrapsCopy
                onClick={() =>
                  handleCopy(`https://privateround.pait.fi/?referral=${link}`)
                }
              >
                <CopyIcon size={24} />
              </WrapsCopy>
            </WrapsSubHeader>
            <WrapsSubHeader>Invite others and earn:</WrapsSubHeader>
            <WrapList>
              <li>
                Direct Referrals: 5% cashback in USDC + 2.5% in $PAiT tokens
              </li>
              <li>Secondary Referrals: 2.5% in $PAiT tokens</li>
            </WrapList>
          </Wraps>

          <ActionButton href="https://t.me/+zdBkF3dauTs5ODc8" target="_blank">
            Join our Investors Telegram Channel
          </ActionButton>
        </WrapContent>
      </ModalSection>
      <div
        id="document-section"
        style={{
          fontFamily: "Open Sans",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {!isOpen ? (
          <DocumentContainer>
            <Title>Token Sale Agreement</Title>
            <Subtitle>Effective as of {currentDate.human}</Subtitle>
            <Paragraph>
              This Token Sale Agreement (hereinafter the "Agreement") sets forth
              the terms governing your acquisition of the Company's tokens
              "PAiT" (hereinafter the "Token"). This Agreement is made between
              PAiT LAB LIMITED, co.nr: 76685422, with a correspondence address
              at Unit 2A, 17/F Glenealy Tower, No. 1 Glenealy, Central, Hong
              Kong (hereinafter the "Company"), and you as the acquirer of the
              Token.
            </Paragraph>
            <Paragraph>
              You represent and warrant to the Company that you are legally
              entitled and eligible to engage in economic activity under
              applicable law; you are not under 18 years old, have full legal
              capacity, are not from a Restricted Territory, and are not a US
              citizen.
            </Paragraph>
            <Paragraph>
              If you represent a legal entity, you warrant that you have the
              authority to bind that entity. If you represent another party, you
              warrant that you have the authority to bind that party and that
              the party has read and agrees to the terms of this Agreement and
              other supporting documents provided by the Company.
            </Paragraph>
            <Subtitle>DEFINITIONS:</Subtitle>
            <Paragraph>
              "Confidential Information" means any information disclosed by the
              Company or its representatives that is confidential by nature or
              under circumstances reasonably deemed confidential. Confidential
              Information includes: (1) non-public information regarding the
              Company or its acquirers, owners, customers, business plans,
              marketing activities, financial matters, and other business
              matters; and (2) third-party information that the Company treats
              as confidential.
            </Paragraph>
            <Paragraph>
              "Content" means works in the literary, artistic, and scientific
              domains, including texts, code, software, methods, data, images,
              pictures, video, music, audio, or other materials and
              publications.
            </Paragraph>

            <Paragraph>
              “Restricted Territory” includes Afghanistan, Bosnia and
              Herzegovina, Central African Republic, Cuba, the Democratic
              Republic of the Congo, Democratic People's Republic of Korea
              (North Korea), Eritrea, Ethiopia, Guinea-Bissau, Iran, Iraq,
              Libya, Lebanon, Somalia, South Sudan, Sudan, Syria, Uganda,
              Vanuatu, Yemen, and the Crimea region or any other areas subject
              to sanctions by Canada and the United Nations.
            </Paragraph>
            <Paragraph>
              "Site" means website www.pait.fi , or any other website associated
              with the Company."
            </Paragraph>
            <Paragraph>
              "Terms" means the Site terms and conditions, privacy policy, risk
              statement, and any other document published on the Site, including
              restrictions described in the Company's Content and on the Site.
              In case of a conflict between the Terms and this Agree--ment, this
              Agreement shall prevail.
            </Paragraph>

            <Subtitle>1. GENERAL TERMS</Subtitle>
            <Paragraph>
              1.1. You agree to be bound by all applicable terms, conditions,
              and laws regarding your acquisition of Tokens. You must read and
              understand the Risk Disclosure and the Terms. You certify that you
              acquire Tokens for personal satisfaction and use, to support the
              Company, and not for investment or other financial purposes. You
              acknowledge that the Token may decrease in value or become
              worthless. If you do not understand any provisions of the
              Agreement, Terms, or other documents, you should contact the
              Company via the provided communication channels.
            </Paragraph>
            <Paragraph>
              1.2. Third parties may publish Content accessible to you. Such
              Content may be subject to different rules, and you must
              familiarize yourself with these rules. Your use of third-party
              Content is at your own risk.
            </Paragraph>

            <Paragraph>
              The Company is not liable for any payments, damages, or losses due
              to your use of third-party Content. The Company is not responsible
              for the accuracy, availability, or accessibility of such Content,
              including network information, fee information, or other data. The
              Company may edit, publish, and delete the Content.
            </Paragraph>

            <Spacing>
              <Subtitle>2. SECURITY TERMS AND DATA PRIVACY PROTECTION</Subtitle>
              <Paragraph>
                2.1. You must deploy appropriate technical and security measures
                to secure access to (a) any device associated with your access
                point, (b) private keys required to access your Solana address
                or Tokens, and (c) your username, password, and other
                credentials. If you lose access to a device associated with your
                account, the Company may grant access to your account to another
                party providing additional
                <br />
                <br />
                credentials. The Company may determine the required credentials,
                which may include notarized identification, in-person meetings,
                photo proof of identity, video identification, and copies of
                identification documents.
              </Paragraph>
              <Paragraph>
                2.2. Upon request, you shall provide the Company with any
                additional information needed to comply with applicable law,
                including but not limited to ID cards, passports, driver’s
                licenses, or other documents and proof.
              </Paragraph>
              <Paragraph>
                2.3. The Company may collect statistical information about your
                activity, including your activity on the Site and logins to
                various platforms, for marketing or related purposes. The
                Company may use your IP address to verify you and your Token.
                The Company will not release your personal identification or
                identifiable data to third parties without your consent, except
                as provided here or in accordance with the Terms or the
                Company's Privacy Policy.
              </Paragraph>
              <Subtitle>3. PURCHASE AND DELIVERY OF TOKEN</Subtitle>
              <Paragraph>
                3.1. You agree to pay for and acquire Tokens in accordance with
                this agreement. The Company agrees to sell you the Tokens on the
                terms of this Agreement. Your acquisition is final and
                non-refundable. The Company shall not provide any refund of the
                acquisition price under any circumstances unless otherwise
                specified on the Site.
              </Paragraph>
              <Paragraph style={{ marginTop: "20px" }}>
                3.2. Acquired PAiT tokens{" "}
                <b style={{ borderBottom: "2px solid #000" }}>
                  {tokens ? `${" " + tokens + " "}` : " ............. "}
                </b>{" "}
                will be credited to your wallet{" "}
                <b style={{ borderBottom: "2px solid #000", fontSize: "12px" }}>
                  {address ? address : " ............. "}
                </b>{" "}
                through the escrow account no later than the TGE. 10% unlock on
                TGE, 3 months cliff, 18 months linear vesting. Token Generation
                Event (TGE) is planned on February 25th, 2025.
              </Paragraph>

              <Paragraph>
                3.3. All deliveries from the Sale shall be made online.
                Deliveries shall be made to your Solana account, or another
                wallet related to
                <br />
                your acquisition of Tokens.
              </Paragraph>
              <Paragraph>
                3.4. If you acquire cryptocurrency using a third-party payment
                processor, that processor acts as your agent, and the Company is
                not responsible for the actions of such an agent. You are
                responsible for ensuring the Company receives the amount of
                cryptocurrency you sent. The Company is not responsible for any
                financial losses or damages when using third-party payment
                processors.
              </Paragraph>
              <Subtitle>4. REGULATORY COMPLIANCE AND TAXES</Subtitle>
              <Paragraph>
                4.1. All fees and charges that you must pay in accordance with
                national and international laws are your responsibility. You
                shall provide the Company with any information it requests to
                determine whether the Company is subject to VAT or other taxes.
                We may require you to provide tax exemption certificates. If
                deductions or withholdings are required by law, you shall notify
                the Company and pay additional sums to <br />
                <br /> ensure that the net amount is equal to the amount the
                Company would have received if no deduction or withholding had
                occurred. You shall provide documentation showing that the
                deducted and withheld amounts have been paid to taxing
                authorities.
              </Paragraph>
              <br />
              <br />
              <Subtitle>5. YOUR RESPONSIBILITIES</Subtitle>
              <Paragraph>
                5.1. You are responsible for setting up the software that
                provides your access to Tokens. Your credentials are for your
                personal use and shall not be accessible to any third party.
              </Paragraph>
              <Paragraph>
                5.2. You shall comply with the Agreement, Terms, and applicable
                laws. If you violate the Agreement, Terms, or applicable laws,
                the Company may act against you.
              </Paragraph>
            </Spacing>
            <Subtitle>6. PROPRIETARY RIGHTS</Subtitle>
            <Paragraph>
              6.1. If you provide any ideas to the Company or its personnel, the
              Company is entitled to use those ideas without restriction. You
              assign to the Company all rights, interests, and titles in and to
              the ideas and agree to assist the Company in maintaining these
              rights.
            </Paragraph>
            <Paragraph>
              6.2. By using any services of the Company, Token, or Site, you do
              not obtain any proprietary rights in any Content.
            </Paragraph>
            <Spacing>
              <Paragraph>
                6.3. The Company holds all rights, interests, and titles in all
                intellectual property, including works, inventions, discoveries,
                processes, trademarks, formulae, compositions, methods,
                techniques, information, and data, whether copyrightable,
                patentable, or trademarkable. You may not use any of the
                Company's intellectual property except for personal use with one
                copy on each device.
              </Paragraph>
              <Subtitle>7. LIMITATIONS OF LIABILITY</Subtitle>
              <Paragraph style={{ paddingTop: "2px" }}>
                7.1. The Company and its affiliates or contractors shall not be
                liable for any direct, indirect, or other damages for loss of
                profits, goodwill, use, or information, even if advised of the
                possibility of such damage. The Company and its affiliates or
                contractors will not be responsible for compensation or damages
                arising from: (i) your inability to use the Token, including
                suspension or termination of this Agreement due to force
                majeure; (ii) the cost of replacement; (iii) any losses or
                burdens related to the Agreement or your access to the Token; or
                (iv) changes to, destruction, damage, loss, or failure to
                preserve data, including records, keys, and credentials
                regarding the Token.
              </Paragraph>

              <Paragraph>
                7.2. You waive your right to demand a refund of any virtual
                currency you paid the Company in the Sale under any
                circumstances.
              </Paragraph>
              <Paragraph>8. RISKS AND DISCLAIMERS</Paragraph>
              <Paragraph>
                8.1. You agree that Tokens, blockchain technology,
                cryptocurrencies, the Solana <br />
                <br />
                <br /> protocol, and other cryptocurrencies are new technologies
                and not under the Company's control. You accept all risks of
                loss and damage arising from the use of these technologies.
              </Paragraph>
              <Paragraph>
                8.2. The Token is provided on an "as is" basis. The Company and
                its affiliates and contractors make no warranties or
                representations regarding the Token, Site, or Content, including
                warranties that they will be available, free of illegal
                components and errors, or secure. The Company disclaims all
                warranties, including fitness for a particular purpose,
                satisfactory quality, merchantability, or non-infringement.
              </Paragraph>
              <Paragraph>
                8.3. Transactions using these technologies are risky. The
                Company is not responsible for any loss of data, Solana, Token,
                software, or devices resulting from any type of failure.
              </Paragraph>
              <Subtitle>9. INDEMNIFICATION</Subtitle>
              <Paragraph>
                9.1. You shall defend, indemnify, and hold harmless the Company,
                its affiliates, contractors, employees, managers, directors, and
                representatives from any liabilities, damages, claims, losses,
                costs, and expenses (including attorneys’ fees) relating to a
                third-party claim concerning this Agreement or your use of
                Tokens. If the Company or its affiliates must respond to a legal
                action, you will reimburse the Company's attorneys’ fees and
                resources spent on handling the third-party legal action.
              </Paragraph>
              <Subtitle>10. TERM AND TERMINATION</Subtitle>
              <Paragraph>
                10.1. The term of this Agreement begins on the Effective Date
                and continues until terminated.
              </Paragraph>
              <Paragraph>
                10.2. This Agreement terminates upon your acquisition and
                delivery of Tokens. The Company may also terminate this
                Agreement if you breach any term of this Agreement, Terms, or
                applicable law.
              </Paragraph>

              <Paragraph>
                10.3. Upon termination, the following terms apply: (i) all your
                rights under this Agreement terminate; (ii) you are not entitled
                to any refund; (iii) you must return or destroy all Content as
                required by the Company; and (iv) Clauses 4, 5.1, 6, 7, 8, 9,
                10.3, and 11 remain in effect. The Company is not liable for any
                damages to you, including loss of credentials or access to the
                Site, your account, or device.
              </Paragraph>
            </Spacing>
            <Subtitle>11. MISCELLANEOUS</Subtitle>
            <Paragraph>
              11.1. You may use Confidential Information solely for acquiring
              Tokens under this <br /> <br /> <br /> Agreement and in accordance
              with the Agreement. You shall not disclose Confidential
              Information during the term of this Agreement and for five years
              thereafter. You shall take all reasonable measures to prevent
              unauthorized disclosure or use of Confidential Information.
            </Paragraph>
            <Paragraph>
              11.2. The Company and its affiliates are not liable for failure or
              delay in fulfilling obligations due to causes beyond their
              control, including technical failures, natural disasters,
              blockages, embargoes, riots, government acts, terrorist acts, war,
              or changes in technology.
            </Paragraph>
            <Paragraph>
              11.3. The Company and you are independent contractors, and no
              party is an agent of the other
            </Paragraph>
            <Paragraph>
              11.4. This Agreement does not transfer any security or beneficiary
              rights to any individual or entity.
            </Paragraph>
            <Paragraph>
              11.5. You shall comply with all applicable import, export,
              re-import, and re-export compliance and laws, including economic
              sanctions programs.
            </Paragraph>
            <Paragraph>
              11.6. The Company may provide notice under this Agreement by
              posting on the Site or via communication means, including email.
              Notices are effective upon posting or sending. The Company is not
              responsible for your inability to receive notice. To send notice
              to the Company, use available communication means. All notices
              must be in English.
            </Paragraph>
            <Paragraph>
              11.7. You may not assign rights or obligations under this
              Agreement or sublicense or delegate rights or obligations without
              the Company's consent.
            </Paragraph>

            <Paragraph>
              11.8. The Company's failure to enforce any rights under this
              Agreement does not waive those rights. All waivers must be in
              writing.
            </Paragraph>
            <Paragraph>
              11.9. If any part of this Agreement is found to be void or
              unenforceable, the remaining parts remain in force. Void or
              unenforceable portions shall be interpreted to reflect the
              original intent.
            </Paragraph>
            <Paragraph>
              11.10 Any disputes related to this Agreement shall be resolved by
              negotiation or through the courts of Hong Kong. The governing law
              is the substantive law of Hong Kong.
            </Paragraph>
            <Paragraph>
              11.11 PAiT LAB LIMITED reserves the right to transfer this
              Agreement, including all rights and obligations, to another
              corporate entity related to PAiT.fi.
            </Paragraph>
            <Paragraph>
              11.12. In case of a conflict between a translated version of this
              Agreement and the <br />
              <br />
              <br />
              <br />
              <br /> English version, the English version prevails.
            </Paragraph>

            {showSignature && (
              <SignatureContainer>
                <SecondPartySignature>
                  <UserInputGroup>
                    <UserInputLabel>Name: </UserInputLabel>
                    <UserInput
                      value={name}
                      border="red"
                      onChange={(e) => {
                        if (setName) {
                          setName(e.target.value);
                        }
                      }}
                      disabled={true}
                      placeholder="Your Full Name"
                    />
                  </UserInputGroup>

                  <UserInputGroup>
                    <UserInputLabel>Email: </UserInputLabel>
                    <UserInput
                      value={email}
                      border="red"
                      onChange={(e) => {
                        if (setEmail) {
                          setEmail(e.target.value);
                        }
                      }}
                      placeholder="email@email.com"
                    />
                  </UserInputGroup>

                  <UserInputGroup>
                    <UserInputLabel>Telegram: </UserInputLabel>
                    <UserInput
                      value={telegram}
                      border="red"
                      onChange={(e) => {
                        if (setTelegram) {
                          setTelegram(e.target.value);
                        }
                      }}
                      placeholder=""
                    />
                  </UserInputGroup>

                  <UserInputGroup>
                    <UserInputLabel>Date: </UserInputLabel>
                    <UserInput value={currentDate.decimal} disabled={true} />
                  </UserInputGroup>

                  <UserInputGroup>
                    <UserInputLabel>Signature: </UserInputLabel>
                    <CanvasContainer>
                      <SignatureCanvas
                        ref={canvasRef}
                        brushColor="#000"
                        brushRadius={2}
                        canvasWidth={300}
                        canvasHeight={90}
                        style={{ padding: "6px" }}
                      />
                    </CanvasContainer>
                  </UserInputGroup>
                </SecondPartySignature>
                <OwnerPartySignature>
                  <OwnerPartySignatureImg src="/owner.png" />
                </OwnerPartySignature>
              </SignatureContainer>
            )}
          </DocumentContainer>
        ) : (
          <div style={{ padding: "20px" }}></div>
        )}
      </div>
      {showSignature && !isOpen && (
        <Container>
          <Button onClick={clear} style={{ border: "2px solid red" }}>
            CLEAR
          </Button>
          <Button onClick={saveSignature}>
            {isLoading ? (
              <>
                <Loader2 size={24} />
              </>
            ) : (
              "COMPLETE"
            )}
          </Button>
        </Container>
      )}
    </Wrappering>
  );
};

export default SignaturePad;

const Spacing = styled.div`
  /* margin-top: 120px; */

  /* @media print {
    margin-top: 10px;
    margin-bottom: 20px;
  } */
`;

const Wrappering = styled.div`
  width: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  font-size: 18px;
  color: #333;
  border: 1px solid #ccc;
  font-family: Arial, sans-serif;
  background-color: #fff;
  display: flex;
  gap: 1.3rem;
  justify-content: space-between;
  align-items: center;
  page-break-inside: avoid;

  @media print {
    display: block;
    border: none;
    padding: 10px;
    width: 100%;
    font-size: 18px;
    background-color: transparent;
  }

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 90%;
  }
`;

const DocumentContainer = styled.div`
  page-break-inside: avoid;
  /* max-width: 90%; */
  margin: 0 auto;
  padding: 20px;
  color: #333;
  font-family: Arial, sans-serif;
  background-color: #fff;

  @media print {
    max-width: 100%;
    padding: 0;
    margin: 0;
    background-color: transparent;
  }
`;

const Title = styled.h1`
  page-break-inside: avoid;
  text-align: left;
  font-size: 18px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    font-size: 18px;
  }

  @media print {
    font-size: 18px;
    margin-bottom: 5px;
    width: 100%;
  }
`;

const Subtitle = styled.h2`
  page-break-inside: avoid;
  font-size: 18px;
  margin: 20px 0 10px;

  @media print {
    font-size: 18px;
    margin: 5px 0;
    width: 100%;
    page-break-after: avoid;
  }
`;

const Paragraph = styled.p`
  page-break-inside: avoid;
  font-size: 18px;
  line-height: 1.5;
  margin: 10px 0;
  font-family: "Open Sans", open-serif;

  @media print {
    font-size: 18px;
    margin: 5px 0;
    width: 100%;
    page-break-inside: avoid;
  }
`;

const UserInputLabel = styled.div``;

interface UserInputProps {
  border?: string;
}

const UserInput = styled.input<UserInputProps>`
  page-break-inside: avoid;
  outline-width: 0;
  padding: 0.3rem;
  border: 0;
  overflow: hidden;
  border-bottom: 3px dotted ${({ border }) => border || "#000"};
  width: 100%; /* Full width to be responsive */
`;

const OwnerPartySignature = styled.div``;
const OwnerPartySignatureImg = styled.img`
  width: 100%;
`;

const SecondPartySignature = styled.div`
  page-break-inside: avoid;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserInputGroup = styled.div`
  display: flex;
  flex-direction: column; /* Stack inputs on small screens */
  align-items: flex-end;
  justify-content: flex-start;
  page-break-inside: avoid;
  gap: 10px;

  @media (min-width: 600px) {
    flex-direction: row; /* Arrange inputs in a row on larger screens */
  }
  @media print {
    page-break-inside: avoid; /* Avoid breaking input groups */
  }
`;

const SignatureContainer = styled.div`
  page-break-inside: avoid;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 18px;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-around;
    gap: 2rem;
  }

  @media print {
    margin-top: 18px;
    page-break-inside: avoid; //Keep signatures together
  }
`;

const Button = styled.button`
  border: 2px solid #80dcd7;
  padding: 0.5rem 1.4rem;
  outline-width: 0;
  cursor: pointer;
  font-size: 18px;
  @media print {
    display: none; /* Hide buttons when printing */
  }
`;

// Styled container for the canvas
const CanvasContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SignatureCanvas = styled(CanvasDraw)`
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const WrapContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
`;

const Wraps = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  text-align: center;
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const HeadingPage = styled.h3`
  font-size: 18px;
  color: #fff;
  margin-bottom: 4px;
  text-align: center;
`;

const WrapsSubHeader = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  text-align: center;
  @media ${devices.mobile} {
    flex-direction: column-reverse;
  }

  @media ${devices.tablet} {
    flex-direction: column-reverse;
    align-self: center;
    text-align: center;
    text-align: center;
    text-align: center;
  }

  @media ${devices.desktop} {
    width: 23.625rem;
    align-self: center;
    text-align: center;
    text-align: center;
  }
`;

const Label = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 5px 0;
  text-align: center;
`;

const WrapsCopy = styled.div`
  cursor: pointer;
  padding: 10px;
`;

const WrapList = styled.ul`
  padding-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  color: #eee;
  text-align: left;

  li {
    margin-bottom: 8px;
  }
`;

const ActionButton = styled.a`
  width: 100% !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  width: 100%;
  padding: 0.5rem 1rem !important;
  border-radius: 6px;
  border: 1px solid #5cdfd8;
`;
