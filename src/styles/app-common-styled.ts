"use client";
import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
`;

export const SectionWrapper = styled.div`
  margin: ${({ theme }) => `${theme.padding.small} ${theme.padding.large}`};
  padding: 1rem 12rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Link = styled.a``;

export const Paragraph = styled.p`
  font-size: 14px;
  color: #87939e;
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: 400;
  line-height: 1.5;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  span {
  }
`;

const headingStyles = css`
  color: #02021c;
  margin: 0.5rem 0;
  font-weight: medium;
`;

export const Heading = styled.div<{ $level: number }>`
  ${headingStyles}

  ${({ $level }) => {
    switch ($level) {
      case 1:
        return css`
          font-size: 2.5rem;
          font-weight: bold;
        `;
      case 2:
        return css`
          font-size: 2rem;
          font-weight: bold;
        `;
      case 3:
        return css`
          font-size: 1.75rem;
          font-weight: normal;
        `;
      case 4:
        return css`
          font-size: 1.5rem;
          font-weight: normal;
        `;
      default:
        return css`
          font-size: 1rem;
          font-weight: normal;
        `;
    }
  }}
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;
export const FlexItem = styled.div`
  flex: 1;
`;
