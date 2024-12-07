"use client";
import { sizes } from "@/utils/media";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";

const FAQContainer = styled.div`
  width: 846px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 80px;
  font-family: Arial, sans-serif;
  @media (max-width: ${sizes.tablet + "px"}) {
    width: 100%;
    padding: 20px 0;
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
  color: #87939e;
  align-items: center;
  cursor: pointer;
  font-family: "Mona Sans";
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
  color: #fff;
  font-size: 14px;
`;

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is $PAiT, and why should invest in it?",
      answer: " and why should invest in it",
    },
    {
      question: "What is the price of $PAiT tokens during the private round?",
      answer: "The price of $PAiT in private round is: 0.16 USD.",
    },
    {
      question: "How many $PAiT tokens are available in the private round?",
      answer: "2000,000  Tokens",
    },
    {
      question: "What is the unlock schedule for $PAiT tokens?",
      answer: "6 months",
    },

    {
      question: "Can i use a centralized exchange wallet to buy $PAiT tokens?",
      answer: "NO.",
    },
    {
      question: "How do i sign the SAFT agreement?",
      answer: "The agreement is signed after successfuly purchase.",
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
          <Answer $isopen={openIndex === index}>Answer: {faq.answer}</Answer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};
