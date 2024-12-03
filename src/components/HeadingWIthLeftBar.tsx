"use client";
import React from "react";
import styled from "styled-components";

const HeadingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftBar = styled.div<{ $color: string }>`
  width: 10px;
  height: 100%;
  background-color: ${({ $color }) => $color};
  margin-right: 10px;
`;

const HeadingText = styled.h1<{ $color: string }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ $color }) => $color};
`;

const SubHeading = styled.h2`
  color: "#fff";
  font-size: 3.5rem;
  font-weight: bold;
`;

interface HeadingWithBarProps {
  $title: string;
  $color?: string;
  $subtitle?: string;
}
const HeadingWithBar: React.FC<HeadingWithBarProps> = ({
  $title,
  $color,
  $subtitle,
}) => {
  return (
    <HeadingContainer>
      <LeftBar $color={$color!} />
      <div
        style={{
          display: "flex",
          alignContent: "center",
          fontFamily: "Mona Sans",
          alignItems: "center",
          flexDirection: "column",
          fontSize: "3.5rem",
          color: "#fff",
          gap: "1rem",
        }}
      >
        <HeadingText $color={$color!}>{$title}</HeadingText>
        <SubHeading>{$subtitle}</SubHeading>
      </div>
    </HeadingContainer>
  );
};

export default HeadingWithBar;
