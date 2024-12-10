"use client";
import { MoveUpRightIcon } from "lucide-react";
import styled from "styled-components";
import { MobileNav } from "./MobileNav";
import { useEffect, useState } from "react";
import { sizes } from "@/utils/media";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

export const Navbar = styled.div`
  width: 100%;
  display: none;
  padding: 16px 0 !important;
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
  gap: 24px;
  text-decoration: none;
  list-style-type: none;
`;
export const NavItem = styled.li``;
export const NavItemLink = styled.a`
  cursor: pointer;
  font-size: 16px;
  height: 19px;
  color: ${({ theme }) => theme.colors.text.normal};
  font-family: ${({ theme }) => theme.fonts.family.main};
  font-weight: ${({ theme }) => theme.fonts.weights.normal};
`;
export const NavActions = styled.div`
  width: 196px;
  height: 55px;
  display: flex;
  align-items: center;
  align-self: center;
  div#dynamic-widget {
    width: 100%;
    height: 100%;
    div.dynamic-shadow-dom-content {
      width: 100%;
      height: 100%;

      div {
        button {
          width: 100%;
          height: 100%;

          span {
            width: 100%;
            height: 100%;

            div {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  & > div {
    // #dyanmic widget
    width: 100%;
    height: 100%;

    & > div {
      // dynamic-shadow-dom-content
      width: 100%;
      height: 100%;

      & > div {
        width: 100%;
        height: 100%;

        & > button.button {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
export const WalletConnect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100% !important;
`;
export const ConnectWalletButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  & > div {
    height: 55px;
    width: 196px;
    padding: 18px 31px;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    &:hover,
    &:active {
      /* padding: 0.8rem !important; */
    }
  }
`;

export const ConnectWalletButtonLabel = styled.div`
  background-color: green !important;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: #070b15;
  display: flex;
  font-weight: ${({ theme }) => theme.fonts.weights.semibold};
`;

export const NavSection = () => {
  const [isActive, setIsActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const setShow = () => {
    setIsActive(!isActive);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Hide header when scrolling down
      setIsActive(false);
    } else {
      // Show header when scrolling up
      // setIsActive(true);
    }

    setLastScrollY(currentScrollY);
  };

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>
      <MobileNav $isActive={isActive} $setIActive={setShow} />
      <Navbar>
        <NavLogo
          onClick={() => {
            router.push("/");
          }}
        >
          <NavLogoImg src="/Logo.svg" />
        </NavLogo>
        <NavItems>
          <NavItem>
            <NavItemLink target="_blank" href={`https://pait.fi`}>
              Home
            </NavItemLink>
          </NavItem>
          <NavItem>
            <NavItemLink target="_blank" href={`https://pait.gitbook.io/pait`}>
              WhitePaper
            </NavItemLink>
          </NavItem>
          <NavItem>
            <NavItemLink target="_blank" href="https://t.me/+zdBkF3dauTs5ODc8">
              Join Telegram
            </NavItemLink>
          </NavItem>
          <NavItem>
            <NavItemLink href="#">Contact</NavItemLink>
          </NavItem>
        </NavItems>
        <NavActions>
          <DynamicWidget
            innerButtonComponent={
              <WalletConnect>
                <ConnectWalletButtonLabel>
                  <span>Connect Wallet</span>
                  <MoveUpRightIcon size={8} />
                </ConnectWalletButtonLabel>
              </WalletConnect>
            }
          />
        </NavActions>
      </Navbar>
    </>
  );
};
