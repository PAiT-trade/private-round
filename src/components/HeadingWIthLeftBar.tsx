"use client";
import { sizes } from "@/utils/media";
import React from "react";
import styled from "styled-components";

const HeadingContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const LeftBar = styled.div<{ $color: string }>`
  width: 1.5px;
  height: 17px;
  background-color: ${({ $color }) => $color};
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadingContent = styled.div<{
  $subtitlewidth?: string;
  $smwidth?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: ${({ $subtitlewidth }) => ($subtitlewidth ? $subtitlewidth : "42rem")};
  gap: 0.5rem;
  text-align: center;

  @media (max-width: ${sizes.tablet + "px"}) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const HeadingText = styled.h1<{ $color: string }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  margin: 0;

  @media (max-width: ${sizes.tablet + "px"}) {
    font-size: 14px;
    line-height: normal;
    font-weight: 700;
    letter-spacing: 0%;
  }
`;

const SubHeading = styled.h2<{ $smwidth?: string }>`
  color: #fff;
  font-size: 56px;
  font-weight: ${({ theme }) => 600 + " !important"};
  font-family: ${({ theme }) => theme.fonts.family.main};
  letter-spacing: -1%;
  margin: 0;
  /* wrap text*/
  flex: 1 1;
  word-wrap: break-word;
  margin: 0;
  line-height: 60px;

  @media (max-width: ${sizes.tablet + "px"}) {
    font-size: 32px;
    line-height: 40px;
    letter-spacing: -1%;
    width: ${({ $smwidth }) => ($smwidth ? $smwidth : "320px !important")};
    line-height: 1.2;
  }
`;

interface HeadingWithBarProps {
  $title: string;
  $color?: string;
  $subtitle?: string;
  $subtitlewidth?: string;
  $smwidth?: string;
}

const HeadingWithBar: React.FC<HeadingWithBarProps> = ({
  $title,
  $color = "#7139ec",
  $subtitle,
  $subtitlewidth = "42rem",
  $smwidth = "18.75rem",
}) => {
  return (
    <HeadingContainer>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "flex-start",
        }}
      >
        <LeftBar $color={$color} />
        <HeadingText $color={$color}>{$title}</HeadingText>
      </div>

      <HeadingContent $subtitlewidth={$subtitlewidth} $smwidth={$smwidth}>
        {$subtitle && <SubHeading $smwidth={$smwidth}>{$subtitle}</SubHeading>}
      </HeadingContent>
    </HeadingContainer>
  );
};

export default HeadingWithBar;
