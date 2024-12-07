"use client";
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
  width: 1px;
  height: 17px;
  background-color: ${({ $color }) => $color};
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadingContent = styled.div<{ $subtitlewidth?: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: ${({ $subtitlewidth }) => ($subtitlewidth ? $subtitlewidth : "42rem")};
  gap: 0.5rem;
  text-align: center;
`;

const HeadingText = styled.h1<{ $color: string }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $color }) => $color};
  margin: 0;
`;

const SubHeading = styled.h2`
  color: #fff;
  font-size: 3.5rem;
  font-weight: bold;
  font-family: "Mona Sans";
  margin: 0;
  line-height: 1.2;

  /* wrap text*/
  flex: 1 1;
  word-wrap: break-word;
  margin: 0;
  line-height: 1.5;
`;

interface HeadingWithBarProps {
  $title: string;
  $color?: string;
  $subtitle?: string;
  $subtitlewidth?: string;
}

const HeadingWithBar: React.FC<HeadingWithBarProps> = ({
  $title,
  $color = "#7139ec",
  $subtitle,
  $subtitlewidth = "42rem",
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

      <HeadingContent $subtitlewidth={$subtitlewidth}>
        {$subtitle && <SubHeading>{$subtitle}</SubHeading>}
      </HeadingContent>
    </HeadingContainer>
  );
};

export default HeadingWithBar;