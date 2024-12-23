"use client";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@/styles";
import { Wrapper } from "./Wrapper";
import { sizes } from "@/utils/media";
import { SectionWrapper } from "@/styles/app-common-styled";
import { Footer, StyledVideo } from "../Footer";
import { Toaster, ToastBar } from "react-hot-toast";
import { useRef, useState } from "react";
import { MaximizeIcon, MinusIcon } from "lucide-react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BottomRightCorner = styled.div`
  margin: 0;
  position: fixed;
  background-color: #000;
  bottom: 0;
  right: 0;
  margin: 4.5rem;
  border-radius: 8px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  border: 6px solid #ffffff;

  @media (max-width: ${sizes.tablet + "px"}) {
    display: none;
  }
`;

const FloatHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 3px 3px;
  gap: 1rem;
`;

const FloatShowCase = styled.img``;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [minimized, setMinimized] = useState<boolean>(false);

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
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        {children}
        <SectionWrapper $bg="#090a0c !important" $paddingtop="10px">
          <Footer />
        </SectionWrapper>

        <BottomRightCorner>
          <FloatHeader>
            {minimized ? (
              <MinusIcon
                size={16}
                color="#fff"
                onClick={() => {
                  setMinimized(!minimized);
                }}
              />
            ) : (
              <MaximizeIcon
                size={15}
                color="#fff"
                onClick={() => {
                  setMinimized(!minimized);
                }}
              />
            )}
          </FloatHeader>
          {!minimized && (
            <StyledVideo
              style={{ width: "236px", height: "148px", borderRadius: "8px" }}
              ref={videoRef}
              onTimeUpdate={updateProgress}
              onClick={handlePlayPause}
              controls={true}
              muted={false}
            >
              <source src="/cleaned_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </StyledVideo>
          )}
        </BottomRightCorner>
      </Wrapper>
      <Toaster
        toastOptions={{
          style: {
            width: "100%",
          },
          success: {
            style: {
              background: "#080b15",
              color: "white",
              fontSize: "14px",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
              fontSize: "14px",
            },
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? "custom-enter 1s ease"
                : "custom-exit 1s ease",
            }}
          />
        )}
      </Toaster>
    </ThemeProvider>
  );
};
