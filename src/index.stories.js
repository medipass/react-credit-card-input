import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import CreditCardInput from '.';
import './index.stories.css';

const Container = styled.div`
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 16px;
  font-variant: normal;
  margin: 0;
  padding: 20px;
  -webkit-font-smoothing: antialiased;
`;

storiesOf('CreditCardInput', module)
  .add('default', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput />
    </Container>
  ))
  .add('with pre-filled values', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        cardNumberInputProps={{ value: '4242 4242 4242 4242' }}
        cardExpiryInputProps={{ value: '05 / 21' }}
        cardCVCInputProps={{ value: '100' }}
      />
    </Container>
  ))
  .add('custom styling (container)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        containerClassName="custom-container"
        containerStyle={{
          backgroundColor: 'gray',
          padding: '20px',
          fontSize: '30px'
        }}
      />
    </Container>
  ))
  .add('custom styling (field wrapper)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        fieldClassName="custom-field"
        fieldStyle={{ padding: '20px', color: 'gray' }}
        invalidClassName="is-invalid-custom"
        invalidStyle={{ border: '3px solid red' }}
      />
    </Container>
  ))
  .add('custom styling (input)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        inputClassName="custom-input"
        inputStyle={{ color: 'red' }}
      />
    </Container>
  ))
  .add('custom styling (danger text)', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput
        dangerTextClassName="custom-danger-text"
        dangerTextStyle={{ color: 'green' }}
        invalidStyle={{ border: '1px solid green' }}
      />
    </Container>
  ));
