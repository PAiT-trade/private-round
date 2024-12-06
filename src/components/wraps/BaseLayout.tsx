"use client";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@/styles";
import { Wrapper } from "./Wrapper";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BottomRightCorner = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 4.5rem;
  border-radius: 8px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
`;

const FloatShowCase = styled.img``;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        {children}
        <BottomRightCorner>
          <FloatShowCase src="/float-showcase.svg" />
        </BottomRightCorner>
      </Wrapper>
    </ThemeProvider>
  );
};
