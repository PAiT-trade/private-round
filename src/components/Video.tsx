"use client";

import { useRef, useState } from "react";
import { StyledVideo } from "./Footer";
import styled from "styled-components";
import { sizes } from "@/utils/media";

interface Props {
  width: string;
  height: string;
  borderRadius: string;
}
export const VideoPlayer: React.FC<Props> = ({
  width,
  height,
  borderRadius,
}) => {
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
    <Wrapper>
      <StyledVideo
        style={{ width: width, height: height, borderRadius: borderRadius }}
        ref={videoRef}
        onTimeUpdate={updateProgress}
        onClick={handlePlayPause}
        controls={true}
        muted={false}
      >
        <source src="/cleaned_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </StyledVideo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: transparent;
  border: 8px solid #fff;
  border-radius: 8px;
  width: 100%;
  @media (min-width: ${sizes.tablet + "px"}) {
    width: 100%;
    display: none;
  }
`;
