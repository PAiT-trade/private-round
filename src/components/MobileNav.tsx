"use client";
import { media } from "@/utils/media";
import { MenuIcon, MoveUpRightIcon, XIcon } from "lucide-react";
import React from "react";
import styled from "styled-components";

export const Navbar = styled.div<{ $isActive: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  z-index: 1500;
  height: ${({ $isActive }) => ($isActive ? `100vh` : "auto")};
  padding: 8px;
  padding-bottom: 4vh;

  ${media.mobile(`
    display: flex;
    background-color: red;
  `)}

  ${media.tablet(`
    display: flex;
  `)}

  ${media.desktop(`
    display: none;
  `)}

  ${media.largeDesktop(`
    display: none;
  `)}
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const NavLogo = styled.div``;
export const NavLogoImg = styled.img``;
export const NavItems = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1.3rem;
  text-decoration: none;
  list-style-type: none;
`;
export const NavItem = styled.li``;
export const NavItemLink = styled.a`
  color: white;
  font-size: 16px;
`;
export const NavActions = styled.div``;
export const ConnectWalletButton = styled.div`
  height: 3.4375rem;

  width: 100%;
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

interface MobileNavProps {
  $isActive: boolean;
  $setIActive: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  $isActive,
  $setIActive,
}) => {
  return (
    <Navbar $isActive={$isActive}>
      <TopBar>
        <NavLogo>
          <NavLogoImg src="/Logo.svg" />
        </NavLogo>

        {$isActive ? (
          <XIcon size={24} onClick={() => $setIActive()} />
        ) : (
          <MenuIcon size={24} onClick={() => $setIActive()} />
        )}
      </TopBar>
      {$isActive && (
        <>
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
              <ConnectWalletButtonLabel>
                Connect Wallet
              </ConnectWalletButtonLabel>
              <MoveUpRightIcon size={12} />
            </ConnectWalletButton>
          </NavActions>
        </>
      )}
    </Navbar>
  );
};
