"use client";
import { sizes } from "@/utils/media";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { MenuIcon, MoveUpRightIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";
import { WalletConnect } from "./navbar";

export const Navbar = styled.div<{ $isActive: boolean }>`
  display: none;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  z-index: 1500;
  height: ${({ $isActive }) => ($isActive ? `100vh` : "auto")};
  padding: 16px 8px;
  transition: opacity 0.3s ease-in-out;
  @media (max-width: ${sizes.desktop + "px"}) {
    display: flex;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 8px;
  gap: 8px;
`;

const Navs = styled.div`
  margin-top: 8px; /* Adjust as necessary */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 1.3rem;
  text-decoration: none;
  list-style-type: none;
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
  font-family: ${({ theme }) => theme.fonts.family.main};
  font-weight: ${({ theme }) => 400};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 32px;
`;
export const NavActions = styled.div`
  width: 100%;
`;
export const ConnectWalletButton = styled.div`
  height: 55px;
  width: 100%;
  background-color: #8cd2cf;
  padding: 18px 31px;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  color: #000;
`;
export const ConnectWalletButtonLabel = styled.span`
  color: #000;
  font-size: 16px;
`;

interface MobileNavProps {
  $isActive: boolean;
  $setIActive: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  $isActive,
  $setIActive,
}) => {
  const router = useRouter();
  return (
    <Navbar $isActive={$isActive}>
      <TopBar>
        <NavLogo
          onClick={() => {
            router.push("/");
          }}
        >
          <NavLogoImg src="/Logo.svg" />
        </NavLogo>

        {$isActive ? (
          <XIcon size={24} onClick={() => $setIActive()} />
        ) : (
          <MenuIcon size={24} onClick={() => $setIActive()} />
        )}
      </TopBar>
      {$isActive && (
        <TopWrapper>
          <Navs>
            <NavItems>
              <NavItem>
                <NavItemLink target="_blank" href={`https://pait.fi`}>
                  Home
                </NavItemLink>
              </NavItem>
              <NavItem>
                <NavItemLink
                  target="_blank"
                  href={`https://pait.gitbook.io/pait`}
                >
                  WhitePaper
                </NavItemLink>
              </NavItem>
              <NavItem>
                <NavItemLink
                  target="_blank"
                  href="https://t.me/+zdBkF3dauTs5ODc8"
                >
                  Join Telegram
                </NavItemLink>
              </NavItem>
              <NavItem>
                <NavItemLink>Contact</NavItemLink>
              </NavItem>
            </NavItems>
          </Navs>

          <NavActions>
            <DynamicWidget
              innerButtonComponent={
                <WalletConnect>
                  <ConnectWalletButtonLabel>
                    Connect Wallet
                  </ConnectWalletButtonLabel>
                  <MoveUpRightIcon size={8} />
                </WalletConnect>
              }
            />
          </NavActions>
        </TopWrapper>
      )}
    </Navbar>
  );
};
