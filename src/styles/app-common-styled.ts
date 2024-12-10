"use client";
import { sizes } from "@/utils/media";
import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
`;

export const SectionWrapper = styled.div<{
  $bg?: string;
  $paddingtop?: string;
}>`
  background-color: ${({ $bg }) => ($bg ? $bg : "#080b14")};
  padding: 0 12rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  &:not(:last-child) {
    padding-top: ${({ $paddingtop }) => ($paddingtop ? $paddingtop : "1rem")};
  }
  flex-direction: column;

  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    max-width: 100%;
    width: 100%;
    padding: 1rem !important;
    align-self: center;
  }
  @media (max-width: ${"900" + "px"}) {
    max-width: 100%;
    width: 100%;
    padding: 1rem !important;
    align-self: center;
  }
`;

export const Link = styled.a``;

export const Paragraph = styled.p`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.normal};
  font-weight: ${({ theme }) => theme.fonts.weights.normal};
  margin: 0;
  padding: 0;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    font-size: 16px;
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

export const PagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 70vh; */
  /* margin: 2rem; */
  gap: 1rem;

  #veriff-root {
    width: 100% !important;
    padding: 1rem !important;

    .veriff-container {
      border-radius: 0.4rem;
      background-color: #151720 !important;
      width: 100% !important;
    }

    .veriff-text {
      width: 100% !important;
      border: none !important;
      outline-width: 0 !important;
    }
  }
`;

export const PageWrap = styled.div``;
export const PageTitle = styled.h1`
  font-weight: 500;
  font-size: 24px;
  color: #fff;
  /* max-width: 400px; */
  margin-bottom: 1rem;
  line-height: 48px;
  font-family: "Mona Sans", sans-serif;

  /* mobile and tablet */
  @media (max-width: ${sizes.tablet + "px"}) {
    line-height: 30px;
    font-size: 18px;
    font-weight: 300;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
  }
`;

export const MenuConnectButton = styled.div`
  & > div {
    width: 100% !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.5rem 1rem !important;
    border-radius: 6px;

    &:hover,
    &:active {
      /* padding: 0.8rem !important; */
    }

    & > .wallet-adapter-button {
      color: #a6fff3;
    }
  }
`;

export const ConnectWalletButtonExtends = styled.div`
  display: "flex";
  justify-content: "center";
  align-items: "center";
  z-index: 100;
  & > div {
    width: 100% !important;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0.5rem 1rem !important;
    border-radius: 6px;
    border: 1px solid #5cdfd8;

    &:hover,
    &:active {
      /* padding: 0.8rem !important; */
    }
    & > .wallet-adapter-button {
      color: #a6fff3;
    }
  }
`;

export const Wrapping = styled.div`
  width: 100%;
  background-color: #0e111b;
  /* min-height: 900px; */
  /* mobile and tablet */
  @media (max-width: ${sizes.desktop + "px"}) {
    min-width: 100% !important;
    margin: 0;
    max-width: 100%;
    /* padding: 32px 0; */
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;

    & > {
      width: 100%;
    }
  }
`;

export const MinWrapp = styled.div`
  width: 100%;
  background: linear-gradient(to top, rgba(60, 60, 60, 0.3), rgba(7, 7, 7, 0.9)),
    url("/header-cover.png");
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0px 12rem;
  padding-bottom: 12rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8rem;
  /* mobile and tablet */
  @media (max-width: ${sizes.desktop + "px"}) {
    min-width: 100% !important;
    margin: 0;
    gap: 3rem;
    max-width: 100%;
    padding: 0px 0px 32px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;

    & > {
      width: 100%;
    }
  }
`;
