"use client";
import { Paragraph } from "@/styles/app-common-styled";
import { sizes } from "@/utils/media";
import { useState } from "react";
import styled from "styled-components";
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 470px;
  gap: 1.2rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    height: 100%;
  }
`;

export const FooterHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  gap: 1.2rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column;
    width: 100%;
    gap: 60px;
  }
`;

export const AboutPait = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
  }
`;
export const AboutLogo = styled.img`
  width: 101.69px;
  height: 28px;
`;

export const GroupContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

export const FooterItem = styled.div`
  @media (max-width: ${sizes.tablet + "px"}) {
    padding-bottom: 30px;
  }
`;

export const Title = styled.h2`
  color: #87939e;
  font-size: 16px;
  font-weight: bold;
  font-family: "Monas Sans";
`;

export const Nav = styled.ul``;
export const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const NavLink = styled.a`
  font-size: 14px;
  font-weight: normal;
`;

const CopyrightWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${sizes.tablet + "px"}) {
    flex-direction: column-reverse;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2rem;
  }
`;

export const Copyright = styled.h5`
  font-size: 16px;
  color: #87939e;
  flex: 1;
`;
export const CopyrightAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: calc(33.33%, 1);
  gap: 1rem;

  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
    justify-content: space-between;
  }
`;
export const CopyrightLink = styled.a`
  font-size: 14px;
`;

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(
    new Date(Date.now()).getFullYear()
  );
  return (
    <Wrap>
      <FooterHeaderWrapper>
        <AboutPait>
          <AboutLogo src="/Logo.svg" />
          <Paragraph>
            By participating in the PAiT Token sale, you accept these Terms and
            Conditions. If you don’t agree, do not purchase PAiT Tokens or use
            the website. Only buy tokens through official PAiT channels. The
            PAiT team will never contact you directly with offers.
          </Paragraph>
        </AboutPait>

        <GroupContent>
          <FooterItem>
            <Title>GENERAL</Title>
            <Nav>
              <NavItem>
                <NavLink href="#">Home</NavLink>
                <NavLink href="#">Whitepaper</NavLink>
                <NavLink href="#">Watch video tutorial</NavLink>
                <NavLink href="#">Contact</NavLink>
              </NavItem>
            </Nav>
          </FooterItem>
          <FooterItem>
            <Title>SOCIAL</Title>
            <Nav>
              <NavItem>
                <NavLink href="#">Join Telegram</NavLink>
                <NavLink href="#">Connect StreamFlow</NavLink>
                <NavLink href="#">Connect Wallet</NavLink>
              </NavItem>
            </Nav>
          </FooterItem>
          <FooterItem>
            <Title>CONNECT</Title>
            <Nav>
              <NavItem>
                <NavLink href="#">LinkedIn</NavLink>
                <NavLink href="#">X</NavLink>
                <NavLink href="#">Instagram</NavLink>
              </NavItem>
            </Nav>
          </FooterItem>
        </GroupContent>
      </FooterHeaderWrapper>
      <CopyrightWrapper>
        <Copyright>&copy;{currentYear}. PAiT. All rights reserved.</Copyright>
        <CopyrightAction>
          <CopyrightLink>Terms and Conditions</CopyrightLink>
          <CopyrightLink>SAFT Agreement</CopyrightLink>
        </CopyrightAction>
      </CopyrightWrapper>
    </Wrap>
  );
};
