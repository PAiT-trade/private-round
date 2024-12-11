"use client";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "@/styles";
import { Wrapper } from "./Wrapper";
import { sizes } from "@/utils/media";
import { SectionWrapper } from "@/styles/app-common-styled";
import { Footer } from "../Footer";
import { Toaster, ToastBar } from "react-hot-toast";

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

  @media (max-width: ${sizes.tablet + "px"}) {
    display: none;
  }
  @media (max-width: "900px") {
    display: none !important;
  }
`;

const FloatShowCase = styled.img``;

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        {children}
        <SectionWrapper $bg="#090a0c !important" $paddingtop="10px">
          <Footer />
        </SectionWrapper>
        <BottomRightCorner>
          <FloatShowCase src="/float-showcase.svg" />
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
