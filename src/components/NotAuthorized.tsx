import React from "react";
import styled from "styled-components";

export const NotAuthorized = () => {
  return (
    <NotAuthorizedContainer>
      <Title>Not Authorized</Title>
      <Message>You do not have permission to access this page.</Message>
      <HomeLink href="/">Go Buy PAiT</HomeLink>
    </NotAuthorizedContainer>
  );
};

const NotAuthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #151720;
  color: #fff;
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  color: #fff;
`;

const HomeLink = styled.a`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #151720;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  border: 1px solid #eee;

  &:hover {
    background-color: #151720;
    border: 1px solid #ddd;
  }
`;
