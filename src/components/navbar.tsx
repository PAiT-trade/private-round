"use client";
import { MoveUpRightIcon } from "lucide-react";
import styled from "styled-components";
import { MobileNav } from "./MobileNav";
import { useState } from "react";
import { sizes } from "@/utils/media";

export const Navbar = styled.div`
  width: 100%;
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  @media (min-width: ${sizes.desktop + "px"}) {
    display: flex;
    min-width: 100%;
  }
`;

export const NavLogo = styled.div``;
export const NavLogoImg = styled.img``;
export const NavItems = styled.ul`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-decoration: none;
  list-style-type: none;
`;
export const NavItem = styled.li``;
export const NavItemLink = styled.a`
  color: white;
  font-size: 14px;
`;
export const NavActions = styled.div``;
export const ConnectWalletButton = styled.div`
  height: 55px;
  width: 196px;
  background-color: #8cd2cf;
  padding: 18px 31px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #000;
`;
export const ConnectWalletButtonLabel = styled.span`
  color: #000;
  font-size: 14px;
`;

export const NavSection = () => {
  const [isActive, setIsActive] = useState(false);

  const setShow = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <MobileNav $isActive={isActive} $setIActive={setShow} />
      <Navbar>
        <NavLogo>
          <NavLogoImg src="/Logo.svg" />
        </NavLogo>
        <NavItems>
          <NavItem>
            <NavItemLink>Home</NavItemLink>
          </NavItem>
          <NavItem>
            <NavItemLink>WhitePaper</NavItemLink>
          </NavItem>
          <NavItem>
            <NavItemLink>Join Telegram</NavItemLink>
          </NavItem>
          <NavItem>
            <NavItemLink>Contact</NavItemLink>
          </NavItem>
        </NavItems>
        <NavActions>
          <ConnectWalletButton>
            <ConnectWalletButtonLabel>Connect Wallet</ConnectWalletButtonLabel>
            <MoveUpRightIcon size={12} />
          </ConnectWalletButton>
        </NavActions>
      </Navbar>
    </>
  );
};
