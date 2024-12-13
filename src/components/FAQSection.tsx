"use client";
import { sizes } from "@/utils/media";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";

const FAQContainer = styled.div`
  width: 846px;
  margin: 0 auto;
  background-color: transparent !important;
  padding: 20px;
  margin-top: 80px;
  font-family: Arial, sans-serif;
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
    padding: 20px 0;
    margin-top: 10px;
  }
`;

const FAQItem = styled.div`
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const Question = styled.div`
  /* background-color: #f8f8f8; */
  padding: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => 300};
  font-family: ${({ theme }) => theme.fonts.family.main};
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 0.3px solid #87939e;
  }
  span {
    font-size: 16px;
  }

  @media (max-width: ${sizes.tablet + "px"}) {
    padding: 20px 8px;
  }
`;

const Answer = styled.div<{ $isopen: boolean }>`
  padding: ${({ $isopen }) => ($isopen ? "15px" : "0")};
  height: ${({ $isopen }) => ($isopen ? "auto" : "0")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.family.main};
  color: ${({ theme }) => theme.colors.text.white};
  font-weight: ${({ theme }) => 200};
  font-family: ${({ theme }) => theme.fonts.family.main};
  border-bottom: 0.1px solid #989899;
`;

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is $PAiT, and why should I invest in it?",
      answer:
        "$PAiT simplifies dApps, making blockchain accessible to everyone. It’s an innovative project with strong growth potential.",
    },
    {
      question: "What is the price of $PAiT tokens during the private round?",
      answer: "1 PAiT = $0.16 USD.",
    },
    {
      question: "How many $PAiT tokens are available in the private round?",
      answer: "2,000,000 $PAiT tokens are available.",
    },
    {
      question: "What is the unlock schedule for $PAiT tokens?",
      answer: "10% at TGE, 3-month cliff, and linear vesting over 18 months.",
    },

    {
      question: "Can I use a centralized exchange wallet to buy $PAiT tokens?",
      answer: "No, only non-custodial wallets are supported.",
    },
    {
      question: "How do I sign the SAFT agreement?",
      answer: "The SAFT agreement is signed after a successful purchase.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer>
      {faqs.map((faq, index) => (
        <FAQItem key={index}>
          <Question onClick={() => toggleFAQ(index)}>
            <span>{faq.question}</span>
            <PlusIcon size={18} />
          </Question>
          <Answer $isopen={openIndex === index}>{faq.answer}</Answer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};
