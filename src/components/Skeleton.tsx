"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const shimmerAnimation = keyframes`
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
`;

const SkeletonWrapper = styled.div<{
  width?: string;
  height?: string;
  borderradius?: string;
}>`
  display: inline-block;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "1em"};
  border-radius: ${({ borderradius }) => borderradius || "4px"};
  animation: ${shimmerAnimation} 1.5s infinite ease-in-out;
`;

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  width: 100%;
`;

const IconPlaceholder = styled(SkeletonWrapper)<{ $type?: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ $type }) => ($type == "rounded" ? "50%" : "8px")};
`;

const TextPlaceholder = styled(SkeletonWrapper)`
  flex: 1;
`;

type SkeletonProps = {
  width?: string;
  height?: string;
  borderradius?: string;
  withIcon?: boolean;
  isDouble?: boolean;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderradius,
  withIcon,
  isDouble,
}) => {
  if (withIcon) {
    return isDouble ? (
      <SkeletonContainer>
        <IconPlaceholder $type="rounded" />
        <TextPlaceholder width={width} height={height} />
      </SkeletonContainer>
    ) : (
      <SkeletonContainer>
        <IconPlaceholder />
        <IconPlaceholder $type="rounded" />
      </SkeletonContainer>
    );
  }
  return (
    <SkeletonWrapper
      width={width}
      height={height}
      borderradius={borderradius}
    />
  );
};
