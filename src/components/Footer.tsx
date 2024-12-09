"use client";
import { Paragraph } from "@/styles/app-common-styled";
import { sizes } from "@/utils/media";
import { useRef, useState } from "react";
import styled from "styled-components";
import { ModalSection } from "./modal/Modal";
import { devices } from "@/styles/common";
import TermsAndConditions from "./TermsAndConditions";
import SignaturePad from "./SaftDocument";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(
    new Date(Date.now()).getFullYear()
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isTermsModal, setIsTermsModal] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(false);

  // Videos
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  /**
   * Handle Video controls
   */
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        (videoRef.current.duration * parseInt(e.target.value)) / 100;
      videoRef.current.currentTime = newTime;
      setProgress(parseInt(e.target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(e.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const currentProgress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  return (
    <>
      <Wrap>
        <FooterHeaderWrapper>
          <AboutPait>
            <AboutLogo src="/Logo.svg" />
            <Paragraph>
              By participating in the PAiT Token sale, you accept these Terms
              and Conditions. If you don’t agree, do not purchase PAiT Tokens or
              use the website. Only buy tokens through official PAiT channels.
              The PAiT team will never contact you directly with offers.
            </Paragraph>
          </AboutPait>

          <GroupContent>
            <FooterItem>
              <Title>GENERAL</Title>
              <Nav>
                <NavItem>
                  <NavLink target="_blank" href={`https://pait.fi`}>
                    Home
                  </NavLink>
                  <NavLink
                    target="_blank"
                    href={`https://pait.gitbook.io/pait`}
                  >
                    Whitepaper
                  </NavLink>
                  <NavLink href="#" onClick={() => setShowVideo(!showVideo)}>
                    Watch video tutorial
                  </NavLink>
                  <NavLink href="#">Contact</NavLink>
                </NavItem>
              </Nav>
            </FooterItem>
            <FooterItem>
              <Title>SOCIAL</Title>
              <Nav>
                <NavItem>
                  <NavLink
                    target="_blank"
                    href="https://t.me/+zdBkF3dauTs5ODc8"
                  >
                    Join Telegram
                  </NavLink>
                  <NavLink href="https://streamflow.finance/" target="_blank">
                    Connect StreamFlow
                  </NavLink>
                  {/* <DynamicWidget
                    innerButtonComponent={
                      <NavLink href="#">Connect Wallet</NavLink>
                    }
                  /> */}
                </NavItem>
              </Nav>
            </FooterItem>
            <FooterItem>
              <Title>CONNECT</Title>
              <Nav>
                <NavItem>
                  <NavLink href="#">LinkedIn</NavLink>
                  <NavLink href="#">X</NavLink>
                  <NavLink href="#">Instagram</NavLink>
                </NavItem>
              </Nav>
            </FooterItem>
          </GroupContent>
        </FooterHeaderWrapper>
        <CopyrightWrapper>
          <Copyright>&copy;{currentYear}. PAiT. All rights reserved.</Copyright>
          <CopyrightAction>
            <CopyrightLink onClick={() => setIsTermsModal(!isTermsModal)}>
              Terms and Conditions
            </CopyrightLink>
            <CopyrightLink onClick={() => setOpenModal(!openModal)}>
              SAFT Agreement
            </CopyrightLink>
          </CopyrightAction>
        </CopyrightWrapper>
      </Wrap>

      <ModalSection
        title="Terms and Conditions"
        setIsOpen={setIsTermsModal}
        isOpen={isTermsModal}
      >
        <ReadAgreement>
          <TermsAndConditions />
        </ReadAgreement>
      </ModalSection>

      <ModalSection
        title="SAFT Agreement"
        setIsOpen={setOpenModal}
        isOpen={openModal}
      >
        <ReadAgreement>
          <SignaturePad showSignature={false} />
        </ReadAgreement>
      </ModalSection>

      <ModalSection
        title="VIDEO TUTORIAL HOW TO BUY"
        setIsOpen={setShowVideo}
        isOpen={showVideo}
      >
        <VideoContainer>
          <StyledVideo
            ref={videoRef}
            onTimeUpdate={updateProgress}
            onClick={handlePlayPause}
            controls={true}
            muted={false}
          >
            <source src="/cleaned_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </StyledVideo>
        </VideoContainer>
      </ModalSection>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 29.375rem;
  height: 100%;
  gap: 2rem;
  margin: 1.2rem;
  @media (max-width: ${sizes.tablet + "px"}) {
    height: 100%;
  }
`;

export const FooterHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  gap: 2rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column;
    width: 100%;
    gap: 60px;
  }
`;

export const AboutPait = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
export const AboutLogo = styled.img`
  width: 101.69px;
  height: 28px;
`;

export const GroupContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.8rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    padding-bottom: 30px;
  }
`;

export const Title = styled.h2`
  color: #87939e;
  font-size: 16px;
  font-weight: bold;
  font-family: "Monas Sans";
`;

export const Nav = styled.ul``;
export const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const NavLink = styled.a`
  font-size: 14px;
  font-weight: 200;
  color: #ffffffb3;

  div#dynamic-widget {
    width: 100%;
    height: 100%;
    background-color: #000;
    div.dynamic-shadow-dom-content {
      width: 100%;
      height: 100%;

      div {
        background-color: green !important;
        button.connect-button {
          width: 100%;
          height: 100%;
          background-color: red !important;
          span {
            width: 100%;
            color: blue !important;
            height: 100%;

            div {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
`;

const CopyrightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
  }
`;

export const Copyright = styled.h5`
  font-size: 16px;
  color: #87939e;
  flex: 1;
`;
export const CopyrightAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: calc(33.33%, 1);
  gap: 1rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
    justify-content: space-between;
  }
`;
export const CopyrightLink = styled.a`
  font-size: 14px;
  cursor: pointer;
`;

const ReadAgreement = styled.div`
  height: 500px;
  overflow-y: auto;
  text-align: left;
  min-width: 100%;
  @media ${devices.mobile} {
    text-align: left;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: auto;

  border-radius: 8px;
  overflow: hidden;
`;

const VideoTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  margin: 1rem 0.5rem;
  text-align: left;
  @media ${devices.mobile} {
    text-align: left;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  background-color: #000;
  border-radius: 8px;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
  z-index: 2;
`;

const PlayButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const ProgressBar = styled.input`
  flex: 1;
  margin: 0 10px;
  -webkit-appearance: none;
  appearance: none;
  background: #fff;
  height: 5px;
  border-radius: 5px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #ff0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

const VolumeControl = styled.input`
  width: 100px;
  -webkit-appearance: none;
  appearance: none;
  background: #fff;
  height: 5px;
  border-radius: 5px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #ff0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

const VideLink = styled.a`
  font-size: 14px;
  color: "#5ed9d2 !important";
  border-bottom: "2px solid #5ed9d2";
  margin: "0.3rem";
`;
