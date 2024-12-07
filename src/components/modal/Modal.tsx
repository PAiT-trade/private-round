import React from "react";
import {
  Modal,
  ModalBody,
  ModalCloseIcon,
  ModalHeader,
  ModalOverlary,
  ModalTitle,
} from "./Modal.styled";
import { CircleXIcon } from "lucide-react";

interface ModalSectionProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

export const ModalSection: React.FC<ModalSectionProps> = ({
  children,
  title,
  isOpen,
  setIsOpen,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <ModalOverlary>
        <Modal>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalCloseIcon
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <CircleXIcon size={24} />
            </ModalCloseIcon>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
        </Modal>
      </ModalOverlary>
    )
  );
};
