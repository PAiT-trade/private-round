"use client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { ClipboardIcon } from "lucide-react";
import toast from "react-hot-toast";

export const ReferralCodeShare: React.FC<{
  referralCode: string;
}> = ({ referralCode }) => {
  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      setShareUrl(
        `${window.location.protocol}//${
          window.location.hostname
        }/?referral=${encodeURIComponent(referralCode)}`
      );
    }
  }, [referralCode]);

  const subject = "PAit Earn Rewards";
  const body = `Earn Rewards Through Referrals: ${shareUrl}`;

  return (
    <Wrapper>
      {/* <h3 style={{ fontSize: "16px" }}>Share Your referral Code</h3> */}
      <ShareContainer>
        <ShareButton>
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <EmailShare
            href={`mailto:?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon size={32} round />
          </EmailShare>

          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </ShareButton>

        <ReferralCodeBox>
          <RawReferralCode>{shareUrl}</RawReferralCode>
          <ClipboardIcon
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              toast.success("Referral link copied to clipboard");
            }}
            size={32}
            style={{ cursor: "pointer" }}
          />
        </ReferralCodeBox>
      </ShareContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #141824;
  padding: 1rem;
  border-radius: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-direction: column;
`;

const RawReferralCode = styled.code`
  user-select: all;
  opacity: 0.8;
`;

const ShareContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.3rem;
  gap: 0.5rem;
  flex-direction: column;
`;

const ShareButton = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0 0.5rem;
  justify-content: space-between;
`;
const ReferralCodeBox = styled.div`
  background: #333e59;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SocialLinks = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0 0.5rem;
`;

const EmailShare = styled.a`
  background-color: transparent;
  border: none;
  padding: 0px;
  font: inherit;
  color: inherit;
  cursor: pointer;
`;
