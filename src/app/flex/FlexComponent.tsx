"use client";
import styled from "@emotion/styled";
import React from "react";

const FlexComponent = () => {
  return (
    <StyledWrapper>
      <Header>Header</Header>
      <Content>contents</Content>
    </StyledWrapper>
  );
};

export default FlexComponent;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  height: 70px;
  background: yellow;
`;

const Content = styled.div`
  width: 100%;
  background: beige;
`;
