import React, { Component } from 'react';
import SVG from 'react-svg';
import styled from 'styled-components';

import placeholder from './assets/placeholder.svg';
import mastercard from './assets/mastercard.svg';
import visa from './assets/visa.svg';
import amex from './assets/amex.svg';

const Container = styled.div`
  display: inline-block;
`;
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  transition: box-shadow 150ms ease;
`;
const CardImage = styled(SVG)`
  height: 1em;
`;
const InputWrapper = styled.label`
  position: relative;
  margin-left: 0.5em;

  &::after {
    content: attr(data-max);
    visibility: hidden;
    height: 0;
  }
`;
const Input = styled.input`
  border: 0px;
  position: absolute;
  width: 100%;

  &:focus {
    outline: 0px;
  }
`;

export default class extends Component {
  render() {
    return (
      <Container>
        <FieldWrapper>
          <div className="card-image-wrapper"><CardImage path={placeholder} /></div>
          <InputWrapper data-max="9999 9999 9999 9999 9999"><Input className="input" placeholder="Card number" type="text"/></InputWrapper>
          <InputWrapper data-max="MM / YY 99"><Input placeholder="MM / YY" type="text"/></InputWrapper>
          <InputWrapper data-max="999999"><Input placeholder="CVC" type="text"/></InputWrapper>
        </FieldWrapper>
      </Container>
    );
  }
}
