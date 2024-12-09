import { devices } from "@/styles/common";
import styled from "styled-components";

export const ModalOverlary = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

interface ModalProps {
  bg?: "light";
}
export const Modal = styled.div<ModalProps>`
  background: ${({ theme, bg }) =>
    bg === "light" ? "white" : theme.colors.primary};
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
  color: #fff;
  width: 70%;
  @media ${devices.mobile} {
    max-width: 95%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  @media ${devices.mobile} {
    font-size: 14px;
  }
`;
export const ModalCloseIcon = styled.div`
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: #fff;
`;

export const ModalBody = styled.div`
  margin-top: 1rem;
  border-top: 0.01rem solid #ccc;
  width: 100%;
  @media ${devices.mobile} {
    padding: 1.2rem 0.3rem;
    border-radius: 0.3rem;
  }
`;
