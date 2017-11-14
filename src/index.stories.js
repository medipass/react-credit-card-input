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
  .add('custom field wrapper class', () => (
    <Container style={{ backgroundColor: '#f0f0f0' }}>
      <CreditCardInput fieldClassName="custom-input" />
    </Container>
  ));
